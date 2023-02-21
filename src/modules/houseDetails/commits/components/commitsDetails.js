import React,{useEffect,useState} from 'react'
import {Divider,Select,Tooltip,Dropdown} from 'antd'
import {CopyOutlined,CaretDownOutlined,CaretRightOutlined,ArrowRightOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import Loading from '../../../common/loading/loading'
import {copy} from '../../../common/client/client'
import CommitsDetailsDrop from './commitsDetailsDrop'
import CommitsDetailsDiff from './commitsDetailsDiff'
import {commitU4} from '../../code/components/common'
import './commitsDetails.scss'

const CommitsDetails = props =>{

    const {commitsStore,houseStore,match} = props

    const {houseInfo,webUrl} = houseStore
    const {findCommitFileDiffList,findCommitFileDiff,findCommitLineFile,commitDiff,findLikeCommitDiffFileList,diffDropList} = commitsStore

    const commitId = match.params.commitsId
    const [isLoading,setIsLoading] = useState(true)
    const [dropDownVisible,setDropDownVisible] = useState(false)
    const [commitDiffList,setCommitDiffList] = useState([])
    const [expandedTree,setExpandedTree] = useState([])

    useEffect(()=>{
        // 所有提交文件
        houseInfo.name && findCommitFileDiffList({
            codeId:houseInfo.codeId,
            branch:commitId,
            findCommitId:true,
        }).then(res=>{
            if(res.code===0){
                setCommitDiffList(res.data && res.data.diffList)
            }
            setIsLoading(false)
        })
    },[houseInfo.name])

    // 当前列表是否展开 展开/true 闭合/false
    const isExpandedTree = key => expandedTree.some(item => item === key)

    // 列表标题显示
    const filePath = item => item.type==='ADD'?item.newFilePath:item.oldFilePath

    // 锚点，跳转
    const changFile = item => {
        setDropDownVisible(false)
        const scrollTop=document.getElementById("commits_contrast")
        const anchorName = filePath(item)
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop - 50
            }
        }
        setOpenOrClose(item)
    }

    const changDropList = e => {
        findLikeCommitDiffFileList({
            codeId:houseInfo.codeId,
            branch:commitId,
            findCommitId:true,
            likePath:e.target.value
        })
    }

    //展开闭合 分类
    const setOpenOrClose = item => {
        const path = filePath(item)
        if (isExpandedTree(path)) {
            setExpandedTree(expandedTree.filter(item => item!==path))
        } else {
            setExpandedTree(expandedTree.concat(path))
        }
        !item.content && findCommitFileDiff({
            codeId:houseInfo.codeId,
            branch:commitId,
            findCommitId:true,
            filePath:path
        }).then(res=>{
            if(res.code===0){
                setFileContent(path).content = res.data
                setCommitDiffList([...commitDiffList])
            }
        })
    }

    const setFileContent = path => {
        let a
        commitDiffList && commitDiffList.map(list=>{
            if(filePath(list)===path){
                a = list
            }
        })
        return a
    }

    const expand = (content,item,index) => {
        const path = filePath(content)
        const last = content && content.content[index-1]
        const next = content && content.content[index+1]
        let count = 30 , oldStn = item.left, newStn = item.right
        if(last && next){
            count = next.right - last.right
            oldStn = last.left
            newStn = last.right
        }
        if(!last || !next){
            count = -1
        }
        findCommitLineFile({
            codeId:houseInfo.codeId,
            commitId:commitId,
            path:content.newFilePath,
            count: count>30 ? 30 :count,
            oldStn:oldStn,
            newStn:newStn,
            direction:index > 0 ? 'down':'up',
        }).then(res=>{
            if(res.code===0){
                let arr = []
                res.data.map(item=> {
                    arr.push(Object.assign({},item,{expand: true}))
                })
                setFileContent(path).content.splice(index,0,...arr)
                setCommitDiffList([...commitDiffList])
            }
        })
    }



    const findFile = item => {
        props.history.push(`/index/house/${webUrl}/blob/${commitId+commitU4}/${item.newFilePath}`)
    }

    const renderDiffData = (item,index) => {
        return (
            <div className='contrast-content-item' key={index} id={filePath(item)}>
                <div className='item-head'>
                    <div className='item-head-icon' onClick={()=>setOpenOrClose(item)}>
                        {
                            isExpandedTree(filePath(item))? <CaretDownOutlined/> : <CaretRightOutlined/>
                        }
                    </div>
                    <div className='item-head-file'>
                        <span className='item-title-title'> { filePath(item) } </span>
                        {
                            item.type!=='MODIFY' &&
                            <span className='item-title-type'>
                                {item.oldFileType} <ArrowRightOutlined /> {item.newFileType}
                            </span>
                        }
                        <span className='item-title-icon' onClick={()=>copy(filePath(item))}>
                            <CopyOutlined />
                        </span>
                    </div>
                    <Btn type={'common'} title={'查看文件'} onClick={()=>findFile(item)}/>
                </div>
                <div className='item-content' style={isExpandedTree(filePath(item))?{display:'block'}:{display:'none'}}>
                    <CommitsDetailsDiff content={item} expand={expand} />
                </div>
            </div>
        )
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        <div className='commitsDetails' id='commits_contrast'>
            <div className='commitsDetails-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Commits'} secondItem={commitDiff && commitDiff.commitMessage} goBack={()=>props.history.go(-1)}/>
                <div className='commitsDetails-head'>
                    <div className='commitsDetails-head-left'>
                        <div className='head-title-icon'>
                            <span className='head-title'>提交 {commitId.substring(0,8)}</span>
                            <Tooltip title={'复制'}>
                                <span className='head-icon' onClick={()=>copy(commitId)}><CopyOutlined /></span>
                            </Tooltip>
                        </div>
                        <Divider type='vertical'/>
                        <div className='head-user-time'>
                            <span className='head-time'>{commitDiff && commitDiff.commitTime}来自</span>
                            <span className='head-user'>{commitDiff && commitDiff.commitUser}</span>
                        </div>
                    </div>
                    <div className='commitsDetails-head-right'>
                        <Btn
                            type={'common'}
                            title={'查看文件'}
                            onClick={()=>props.history.push(`/index/house/${webUrl}/tree/${commitId+commitU4}`)}
                        />
                    </div>
                </div>
                <div className='commitsDetails-contrast'>
                    <div className='commitsDetails-contrast-content'>
                        <div className='contrast-title'>
                            变化（{commitDiffList && commitDiffList.length}）
                        </div>
                        <div className='contrast-affected'>
                            <div className='contrast-affected-opt'>
                                <Dropdown
                                    overlay={<CommitsDetailsDrop
                                        diffDropList={diffDropList}
                                        changFile={changFile}
                                        changDropList={changDropList}
                                    />}
                                    trigger={['click']}
                                    placement={'bottomLeft'}
                                    visible={dropDownVisible}
                                    onVisibleChange={visible => setDropDownVisible(visible)}
                                >
                                    <span >文件变更 <CaretDownOutlined/></span>
                                </Dropdown>
                            </div>
                            <div className='contrast-affected-num'>
                                <span className='num-title'>受影响行:</span>
                                <span className='num-add'>+{commitDiff && commitDiff.addLine}</span>
                                <span className='num-reduce'>-{commitDiff && commitDiff.deleteLine}</span>
                            </div>
                        </div>
                        <div className='contrast-content'>
                            {
                                commitDiffList && commitDiffList.map((item,index)=>renderDiffData(item,index))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('commitsStore','houseStore')(observer(CommitsDetails))
