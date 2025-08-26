/**
 * @Description: 系统集成
 * @Author: limingliang
 * @Date: 2025/3/20
 * @LastEditors: limingliang
 * @LastEditTime: 2025/3/20
 */
import React, {useEffect, useState} from "react";
import {Col, Form, Input, Modal, Row, Select} from "antd";
import "./SystemInt.scss";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined, EditOutlined,
    ExclamationCircleOutlined,
    FormOutlined, RedoOutlined,
    RightOutlined
} from "@ant-design/icons";
import {getUser, productImg} from "tiklab-core-ui";
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import RedactSystemInt from "./RedactSystemInt";
import SystemIntStore from "../store/SystemIntStore";
import {observer} from "mobx-react";
import {SpinLoading} from "../../../../common/loading/Loading";
import {Validation} from "../../../../common/client/Client";
import RepositoryPower from "../../../../repository/repository/components/RepositoryPower";
import Btn from "../../../../common/btn/Btn";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";

const { confirm } = Modal;
const SystemInt = (props) => {

    const {findAllIntegrationAddress,deleteIntegrationAddress,fresh}=SystemIntStore

    const [code,setCode]=useState();
    const [integrationAddressList,setIntegrationAddressList]=useState([])
    const [integrationAddress,setIntegrationAddress]=useState(null)

    const [systemNav,setSystemNav]=useState(null)

    const [integration,setIntegration]=useState()

    const [visible,setVisible]=useState(false)
    const [title,setTitle]=useState("")



    useEffect(()=>{
        findAllIntegrationAddress().then(res=>{
            if (res.code===0){
                setIntegrationAddressList(res.data)
                addAddress(res.data)
            }

        })
    },[fresh])



    const addAddress = (integrationAddressList) => {
        if (integrationAddressList.length){
            const addressList=integrationAddressList.filter(item=>item.code===code)
            if (addressList.length){
                setIntegrationAddress(addressList[0])
            }else {
                setIntegrationAddress(null)
            }
        }
    }


    const openSystemNav = (value) =>{
        setCode(value)

        if (integrationAddressList.length){
            const addressList=integrationAddressList.filter(item=>item.code===value)
            if (addressList.length){
                setIntegrationAddress(addressList[0])
            }else {
                setIntegrationAddress(null)
            }
        }


        if (value===systemNav){
            setSystemNav(null)
        }else {
            setSystemNav(value)
        }
    }


    //打开编辑弹窗
    const openRedactVisible = (type) => {
      setVisible(true)
        if (type==='add'){
            setTitle("添加地址")
            setIntegration(null)
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

    const typeList = [
        {
            key:'SourceFare',
            code:'sourcefare',
            desc: '集成Arbess产品',
        },
        {
            key:'Arbess',
            code: 'arbess',
            desc: '集成Arbess产品',
        }
    ]
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
                    {
                        typeList.map((item,index)=>{
                            return(
                               <div key={item.key} className={`${index===0?"integration-system-bottom":" "}`}>
                                   <div className="integration-system-li" onClick={()=>openSystemNav(item.code)}>
                                       <div className="system-li-icon">
                                           <AppstoreOutlined />
                                       </div>
                                       <div className="system-li-center">
                                           <div className="system-li-title">{item.key}</div>
                                           <div className="system-li-desc">{item.desc}</div>
                                       </div>
                                       <div className="system-li-down">
                                           {
                                               systemNav===item.code?<DownOutlined />: <RightOutlined />
                                           }
                                       </div>
                                   </div>
                                   {
                                       systemNav===item.code&&
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
                                                  </> :
                                                   <div className='system-body-details-icon' onClick={()=>openRedactVisible("add")}>
                                                       添加地址
                                                   </div>
                                               }
                                           </div>
                                       </div>
                                   }
                               </div>
                            )
                        })


                    }

                  {/*  <div className='integration-system-bottom'>
                        <div className="integration-system-li" onClick={()=>openSystemNav("arbess")}>
                            <div className="system-li-icon">
                                <AppstoreOutlined />
                            </div>
                            <div className="system-li-center">
                                <div className="system-li-title">Arbess</div>
                                <div className="system-li-desc">集成Arbess产品</div>
                            </div>
                            <div className="system-li-down">
                                {
                                    systemNav==='arbess'?<DownOutlined />: <RightOutlined />
                                }
                            </div>
                        </div>
                        {
                            systemNav==='arbess'&&
                            <div className='integration-system-body'>
                                <div className={`system-body-details ${integrationAddress?' details-update':' details-add'}`}>
                                    {  integrationAddress?
                                        integrationDate() :
                                        <div className='system-body-details-icon' onClick={()=>openRedactVisible("add")}>
                                            添加地址
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <div className="integration-system-li" onClick={()=>openSystemNav("sourcewair")}>
                            <div className="system-li-icon">
                                <AppstoreOutlined />
                            </div>
                            <div className="system-li-center">
                                <div className="system-li-title">SourceWair</div>
                                <div className="system-li-desc">集成SourceWair产品</div>
                            </div>
                            <div className="system-li-down">
                                {
                                    systemNav==='sourcewair'?<DownOutlined />: <RightOutlined />
                                }
                            </div>
                        </div>
                        {
                            systemNav==='sourcewair'&&
                            <div className='integration-system-body'>
                                <div className={`system-body-details ${integrationAddress?' details-update':' details-add'}`}>
                                    {  integrationAddress?
                                        integrationDate() :
                                        <div className='system-body-details-icon' onClick={()=>openRedactVisible("add")}>
                                            添加地址
                                        </div>
                                    }

                                </div>
                            </div>
                        }
                    </div>*/}
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
