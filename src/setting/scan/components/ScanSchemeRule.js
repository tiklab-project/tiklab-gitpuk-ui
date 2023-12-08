/**
 * @name: ScanSchemeRule
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案的规则
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./ScanSchemeRule.scss"
import {Input, Popconfirm, Space, Table, Tooltip} from "antd";
import Omit from "../../../common/omit/Omit";
import ScanSchemeRuleStore from "../store/ScanSchemeRuleStore";
import {observer, Observer} from "mobx-react";
import Page from "../../../common/page/Page";
import ScanRuleDetailsDrawer from "./ScanRuleDetailsDrawer";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    SettingOutlined
} from "@ant-design/icons";
import ScanSchemeRuleEditPop from "./ScanSchemeRuleEditPop";
const ScanSchemeRule = (props) => {
    const {schemeRuleSet,goScheme}=props

    const {findScanSchemeRulePage,updateScanSchemeRule,fresh}=ScanSchemeRuleStore
    const [schemeRuleList,setSchemeRuleList]=useState()
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [ruleIds,setRuleIds]=useState([])

    const [DrawerVisible,setDrawerVisible] = useState(false)  //抽屉打开状态
    const [schemeRule,setSchemeRule]=useState()  //选中的方案规则集的规则

    const [editVisible,setEditVisible]=useState(false)  //编辑弹窗状态




    useEffect(()=>{
        getScanRulePage(currentPage);
    },[fresh])

    const columns=[
        {
            title: '名称',
            dataIndex: ['scanRule','ruleName'],
            key: 'ruleName',
            width:'30%',
            ellipsis:true,
            render:(text,record)=><div className='text-color' onClick={()=>openRuleDetails(record)}>{text}</div>
        },

        {
            title: '规则概述',
            dataIndex: ["scanRule","ruleOverview"],
            key: 'ruleOverview',
            width:'40%',
            ellipsis:true,
            render:(text)=> <Tooltip placement="top" title={text}><Omit value={text} maxWidth={300}/> </Tooltip>
        },
        {
            title: '问题等级',
            dataIndex: 'problemLevel',
            key: 'problemLevel',
            width:'10%',
            ellipsis:true,
            render:(text)=>text===1&&<div className='text-red'>严重</div>||
                text===2&&<div className='text-yellow'>警告</div> ||text===3&&<div className='text-blue'>建议</div>
        },
        {
            title: '语言',
            dataIndex: 'language',
            key: 'language',
            width:'10%',
            ellipsis:true,
            render:(text)=> <div>{schemeRuleSet?.scanRuleSet?.language}</div>
        },
        {
            title: '操作',
            dataIndex: 'exec',
            width:'10%',
            render:(text,record)=>{
                return(
                    <div className='table-icon-style'>
                        <Tooltip title='编辑'>
                            <span className='icon-style' onClick={()=>opeEditPop(record)}>
                                <EditOutlined />
                            </span>
                        </Tooltip>
                        {
                            record.isDisable===0?
                                <Tooltip title={"停用"}>
                                    <Popconfirm
                                        placement="topRight"
                                        title="停用后，运行当前检测方案时将不再执行对应规则"
                                        onConfirm={()=>updateScanSchemeRule({...record,isDisable:1})}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                <span className='icon-style'>
                                    <CloseCircleOutlined />
                                </span>
                                    </Popconfirm>
                                </Tooltip>:
                                <Tooltip title={"启用"}>
                                    <Popconfirm
                                        placement="topRight"
                                        title="是否启用"
                                        onConfirm={()=>updateScanSchemeRule({...record,isDisable:0})}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <span className='icon-style'>
                                            <CheckCircleOutlined />
                                        </span>
                                    </Popconfirm>
                                </Tooltip>
                        }

                    </div>
                )
            }
        }
    ]
    //分页查询规则
    const getScanRulePage = (currentPage) => {
        findScanSchemeRulePage({scanSchemeId:schemeRuleSet.scanSchemeId,schemeRulesetId:schemeRuleSet.id,
            pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code==0){
                setSchemeRuleList(res.data.dataList)
                setTotalPage(res.data.totalPage)
            }
        })
    }

    //选择规则
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRuleIds(selectedRowKeys)
        }
    };
    //打开扫描规则详情
    const openRuleDetails = (value) => {
        setSchemeRule(value)
        setDrawerVisible(true)
    }
    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getScanRulePage(value)
    }

    //打开编辑弹窗
    const opeEditPop = (value) => {
        setSchemeRule(value)
      setEditVisible(true)
    }


    return(
        <div className='scheme-rule'>
            <BreadcrumbContent firstItem={schemeRuleSet.scanRuleSet?.ruleSetName} goBack={goScheme}/>
            <div className='xcode'>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={schemeRuleList}
                    rowKey = {record => record.id}
                    columns={columns}
                    pagination={false}
                />
                <Page pageCurrent={currentPage} changPage={changPage} totalPage={totalPage}/>
            </div>
            <ScanRuleDetailsDrawer visible={DrawerVisible} setVisible={setDrawerVisible} scanRule={schemeRule?.scanRule}
                                   scanRuleSet={schemeRuleSet?.scanRuleSet} problemLevel={schemeRule?.problemLevel}/>

            <ScanSchemeRuleEditPop editVisible={editVisible} setEditVisible={setEditVisible} schemeRule={schemeRule} updateScanSchemeRule={updateScanSchemeRule}/>
        </div>
    )
}
export default observer(ScanSchemeRule)
