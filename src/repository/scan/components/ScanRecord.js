/**
 * @name: ScanDetails
 * @author: limingliang
 * @date: 2023-11-03 14:30
 * @description：扫描详情
 * @update: 2023-11-03 14:30
 */

import React,{useState,useEffect} from 'react';
import "./ScanRecord.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import ScanPlayStore from "../store/ScanPlayStore";
import {observer} from "mobx-react";
import ScanSurvey from "./ScanSurvey";
import scanRecordStore from "../store/ScanRecordStore"
import {Table, message, Empty, Tooltip} from "antd";
import Page from "../../../common/page/Page";
import codeScanStore from "../store/CodeScanStore";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import ScanReqList from "./ScanReqList";
import ScanSchemeStore from "../../../setting/scan/store/scanSchemeStore";
import fileStore from "../../file/store/FileStore";
import {findCommitId} from "../../file/components/Common";
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import ScanLogDrawer from "./ScanLogDrawer";
const ScanRecord= (props) => {
    const {match:{params}} = props;
    const {findScanPlay,scanPlay}=ScanPlayStore
    const {findScanRecordPage}=scanRecordStore
    const {codeScanExec,findScanState}=codeScanStore
    const {findScanSchemeSonarList}=ScanSchemeStore

    const [scanRecordList,setScanRecordList]=useState([])
    const [tableType,setTableType]=useState('history')

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [multiState,setMultiState]=useState(false)
    const [scanRecord,setScanRecord]=useState('')

    const [logVisible,setLogVisible]=useState(false)  //日志抽屉状态
    const [logScanRecord,setLogScanRecord]=useState()  //打开日志的扫描记录

    const [exeState,setExeState]=useState(false)

    useEffect(async () => {
        await findScanPlay(params.playId)
        findScanRecord(currentPage)
    }, [exeState]);

    const recordColumns =[
        {
            title: '扫描对象',
            dataIndex: 'scanObject',
            key:"name",
            width:'20%',
            render: (text,record) =>{
                return(
                    <div className='text-color' onClick={()=>goScanResult(text)}>{text?.substring(0,8)}</div>
                )
            }
        },
        {
            title: '运行状态',
            dataIndex: 'scanResult',
            key:"scanResult",
            width:'10%',
            render:(text)=>{
                return(
                    <div>
                        {
                            text==='success'?
                                <div className='icon-text'>
                                    <img  src={success}  style={{width:16,height:16}}/>
                                    <span>成功</span>
                                </div>:
                                <div className='icon-text'>
                                    <img  src={fail}  style={{width:20,height:20}}/>
                                    <span>失败</span>
                                </div>
                        }
                    </div>
                )
            }

        },
        {
            title: '扫描人',
            dataIndex: ['scanUser','name'],
            key:"scanUserId",
            width:'20%',
        },
        {
            title: '扫描方式',
            dataIndex: 'scanWay',
            key:"scanWay",
            width:'20%',
            render:(text)=>text==="hand"&&<div>手动触发</div>
        },
        {
            title: '扫描时间',
            dataIndex: 'createTime',
            width:'20%',
        },
        {
            title: '操作',
            dataIndex: 'exec',
            width:'5%',
            render:(text,record)=>{
                return(
                    <Tooltip title='日志'>
                        <span style={{cursor:"pointer",fontSize:15}} onClick={()=>openLog(record)}>
                            <FileTextOutlined />
                        </span>
                    </Tooltip>

                )
            }
        },
    ]

    //查询扫描记录
    const findScanRecord = (currentPage) => {
        findScanRecordPage({scanPlayId:params.playId,pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanRecordList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                if (res.data.dataList){
                    setScanRecord(res.data.dataList[0])
                }
            }
        })
    }

    const goBack = () => {
        props.history.go(-1)
    }

    const excMultiScan = () => {
        setLogVisible(true)
        codeScanExec(params.playId).then(res=>{
            if (res.code===0&&res.data==='ok'){
                setMultiState(true)
                scanLibraryTime()
            }
        })
    }

    //扫描定时任务
    const scanLibraryTime =async()=>{
        let timer=setInterval(()=>{
            findScanState(params.playId,scanPlay?.scanScheme.scanWay).then(res=>{
                if (res.code===0){
                    setLogScanRecord(res.data)
                    if (res.data.scanResult==='success'){
                        message.success('扫描成功',1)
                        setExeState(true)
                        setMultiState(false)
                        clearInterval(timer)
                    }
                    if (res.data.scanResult==='fail'){
                        message.success('扫描失败',1)
                        setExeState(true)
                        setMultiState(false)
                        clearInterval(timer)
                    }


                }else {
                    clearInterval(timer)
                    setMultiState(false)
                }
            })
        },1000)
    }


    //切换tab
    const cuteTab = (value) => {
      setTableType(value)
        if (value==='history'){
            findScanRecord(currentPage)
        }
    }


    const goScanResult= (value) => {
        if (scanPlay.scanScheme.scanWay==='sonar'){
            findScanSchemeSonarList({scanSchemeId:scanPlay.scanScheme.id}).then(res=>{
                if (res.code===0&&res.data){
                    const data=res.data[0];
                    window.open(`${data.deployServer.serverAddress}/project/issues?id=${scanPlay.repository.name}&resolved=false`)
                }
            })
        }
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        findScanRecord(value)
    }


    //打开扫描日志
    const openLog = (value) => {
        setLogVisible(true)
        setLogScanRecord(value)
    }

    return(
        <div className='scanRecord xcode-repository-width  xcode'>
            <div className='scanRecord-top'>
                <BreadcrumbContent firstItem={scanPlay?.playName} goBack={goBack}/>
            </div>
            <div className='scan-play-style'>
                {
                    scanPlay&&
                    <div className='scan-play-desc'>
                        <div>分支：{`${scanPlay.repository?.name} / ${scanPlay.branch}`}</div>
                        <div>扫描方式: {scanPlay.scanScheme.scanWay==='sonar'?"sonar扫描":"规则包扫描"}</div>
                        <div>最近扫描：{`${scanPlay.userName} 扫描于${scanPlay.latScanTime}`}</div>
                    </div>
                }
                <div className='scan-but-style'>
                    {
                        multiState?
                            <Btn   type={'primary'} title={'加载中'} />:
                            <Btn   type={'primary'} title={'扫描'} onClick={excMultiScan}/>
                    }
                </div>
            </div>


            <div className='scan-data-style'>
                <div className='scan-tab-style'>
                    <div className={`${tableType==='survey'&&' choose-scanRecord-type'}`} onClick={()=>cuteTab("survey")}>问题概览</div>

                    <div className={`${tableType==='trouble'&&' choose-scanRecord-type'}`} onClick={()=>cuteTab("trouble")}>问题列表</div>

                    <div className={`${tableType==='history'&&' choose-scanRecord-type'}`} onClick={()=>cuteTab("history")}>扫描历史</div>
                </div>
                <div className='scan-data-desc'>
                    {
                        tableType==='survey' &&
                        <ScanSurvey scanRecord={scanRecord}/>||
                        tableType==='trouble' && (
                            scanRecordList.length>0?
                                <ScanReqList scanPlay={scanPlay} scanRecord={scanRecord} />:
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )
                        ||
                        tableType==='history'&&
                        <div>
                            <Table
                                columns={recordColumns}
                                dataSource={scanRecordList}
                                rowKey={record=>record.id}
                                pagination={false}
                                className='scan-tab-top'
                            />
                            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
                        </div>
                    }
                </div>
            </div>
            <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={logScanRecord}/>
        </div>
    )

}
export default observer(ScanRecord)
