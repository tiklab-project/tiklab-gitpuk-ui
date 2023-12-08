
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
import EmptyText from "../../../common/emptyText/EmptyText";
const ScanSchemeRuleSet = (props) => {
    const {scheme,scanSonar,scanSchemeRuleSetList,goSchemeRule}=props
    const cuteBorder = (value) => {
        goSchemeRule(value)
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'envName',
            key: 'envName',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '类型',
            dataIndex: 'envType',
            key: 'envType',
            width:'15%',
            ellipsis:true,
        },
        {
            title: '地址',
            dataIndex: 'envAddress',
            key: 'envAddress',
            width:'60%',
            ellipsis:true,
        }
    ]

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
                        </div>
                    )
                }):
                <Fragment>
                    <div  className='scanSchemeRuleSet-style'>
                        <div  className='border-style' onClick={()=>cuteBorder(item)}>
                            <div className='border-data-style'>
                                <div className='data-title'>{scanSonar.deployEnv?.envType}环境地址</div>
                                <Tooltip placement="top" title={scanSonar.deployEnv?.envAddress} >
                                    <div className='data-desc'>
                                        <Omit value={scanSonar.deployEnv?.envAddress} maxWidth={1000}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div  className='scanSchemeRuleSet-style'>
                        <div  className='border-style' onClick={()=>cuteBorder(item)}>
                            <div className='border-data-style'>
                                <div className='data-title'>{scanSonar.deployServer?.serverName}地址</div>
                                <Tooltip placement="top" title={scanSonar.deployServer?.serverAddress} >
                                        <div className='data-desc'>
                                            <Omit value={scanSonar.deployServer?.serverAddress} maxWidth={1000}/>
                                        </div>
                                    </Tooltip>
                            </div>
                        </div>
                    </div>
                </Fragment>

            }
        </div>
    )
}
export default observer(ScanSchemeRuleSet)
