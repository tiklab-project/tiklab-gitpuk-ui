/**
 * 仓库的密钥
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../../common/btn/Btn';
import AccessKeysAdd from './AccessKeysAdd';
import EmptyText from '../../../../common/emptyText/EmptyText';
import './AccessKeys.scss';
import {Col, Table} from "antd";
import authStore from "../../../../setting/auth/store/AuthStore";

import {getUser} from "thoughtware-core-ui";
import DeleteExec from "../../../../common/delete/DeleteExec";
import {inject, observer} from "mobx-react";
import Tabs from "../../../../common/tabs/Tabs";


const AccessKeys = props => {

    const {repositoryStore} = props
    const {repositoryInfo} = repositoryStore

    const [authType,setAuthType] = useState("invoke")

    const [addVisible,setAddVisible] = useState(false)
    const {createAuth,deleteAuth,findAuthSshList,keysList,fresh}=authStore


    useEffect(()=>{
        if (repositoryInfo){
            // 初始化密钥
            findAuthSshList({rpyId:repositoryInfo.rpyId})
        }
    },[fresh])

    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width:'15%',
            ellipsis:true,
            render:(text,record) => (
                <span className='sys-keys-table-title' onClick={()=>goAuthDetails(record)}>{text}</span>
            )
        },
        {
            title: '上次使用',
            dataIndex: 'userTime',
            key: 'userTime',
            width:'15%',
            ellipsis:true,
            render:text => text ? text:'暂无使用'
        },
        {
            title: '公钥',
            dataIndex: 'value',
            key: 'value',
            width:'60%',
            ellipsis:true,
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            render:(text,record)=>(
                <DeleteExec value={record} deleteData={deleteAuth} title={"确认删除"}/>
            )
        }
    ]

    //跳转认证详情
    const goAuthDetails = () => {

    }

    //切换table
    const clickTable = (value) => {
        setAuthType(value.id)
    }


    return (
        <div className='keys'>
            <div className='keys-content gittok-width xcode'>
                <Col
                    sm={{ span: "24" }}
                    md={{ span: "24" }}
                    lg={{ span: "24" }}
                    xl={{ span: "20", offset: "2" }}
                    xxl={{ span: "18", offset: "3" }}
                >
                    <div className='keys-up'>
                        <BreadcrumbContent firstItem={'Access_keys'}/>
                        <Btn
                            type={'primary'}
                            title={'新建公钥'}
                            icon={<PlusOutlined/>}
                            onClick={()=>setAddVisible(true)}
                        />

                    </div>
                    <div className='keys-illustrate'>
                        <div>
                            部署公钥允许以只读的方式访问仓库，主要用于仓库在生产服务器的部署上，
                            免去HTTP方式每次操作都要输入密码和普通SSH方式担心不小心修改仓库代码的麻烦。
                        </div>
                        <div>
                            部署公钥配置后的机器，只支持clone与pull等只读操作。
                            如果您想要对仓库进行写操作，请添加个人公钥
                        </div>
                    </div>
                    <div className='keys-status'>
                        <Tabs
                            type={authType}
                            tabLis={[
                                {id:"invoke", title:'已启用公钥'},
                                {id:"no", title:'可部署公钥'},
                            ]}
                            onClick={clickTable}
                        />

                        <Table
                            bordered={false}
                            columns={columns}
                            dataSource={keysList}
                            rowKey={record=>record.id}
                            pagination={false}
                            locale={{emptyText: <EmptyText title={'暂无公钥'}/>}}
                        />
                    </div>
                </Col>
            </div>
            <AccessKeysAdd
                addVisible={addVisible}
                setAddVisible={setAddVisible}
                createAuth={createAuth}
                rpyId={repositoryInfo.rpyId}
            />
        </div>
    )
}
export default inject('repositoryStore')(observer(AccessKeys))
