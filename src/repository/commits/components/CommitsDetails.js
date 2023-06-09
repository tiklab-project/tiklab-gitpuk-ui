import React,{useEffect,useState} from 'react';
import {Tooltip,Dropdown} from 'antd';
import {CopyOutlined,CaretDownOutlined,CaretRightOutlined,ArrowRightOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import {SpinLoading} from '../../../common/loading/Loading';
import {copy} from '../../../common/client/Client';
import CommitsDetailsDrop from './CommitsDetailsDrop';
import CommitsDetailsDiff from './CommitsDetailsDiff';
import {commitU4} from "../../file/components/Common";
import './CommitsDetails.scss';

/**
 * 提交详情
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CommitsDetails = props =>{

    const {commitsStore,repositoryStore,match} = props

    const {repositoryInfo} = repositoryStore
    const {findCommitFileDiffList,findCommitFileDiff,findCommitLineFile,commitDiff,setCommitDiff,findLikeCommitDiffFileList,diffDropList} = commitsStore

    const commitId = match.params.commitsId

    //加载
    const [isLoading,setIsLoading] = useState(true)

    //下拉框状态
    const [dropDownVisible,setDropDownVisible] = useState(false)

    // diff文件展开加载状态
    const [expandVisible,setExpandVisible] = useState('')

    // 展开的树
    const [expandedTree,setExpandedTree] = useState([])

    // diff文件列表
    const [commitDiffList,setCommitDiffList] = useState([])

    useEffect(()=>{
        // 获取所有提交文件
        repositoryInfo.name && findCommitFileDiffList({
            rpyId:repositoryInfo.rpyId,
            branch:commitId,
            findCommitId:true,
        }).then(res=>{
            if(res.code===0){
                setCommitDiffList(res.data && res.data.diffList)
            }
            setIsLoading(false)
        })
        return ()=>setCommitDiff()
    },[repositoryInfo.name])


    const isExpandedTree = key => expandedTree.some(item => item === key)

    /**
     * 文件标题显示
     * @param item
     * @returns {*}
     */
    const filePath = item => item.type==='ADD'?item.newFilePath:item.oldFilePath

    /**
     * 文件模糊查询
     * @param e
     */
    const changDropList = e => {
        findLikeCommitDiffFileList({
            rpyId:repositoryInfo.rpyId,
            branch:commitId,
            findCommitId:true,
            likePath:e.target.value
        })
    }

    /**
     * 锚点，跳转
     * @param item
     */
    const changFile = item => {
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

    /**
     * 文件展开和闭合
     * @param item
     */
    const setOpenOrClose = item => {
        const path = filePath(item)
        if (isExpandedTree(path)) {
            setExpandedTree(expandedTree.filter(item => item!==path))
        } else {
            setExpandedTree(expandedTree.concat(path))
        }
        if(!item.content){
            setExpandVisible(path)
            // 获取文件内容
            findCommitFileDiff({
                rpyId:repositoryInfo.rpyId,
                branch:commitId,
                findCommitId:true,
                filePath:path
            }).then(res=>{
                if(res.code===0){
                    setFileContent(path).content = res.data
                    setCommitDiffList([...commitDiffList])
                }
                setExpandVisible('')
            })
        }
    }

    /**
     * 获取符合要求的值
     * @param path
     * @returns {*}
     */
    const setFileContent = path => {
        let a
        commitDiffList && commitDiffList.map(list=>{
            if(filePath(list)===path){
                a = list
            }
        })
        return a
    }

    /**
     * 文件内容，查看全部操作
     * @param content
     * @param item
     * @param index
     */
    const expand = (content,item,index) => {
        const path = filePath(content)
        const last = content && content.content[index-1]
        const next = content && content.content[index+1]
        let count = 20 , oldStn = item.left, newStn = item.right
        if(last && next){
            count = next.right - last.right
            oldStn = last.left
            newStn = last.right
        }
        if(!last){
            oldStn = next.left
            newStn = next.right
        }
        // 文件内容
        findCommitLineFile({
            rpyId:repositoryInfo.rpyId,
            commitId:commitId,
            path:content.newFilePath,
            count:count>20 ? 20 :count,
            oldStn:oldStn,
            newStn:newStn,
            direction:index > 0 ? 'down':'up',
        }).then(res=>{
            if(res.code===0){
                let arr = []
                res.data.map(item=> {
                    arr.push(Object.assign({},item,{expand: true}))
                })
                setFileContent(path).content.splice(index>0?index:index+1,0,...arr)
                setCommitDiffList([...commitDiffList])
            }
        })
    }

    /**
     * 查看文件路由跳转
     * @param type
     * @param item
     */
    const findFile = (type,item) => {
        if(type==='tree'){
            props.history.push(`/index/repository/${repositoryInfo.rpyId}/tree/${commitId+commitU4}`)
            return
        }
        props.history.push(`/index/repository/${repositoryInfo.rpyId}/blob/${commitId+commitU4}/${item.newFilePath}`)
    }

    /**
     * 渲染diff数据
     * @param item
     * @param index
     * @returns {JSX.Element|null}
     */
    const renderDiffData = (item,index) => {
        if(item.type==='COPY'){
            return null
        }
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
                    <Btn type={'common'} title={'查看文件'} onClick={()=>findFile('blob',item)}/>
                </div>
                <div className='item-content' style={isExpandedTree(filePath(item))?{display:'block'}:{display:'none'}}>
                    {
                        expandVisible===filePath(item)? <SpinLoading type='list'/> :
                        <CommitsDetailsDiff content={item} expand={expand} />
                    }
                </div>
            </div>
        )
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
                        <div className='head-divider' />
                        <div className='head-user-time'>
                            <span className='head-time'>{commitDiff && commitDiff.commitTime}来自</span>
                            <span className='head-user'>{commitDiff && commitDiff.commitUser}</span>
                        </div>
                    </div>
                    <div className='commitsDetails-head-right'>
                        <Btn type={'common'} title={'查看文件'} onClick={()=>findFile('tree')}/>
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
                                        setDropDownVisible={setDropDownVisible}
                                    />}
                                    trigger={['click']}
                                    placement={'bottomLeft'}
                                    visible={dropDownVisible}
                                    onVisibleChange={visible=>setDropDownVisible(visible)}
                                >
                                    <span>文件变更 <CaretDownOutlined/></span>
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
                                isLoading ? <SpinLoading type='table'/> :
                                commitDiffList && commitDiffList.map((item,index)=>renderDiffData(item,index))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('commitsStore','repositoryStore')(observer(CommitsDetails))
