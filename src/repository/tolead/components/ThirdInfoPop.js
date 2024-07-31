/**
 * @name: ThirdInfoPop
 * @date: 2024-03-13 14:30
 * @description：第三方信息
 * @update: 2024-03-13 14:30
 */
import React from 'react';
import Modals from "../../../common/modal/Modal";
import {observer} from "mobx-react";
import Btn from "../../../common/btn/Btn";
import {Form, Input, message} from "antd";
import ToLeadStore from "../store/ToLeadStore"
import {getUser} from "thoughtware-core-ui";
const ThirdInfoPop = (props) => {
    const {visible,setVisible,type,title}=props
    const [form] = Form.useForm()
    const {createImportAuth}=ToLeadStore

    //关闭弹窗
    const closeVisible = () => {
        form.resetFields()
        setVisible(false)
    }


    //添加
    const onOk = () => {
        form.validateFields().then((values) => {
            createImportAuth({...values,type:type,userId:getUser().userId}).then(res=>{
                if (res.code===0){
                    closeVisible(false)
                    message.success("添加认证信息成功",1)
                    props.history.push(`/repository/lead/thirdList/${res.data}`)
                }
            })
        })
    }

    const modalFooter = (
        <>
            <Btn onClick={closeVisible} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'添加'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            open={visible}
            onCancel={closeVisible}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={title}
        >
            <Form
                form={form}
                autoComplete='off'
                layout='vertical'
            >
                {
                    type==='priGitlab'&&
                    <Form.Item
                        label='Gitlab地址'
                        name='address'
                        rules={[{required:true,message:'请输入gitlab地址'}]}
                    >
                        <Input style={{background:'#fff'}}  placeholder="例：http://gitlab.my.net" />
                    </Form.Item>
                }
                <Form.Item
                    label='Access Token'
                    name='accessToken'
                    rules={[{required:true,message:'请输入Access Token'}]}
                >
                    <Input style={{background:'#fff'}}  placeholder="例：MdhpVh-ikyKKZ4Uzu" />
                </Form.Item>

            </Form>
        </Modals>
    )
}
export default ThirdInfoPop
