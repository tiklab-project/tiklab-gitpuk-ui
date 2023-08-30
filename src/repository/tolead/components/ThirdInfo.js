/**
 * @name: ThirdInfo
 * @author:
 * @date: 2023-08-03 14:30
 * @description：第三方信息
 * @update: 2023-08-03 14:30
 */
import React from 'react';
import {observer} from "mobx-react";
import './ThirdInfo.scss';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Form, Input,message} from "antd";
import Btn from "../../../common/btn/Btn";
import ToLeadStore from "../store/ToLeadStore"
import {getUser} from "tiklab-core-ui";
const ThirdInfo = (props) => {
    const {match:{params}} = props
    const [form] = Form.useForm()
    const {createImportAuth}=ToLeadStore


    const onOk = () => {
        form.validateFields().then((values) => {
           createImportAuth({...values,type:params.type,userId:getUser().userId}).then(res=>{
               message.success("添加认证信息成功",1)
               props.history.push(`/index/repository/lead/thirdList/${res.data}`)
           })
        })
    }
    /**
     * 跳转到上一级路由
     */
    const goBack = () => {

        props.history.go(-1)
    }

    return(
        <div className='xcode third-info'>
            <div className='third-info-content'>
                <BreadcrumbContent firstItem='导入外部仓库 / 私服Gitlab导入' goBack={goBack}/>
                <div className='from-top'>
                    <Form
                        form={form}
                        autoComplete='off'
                        layout='vertical'
                        initialValues={{group:1}}
                    >
                        <Form.Item
                            label='Gitlab地址'
                            name='address'
                            rules={[{required:true,message:'请输入gitlab地址'}]}
                        >
                            <Input style={{background:'#fff'}}  placeholder="例：http://gitlab.my.net" />
                        </Form.Item>
                        <Form.Item
                            label='Access Token'
                            name='accessToken'
                            rules={[{required:true,message:'请输入Access Token'}]}
                        >
                            <Input style={{background:'#fff'}}  placeholder="例：MdhpVh-ikyKKZ4Uzu" />
                        </Form.Item>
                    </Form>
                    <Btn onClick={goBack} title={'取消'} isMar={true}/>
                    <Btn onClick={onOk} type={'primary'} title={'确认'}/>
                </div>
            </div>
        </div>
    )
}
export default observer(ThirdInfo)
