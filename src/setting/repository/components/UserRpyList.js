/**
 * @name: UserRpyList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：用户的仓库列表
 * @update: 2023-8-30 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Button, Space, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listicon from "../../../common/list/Listicon";
import {CloseCircleOutlined, LockOutlined, SettingOutlined, StopOutlined, UnlockOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import "./UserRpyList.scss"
import {getUser} from "thoughtware-core-ui";
import {SpinLoading} from "../../../common/loading/Loading";
import Page from "../../../common/page/Page";
import XcodeUserStore from "../store/XcodeUserStore";
const UserRpyList = (props) => {
    const {repositoryStore,match:{params}} = props

    const {findPrivateRepositoryByUser} = repositoryStore
    const {deleteDmUser,findDmUserList}=XcodeUserStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    const [isLoading,setIsLoading]=useState(false)
    const [repositoryList,setRepositoryList]=useState([])


    useEffect(async ()=>{
        await findRpyPage(1)
    },[])


    const findRpyPage =async (currentPage) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:15
            },
            userId:params.userId,
        }
        setIsLoading(true)
        const res=await findPrivateRepositoryByUser(param)
        setIsLoading(false)
        if (res.code===0){
            setRepositoryList(res.data?.dataList)
            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
        }
    }


    const columns = [
        {
            title: '仓库名称',
            dataIndex: 'name',
            key: 'name',
            width:'50%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='user-rpy-table-name' onClick={()=>goDetails(text,record)}>
                        <Listicon text={text}/>
                        <div className='name-text'>
                            <div className='name-text-title'>
                                <span className='name-text-name'>{ record?.address.substring(0, record?.address.indexOf("/",1))+"/"+record.name}</span>
                                <span className='name-text-lock'>{record.rules==='private'?<LockOutlined/>:<UnlockOutlined />}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        },

        {
            title: '更新',
            dataIndex: 'updateTime',
            key: 'updateTime',
            width:'20%',
            ellipsis:true,
            render:text => text?text:'暂无更新'
        },
        {
            title: '权限',
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
                    <Space>
                        {
                            params.userId==="111111"?
                                <Tooltip title='不能移除管理员的项目'>
                                    <StopOutlined />
                                </Tooltip>:
                                <Tooltip title='移除'>
                                    <span className='user-rpy-set' onClick={()=>deleteUsrRpy(record)} >
                                        <CloseCircleOutlined  className='actions-se' />
                                    </span>
                                </Tooltip>
                        }
                    </Space>
                )
            }
        },
    ]


    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (text,record) => {
        props.history.push(`/repository/${record.address}/tree`)
    }

    const goBack = () => {
        props.history.go(-1)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        await findRpyPage(value)
    }

    //用户用权限仓库
    const deleteUsrRpy =async (value) => {
    const res =await findDmUserList({domainId:value.rpyId,userId:params.userId})
         if(res.code===0){
              deleteDmUser(res.data[0].id).then(item=>{

                  item.code===0&&findRpyPage(1)
              })
         }

    }
    return(
        <div className='user-rpy'>
            <div className='xcode-setting-with xcode'>
                <BreadcrumbContent firstItem={'用户'} secondItem={'仓库'} goBack={goBack}/>
                <div className='user-rpy-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={repositoryList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: isLoading ?
                                <SpinLoading type="table"/>: <EmptyText title={"没有仓库"}/>}}
                    />
                    {
                        (totalPage>1)?
                            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>:null
                    }
                </div>
            </div>
        </div>
    )
}
export default inject('repositoryStore')(observer(UserRpyList))
