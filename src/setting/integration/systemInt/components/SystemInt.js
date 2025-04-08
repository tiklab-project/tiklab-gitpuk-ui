/**
 * @Description: 系统集成
 * @Author: limingliang
 * @Date: 2025/3/20
 * @LastEditors: limingliang
 * @LastEditTime: 2025/3/20
 */
import React, {useEffect, useState} from "react";
import {Col, Modal, Row} from "antd";
import "./SystemInt.scss";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    ExclamationCircleOutlined,
    FormOutlined,
    RightOutlined
} from "@ant-design/icons";
import {getUser, productImg} from "tiklab-core-ui";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import RedactSystemInt from "./RedactSystemInt";
import SystemIntStore from "../store/SystemIntStore";
import {observer} from "mobx-react";

const { confirm } = Modal;
const SystemInt = (props) => {

    const {findIntegrationAddress,integrationAddress,deleteIntegrationAddress,fresh}=SystemIntStore

    const [code,setCode]=useState();
    const [systemNav,setSystemNav]=useState(false)
    const [integration,setIntegration]=useState()

    const [visible,setVisible]=useState(false)
    const [title,setTitle]=useState("")



    useEffect(()=>{
        if (code){
            findIntegrationAddress(code)
        }
    },[fresh,code])


    const openSystemNav = (value) =>{
        setCode(value)
        setSystemNav(!systemNav)
    }


    //打开编辑弹窗
    const openRedactVisible = (type) => {
      setVisible(true)
        if (type==='add'){
            setTitle("添加地址")
        }else {
            setIntegration(integrationAddress)
            setTitle("编辑地址")
        }
    }

    //删除弹窗
    const  DeletePop = (id) =>{
        confirm({
            title: "确认删除",
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteIntegrationAddress(id)
            },
            onCancel() {
            },
        });
    }

    return (
        <Row className='xcode page-width integration-system'>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "18", offset: "2" }}
                xl={{ span: "16", offset: "3" }}
                xxl={{ span: "14", offset: "4" }}
            >
                <BreadcrumbContent firstItem={"系统集成"}/>
                <div className="integration-system-ul">
                    <div className="integration-system-li" onClick={()=>openSystemNav("arbess")}>
                        <div className="system-li-icon">
                            <AppstoreOutlined />
                        </div>
                        <div className="system-li-center">
                            <div className="system-li-title">Arbess服务集成</div>
                            <div className="system-li-desc">集成Arbess产品</div>
                        </div>
                        <div className="system-li-down">
                            {
                                systemNav?<DownOutlined />: <RightOutlined />
                            }
                        </div>
                    </div>
                    {
                        systemNav&&
                        <div className='integration-system-body'>
                            <div className={`system-body-details ${integrationAddress?' details-update':' details-add'}`}>
                                {  integrationAddress?
                                    <>
                                        <div className='system-body-details-text'>
                                            <div>服务地址</div>
                                            <div>{integrationAddress?.integrationAddress}</div>
                                        </div>
                                        <div className='system-body-details-icon'>
                                            <FormOutlined style={{cursor:"pointer"}} onClick={()=>openRedactVisible("edit")} />
                                            <DeleteOutlined style={{cursor:"pointer"}} onClick={()=>DeletePop(integrationAddress?.id)}/>
                                        </div>
                                    </>:
                                    <div className='system-body-details-icon' onClick={()=>openRedactVisible("add")}>
                                        添加地址
                                    </div>
                                }

                            </div>
                        </div>
                    }
                </div>
            </Col>
            <RedactSystemInt visible={visible}
                             setVisible={setVisible}
                             title={title}
                             code={code}
                             integration={integration}
                             setIntegration={setIntegration}
            />
        </Row>
    )
}

export default observer(SystemInt)
