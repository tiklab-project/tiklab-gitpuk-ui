
import React, {useEffect, useState} from "react";
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import {Form, Input} from "antd";
import SystemIntStore from "../store/SystemIntStore";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import {autoHeight, Validation} from "../../../../common/client/Client";


const RedactSystemInt = (props) => {
    const [form] = Form.useForm()

    const {visible,setVisible,title,code,integration,setIntegration}=props
    const {createIntegrationAddress,updateIntegrationAddress}=SystemIntStore


    useEffect(()=>{
        if (integration){
            form.setFieldsValue({
                integrationAddress: integration.integrationAddress,
                account:integration.account,
                password:integration.password
            })
        }
    },[integration])

    const cancelVisible = () => {
        setVisible(false)
        setIntegration(null)
    }

    //确认添加
    const onOk = () => {
        form.validateFields().then((values) => {

            if (integration){
                updateIntegrationAddress({...integration,...values}).then(res=>{
                    res.code===0&&cancelVisible()
                })
            }else {
                createIntegrationAddress({...values,code:code}).then(res=>{
                    res.code===0&&cancelVisible()
                })
            }
        })
    }

    //校验服务地址
    const Validation = () => {
        return {
            pattern: /^(http:\/\/|https:\/\/)/,
            message: `请输入正确地址`,
        }
    }


    const modalFooter = (
        <>
            <Btn onClick={cancelVisible} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={cancelVisible}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={title}
        >
            <Form form={form} layout='vertical' autoComplete='off'>
                <Form.Item
                    label={'服务地址'}
                    name={'integrationAddress'}
                    rules={[{required:true,message:'服务地址不为空'},
                        Validation()]}
                >
                    <Input placeholder={'格式示例:http://e.arbess.tiklab.net'}/>
                </Form.Item>
                <Form.Item
                    label={'账号'}
                    name={'account'}
                    rules={[{required:true,message:'账号不能为空'}]}
                >
                    <Input placeholder={'请输入账号'}/>
                </Form.Item>
                <Form.Item
                    label={'密码'}
                    name={'password'}
                    rules={[{required:true,message:'密码不能为空'}]}
                >
                    <Input placeholder={'请输入密码'}/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default RedactSystemInt
