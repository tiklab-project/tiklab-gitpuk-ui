
/**
 * @name: ScanSchemeDrawer
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案详情抽屉
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Drawer, Space, Tooltip} from 'antd'
import {CloseOutlined} from "@ant-design/icons";
import "./ScanSchemeDrawer.scss"
import Omit from "../../../common/omit/Omit";
import Btn from "../../../common/btn/Btn";
const ScanSchemeDrawer = (props) => {
    const {visible,setVisible,notSchemeRuleSet,scanScheme,createScanSchemeRuleSet}=props

    const [choiceRuleSet,setChoiceRuleSet]=useState([])


    //取消弹窗
    const cancelDrawer = () => {
        setChoiceRuleSet([])
        setVisible(false)
    }

    //选择规则集border
    const choiceBorder = (value) => {
        if (choiceRuleSet.length>0){
            const rulesetList=choiceRuleSet.filter(item=>item===value.id);
            if (rulesetList.length>0){
               setChoiceRuleSet(choiceRuleSet.filter(item=>item!==value.id))
            }else {
                setChoiceRuleSet(choiceRuleSet.concat(value.id))
            }
        }else {
            setChoiceRuleSet([value.id])
        }
    }

    //添加
    const onOk = () => {
        if (choiceRuleSet.length>0){
            choiceRuleSet.map(item=>{
                createScanSchemeRuleSet({scanSchemeId:scanScheme.id,scanRuleSet:{id:item}})
            })
            cancelDrawer()
        }
    }

    const modalFooter = (
        <>
            <Btn onClick={onOk} title={'确定'} type={'primary'} isMar={true}/>
            <Btn onClick={cancelDrawer} title={'取消'} />
        </>
    )
    return(
        <Drawer
            title={'添加规则'}
            placement='right'
            closable={false}
            width={"40%"}
            onClose={cancelDrawer}
            visible={visible}
            footer={modalFooter}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={cancelDrawer} />
            }
        >
            <div className='scheme-drawer'>
                <div className='scheme-drawer-title'>
                    <div>选择规则包 </div>
                    <div className='scheme-drawer-dec'>(可多选) </div>
                </div>
                <div className='scheme-drawer-border-style'>
                    {
                        notSchemeRuleSet&&notSchemeRuleSet.length>0&&notSchemeRuleSet.map(item=>{
                            return(
                                <div className={`${choiceRuleSet.filter(value=>value===item.id).length>0?"choice-scheme-drawer-border":"scheme-drawer-border"}`} onClick={()=>choiceBorder(item)}>
                                    <div className='data-title'>{item.ruleSetName}</div>
                                    <Tooltip placement="top" title={item.describe} >
                                        <div className='data-desc'>
                                            <Omit value={item.describe} maxWidth={300}/>
                                        </div>
                                    </Tooltip>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </Drawer>
    )
}
export default ScanSchemeDrawer
