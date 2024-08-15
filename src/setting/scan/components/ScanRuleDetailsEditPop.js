/**
 * @name: ScanPlayEditPop
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：编辑扫描规则弹窗
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect,Fragment} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Checkbox, Form, Input, Select} from "antd";
const { TextArea } = Input;


const levelList=[{key:1,value:"严重"},{key:2,value:"警告"},{key:3,value:"建议"}]
const ScanRuleDetailsEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanRule,scanRuleSetId}=props

    const [level,setLevel]=useState("")  //问题等级


    //创建
    const onOk = () => {
        form.validateFields().then(async values => {
            createScanRule({ruleSetId:scanRuleSetId,ruleName:values.ruleName,scanTool:values.scanTool,problemLevel:level,ruleOverview:values.ruleOverview,
                describe:values.describe,}).then(res=>{

                    cancel()
            })
        })
    }

    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }

    //选择问题等级
    const choiceLevel = (value) => {
        setLevel(value)
    }


    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={editVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"添加规则"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'规则名称'}
                    name={'ruleName'}
                    rules={[{required:true,message:'规则名称不能为空'}]}
                >
                    <Input  placeholder={"规则名称"}/>
                </Form.Item>
                <Form.Item
                    label={'问题等级'}
                    name={'problemLevel'}
                    rules={[{required:true,message:'问题等级不能为空'}]}
                >
                    <Select   allowClear onChange={choiceLevel} placeholder={"问题等级"}>
                        {
                            levelList.map(item=>{
                                    return(
                                        <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'所属工具'}
                    name={'scanTool'}
                >
                    <Input  placeholder={"所属工具"}/>
                </Form.Item>
                <Form.Item
                    label={'方案概述'}
                    name={'ruleOverview'}
                >
                    <TextArea showCount maxLength={100}  placeholder="方案概述" />
                </Form.Item>
                <Form.Item
                    label={'方案描述'}
                    name={'describe'}
                >
                    <TextArea showCount maxLength={400}  placeholder="方案描述" />
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default ScanRuleDetailsEditPop
