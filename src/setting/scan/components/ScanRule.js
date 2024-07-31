
/**
 * @name: ScanRule
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描规则
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import "./ScanRule.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {Col, Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import {DeleteOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import ScanRuleSetEditPop from "./ScanRuleSetEditPop";
import ScanRuleSetStore from "../store/ScanRuleSetStore";
const ScanRule = (props) => {

    const {createScanRuleSet,deleteScanRuleSet,findAllScanRuleSet,scanRuleSetList,fresh}=ScanRuleSetStore

    const [editVisible,setEditVisible] = useState(false)

    useEffect(()=>{
        findAllScanRuleSet();
    },[fresh])

    const columns = [
        {
            title: '名称',
            dataIndex: 'ruleSetName',
            key: 'ruleSetName',
            width:'30%',
            ellipsis:true,
            render:(text,record)=><div className='text-color' onClick={()=>openRuleSetDetails(record)}>{text}</div>
        },
        {
            title: '类型',
            dataIndex: 'ruleSetType',
            key: 'ruleSetType',
            width:'10%',
            ellipsis:true,
            render:(text)=>text==='function'&&<div>功能</div>|| text==='norm'&&<div>规范</div>|| text==='secure'&&<div>安全</div>
        },
        {
            title: '支持语言',
            dataIndex: 'language',
            key: 'language',
            width:'10%',
            ellipsis:true,
        },
        {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
            width:'40%',
            ellipsis:true,
        },
     /*   {
            title:'操作',
            dataIndex: 'action',
            key: 'action',
            width:'5%',
            render:(text,record)=>(
                <Tooltip title={"删除"}>
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={()=>deleteScanRuleSet(record.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <span style={{cursor:"pointer"}}>
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </Tooltip>
            )
        }*/
    ]

    const openRuleSetDetails = (value) => {
        props.history.push(`/setting/scanRule/${value.id}`)
    }

    return(
        <div className='xcode gittok-width scanRule'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='scanRule-up'>
                    <BreadcrumbContent firstItem={"扫描规则集"}/>
                   {/* <Btn
                        type={'primary'}
                        title={'创建规则集'}
                        onClick={()=> setEditVisible(true)}
                    />*/}
                </div>
                <div className='scanRule-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={scanRuleSetList}
                        rowKey={record=>record.id}
                        pagination={false}
                        locale={{emptyText: <EmptyText title={'暂无扫描规则集'}/>}}
                    />
                </div>
            </Col>

            <ScanRuleSetEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanRuleSet={createScanRuleSet}/>
        </div>
    )

}
export default observer(ScanRule)
