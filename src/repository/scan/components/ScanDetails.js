
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
import {Table} from "antd";
import ScanReqList from "./ScanReqList";
import ScanRecordStore from "../store/ScanRecordStore";
import ScanPlayStore from "../store/ScanPlayStore";
import ScanLogDrawer from "./ScanLogDrawer";
const ScanDetails = (props) => {
    const {match:{params}} = props;

    const {findScanRecord}=ScanRecordStore
    const {findScanPlay}=ScanPlayStore
    const [scanPlay,setScanPlay]=useState(null)
    // 日志滚动条
    const [isActiveSlide,setIsActiveSlide] = useState(true);

    const [scanRecord,setScanRecord]=useState([])

    useEffect(async () => {
        findScanRecord(params?.recordId).then(res=>{
            if (res.code===0){
                setScanRecord(res.data)

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
        return    scanRecord&&scanRecord.execLog || '暂无日志'
    }


    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='scanDetails xcode-repository-width  xcode'>
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
                    <div className='scanDetails-fail'>
                        <div>运行状态：</div>
                        <div className='fail-result'>失败</div>
                    </div>
                    <div className='fail-log-style'>
                        <div className='fail-log'>扫描日志</div>
                        <div className="scan-log-bottom">
                            <div className='scan-detail-log'
                                 id='data-import'
                                 onWheel={()=>setIsActiveSlide(false)}>
                                { renderPressLog() }
                            </div>

                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}
export default ScanDetails
