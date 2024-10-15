/**
 * @name: UserGroupList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：用户的仓库组列表
 * @update: 2023-8-30 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Button, Col, Dropdown, Menu, Space, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listicon from "../../../common/list/Listicon";
import "./UserGroupList.scss"
import {
    EllipsisOutlined,
    LockOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import "./UserRpyList.scss"
import {SpinLoading} from "../../../common/loading/Loading";
import Page from "../../../common/page/Page";
import XcodeUserStore from "../store/XcodeUserStore";
import SearchInput from "../../../common/input/SearchInput";
import groupStore from "../../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore";
const UserGroupList = (props) => {
    const {userId} = props

    const {findRepositoryGroupPage} = groupStore
    const {deleteDmUser,findDmUserList}=XcodeUserStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [isLoading,setIsLoading]=useState(false)
    const [groupList,setGroupList]=useState([])
    const [groupName,setGroupName]=useState()


    const columns = [
        {
            title: '仓库组名称',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='user-group-table-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}
                                  type={"common"}
                        />
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <div className='name-text-name'>{ record.name}</div>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '可见范围',
            dataIndex: 'rules',
            key: 'rules',
            width:'15%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div>
                        {text==='private'?
                            <div style={{gap:5 , display:"flex"}}>
                                <LockOutlined/>
                                <span>私有</span>
                            </div>:
                            <div style={{gap:5 , display:"flex"}}>
                                <UnlockOutlined />
                                <span>公开</span>
                            </div>
                        }
                    </div>
                )}
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'user',
            width:'20%',
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
                    <Dropdown    overlay={()=>execPullDown(record)}
                                 placement="bottomRight"
                                 trigger={['click']}
                        /* getPopupContainer={e => e.parentElement}*/
                    >
                        <div style={{cursor:"pointer"}}>
                            <EllipsisOutlined style={{fontSize:20}}/>
                        </div>
                    </Dropdown>
                )
            }
        },
    ]

    useEffect(async ()=>{
        await findGroupPage(1)
    },[])



    //查询用户仓库
    const findGroupPage =async (currentPage,groupName) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:10
            },
            userId:userId,
            findType:"viewableRole",
            name:groupName
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
     * 操作下拉
     */
    const execPullDown=(value) => (
        <Menu>
            { userId==="111111"?
                <Menu.Item  disabled={true}>
                    <Tooltip placement="top" title={'不能移除超级管理员的项目'} >
                        移除
                    </Tooltip>
                </Menu.Item>:
                <Menu.Item  onClick={()=>deleteUsrRpy(value)}>
                    移除
                </Menu.Item>
            }

        </Menu>
    );




    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        props.history.push(`/repository/${record.address}/code`)
    }

    const goBack = () => {
        props.history.go(-1)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        await findGroupPage(value,groupName)
    }

    //刷新查询
    const refreshFind = () => {
        findGroupPage(currentPage,groupName)
    }

    //用户用权限仓库
    const deleteUsrRpy =async (value) => {
        const res =await findDmUserList({domainId:value.rpyId,userId:params.userId})
        if(res.code===0){
            deleteDmUser(res.data[0].id).then(item=>{
                item.code===0&&findGroupPage(currentPage,groupName)
            })
        }
    }


    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {
        findGroupPage(1,groupName)
    }

    const onChangeSearch = (e) => {
        const value=e.target.value
        setGroupName(value)
        if (value===''){
            findGroupPage(1)
        }
    }

    return(
        <div className='  user-group'>
            <div className='user-group-search'>
                <SearchInput {...props}
                             placeholder={"搜索仓库组"}
                             onChange={onChangeSearch}
                             onPressEnter={onSearch}
                />
            </div>
            <Table
                bordered={false}
                columns={columns}
                dataSource={groupList}
                rowKey={record=>record.id}
                pagination={false}
                className='user-group-table'
                locale={{emptyText: isLoading ?
                        <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
            />
            <Page pageCurrent={currentPage}
                  changPage={changPage}
                  totalPage={totalPage}
                  totalRecord={totalRecord}
                  refresh={refreshFind}
            />
        </div>
    )
}
export default inject('repositoryStore')(observer(UserGroupList))
