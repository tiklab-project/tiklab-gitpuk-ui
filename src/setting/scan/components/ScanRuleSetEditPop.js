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
const ruleSetTypeList=[{key:"function",value:"功能"},{key:"norm",value:"规范"},{key:"secure",value:"安全"}]
const languageList=["Java","Node.js"]
const ScanRuleSetEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,createScanRuleSet}=props

    const [ruleSetType,setRuleSetType]=useState("")  //规则集类型
    const [language,setLanguage]=useState('')

    //创建
    const onOk = () => {
        form.validateFields().then(async values => {
            createScanRuleSet({ruleSetName:values.ruleSetName,ruleSetType:ruleSetType,language:language,describe:values.describe}).then(res=>{
                res.code===0&&cancel()
            })
        })
    }

    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }

    //选择规则集类型
    const choiceRuleSetType = (value) => {
        setRuleSetType(value)
    }
    const choiceLanguageType = (e) => {
        setLanguage(e.target.value)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            open={editVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"添加规则集"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'规则集名称'}
                    name={'ruleSetName'}
                    rules={[{required:true,message:'规则集名称不能为空'}]}
                >
                    <Input  placeholder={"规则集名称"}/>
                </Form.Item>
                <Form.Item
                    label={'规则集类型'}
                    name={'ruleSetType'}
                    rules={[{required:true,message:'规则集类型不能为空'}]}
                >
                    <Select   allowClear onChange={choiceRuleSetType} placeholder={"请选择规则集类型"}>
                        {
                            ruleSetTypeList.map(item=>{
                                    return(
                                        <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'检测语言'}
                    name={'language'}
                    rules={[{required:true,message:'检测语言'}]}
                >
                    <div className='language-type'>
                        {
                            languageList.map(item=>{
                                return(
                                    <Checkbox key={item} onChange={choiceLanguageType} value={item}>{item}</Checkbox>
                                )
                            })
                        }
                    </div>
                </Form.Item>
                <Form.Item
                    label={'方案描述'}
                    name={'describe'}
                >
                    <TextArea showCount maxLength={100}  placeholder="方案描述" />
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default ScanRuleSetEditPop
