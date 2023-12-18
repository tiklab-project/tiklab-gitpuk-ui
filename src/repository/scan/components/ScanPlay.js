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
import {Popconfirm, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, LoadingOutlined} from "@ant-design/icons";
import ScanPlayEditPop from "./ScanPlayEditPop";
import {inject, observer} from "mobx-react";
import scanPlayStore from "../store/ScanPlayStore";
import success from "../../../assets/images/img/success.png";
import fail from "../../../assets/images/img/fail.png";
import ScanLogDrawer from "./ScanLogDrawer";
const ScanPlay = (props) => {
    const {repositoryStore,match} = props
    const {findScanPlayPage,deleteScanPlay,refresh}=scanPlayStore
    const {repositoryInfo} = repositoryStore

    const [scanPlayList,setScanPlayList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [scanPlay,setScanPlay]=useState('')
    const [editVisible,setEditVisible]=useState(false)
    const [editType,setEditType]=useState('')
    const [multiState,setMultiState]=useState(false)
    const [addPlayId,setAddPlayId]=useState('')  //添加后的计划id

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
            title: '创建时间',
            dataIndex: 'createTime',
            width:'40%',
        },
        {
            title: '最后一次扫描',
            dataIndex: 'scanTime',
            width:'30%',
            render:(text,record)=>{
                return(
                    <div>
                        <div className='last-scan'>
                            <div>{record.userName}</div>
                            <div>手动触发</div>
                        </div>
                        <div className='last-scan-style'>
                            {
                                record?.scanResult==='OK'&& <img  src={success}  style={{width:16,height:16}}/>||
                                record?.scanResult==='fail'&&   <img  src={fail}  style={{width:16,height:16}}/>
                            }
                            <div className='last-scan-text'>扫描于：{record.scanTime}</div>
                        </div>
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
                    <div className='icon-style'>
                        <Tooltip title='编辑'>
                            <EditOutlined onClick={()=>openUpdatePop(record)} />
                        </Tooltip>
                        <Tooltip title='删除'>
                            <Popconfirm
                                title="你确定删除吗"
                                onConfirm={()=>deleteScanPlay(record.id)}
                                okText="确定"
                                cancelText="取消"
                                placement="topRight"
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Tooltip>
                    </div>
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
            }
        })
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

    return(
        <div className='scanPlay xcode-repository-width  xcode'>
            <div className='scanPlay-top'>
                <BreadcrumbContent firstItem={`扫描计划`}/>
                {
                    multiState?
                        <Btn   type={'primary'} title={'加载中'} />:
                        <Btn   type={'primary'} title={'添加计划'} onClick={openEditPop}/>
                }

            </div>
            <div className='scanPlay-data-style'>
                <Table
                    columns={columns}
                    dataSource={scanPlayList}
                    rowKey={record=>record.id}
                    pagination={false}
                />
                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
            </div>
            <ScanPlayEditPop editVisible={editVisible} setEditVisible={setEditVisible} setLogScanRecord={setLogScanRecord}
                              repositoryId={repositoryInfo.rpyId}  scanPlay={scanPlay} setLogVisible={setLogVisible}
                             setScanPlay={setScanPlay} editType={editType} setMultiState={setMultiState} setAddPlayId={setAddPlayId}/>

            <ScanLogDrawer visible={logVisible} setVisible={setLogVisible} scanRecord={logScanRecord}/>
        </div>


    )
}
export default inject('repositoryStore')(observer(ScanPlay))
