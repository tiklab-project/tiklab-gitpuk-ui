
/**
 * @Description: 流水线弹窗
 * @Author: limingliang
 * @Date: 2025/4/2
 * @LastEditors: limingliang
 * @LastEditTime: 2025/4/2
 */

import React,{useEffect,useState} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Space, Table, message, Spin} from "antd";
import SearchInput from "../../../common/input/SearchInput";
import Page from "../../../common/page/Page";
import IntegrateInStore from "../store/IntegrateInStore";
import "./ScanPlayPop.scss"
import {observer} from "mobx-react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
const ScanPlayPop = (props) => {
    const {visible,setVisible,integrationAddress,repositoryId,relevancyIds}=props

    const {findScanPlayPage,createIntRelevancy}=IntegrateInStore

    const [findState,setFindState]=useState(false)

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)
    const [scanPlayList,setScanPlayList]=useState([])

    //选中的扫描计划id的list
    const [scanPlayIdList,setScanPlayIdList]=useState([])

    useEffect(()=>{
        if (visible&&integrationAddress){
            findScanPlayList()
        }
    },[visible])

    //查询扫描计划
    const findScanPlayList= () => {
        findScanPlayPage({
            address:integrationAddress?.integrationAddress,
            relevancyIdS:relevancyIds
        }).then(res=>{
            if (res.code===0){
                setFindState(false)
                setScanPlayList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }


    //添加
    const onOk = () => {
        createIntRelevancy({
            type:"scan",
            repositoryId:repositoryId,
            relevancyIdList:scanPlayIdList
        }).then(res=>{
            if (res.code===0){
                setVisible(false)
            }})
    }

    //跳转添加集成地址
    const goSystemInt = () => {
        props.history.push(`/setting/systemInt`)
    }


    /**
     * 输入搜索的仓库名称
     * @param e
     */
    const onChangeSearch = (e) => {

    }

    const changPage = () => {

    }

    const refreshFind = () => {

    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setScanPlayIdList(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };


    const columns = [
        {
            title: "扫描项目",
            dataIndex: "name",
            key: "name",
            width:"60%",
            ellipsis:true,
        },
        {
            title: "最近扫描",
            dataIndex: "newScanTime",
            key: "newScanTime",
            width:"40%",
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div>
                        {
                            text?
                                <div style={{display:'flex',gap:'5',alignItems:"center"}}>
                                    {text}
                                    <div className='scan-time'>
                                        {record.scanResult==="success"&&
                                            <CheckCircleOutlined className={"scan-time-result-success"}/>
                                            ||
                                            record.scanResult==="fail"&&
                                            <CloseCircleOutlined className='scan-time-result-fail'/>
                                        }
                                    </div>
                                </div> :
                                <div className='project-nav-desc'>未扫描</div>
                        }
                    </div>
                )}
        },

    ]


    const modalFooter = (
        <>
            <Btn onClick={()=>setVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={integrationAddress?modalFooter:null}
            destroyOnClose={true}
            width={integrationAddress?750:450}
            title={"关联扫描计划"}
        >
            {
                integrationAddress?
                    <div className='scan-play-pop'>
                        <div style={{paddingTop:10,paddingBottom:10}}>
                            <SearchInput {...props}
                                         placeholder={"搜索扫描计划名称"}
                                         onChange={onChangeSearch}

                            />
                        </div>
                        <Spin spinning={findState}>
                            <Table
                                rowSelection={{
                                    type: "checkbox",
                                    ...rowSelection,
                                }}
                                bordered={false}
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
                        </Spin>

                    </div>:
                    <div className={"scan-play-pop-hint"}>
                        需要先添加集成地址,
                        <span className='pop-hint-exec' onClick={goSystemInt}>现在添加</span>
                    </div>
            }
        </Modals>
    )
}
export default observer(ScanPlayPop)
