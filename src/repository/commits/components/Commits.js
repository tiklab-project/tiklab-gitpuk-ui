/**
 * @name: Commits
 * @author: menyuan
 * @date: 2023-01-09 14:30
 * @description：仓库代码提交
 * @update: 2023-01-09 14:30
 */
import React,{useState,useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import {Col, Input, Select, Tooltip} from 'antd';
import {CopyOutlined,FolderOpenOutlined,SearchOutlined} from '@ant-design/icons';
import {copy} from "../../../common/client/Client";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import EmptyText from '../../../common/emptyText/EmptyText';
import {SpinLoading} from '../../../common/loading/Loading';
import BranchSelect from '../../file/components/BranchSelect';
import './Commits.scss';
import commitsStore from "../store/CommitsStore"
import fileStore from "../../file/store/FileStore";
import branchStore from "../../branch/store/BranchStore";
import SearchInput from "../../../common/input/SearchInput";
const Commits = props =>{

    const {repositoryStore,match,location} = props
    const webUrl = `${match.params.namespace}/${match.params.name}`
    const {repositoryInfo} = repositoryStore
    const {findBranchCommit,commitsList,setCommitsList,findDmUserList,userList,setCommitsQueryData,queryData} = commitsStore
    const {findAllBranch,branchList} = branchStore

    // 初始化加载状态findDmUserList
    const [isLoading,setIsLoading] = useState(true)

    // 没有更多提交信息
    const [hasData,setHasData] = useState(true)

    // 第二次获取提交文件加载状态
    const [findNumber,setFindNumber] = useState(false)

    const [commitName,setCommitName]=useState('')  //提交名称
    const [commitUser,setCommitUser]=useState()  //选择的提交用户

    const [branch,setBranch]=useState(repositoryInfo.defaultBranch)  //分支数据

    useEffect(()=>{
        if(repositoryInfo.name){
            findCommitsList({commitInfo:queryData.commitName})
            if (queryData){
                setCommitName(queryData.commitName)
                setCommitUser(queryData.commitUser)

            }else {
                setCommitName('')
                // 获取提交信息
                findCommitsList()
            }
            //查询用户信息
            ({domainId:repositoryInfo.rpyId})

            findAllBranch(repositoryInfo.rpyId)
        }
        return ()=>setCommitsList()
    },[repositoryInfo.name,location.pathname,branch])



    /**
     * 页面滚动到底部重新获取数据
     */
    const handleScroll = () =>{
        const dom = document.getElementById('xcode-commits')
        if (dom) {
            const contentScrollTop = dom.scrollTop; //滚动条距离顶部
            const clientHeight = dom.clientHeight; //可视区域
            const scrollHeight = dom.scrollHeight; //滚动条内容的总高度
            if (contentScrollTop + clientHeight >= scrollHeight && hasData) {
                setFindNumber(true)
                // 滚动到底部获取数据的方法
                findCommitsList({commitInfo:commitName},'all')
            }
        }
    }

    //输入搜索的提交信息
    const onChangeSearch =async (e) => {
        const value=e.target.value
        setCommitName(value)
        if (value===''){
            findCommitsList({})
        }
    }
    //输入搜索
    const onSearch =async () => {
        setCommitUser('all')
        findCommitsList({commitInfo:commitName})
    }
    /**
     * 获取提交信息
     * @param number
     */
    const findCommitsList = (data,number) => {
        findBranchCommit({
            ...data,
            rpyId:repositoryInfo.rpyId,
            refCode:branch,
            refCodeType:"branch",
            number:number
        }).then(()=>{
            if(number){
                setHasData(false)
                setFindNumber(false)
                return
            }
            setIsLoading(false)
        })
    }

    /**
     * 切换提交用户
     * @param value
     */
    const changCommitsUser = value => {
        setCommitName('')
        setCommitUser(value)
        if (value==="all"){
            findCommitsList()
        }else {
            findCommitsList({commitUser:value})
        }
    }

    /**
     * 跳转到提交详情
     * @param item
     */
    const goDetails = item =>{
        //setPageType("details")
        //setCommitId(item.commitId)
        setCommitsQueryData({commitName:commitName,commitUser:commitUser})
        props.history.push(`/repository/${webUrl}/commit/${item.commitId}`)
    }

    /**
     * 跳转到源文件
     * @param item
     */
    const findFile = item => {
        props.history.push(`/repository/${webUrl}/code/${item.commitId}`)
    }

    const renderCommits = item => {
        return (
            <div className='msg-item' key={item.commitId}>
                <div className='msg-item-icon'>
                 {/*   <Profile userInfo={getUser()}/>*/}
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
        <div className='page-width commits drop-down' id='xcode-commits' onScroll={handleScroll}>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='commits-content'>
                    <BreadcrumbContent firstItem={'Commits'}/>
                    <div className='commits-filter'>
                        <div className='commits-filter-left'>
                            <BranchSelect
                                {...props}
                                repositoryInfo={repositoryInfo}
                                type={'commit'}
                                setData={setBranch}
                                refCode={repositoryInfo.defaultBranch}
                            />
                        </div>
                        <div className='commits-filter-right'>
                            <SearchInput
                                placeholder='搜索提交信息'
                                onChange={onChangeSearch}
                                onPressEnter={onSearch}
                            />

                            <Select  value={commitUser} onChange={value=>changCommitsUser(value)} style={{minWidth:150}} placeholder='用户'>
                                <Select.Option value={"all"}>{"所有"}</Select.Option>
                                {
                                    userList.map(item=>{
                                        return(
                                            <Select.Option key={item.id} value={item.user.name}>{item.user.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <div className='commits-msg'>
                        {
                            isLoading ? <SpinLoading type='table'/> :
                                commitsList && commitsList.length > 0 ?
                                    commitsList.map((group,groupIndex)=>renderCommitsData(group,groupIndex))
                                    :
                                    <div style={{paddingTop:50}}>
                                        <EmptyText title={"暂无提交信息"}/>
                                    </div>

                        }
                        {
                            findNumber && <SpinLoading type='table' size='large'/>
                        }
                        {
                            !hasData && <div style={{textAlign:'center',paddingTop:30,color:'#999'}}>没有更多了</div>
                        }
                    </div>
                </div>
            </Col>
        </div>

    )
}

export default inject('repositoryStore')(observer(Commits))
