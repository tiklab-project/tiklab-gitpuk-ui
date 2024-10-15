/**
 * @name: ScanDetails
 * @author: limingliang
 * @date: 2023-11-03 14:30
 * @description：扫描详情
 * @update: 2023-11-03 14:30
 */

import React,{useState,useEffect,Fragment} from 'react';
import "./ScanRecord.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import ScanPlayStore from "../store/ScanPlayStore";
import {inject, observer} from "mobx-react";
import ScanSurvey from "./ScanSurvey";
import scanRecordStore from "../store/ScanRecordStore"
import {Table, message, Empty, Tooltip, Popconfirm, Col} from "antd";
import codeScanStore from "../store/CodeScanStore";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import ScanSchemeStore from "../../../setting/scan/store/scanSchemeStore";
import {DeleteOutlined, FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import ScanLogDrawer from "./ScanLogDrawer";
import UserIcon from "../../../common/list/UserIcon";
import ScanSetting from "./ScanSetting";
import DeleteExec from "../../../common/delete/DeleteExec";
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
const ScanRecord= (props) => {
    const {repositoryStore,match:{params}} = props;
    const {findScanPlay,scanPlay}=ScanPlayStore
    const {findScanRecordPage,deleteScanRecord,refresh}=scanRecordStore
    const {codeScanExec,findScanState}=codeScanStore
    const {findScanSchemeSonarList}=ScanSchemeStore
    const {repositoryInfo} = repositoryStore

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

    const [totalRecord,setTotalRecord]=useState(0)


    useEffect(async () => {
         findScanPlay(params.playId)
        findScanRecord(currentPage)
    }, [exeState,refresh]);
    const recordColumns =[
        {
            title: '报告编号',
            dataIndex: 'scanObject',
            key:"name",
            width:'15%',
            render: (text,record) =>{
                return(
                    <div className='text-color' onClick={()=>goScanResult(record)}>{text?.substring(0,8)}</div>
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
                                    <img  src={fail}  style={{width:16,height:16}}/>
                                    <span>失败</span>
                                </div>
                        }
                    </div>
                )
            }

        },

        {
            title: '触发信息',
            dataIndex: 'scanWay',
            key:"scanWay",
            width:'25%',
            render:(text,record)=>{
                return(
                    <div style={{display:"flex" ,alignItems:"center"}}>
                        <UserIcon text={record?.scanUser?.nickname?record.scanUser.nickname:record?.scanUser?.name} size={"small"}/>
                        <div>{record?.scanUser?.nickname?record.scanUser.nickname:record?.scanUser?.name}</div>
                        {
                            text==="hand"?<div>手动触发</div>:<div>触发</div>
                        }
                    </div>
                )
            }
        },
        {
            title: '扫描时间',
            dataIndex: 'createTime',
            width:'20%',
        },
        {
            title: '耗时',
            dataIndex: 'scanTime',
            key:"scanTime",
            width:'20%',
        },
        {
            title: '操作',
            dataIndex: 'exec',
            width:'5%',
            render:(text,record)=>{
                return(
                    <div className='table-icon'>

                        <Tooltip title='日志'>
                            <FileTextOutlined style={{cursor:"pointer",fontSize:15}} onClick={()=>openLog(record)}/>
                        </Tooltip>
                        <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                            <DeleteExec value={record} deleteData={deleteScanRecord} title={"确认删除"}/>
                         </PrivilegeProjectButton>
                    </div>
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
                setTotalRecord(res.data.totalRecord)
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
        setLogScanRecord(null)
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
                        message.error('扫描失败',1)
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
        }else {
            props.history.push(`/repository/${params?.namespace+"/"+params?.name}/scanDetails/${value.id}`)
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
        <div className='xcode  page-width   scanRecord'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
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
                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                        <div className='scan-but-style'>
                            {
                                multiState?
                                    <Btn   type={'primary'} title={'加载中'} />:
                                    <Btn   type={'primary'} title={'扫描'} onClick={excMultiScan}/>
                            }
                        </div>
                    </PrivilegeProjectButton>

                </div>

                <div className='scan-data-style'>
                    <div className='scan-tab-style'>
                        <div className={`${tableType==='history'&&' choose-scanRecord-type'}`} onClick={()=>cuteTab("history")}>扫描报告</div>
                        <div className={`${tableType==='setting'&&' choose-scanRecord-type'}`} onClick={()=>cuteTab("setting")}>触发设置</div>
                    </div>

                    {
                        tableType === 'history' &&
                        <Fragment>
                            <div className='scan-tab-desc'>
                                <div className='scan-tab-desc-num'>报告数：{totalRecord}</div>
                                <Btn  type={'disabled'} title={'导出'}/>
                            </div>
                            <div  className='tab-top'>
                                <Table
                                    columns={recordColumns}
                                    dataSource={scanRecordList}
                                    rowKey={record=>record.id}
                                    pagination={false}
                                />
                            </div>
                        </Fragment>||
                        tableType === 'setting' &&
                        <ScanSetting scanPlayId={params.playId} rpyId={repositoryInfo.rpyId}/>
                    }
                </div>
            </Col>


            <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={logScanRecord}/>
        </div>
    )

}
export default inject('repositoryStore')(observer(ScanRecord))
