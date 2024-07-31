
/**
 * @name: ScanSchemeRuleSet
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描规则集
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import {observer} from "mobx-react";
import "./ScanSchemeRuleSet.scss"
import {Popconfirm, Table, Tooltip} from "antd";
import Omit from "../../../common/omit/Omit";
import {DeleteOutlined} from "@ant-design/icons";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
const ScanSchemeRuleSet = (props) => {
    const {scheme,scanSchemeRuleSetList,goSchemeRule,deleteScanSchemeRuleSet}=props



    const cuteBorder = (value) => {
        goSchemeRule(value)
    }


    return(
        <div className='ruleSet'>
            {scheme.scanWay==='rule'?
                (scanSchemeRuleSetList&&scanSchemeRuleSetList.length>0)&&scanSchemeRuleSetList.map(item=>{
                    return(
                        <div key={item.id} className='scanSchemeRuleSet-style'>
                            <div  className='border-style' onClick={()=>cuteBorder(item)}>
                                <div className='border-data-style'>
                                    <div className='data-title'>{item.scanRuleSet?.ruleSetName}</div>
                                    <Tooltip placement="top" title={item.scanRuleSet?.describe} >
                                        <div className='data-desc'>
                                            <Omit value={item.scanRuleSet?.describe} maxWidth={1000}/>
                                        </div>
                                    </Tooltip>
                                    <div className='data-rule-style'>
                                        <div className='data-rule'>规则：{item.ruleNum}</div>
                                    </div>
                                </div>
                            </div>
                            <PrivilegeButton  code={"gittok_scan_scheme"} key={'gittok_scan_scheme'} >
                                <div className='delete-icon'>
                                    <Popconfirm
                                        placement="bottomRight"
                                        title="移除规则包"
                                        description={"变更将影响关联该方案的扫描结果"}
                                        okText='确定'
                                        cancelText='取消'
                                        onConfirm={()=>deleteScanSchemeRuleSet(item.id)}
                                    >
                                        <DeleteOutlined />
                                    </Popconfirm>
                                </div>
                            </PrivilegeButton>

                        </div>
                    )
                }):
                <Fragment>
                    <div  className='scanSchemeRuleSet-style'>
                        <div  className='border-style'>
                            <div className='border-data-style border-style-disabled'>
                                <div className='data-title'>sonar规则包</div>
                                <div className='data-desc'>
                                    基于sonar检测工具帮助开发者检测开发过程中的编码问题，帮助开发人员提高代码质量
                                </div>
                                <div className='data-desc-rule'>不支持查看规则</div>
                            </div>
                        </div>
                    </div>
                </Fragment>

            }
        </div>
    )
}
export default observer(ScanSchemeRuleSet)
