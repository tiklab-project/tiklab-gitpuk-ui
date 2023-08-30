import React,{useState,useEffect} from 'react';
import {
    PlusOutlined,
    SettingOutlined,
    LockOutlined,
    SearchOutlined, UnlockOutlined
} from '@ant-design/icons';
import {Table, Tooltip, Space, Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import './RepositoryGroup.scss';
import groupStore from "../store/RepositoryGroupStore"
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {SpinLoading} from "../../../common/loading/Loading";
import Page from "../../../common/page/Page";

const RepositoryGroup = props => {

    const {findRepositoryGroupPage} = groupStore

    // 仓库组分类
    const [groupType,setGroupType] = useState("viewable")

    const [groupList,setGroupList]=useState([])

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    //查询仓库的名称
    const [groupName,setGroupName]=useState()
    const [isLoading,setIsLoading]=useState(false)

    useEffect( async ()=>{

        // 初始化仓库组
        await findGroupPage(1,groupType)
    },[])

    const findGroupPage =async (currentPage,repositoryType) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:10
            },
            userId:getUser().userId,
            name:groupName,
            findType:repositoryType
        }

        setIsLoading(true)
        const res=await findRepositoryGroupPage(param)
        setIsLoading(false)
        if (res.code===0){
            setGroupList(res.data?.dataList)
            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
        }
    }

    /**
     * 切换仓库组类型
     * @param item
     */
    const clickType = item => {
        setGroupType(item.id)
    }

    const goDetails = (text) => {
         props.history.push(`/index/group/${text}/repository`)
    }

    /**
     * 跳转仓库组的设置界面
     * @param value 仓库信息
     */
    const goSet = (value) => {
        props.history.push(`/index/group/${value.name}/sys/info`)
    }

    /**
     * 输入搜索的仓库组名称
     * @param e
     */
    const onChangeSearch = (e) => {
        const value=e.target.value
        setGroupName(value)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        await findGroupPage(value,groupType)
    }

    const columns = [
        {
            title: '仓库组名称',
            dataIndex: 'name',
            key: 'name',
            width:'60%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-group-tables-name' onClick={()=>goDetails(text,record)}>
                        <div className='name-icon'>
                            <Listicon text={text}/>
                        </div>
                        <div className='name-text'>
                            <span className='name-text-name'>{text}</span>
                            <span className='name-text-lock'>{record.rules==='private'?<LockOutlined/>:<UnlockOutlined />}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '负责人',
            dataIndex: ['user','name'],
            key: 'user',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '仓库数',
            dataIndex: 'repositoryNum',
            key: 'repositoryNum',
            width:'30%',
            ellipsis:true,
        },
  /*      {
            title: '更新',
            dataIndex: 'update',
            key: 'update',
            width:'30%',
            ellipsis:true,
            render:text => text?text:'暂无更新'
        },*/
        {
            title: '操作',
            dataIndex: 'action',
            key:'action',
            width:'10%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <Space>
                        <Tooltip title='设置'>
                            <span className='repository-group-tables-set' onClick={()=>goSet(record)}>
                                <SettingOutlined className='actions-se'/>
                            </span>
                        </Tooltip>
                       {/* <Tooltip title='收藏'>
                            <span className='repository-group-tables-collect'>
                            {
                                record.collect === 1 ?
                                    <svg className='icon' aria-hidden='true'>
                                        <use xlinkHref={`#icon-xingxing1`} />
                                    </svg>
                                    :
                                    <svg className='icon' aria-hidden='true'>
                                        <use xlinkHref={`#icon-xingxing-kong`} />
                                    </svg>
                            }
                            </span>
                        </Tooltip>*/}
                    </Space>
                )
            }
        },
    ]

    return(
        <div className='repository-group'>
            <div className='repository-group-content xcode-home-limited xcode'>
                <div className='repository-group-top'>
                    <BreadcrumbContent firstItem={'Repository_group'}/>
                    <Btn
                        type={'primary'}
                        title={'新建仓库组'}
                        icon={<PlusOutlined/>}
                        onClick={()=>props.history.push('/index/group/new')}
                    />
                </div>
                <div className='repository-group-type'>
                    <Tabs
                        type={groupType}
                        tabLis={[
                            {id:"viewable", title:'所有仓库组'},
                            {id:"oneself", title:'我的仓库组'},
                            /*   {id:3, title:'我收藏的'}*/
                        ]}
                        onClick={clickType}
                    />
                    <div className='repository-group-type-input'>
                        <Input
                            allowClear
                            placeholder='仓库组名称'
                             onChange={onChangeSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
                <div className='repository-group-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        isLoading={isLoading}
                        dataSource={groupList}
                        rowKey={record=>record.groupId}
                        pagination={false}
                        locale={{emptyText: isLoading ?
                                <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
                    />
                    {
                        (!isLoading &&totalPage>1)?
                            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(RepositoryGroup)
