
/**
 * @name: ScanDetails
 * @author: limingliang
 * @date: 2023-11-07 14:30
 * @description：扫描详情
 * @update: 2023-11-07 14:30
 */

import React,{useState,useEffect,Fragment} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./ScanDetails.scss"
import ScanSurvey from "./ScanSurvey";
import {Col, Table} from "antd";
import ScanReqList from "./ScanReqList";
import ScanRecordStore from "../store/ScanRecordStore";
import ScanPlayStore from "../store/ScanPlayStore";
import ScanLogDrawer from "./ScanLogDrawer";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
const ScanDetails = (props) => {
    const {match:{params}} = props;

    const {findScanRecord}=ScanRecordStore
    const {findScanPlay}=ScanPlayStore
    const [scanPlay,setScanPlay]=useState(null)
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);

    const [scanRecord,setScanRecord]=useState(null)
    const [logVisible,setLogVisible]=useState(false)  //日志抽屉状态

    const [sliceLog,setSliceLog]=useState(null)

    useEffect(async () => {
        findScanRecord(params?.recordId).then(res=>{
            if (res.code===0){
                setScanRecord(res.data)
                if (res.data){
                    const startIndex =  res.data.execLog.length-300
                    const slicedString = res.data.execLog.slice(startIndex);
                    setSliceLog(slicedString)
                }

                findScanPlay(res.data.scanPlayId).then(res=>{
                    setScanPlay(res.data)
                })
            }
        })

    }, []);




    //日志
    const renderPressLog = () => {
        const dataImport=document.getElementById("data-import")
        if(dataImport && isActiveSlide){
            dataImport.scrollTop = dataImport.scrollHeight
        }
        return    sliceLog&&sliceLog || '暂无日志'
    }


    const goBack = () => {
        props.history.go(-1)
    }

    //打开扫描日志
    const openLog = () => {
        setLogVisible(true)
    }

    return(
        <div className='xcode page-width scanDetails   '>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={`扫描报告`} secondItem={scanRecord?.scanObject?.substring(0,8)} goBack={goBack}/>
                {
                    scanRecord?.scanResult==='success'&&
                    <Fragment>
                        <div className='scanDetails-border'>
                            <div className='scanDetails-rpy-border'>
                                <div className='scanDetails-rpy-desc'>检测结果</div>
                                <div className='scanDetails-rpy-num relyOn-num'>{"通过"}</div>
                            </div>
                            <div className='scanDetails-hole-border'>
                                <div className='scanDetails-hold-style'>
                                    <div className='scanDetails-hole-desc'>严重问题</div>
                                    <div className='scanDetails-hole-num scanDetails-hole-red'>{scanRecord?.severityTrouble}</div>
                                    <div className='scanDetails-access'>门禁阈值0</div>
                                </div>
                                <div className='scanDetails-hold-style'>
                                    <div className='scanDetails-hole-desc'>警告问题</div>
                                    <div className='scanDetails-hole-num scanDetails-hole-dired'>{scanRecord?.noticeTrouble}</div>
                                    <div className='scanDetails-access'>门禁阈值0</div>
                                </div>
                                <div className='scanDetails-hold-style'>
                                    <div className='scanDetails-hole-desc'>提示问题</div>
                                    <div className='scanDetails-hole-num scanDetails-hole-blue'>{scanRecord?.suggestTrouble}</div>
                                    <div className='scanDetails-access'>门禁阈值0</div>
                                </div>
                            </div>
                        </div>
                        <div className='scanDetails-table'>
                            <div className='scanDetails-table-title'>问题列表</div>
                            <div className='scanDetails-table-de'>
                                <ScanReqList scanPlay={scanPlay} scanRecord={scanRecord} />
                            </div>
                        </div>
                    </Fragment>||
                    (scanRecord?.scanResult==='fail'||scanRecord?.scanResult==='run')&&
                    <Fragment>
                        <div >
                            <div className='scanDetails-result'>
                                <CheckCircleOutlined className='success-result' />
                                <div >初始化任务</div>
                            </div>
                            <div className='scanDetails-result-desc'>初始化时间: {scanRecord.createTime}</div>
                        </div>

                        <div className='scanDetails-result '>
                            <CloseCircleOutlined className='fail-result'/>
                            <div>工具执行</div>
                        </div>
                        <div className='fail-log-style'>
                            <div className="scan-log-bottom">
                                <div className='scan-detail-log'>
                                    <div className='bottom-log-had'>
                                        <div className='bottom-log-had-text'>错误信息</div>
                                        <div className='bottom-log-had-text1' onClick={openLog}>详细日志</div>
                                    </div>
                                    { renderPressLog() }
                                </div>
                            </div>
                        </div>

                        {/*<div className='fail-log-style'>
                        <div className='fail-log'>扫描日志</div>
                        <div className="scan-log-bottom">
                            <div className='scan-detail-log'
                                 id='data-import'
                                 onWheel={()=>setIsActiveSlide(false)}>
                                { renderPressLog() }
                            </div>

                        </div>
                    </div>*/}
                        <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={scanRecord}/>
                    </Fragment>
                }
            </Col>
        </div>
    )
}
export default ScanDetails
