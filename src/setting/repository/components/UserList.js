/**
 * @name: UserList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：用户列表
 * @update: 2023-8-30 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Table} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listicon from "../../../common/list/Listicon";
import XcodeUserStore from "../store/XcodeUserStore";
import {observer} from "mobx-react";
import "./UserList.scss"
import Profile from "../../../common/profile/Profile";
import UserIcon from "../../../common/list/UserIcon";
const UserList = (props) => {

    const {findUserAndRpy,xcodeUserList}=XcodeUserStore


    useEffect( ()=>{

        findUserAndRpy()

    },[])

    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='user-list-tables-name' onClick={()=>goRpyList(record.userId)}>
                        <UserIcon text={text} size={"middle"}/>
                        <div className='name-text-title'>
                            {text}
                        </div>
                        {
                            text==='admin' &&
                            <div style={{paddingLeft:10}}>
                                <div className='user-tag'>{ "管理员"}</div>
                            </div>

                        }
                    </div>
                )
            }
        },
        {
            title: '仓库',
            dataIndex: 'repositoryNum',
            key: 'repositoryNum',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>{
                return(
                    <div onClick={()=>goRpyList(record.userId)}>{text}</div>
                )
            }
        },
    ]

    const goRpyList = (userId) => {
        props.history.push(`/setting/power/repository/${userId}`)

    }

    return(
        <div className='user-list'>
            <div className='xcode-setting-with xcode'>
                <BreadcrumbContent firstItem={'用户仓库'}/>

                <div className='user-list-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={xcodeUserList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无推送的仓库'}/>}}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(UserList)
