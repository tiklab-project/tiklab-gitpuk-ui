import React,{useState,useEffect} from 'react'
import {inject,observer} from 'mobx-react'
import {Input,Select,Tooltip,Spin} from 'antd'
import {CopyOutlined,FolderOpenOutlined,SearchOutlined,LoadingOutlined} from '@ant-design/icons'
import {Profile} from 'tiklab-eam-ui'
import {getUser} from 'tiklab-core-ui'
import {copy} from '../../../common/client/client'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import EmptyText from '../../../common/emptyText/emptyText'
import Loading from '../../../common/loading/loading'
import BranchSelect from '../../code/components/branchSelect'
import {commitU4,setBranch,findCommitId} from '../../code/components/common'
import '../components/commits.scss'

const Commits = props =>{

    const {commitsStore,houseStore,match,location} = props

    const {houseInfo,webUrl} = houseStore
    const {findBranchCommit,commitsList,setCommitsList} = commitsStore

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,houseInfo)
    const [isLoading,setIsLoading] = useState(true) // 初始化加载状态
    const [hasData,setHasData] = useState(true) // 第二次加载状态
    const [findNumber,setFindNumber] = useState(false) // 第二次获取提交文件加载状态

    useEffect(()=>{
        if(houseInfo.name){
            findCommitsList()
        }
        return ()=>setCommitsList()
    },[houseInfo.name,location.pathname])

    // 页面滚动到底部重新获取数据
    const handleScroll = () =>{
        const dom = document.getElementById('xcode-commits')
        if (dom) {
            const contentScrollTop = dom.scrollTop; //滚动条距离顶部
            const clientHeight = dom.clientHeight; //可视区域
            const scrollHeight = dom.scrollHeight; //滚动条内容的总高度
            if (contentScrollTop + clientHeight >= scrollHeight && hasData) {
                setFindNumber(true)
                // 滚动到底部获取数据的方法
                findCommitsList({number:'all'})
            }
        }
    }

    const findCommitsList = number => {
        findBranchCommit({
            codeId:houseInfo.codeId,
            branch:branch,
            findCommitId:findCommitId(urlInfo),
            ...number
        }).then(()=>{
            if(number){
                setHasData(false)
                setFindNumber(false)
                return
            }
            setIsLoading(false)
        })
    }

    const changCommitsUser = value => {

    }

    // 提交详情
    const goDetails = item =>{
        props.history.push(`/index/house/${webUrl}/commit/${item.commitId}`)
    }

    // 查看源文件
    const findFile = item => {
        props.history.push(`/index/house/${webUrl}/tree/${item.commitId+commitU4}`)
    }


    if(isLoading){
        return <Loading/>
    }

    const renderCommits = item => {
        return (
            <div className='msg-item' key={item.commitId}>
                <div className='msg-item-icon'>
                    <Profile userInfo={getUser()}/>
                </div>
                <div className='msg-item-msg'>
                    <div className='msg-item-title'>
                        <span className='title-commitMsg' onClick={()=>goDetails(item)}>
                            {item.commitMessage}
                        </span>
                    </div>
                    <div className='msg-item-desc'>
                        <span className='desc-user'>{item.commitUser}</span>
                        <span className='desc-time'>{item.commitTime}</span>
                    </div>
                </div>
                <div className='msg-item-ident'>
                    <div className='ident-title'> {item.commitId.substring(0,8)}</div>
                    <Tooltip title={'复制'}>
                        <div className='ident-copy' onClick={()=>copy(item.commitId)}>
                            <CopyOutlined />
                        </div>
                    </Tooltip>
                    <Tooltip title={'查看源文件'}>
                        <div className='ident-folder' onClick={()=>findFile(item)}>
                            <FolderOpenOutlined />
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }

    const renderCommitsData = (group,groupIndex) => {
        return (
            <div className='commits-msg-item' key={groupIndex}>
                <div className='commits-msg-item-title'>
                    <span className='title-time'>{group.commitTime}</span>
                    <span className='title-num'>(
                        {
                            group.commitMessageList && group.commitMessageList.length
                        }
                    )</span>
                </div>
                <div className='commits-msg-item-content'>
                    {
                        group.commitMessageList && group.commitMessageList.map(item=>renderCommits(item))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='commits' id='xcode-commits' onScroll={handleScroll}>
            <div className='commits-content xcode-home-limited'>
                <BreadcrumbContent firstItem={'Commits'}/>
                <div className='commits-head'>
                    <div className='commits-head-left'>
                        <BranchSelect
                            {...props}
                            houseInfo={houseInfo}
                            webUrl={webUrl}
                            type={'commit'}
                        />

                    </div>
                    <div className='commits-head-right'>
                        <div className='commits-user'>
                            <Select defaultValue={'admin'} onChange={value=>changCommitsUser(value)}>
                                <Select.Option value={'admin'}>admin</Select.Option>
                                <Select.Option value={'root'}>root</Select.Option>
                            </Select>
                        </div>
                        <div className='commits-input'>
                            <Input
                                allowClear
                                placeholder='提交信息'
                                // onChange={onChangeSearch}
                                prefix={<SearchOutlined />}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className='commits-msg'>
                    {
                        commitsList && commitsList.length > 0 ?
                        commitsList.map((group,groupIndex)=>renderCommitsData(group,groupIndex))
                        :
                        <EmptyText title={'暂无提交信息'}/>
                    }
                    {
                        findNumber && <div style={{textAlign:'center',paddingTop:30}}><Spin size="large" /></div>
                    }
                    {
                        !hasData && <div style={{textAlign:'center',paddingTop:30,color:'#999'}}>没有更多了</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','commitsStore')(observer(Commits))
