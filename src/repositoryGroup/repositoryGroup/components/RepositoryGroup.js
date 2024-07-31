import React,{useState,useEffect} from 'react';
import {
    PlusOutlined,
    SettingOutlined,
    LockOutlined,
    SearchOutlined, UnlockOutlined
} from '@ant-design/icons';
import {Table, Tooltip, Space, Input, Col} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import EmptyText from '../../../common/emptyText/EmptyText';
import Listicon from '../../../common/list/Listicon';
import './RepositoryGroup.scss';
import groupStore from "../store/RepositoryGroupStore"
import {observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import {SpinLoading} from "../../../common/loading/Loading";
import Page from "../../../common/page/Page";
import UserIcon from "../../../common/list/UserIcon";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
const RepositoryGroup = props => {

    const {findRepositoryGroupPage} = groupStore

    // 仓库组分类
    const [groupType,setGroupType] = useState("viewable")

    const [groupList,setGroupList]=useState([])

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    //查询仓库的名称
    const [groupName,setGroupName]=useState()
    const [isLoading,setIsLoading]=useState(false)

    useEffect( async ()=>{

        // 初始化仓库组
        await findGroupPage(1,groupType)
    },[])

    const findGroupPage =async (currentPage,repositoryType,name) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:10
            },
            userId:getUser().userId,
            name:name,
            findType:repositoryType
        }
        setIsLoading(true)
        const res=await findRepositoryGroupPage(param)
        setIsLoading(false)
        if (res.code===0){
            setGroupList(res.data?.dataList)

            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
            setTotalRecord(res.data.totalRecord)
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
         props.history.push(`/group/${text}/repository`)
    }

    /**
     * 跳转仓库组的设置界面
     * @param value 仓库信息
     */
    const goSet = (value) => {
        props.history.push(`/group/${value.name}/setting/info`)
    }

    /**
     * 输入搜索的仓库组名称
     * @param e
     */
    const onChangeSearch = (e) => {
        const value=e.target.value
        setGroupName(value)
        if (value===''){
            findGroupPage(1,groupType)
        }
    }

    const onSearch = () => {
        findGroupPage(1,groupType,groupName)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        await findGroupPage(value,groupType,groupName)
    }


    //刷新查询
    const refreshFind = () => {
        findGroupPage(currentPage,groupType,groupName)
    }

    const columns = [
        {
            title: '仓库组名称',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='repository-group-tables-name' onClick={()=>goDetails(text,record)}>
                        <div className='name-icon'>
                            <Listicon text={text} colors={record.color}/>
                        </div>
                        <div className='name-text'>
                            <span className='name-text-name text-color'>{text}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '负责人',
            dataIndex: ['user','nickname'],
            key: 'user',
            width:'20%',
            ellipsis:true,
            render:(text,record)=><div className='icon-text-user'>
                <UserIcon text={record?.user?.nickname?text:record?.user?.name} size={"small"}/>
                <div>{record?.user?.nickname?text:record?.user?.name}</div>
            </div>
        },
        {
            title: '可见范围',
            dataIndex: 'rules',
            key: 'rules',
            width:'15%',
            ellipsis:true,
            render:(text)=>{
                return (
                    <div className='repository-tables-name'>
                        {text==='private'?
                            <div className='icon-text-use'>
                                <LockOutlined/>
                                <span>私有</span>
                            </div>:
                            <div className='icon-text-use'>
                                <UnlockOutlined />
                                <span>公开</span>
                            </div>
                        }
                    </div>
                )}
        },
        {
            title: '仓库数',
            dataIndex: 'repositoryNum',
            key: 'repositoryNum',
            width:'15%0%',
            ellipsis:true,
        },
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
                    </Space>
                )
            }
        },
    ]

    return(
        <div className='xcode gittok-width repository-group'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='repository-group-content  '>
                    <div className='repository-group-top'>
                        <BreadcrumbContent firstItem={'Repository_group'}/>
                        <PrivilegeButton  code={"gittok_rpy_group_add"} key={'gittok_rpy_group_add'} >
                            <Btn
                                type={'primary'}
                                title={'新建仓库组'}
                                /* icon={<PlusOutlined/>}*/
                                onClick={()=>props.history.push('/group/new')}
                            />
                        </PrivilegeButton>
                    </div>
                    <div className='repository-group-type'>
                        <Tabs
                            type={groupType}
                            tabLis={[
                                {id:"viewable", title:'所有仓库组'},
                                {id:"oneself", title:'我的仓库组'},
                            ]}
                            onClick={clickType}
                        />
                        <div className='repository-group-type-input'>
                            <Input
                                allowClear
                                placeholder='搜索仓库组名称'
                                onChange={onChangeSearch}
                                onPressEnter={onSearch}
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
                                    <SpinLoading type="table"/>:  <EmptyText title={"暂无仓库组数据"}/>}}
                        />
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default observer(RepositoryGroup)
