/**
 * @name: EnvDeploy
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：环境配置
 * @update: 2023-05-22 14:30
 */
import React, {useState,useEffect} from "react";
import "./EnvDeploy.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import EnvDeployAddOrUpdate from "./EnvDeployAddOrUpdate";
import {inject, observer} from "mobx-react";
import {Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import deployStore from "../store/DeployStore"
const EnvDeploy = (props) => {
    const {createDeployEnv,deployEnvList,findDeployEnvList,fresh,deleteDeployEnv} = deployStore

    const [addVisible,setAddVisible] = useState(false)

    useEffect(()=>{
        findDeployEnvList();
    },[fresh])

    const columns = [
        {
            title: '名称',
            dataIndex: 'envName',
            key: 'envName',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'envType',
            key: 'envType',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'envAddress',
            key: 'envAddress',
            width:'60%',
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
    //删除环境配置
    const delAuth = (record) => {
        deleteDeployEnv(record.id)
    }
    return(
        <div className='dev-deploy'>
            <div className='xcode-home-limited xcode'>
                <div className='dev-deploy-up'>
                    <BreadcrumbContent firstItem={'env_deploy'}/>
                    <Btn
                        type={'primary'}
                        title={'添加配置'}
                        icon={<PlusOutlined/>}
                        onClick={()=> setAddVisible(true)}
                    />
                </div>
                <div className='dev-deploy-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={deployEnvList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无配置'}/>}}
                    />
                </div>

                <EnvDeployAddOrUpdate
                    addVisible={addVisible}
                    setAddVisible={setAddVisible}
                    createDeployEnv={createDeployEnv}
                />
            </div>
        </div>
    )
}
export default EnvDeploy
