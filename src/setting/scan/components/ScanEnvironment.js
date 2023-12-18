/**
 * @name: EnvDeploy
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：扫描环境
 * @update: 2023-05-22 14:30
 */
import React, {useState,useEffect} from "react";
import "./EnvExec.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

import {inject, observer} from "mobx-react";
import {Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import ScanEnvironmentEditPop from "./ScanEnvironmentEditPop";
import scanEnvStore from "../store/ScanEnvStore";
import deployStore from "../store/DeployStore";

const ScanEnvironment = (props) => {
    const {deployEnvList,findDeployEnvList,deleteDeployEnv,deleteDeployServer,findDeployServerList,deployServerList,fresh} = scanEnvStore
    const {deployFresh} = deployStore

    const [addVisible,setAddVisible] = useState(false)
    const [tab,setTab]=useState('maven')

    useEffect(()=>{

        findDeployEnvList();
        findDeployServerList("sonar")
    },[fresh,deployFresh])

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
                        onConfirm={()=>deleteDeployEnv(record.id)}
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

    const deployServerColumns =[
        {
            title: '名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'serverName',
            key: 'serverName',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'serverAddress',
            key: 'serverAddress',
            width:'30%',
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
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            render:(text,record)=>(
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>deleteDeployServer(record.id)}
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

    const setTableType = (value) => {
        setTab(value)
    }
    return(
        <div className='dev-deploy'>
            <div className='xcode-setting-with xcode'>
                <div className='dev-deploy-up'>
                    <BreadcrumbContent firstItem={'扫描环境'}/>
                    <Btn
                        type={'primary'}
                        title={'添加配置'}
                      /*  icon={<PlusOutlined/>}*/
                        onClick={()=> setAddVisible(true)}
                    />
                </div>
                <div className='tab-style'>
                    <div className={`${tab==='maven'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("maven")}>maven</div>
                    <div className={`${tab==='sonar'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("sonar")}>Sonar</div>
                </div>
                <div className='dev-deploy-table'>
                    {
                        tab==='maven'?
                            <Table
                                bordered={false}
                                columns={columns}
                                dataSource={deployEnvList}
                                rowKey={record=>record.id}
                                pagination={false}
                                locale={{emptyText: <EmptyText title={'暂无配置'}/>}}
                            />:
                            <Table
                                bordered={false}
                                columns={deployServerColumns}
                                dataSource={deployServerList}
                                rowKey={record=>record.id}
                                pagination={false}
                                locale={{emptyText: <EmptyText title={'暂无配置'}/>}}
                            />
                    }

                </div>
                <ScanEnvironmentEditPop addVisible={addVisible} setAddVisible={setAddVisible}/>
            </div>
        </div>
    )
}
export default observer(ScanEnvironment)
