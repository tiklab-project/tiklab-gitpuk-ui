/**
 * @name: ScanReqList
 * @author: limingliang
 * @date: 2023-11-07 14:30
 * @description：扫描问题列表
 * @update: 2023-11-07 14:30
 */
import React,{useState,useEffect} from 'react';
import {Table, Tooltip} from "antd";
import codeScanStore from "../store/CodeScanStore";
import Omit from "../../../common/omit/Omit";
import Page from "../../../common/page/Page";
import ScanReqDrawer from "./ScanReqDrawer";
import ScanRecordStore from "../store/ScanRecordStore";
import "./ScanRecord.scss"
import {findCommitId} from "../../file/components/Common";
import fileStore from "../../file/store/FileStore";
const ScanReqList = (props) => {
    const {scanPlay,scanRecord}=props
    const {findScanIssuesDeBySonar}=codeScanStore
    const {findRecordInstancePageByPlay}=ScanRecordStore
    const {readFile} = fileStore

    const [scanIssuesList,setScanIssuesList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [drawerVisible,setDrawerVisible]=useState(false)  //抽屉弹窗状态

    const [issuesDetails,setIssuesDetails]=useState([])  //sonar 扫描错误文件详情
    const [reqDetails,setReqDetails]=useState('')       //错误详情

    const [blobFile,setBlobFile]=useState('')   //类文件详情

    useEffect(async () => {
        await findScanIssues(currentPage)
    }, []);

    const recordColumns =[
        {
            title: '问题',
            dataIndex: 'ruleName',
            key:"ruleName",
            width:'20%',
            render:(text,record)=>   <Tooltip placement="top" title={text} ><div className='text-color' onClick={()=>openReqDrawer(record)}>
                <Omit value={text} maxWidth={200}/>
            </div>
            </Tooltip>
        },
      /*  {
            title: '问题',
            dataIndex: 'problemOverview',
            key:"problemOverview",
            width:'30%',
            render:(text,record)=>   <Tooltip placement="top" title={text} ><div className='text-color' onClick={()=>openReqDrawer(record)}>
              <Omit value={text} maxWidth={200}/>
            </div>
            </Tooltip>
        },*/

        {
            title: '文件名',
            dataIndex: 'fileName',
            key:"fileName",
            width:'30%',
            render:(text)=> <Tooltip placement="top" title={text}><Omit value={text} maxWidth={200}/> </Tooltip>
        },
        {
            title: '问题等级',
            dataIndex: 'problemLevel',
            key:"problemLevel",
            width:'10%',
            render:(text)=>text===1&&<div className='text-red'>严重</div>|| text===2&&<div className='text-yellow'>警告</div>
                ||text===3&&<div className='text-blue'>建议</div>
        },
        {
            title: '引入时间',
            dataIndex: 'importTime',
            key:"importTime",
            width:'20%',
        },

    ]
    //分页查询问题列表
    const findScanIssues = (currentPage) => {
        findRecordInstancePageByPlay({scanPlayId:scanPlay?.id,scanRecordId:scanRecord.id,
            pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanIssuesList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }
    //分页查询
    const handleChange = (value) => {
        setCurrentPage(value)
        findScanIssues(value)
    }
    //打开右侧抽屉
    const openReqDrawer = (record) => {
        setReqDetails(record);
        setDrawerVisible(true)

        if (scanPlay?.scanScheme.scanWay==='sonar'){
            findScanIssuesDeBySonar(record.id,record.fileName).then(res=>{
                if (res.code===0){
                    setIssuesDetails(res.data)
                }
            })
        }else {
            readFile({rpyId:scanPlay.repository.rpyId, fileAddress:record.filePath, commitBranch:scanPlay.branch,
                findCommitId:false}).then(res=>{
                    res.code===0&&setBlobFile(res.data)
            })
        }
    }

    return(
        <div >
            <Table
                columns={recordColumns}
                dataSource={scanIssuesList}
                rowKey={record=>record.id}
                pagination={false}
                className='scan-tab-top'
            />
            <Page totalPage={totalPage} pageCurrent={currentPage} changPage={handleChange}/>
            <ScanReqDrawer visible={drawerVisible} setVisible={setDrawerVisible} issuesDetails={issuesDetails} reqDetails={reqDetails}
                           scanWay={scanPlay?.scanScheme.scanWay} blobFile={blobFile}
            />


        </div>
    )

}
export default ScanReqList
