/**
 * @name: ScanSchemeRuleEditPop
 * @author: limingliang
 * @date: 2023-11-15 14:30
 * @description：扫描方案的规则的编辑弹窗
 * @update: 2023-11-15 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Form, Input, Select} from "antd";
const levelList=[{key:1,value:"严重"},{key:2,value:"警告"},{key:3,value:"建议"}]
const ScanSchemeRuleEditPop = (props) => {
    const [form] = Form.useForm()
    const {editVisible,setEditVisible,updateScanSchemeRule,schemeRule}=props
    const [level,setLevel]=useState("")  //问题等级


    useEffect(()=>{
        if (schemeRule){
            form.setFieldsValue({
                problemLevel:schemeRule.problemLevel,
            })

        }
    },[editVisible])


    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setEditVisible(false)
    }

    const onOk = () => {
        form.validateFields().then(async values => {
            updateScanSchemeRule({...schemeRule,problemLevel:level}).then(res=>{
                res.code===0&&cancel()
            })
        })
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    //选择问题等级
    const choiceLevel = (value) => {
        setLevel(value)
    }

    return(
        <Modals
            open={editVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"编辑规则信息"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
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

            </Form>
        </Modals>
    )

}
export default ScanSchemeRuleEditPop
