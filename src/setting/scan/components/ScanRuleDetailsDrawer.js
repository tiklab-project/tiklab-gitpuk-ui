/**
 * @name: ScanRuleListDrawer
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描规则右侧弹窗
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./ScanRuleDetailsDrawer.scss"
const ScanRuleDetailsDrawer = (props) => {
    const {visible,setVisible,scanRule,scanRuleSet,problemLevel}=props

    //取消弹窗
    const cancelDrawer = () => {
        setVisible(false)
    }
    return(
        <Drawer
            title={scanRule?.ruleName}
            placement='right'
            closable={false}
            width={"60%"}
            className='library-drawer'
            onClose={cancelDrawer}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            {
                scanRule&&scanRuleSet&&
                <div className='ruleDrawer'>
                    <div className='ruleDrawer-nav-style'>
                        <div className='ruleDrawer-nav-title'>问题等级</div>
                        <div>{
                            problemLevel===1&&<div className='text-red'>严重</div>||
                            problemLevel===2&&<div className='text-yellow'>警告</div> ||
                            problemLevel===3&&<div className='text-blue'>建议</div>
                        }</div>
                    </div>
                    <div className='ruleDrawer-nav-style'>
                        <div className='ruleDrawer-nav-title'>类型</div>
                        <div>{
                            scanRuleSet.ruleSetType==='function'&&<div>功能</div>||
                            scanRuleSet.ruleSetType==='norm'&&<div>规范</div>||
                            scanRuleSet.ruleSetType==='secure'&&<div>安全</div>
                        }</div>
                    </div>
                    <div className='ruleDrawer-nav-style'>
                        <div className='ruleDrawer-nav-title'>语言</div>
                        <div className='ruleDrawer-nav-de'>{scanRuleSet.language}</div>
                    </div>
                    <div className='ruleDrawer-nav-style'>
                        <div className='ruleDrawer-nav-title'>检测工具</div>
                        <div className='ruleDrawer-nav-de'>{scanRule.scanTool}</div>
                    </div>
                    <div className='ruleDrawer-nav-style'>
                        <div className='ruleDrawer-nav-title'>概述</div>
                        <div className='ruleDrawer-nav-de'>{scanRule.ruleOverview}</div>
                    </div>
                    <div className='ruleDrawer-nav-style'>
                        <div  className='ruleDrawer-nav-title'>说明</div>
                        <div className='ruleDrawer-nav-de'>{scanRule.describe}</div>
                    </div>
                </div>
            }

        </Drawer>
    )
}
export default ScanRuleDetailsDrawer
