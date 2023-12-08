/**
 * @name: ServerDeploy
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：服务配置
 * @update: 2023-05-22 14:30
 */

import React, {useState,useEffect} from "react";
import "./EnvDeploy.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import "./ServerDeploy.scss"
import ServerDeployAddOrUpdate from "./ServerDeployAddOrUpdate";
import deployStore from "../store/DeployStore"
const ServerDeploy = (props) => {
    const {createDeployServer,findDeployServerList,deployServerList,fresh,deleteDeployServer} = deployStore

    const [addVisible,setAddVisible] = useState(false)

    useEffect(()=>{
        findDeployServerList();
    },[fresh])

    const columns = [
        {
            title: '名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'serverName',
            key: 'serverName',
            width:'10%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'serverAddress',
            key: 'serverAddress',
            width:'40%',
            ellipsis:true,
        },
        {
            title: '认证类型',
            dataIndex: 'authType',
            key: 'authType',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '权限',
            dataIndex: 'serverAuth',
            key: 'serverAuth',
            width:'10%',
            ellipsis:true,
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=>(
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>delAuth(record)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
        }
    ]


    const delAuth = (record) => {
        deleteDeployServer(record.id)
    }
    return(
        <div className='server-deploy'>
            <div className='xcode-repository-width xcode'>
                <div className='server-deploy-up'>
                    <BreadcrumbContent firstItem={'server_deploy'}/>
                    <Btn
                        type={'primary'}
                        title={'添加配置'}
                        icon={<PlusOutlined/>}
                        onClick={()=> setAddVisible(true)}
                    />
                </div>
                <div className='server-deploy-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={deployServerList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无配置'}/>}}
                    />
                </div>

                <ServerDeployAddOrUpdate
                    addVisible={addVisible}
                    setAddVisible={setAddVisible}
                    createDeployServer={createDeployServer}
                />
            </div>
        </div>
    )
}

export default observer(ServerDeploy)
