
/**
 * @name: ScanRule
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描规则详情
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import {DeleteOutlined} from "@ant-design/icons";
import ScanRuleStore from "../store/scanRuleStore";
import "./ScanRuleDetails.scss"
import ScanRuleDetailsEditPop from "./ScanRuleDetailsEditPop";
import {observer} from "mobx-react";
import Omit from "../../../common/omit/Omit";
import ScanRuleDetailsDrawer from "./ScanRuleDetailsDrawer";
import ScanRuleSetStore from "../store/ScanRuleSetStore";
import Page from "../../../common/page/Page";
const ScanRuleDetails = (props) => {
    const {match:{params}} = props;
    const {createScanRule,deleteScanRule,findScanRulePage,fresh}=ScanRuleStore
    const {findScanRuleSet,scanRuleSet}=ScanRuleSetStore
    const [scanRuleList,setScanRuleList]=useState()
    const [scanRule,setScanRule]=useState()
    const [editVisible,setEditVisible] = useState(false)
    const [DrawerVisible,setDrawerVisible] = useState(false)

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    useEffect(()=>{
        getScanRulePage(currentPage);
        findScanRuleSet(params.ruleSetId)
    },[fresh])


    const columns = [
        {
            title: '规则名称',
            dataIndex: 'ruleName',
            key: 'ruleName',
            width:'20%',
            ellipsis:true,
            render:(text,record)=>
                <Tooltip placement="top" title={text}>
                    <div className='text-color' onClick={()=>openRuleDetails(record)}>
                        <Omit value={text} maxWidth={200}/>
                    </div>
                </Tooltip>

        },
        {
            title: '规则概述',
            dataIndex: 'ruleOverview',
            key: 'ruleOverview',
            width:'40%',
            ellipsis:true,
            render:(text)=> <Tooltip placement="top" title={text}><Omit value={text} maxWidth={300}/> </Tooltip>
        },
        {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
            width:'20%',
            ellipsis:true,
            render:(text)=><div>{scanRuleSet.language}</div>
        },
        {
            title: '问题等级',
            dataIndex: 'problemLevel',
            key: 'problemLevel',
            width:'10%',
            ellipsis:true,
            render:(text)=>text===1&&<div className='text-red'>严重</div>|| text===2&&<div className='text-yellow'>警告</div>
                ||text===3&&<div className='text-blue'>建议</div>
        },
        {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'10%',
            render:(text,record)=>(
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>deleteScanRule(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
        }
    ]
    //打开规则详情
    const openRuleDetails = (value) => {
        setScanRule(value)
        setDrawerVisible(true)

    }


    const getScanRulePage = (currentPage) => {
        findScanRulePage({ruleSetId:params.ruleSetId,pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if(res.code===0){
                setScanRuleList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }

    const goBack = () => {
        props.history.go(-1)
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getScanRulePage(value)
    }
    return(
        <div className='ruleDetails'>
            <div className='xcode-repository-width xcode'>
                <div className='ruleDetails-up'>
                    <BreadcrumbContent firstItem={"扫描规则"} goBack={goBack}/>
                    <Btn
                        type={'primary'}
                        title={'创建规则'}
                        onClick={()=> setEditVisible(true)}
                    />
                </div>
                <div className='ruleDetails-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={scanRuleList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无扫描规则'}/>}}
                    />
                </div>
                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
            </div>
            <ScanRuleDetailsEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanRule={createScanRule} scanRuleSetId={params.ruleSetId}/>
            <ScanRuleDetailsDrawer visible={DrawerVisible} setVisible={setDrawerVisible} scanRule={scanRule}
                                   scanRuleSet={scanRuleSet} problemLevel={scanRule?.problemLevel}/>
        </div>
    )
}
export default observer(ScanRuleDetails)
