
/**
 * @name: ScanSchemeTask
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案关联计划
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import { Table} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import ScanPlayStore from "../../../repository/scan/store/ScanPlayStore";
import Page from "../../../common/page/Page";
const ScanSchemePlay = (props) => {
    const {scanSchemeId}=props
    const {findScanPlayPage}=ScanPlayStore

    const [scanPlayList,setScanPlayList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    useEffect(()=>{
        getScanPlayPage(currentPage);
    },[scanSchemeId])

    const columns = [
        {
            title: '计划名称',
            dataIndex: 'playName',
            key: 'schemeName',
            width:'30%',
            ellipsis:true,
            render:(text,record)=><div className='text-color' onClick={()=>gotScanPlay(record)}>{text}</div>
        },
        {
            title: '关联操作人',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
            ellipsis:true,

        },
        {
            title: '关联时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:'20%',
            ellipsis:true,

        }
    ]
    //跳转扫描计划
    const gotScanPlay = (value) => {
        
        props.history.push(`/repository/${value.repository.address}/scanRecord/${value.id}`)
    }
    //分页查询关联的扫描计划
    const getScanPlayPage= (currentPage) => {
        findScanPlayPage({scanSchemeId:scanSchemeId,pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanPlayList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }
    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        getScanPlayPage(value)
    }

    return(
        <Fragment>
            <Table
                className="xcode"
                bordered={false}
                columns={columns}
                dataSource={scanPlayList}
                rowKey={record=>record.id}
                pagination={false}
                locale={{emptyText: <EmptyText title={'暂无关联任务'}/>}}
            />
            <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
        </Fragment>
    )
}
export default ScanSchemePlay
