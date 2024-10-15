/**
 * @name: UserRpyList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：用户的仓库列表
 * @update: 2023-8-30 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Button, Col, Dropdown, Menu, Space, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listicon from "../../../common/list/Listicon";
import {
    CloseCircleOutlined,
    EllipsisOutlined,
    LockOutlined,
    SettingOutlined,
    StopOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import "./UserRpyList.scss"
import {getUser} from "tiklab-core-ui";
import {SpinLoading} from "../../../common/loading/Loading";
import Page from "../../../common/page/Page";
import XcodeUserStore from "../store/XcodeUserStore";
import SearchInput from "../../../common/input/SearchInput";
import groupStore from "../../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore";
import UserGroupList from "./UserGroupList";
const UserRpyList = (props) => {
    const {repositoryStore,match:{params}} = props

    const {findPrivateRepositoryByUser} = repositoryStore
    const {deleteDmUser,findDmUserList,findNumByUser}=XcodeUserStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [isLoading,setIsLoading]=useState(false)
    const [repositoryList,setRepositoryList]=useState([])
    const [repositoryName,setRepositoryName]=useState()

    const [tabType,setTabType]=useState("repo")
    const [num,setNum]=useState(null)


    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='user-rpy-table-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}
                                  type={"common"}
                        />
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <div className='name-text-name'>{ record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}</div>
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
        await findRpyPage(1)

        findNumByUser({userId:params.userId}).then(res=>{
            if (res.code===0){
                setNum(res.data)
            }
        })
    },[])

    //查询用户仓库
    const findRpyPage =async (currentPage,repositoryName) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:10
            },
            userId:params.userId,
            name:repositoryName
        }
        setIsLoading(true)
        const res=await findPrivateRepositoryByUser(param)
        setIsLoading(false)
        if (res.code===0){
            setRepositoryList(res.data?.dataList)

            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
            setTotalRecord(res.data.totalRecord)
        }
    }


    //查询用户仓库组


    const cuteTab = (value) => {
      setTabType(value)

        if (value==='repo'){
            findRpyPage(1)
        }
    }
    /**
     * 操作下拉
     */
    const execPullDown=(value) => (
        <Menu>
            { params.userId==="111111"?
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
        await findRpyPage(value,repositoryName)
    }

    //刷新查询
    const refreshFind = () => {
        findRpyPage(currentPage,repositoryName)
    }

    //用户用权限仓库
    const deleteUsrRpy =async (value) => {
    const res =await findDmUserList({domainId:value.rpyId,userId:params.userId})
         if(res.code===0){
              deleteDmUser(res.data[0].id).then(item=>{

                  item.code===0&&findRpyPage(currentPage,repositoryName)
              })
         }
    }


    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {
        findRpyPage(1,repositoryName)
    }

    const onChangeSearch = (e) => {
        const value=e.target.value
        setRepositoryName(value)
        if (value===''){
            findRpyPage(1)
        }
    }

    return(
        <div className='xcode page-width user-rpy'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "22", offset: "1" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={'成员权限'} secondItem={'仓库'} goBack={goBack}/>

                <div className='user-rpy-tab'>
                        <div className={`user-rpy-tab-nav ${tabType==='repo'&&" choose-rpy-tab-nav"}`} onClick={()=>cuteTab("repo")}>
                            仓库
                            <span className='tab-nav-size'>{num?.repositoryNum}</span>
                        </div>
                    <div className={`user-rpy-tab-nav ${tabType==='group'&&" choose-rpy-tab-nav"}`} onClick={()=>cuteTab("group")}>
                        仓库组
                        <span className='tab-nav-size'>{num?.groupNum}</span>
                    </div>
                </div>

                {
                    tabType==='repo'?
                        <>
                            <div className='user-rpy-search'>
                                <SearchInput {...props}
                                             placeholder={"搜索仓库"}
                                             onChange={onChangeSearch}
                                             onPressEnter={onSearch}
                                />
                            </div>
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={repositoryList}
                                rowKey={record=>record.id}
                                pagination={false}
                                className='user-rpy-table'
                                locale={{emptyText: isLoading ?
                                        <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
                            />
                            <Page pageCurrent={currentPage}
                                  changPage={changPage}
                                  totalPage={totalPage}
                                  totalRecord={totalRecord}
                                  refresh={refreshFind}

                            />
                        </>:
                        <UserGroupList {...props}
                                       userId={params.userId}
                        />
                }


            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(UserRpyList))
