import React,{useState,useEffect} from 'react';
import {
    PlusOutlined,
    SearchOutlined,
    BranchesOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined, PullRequestOutlined
} from '@ant-design/icons';
import {Input, Tooltip, Popconfirm, Col, Dropdown, Menu, Modal} from 'antd';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import EmptyText from '../../../common/emptyText/EmptyText';
import BranchAdd from './BranchAdd';
import './Branch.scss';
import branchStore from "../store/BranchStore"
import {getUser} from "thoughtware-core-ui";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
const { confirm } = Modal;
/**
 * 分支页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Branch = props =>{

    const {repositoryStore,match} = props

    const {repositoryInfo} = repositoryStore
    const {createBranch,branchList,fresh,deleteBranch,findBranchList} = branchStore

    const userId=getUser().userId
    const [branchType,setBranchType] = useState("all")
    const [addVisible,setAddVisible] = useState(false)
    const [branchName,setBranchName]=useState('')   //搜索的分支名字

    const webUrl = `${match.params.namespace}/${match.params.name}`

    useEffect(()=>{
        // 初始化分支
      //  repositoryInfo.name && findAllBranch(repositoryInfo.rpyId)

        repositoryInfo.name && findBranchList({rpyId:repositoryInfo.rpyId})
    },[repositoryInfo.name,fresh])

    /**
     * 切换分支类型
     * @param item
     */
    const clickBranchType = item => {
        setBranchName(null)
        setBranchType(item.id)
        if (item.id!=='all'){
            findBranchList({rpyId:repositoryInfo.rpyId,state:item.id,userId:userId})
        }else {
            findBranchList({rpyId:repositoryInfo.rpyId})
        }
    }

    /**
     * 删除分支
     * @param item
     */
   const delBranch = item =>{
       deleteBranch({
           rpyId:repositoryInfo.rpyId,
           branchName:item.branchName
       })
   }

    /**
     * 跳转到文件页面，查看分支文件
     * @param item
     */
   const goCode = item =>{
       props.history.push(`/repository/${webUrl}/tree/${item.branchName}`)
   }

   //输入搜索的分支名字
   const onChangeSearch = (e) => {
       const value=e.target.value
       setBranchName(value)
       if (value===''){
           findBranchList({rpyId:repositoryInfo.rpyId})
       }
   }
    //名字搜索分支
   const onSearch =async () => {
       setBranchType('all')
       findBranchList({rpyId:repositoryInfo.rpyId,name:branchName})
   }

   //跳转合并请求详情
   const goMergeDetails = (mergeId) => {
       props.history.push(`/repository/${webUrl}/mergeAdd/${mergeId}`)
   }
   //跳转创建合并添加界面
   const goMergeAdd = (branchName) => {
       props.history.push(`/repository/${webUrl}/mergeAdd?source_branch=${branchName}`)
   }



    //删除弹窗
    const  DeletePop = (value) =>{
        confirm({
            title: `确认删除分支 ${value.branchName}`,
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              delBranch(value)
            },
            onCancel() {
            },
        });
    }

    /**
     * 操作下拉
     */
    const execPullDown=(value) => (
        <Menu>
            <Menu.Item  style={{width:120}}>
                比较
            </Menu.Item>
            <Menu.Item>
                下载分支
            </Menu.Item>
            {
                value.defaultBranch &&
                <PrivilegeProjectButton code={"rpy_branch_delete"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                    <Menu.Item onClick={()=>DeletePop(value)} disabled={true}>
                        <Tooltip placement="top" title={'默认分支不能被删除'} >
                            删除
                        </Tooltip>
                    </Menu.Item>
                </PrivilegeProjectButton > ||
                value?.mergeRequest?.mergeState===1&&
                <PrivilegeProjectButton code={"rpy_branch_delete"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                    <Menu.Item onClick={()=>DeletePop(value)} disabled={true}>
                        <Tooltip placement="top" title={'存在开启的合并请求'} >
                            删除
                        </Tooltip>
                    </Menu.Item>
                </PrivilegeProjectButton > ||
                (!value.defaultBranch && !value?.mergeRequest?.mergeState!==1)&&
                <PrivilegeProjectButton code={"rpy_branch_delete"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                    <Menu.Item onClick={()=>DeletePop(value)}>
                        删除
                    </Menu.Item>
                </PrivilegeProjectButton >
            }
        </Menu>
    );


   // 渲染分支列表
    const renderData = item => {
        return(
            <div className='branch-tables-item' key={item.branchName}>
                <div className='branch-tables-icon'>
                    <BranchesOutlined/>
                </div>
                <div className='branch-tables-name'>
                    <div className='name-text-title'>
                        <span className='name-text-name' onClick={()=>goCode(item)}>
                            {item.branchName}
                        </span>
                        {
                            item.defaultBranch &&
                            <span className='name-text-type name-text-default'>默认</span>
                        }
                    </div>
                    <div className='name-text-desc'>
                        <span className='desc-name'>{item.updateUser}</span>
                        <span>{item.updateTime}</span>
                    </div>
                </div>
                <div className='branch-tables-commit'>
                    <Tooltip title={`比默认分支滞后${item.lagNum}个提交，超前${item.advanceNum}个提交`}>
                        <span className='commit-num-left'>{item.lagNum}</span>
                        <span className='commit-num-right'>{item.advanceNum}</span>
                    </Tooltip>
                </div>
                <div className='branch-tables-action'>
                    {
                        item.mergeRequest?
                            <div>
                                {
                                    item.mergeRequest.mergeState===1&&
                                    <div className='branch-tables-combine open-merge' onClick={()=>goMergeDetails(item.mergeRequest.id)}>
                                        <div className='open-merge-icon'><PullRequestOutlined/></div>
                                        <div>已开启</div>
                                    </div>||
                                    item.mergeRequest.mergeState===3&&
                                    <div className='branch-tables-combine close-merge' onClick={()=>goMergeDetails(item.mergeRequest.id)}>
                                        <div className='close-merge-icon'><PullRequestOutlined/></div>
                                        <div>已关闭</div>
                                    </div>
                                }
                            </div>
                            :
                            <div className='branch-tables-combine' onClick={()=>goMergeAdd(item.branchName)}>创建合并请求</div>
                    }
                    <Dropdown    overlay={()=>execPullDown(item)}
                                placement="bottomRight"
                                trigger={['click']}
                                 getPopupContainer={e => e.parentElement}
                    >
                        <EllipsisOutlined style={{fontSize:20}}/>
                    </Dropdown>

             {/*       <Tooltip title='对比'>
                        <div className='branch-tables-compare'>对比</div>
                    </Tooltip>
                    <Tooltip title='下载'>
                        <div className='branch-tables-download'>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref='#icon-xiazai'/>
                            </svg>
                        </div>
                    </Tooltip>
                    {
                        item.defaultBranch ?
                        <div className='no-del'>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-delete"/>
                            </svg>
                        </div>
                            :
                        <Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>delBranch(item)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <div className='branch-tables-del'>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-delete"/>
                                    </svg>
                                </div>
                            </Popconfirm>
                        </Tooltip>
                    }*/}
                </div>
            </div>
        )
    }

    return(
        <div className='xcode gittok-width branch'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='branch-content  '>
                    <div className='branch-content-top'>
                        <BreadcrumbContent firstItem={'Branch'}/>
                        <PrivilegeProjectButton code={"rpy_branch_add"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                            <Btn
                                type={'primary'}
                                title={'新建分支'}
                                icon={<PlusOutlined/>}
                                onClick={()=>setAddVisible(true)}
                            />
                        </PrivilegeProjectButton>
                        <BranchAdd
                            createBranch={createBranch}
                            branchList={branchList}
                            repositoryInfo={repositoryInfo}
                            addVisible={addVisible}
                            setAddVisible={setAddVisible}
                        />
                    </div>
                    <div className='branch-content-filter'>
                        <Tabs
                            type={branchType}
                            tabLis={ [
                                {id:'all', title:'所有'},
                                {id:'oneself', title:'我的'},
                                {id:'active', title:'活跃'},
                                {id:'noActive', title:'非活跃'}

                            ]}
                            onClick={clickBranchType}
                        />
                        <Input
                            allowClear
                            value={branchName}
                            placeholder='搜索分支名称'
                            onChange={onChangeSearch}
                            onPressEnter={onSearch}
                            prefix={<SearchOutlined className='input-icon'/>}
                            style={{ width: 200 }}
                        />
                    </div>
                    <div className='branch-content-tables'>
                        {
                            branchList && branchList.length > 0 ?
                                branchList.map(item=> renderData(item) )
                                :
                                <EmptyText title={'暂无分支'}/>
                        }
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default inject('repositoryStore')(observer(Branch))
