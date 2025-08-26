
/**
 * @Description: 流水线
 * @Author: limingliang
 * @Date: 2025/4/2
 * @LastEditors: limingliang
 * @LastEditTime: 2025/4/2
 */
import React,{useEffect,useState} from 'react';
import IntegrateInStore from "../store/IntegrateInStore";
import {Col, Space, Spin, Table} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import Page from "../../../common/page/Page";
import ScanPlayPop from "./ScanPlayPop";
import {inject, observer} from "mobx-react";
import UserIcon from "../../../common/list/UserIcon";
import DeleteExec from "../../../common/delete/DeleteExec";
import "./ScanPlayList.scss"
import SystemIntStore from "../../../setting/integration/systemInt/store/SystemIntStore";
import {findIntPath} from "../pipeline/components/Commonet";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import orderEmpty from "../../../assets/images/img/orderEmpty.png";
const ScanPlayList = (props) => {
    const {repositoryStore,match} = props
    const {fresh,findIntRelevancyList,findRelevanceScanPlay,deleteIntRelevancy}=IntegrateInStore
    const {repositoryInfo} = repositoryStore
    const {findIntegrationInfo,integrationAddress}=SystemIntStore

    const [intRelevancy,setIntRelevancy]=useState([])
    const [addVisible,setAddVisible]=useState(false)
    const [findState,setFindState]=useState(false)

    //关联的扫描计划的ids
    const [relevancyIds,setRelevancyIds]=useState([])
    const [scanPlayList,setScanPlayList]=useState([])

    useEffect(()=>{
        findIntegrationInfo("sourcefare").then(res=>{
            if (res.code===0){
                setFindState(true)
                intRelevancys(res.data)
            }
        })
    },[fresh])


    //查询关联扫描计划的list
    const intRelevancys =  (data) => {
        findIntRelevancyList({
            repositoryId:repositoryInfo.rpyId,
            type:"scan"
        }).then(res=>{
            if (res.code===0){
                setIntRelevancy(res.data)
                if(res.data.length>0){
                    const relevancyIds = res.data.map(item => item.relevancyId);
                    setRelevancyIds(relevancyIds)
                    findRelevanceScanPlay({
                        relevancyIdS:relevancyIds,
                        address:data.integrationAddress
                    }).then(res=>{
                        res.code===0&&setScanPlayList(res.data)
                    })
                }
            }
            setFindState(false)
        })
    }

    //跳转goSourceFare
    const goSourceFare = (value) => {
        const intPath=findIntPath(integrationAddress.integrationAddress)
        window.open(`${intPath}/#/project/${value.projectId}/codeScan/${value.id}`)
    }

    //打开弹窗
    const openPop = () => {
        setAddVisible(true)
    }


    const columns = [
        {
            title: "流水线名称",
            dataIndex: "playName",
            key: "playName",
            width:"30%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span className='pipelineTable-name' onClick={()=>goSourceFare(record)}>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title: "仓库名字",
            dataIndex: "repositoryName",
            key: "repositoryName",
            width:"20%",
            ellipsis:true,
        },

        {
            title: '最后一次扫描',
            dataIndex: 'scanTime',
            width:'30%',
            render:(text,record)=>{
                return(
                    <div>
                        {
                            record?.scanTime?
                                <div className='last-scan'>
                                    <div className='last-scan-text'>{record.scanTime}</div>
                                    <div className='last-scan-style'>
                                        {
                                            record?.scanResult==='success'&& <img  src={success}  style={{width:16,height:16}}/>||
                                            record?.scanResult==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                                        }

                                    </div>
                                </div>:
                                <div className='last-scan-text'>未扫描</div>
                        }
                    </div>

                )
            }
        },
        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <DeleteExec value={record} repositoryId={repositoryInfo.rpyId}
                                deleteData={deleteIntRelevancy}
                                type={"pipeline"}
                                title={"确认移除"}
                    />
                )
            }
        },
    ]

    return(
        <div className='xcode page-width scan-play'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div>
                    <div className='scan-play-head'>
                        <BreadcrumbContent firstItem={'代码扫描'}/>
                        {
                            intRelevancy.length>0&&
                            <Btn type={'primary'} title={'关联扫描计划'} onClick={openPop} />
                        }
                    </div>

                    {
                        intRelevancy.length>0?
                            <div className='scan-play-tab'>
                                <Spin spinning={findState}>
                                    <Table
                                        bordered={false}
                                        columns={columns}
                                        dataSource={scanPlayList}
                                        rowKey={record=>record.id}
                                        pagination={false}
                                    />
                                </Spin>
                            </div>:

                            <div className='scan-play-content'>
                                <div className='scan-play-content-details'>
                                    <img  src={orderEmpty} className='scan-play-content-img'/>
                                    <div className='scan-play-content-title'>集成SourceFare</div>
                                    <div>集成SourceFare代码扫描计划,有效方便的对代码进行扫描,管理该代码的扫描计划</div>
                                    <div className='scan-play-add-btn' onClick={openPop}>
                                        <Btn type={'primary'} title={'关联扫描计划'}/>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </Col>

            <ScanPlayPop {...props} visible={addVisible}
                         setVisible={setAddVisible}
                         integrationAddress={integrationAddress}
                         repositoryId={repositoryInfo.rpyId}
                         relevancyIds={relevancyIds}
            />
        </div>
    )

}
export default inject('repositoryStore')(observer(ScanPlayList))
