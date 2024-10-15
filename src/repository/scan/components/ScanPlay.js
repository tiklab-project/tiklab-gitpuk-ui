/**
 * @name: ScanPlay
 * @author: limingliang
 * @date: 2023-11-03 14:30
 * @description：扫描计划
 * @update: 2023-11-03 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Page from "../../../common/page/Page";
import "./ScanPlay.scss"
import Btn from '../../../common/btn/Btn';
import {Col, message, Popconfirm, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, LoadingOutlined, PlayCircleOutlined} from "@ant-design/icons";
import ScanPlayEditPop from "./ScanPlayEditPop";
import {inject, observer} from "mobx-react";
import scanPlayStore from "../store/ScanPlayStore";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import ScanLogDrawer from "./ScanLogDrawer";
import ScanSchemeStore from "../../../setting/scan/store/scanSchemeStore";
import DeleteExec from "../../../common/delete/DeleteExec";
import codeScanStore from "../store/CodeScanStore";
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
const ScanPlay = (props) => {
    const {repositoryStore,match} = props
    const {findScanPlayPage,deleteScanPlay,refresh}=scanPlayStore
    const {repositoryInfo} = repositoryStore
    const {findScanSchemeSonarList}=ScanSchemeStore
    const {codeScanExec,findScanState}=codeScanStore

    const [scanPlayList,setScanPlayList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [scanPlay,setScanPlay]=useState('')
    const [editVisible,setEditVisible]=useState(false)
    const [editType,setEditType]=useState('')
    const [multiState,setMultiState]=useState(false)  //扫描执行状态
    const pluginStore = useSelector(state => state.pluginStore);

    const [logVisible,setLogVisible]=useState(false)  //日志抽屉状态
    const [logScanRecord,setLogScanRecord]=useState()  //打开日志的扫描记录



    const webUrl = `${match.params.namespace}/${match.params.name}`
    useEffect(async () => {
        await findScanPlay(currentPage)
    }, [refresh,multiState]);

    const columns = [
        {
            title: '计划名称',
            dataIndex: 'playName',
            key:"playName",
            width:'20%',
            render: (text,record) =><div className='text-color' onClick={()=>goScanList(record.id)}>{text}</div>
        },
        {
            title: '最后一次扫描',
            dataIndex: 'scanTime',
            width:'40%',
            render:(text,record)=>{
                return(
                    <div>
                        <div className='last-scan'>
                            <div>{record?.userName}</div>
                            <div className='last-scan-text'>扫描{record.scanTime}</div>
                        </div>
                        <div className='last-scan-style' onClick={()=>goDetails(record)}>
                            {
                                record?.scanResult==='success'&& <img  src={success}  style={{width:16,height:16}}/>||
                                record?.scanResult==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                            }
                            <div className="">  {record?.scanObject?.substring(0,8)}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width:'30%',
        },

        {
            title: '操作',
            key: 'activity',
            width:'10%',
            render: (text, record) => {
                return(
                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                        <div className='icon-style'>
                            <Tooltip title='扫描'>
                                <PlayCircleOutlined className='scan-icon' onClick={()=>execScan(record)}/>
                            </Tooltip>
                            <Tooltip title='编辑'>
                                <EditOutlined onClick={()=>openUpdatePop(record)} />
                            </Tooltip>
                            <DeleteExec value={record} deleteData={deleteScanPlay} title={"确认删除"}/>
                        </div>
                    </PrivilegeProjectButton>
                )
            }
        },
    ];

    //查询扫描记录
    const findScanPlay = (currentPage) => {
        findScanPlayPage({repositoryId:repositoryInfo.rpyId,pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanPlayList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }

    //跳转详情
    const goDetails = (value) => {
        if (value?.scanScheme?.scanWay==='sonar'){
            if (value?.scanResult==='success'){
                findScanSchemeSonarList({scanSchemeId:value.scanScheme.id}).then(res=>{
                    if (res.code===0&&res.data){
                        const data=res.data[0];
                        window.open(`${data.deployServer.serverAddress}/project/issues?id=${value.repository.name}&resolved=false`)
                    }
                })
            }else {
                props.history.push(`/repository/${webUrl}/scanDetails/${value.recordId}`)
            }
        }else {
            props.history.push(`/repository/${webUrl}/scanDetails/${value.recordId}`)
        }

    }

    //跳转扫描详情
    const goScanList = (playId) => {
        props.history.push(`/repository/${webUrl}/scanRecord/${playId}`)
    }
    //打开添加
    const openEditPop = () => {
        setEditType("add")
        setEditVisible(true)
    }
    //打开编辑
    const openUpdatePop = (value) => {
        setEditType("update")
        setScanPlay(value)
        setEditVisible(true)
    }

    //分页查询
    const changPage = (current) => {
        setCurrentPage(current)
        findScanPlay(current)
    }

    //刷新查询
    const refreshFind = () => {
        findScanPlay(currentPage)
    }

    //执行扫描
    const execScan = (value) => {
        setLogVisible(true)
        codeScanExec(value.id).then(scanCode=>{
            if (scanCode.code===0&&scanCode.data==='ok'){
                setMultiState(true)
                scanLibraryTime(value)
            }
        })
    }

    //扫描定时任务
    const scanLibraryTime =async(value)=>{
        let timer=setInterval(()=>{
            findScanState(value.id,value?.scanScheme.scanWay).then(res=>{
                if (res.code===0){
                    setLogScanRecord(res.data)
                    if (res.data.scanResult==='success'){
                        message.success('扫描成功',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }
                    if (res.data.scanResult==='fail'){
                        message.error('扫描失败',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }
                }else {
                    clearInterval(timer)
                    setMultiState(false)
                }
            })
        },1000)
    }

    return(
        <div className='xcode page-width scanPlay'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
              {/*  <div>
                    <RemoteComponent
                        point="scanCode"
                    />
                </div>*/}

                <div className='scanPlay-top'>
                    <BreadcrumbContent firstItem={`扫描计划`}/>
                    <PrivilegeProjectButton code={"rpy_scan_manage"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                        {
                            multiState?
                                <Btn   type={'primary'} title={'加载中'} />:
                                <Btn   type={'primary'} title={'添加扫描计划'} onClick={openEditPop}/>
                        }
                    </PrivilegeProjectButton>
                </div>
                <div className='scanPlay-data-style'>
                    <Table
                        columns={columns}
                        dataSource={scanPlayList}
                        rowKey={record=>record.id}
                        pagination={false}
                    />
                    <Page pageCurrent={currentPage}
                          changPage={changPage}
                          totalPage={totalPage}
                          totalRecord={totalRecord}
                          refresh={refreshFind}
                    />
                </div>
            </Col>
            <ScanPlayEditPop editVisible={editVisible} setEditVisible={setEditVisible} setLogScanRecord={setLogScanRecord}
                              repositoryId={repositoryInfo.rpyId}  scanPlay={scanPlay} setLogVisible={setLogVisible}
                             setScanPlay={setScanPlay} editType={editType} setMultiState={setMultiState} />

            <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={logScanRecord}/>
        </div>
    )
}
export default inject('repositoryStore')(observer(ScanPlay))
