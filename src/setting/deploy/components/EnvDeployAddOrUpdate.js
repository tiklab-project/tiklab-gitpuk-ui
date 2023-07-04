/**
 * @name: DevDeployAddOrUpdate
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：创建更新环境配置
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Select} from 'antd';
import Btn from "../../../common/btn/Btn";
import Modals from "../../../common/modal/Modal";
import "./EnvDeploy.scss";

const EnvDeployAddOrUpdate = (props) => {

    const {addVisible,setAddVisible,createDeployEnv} = props
    const [form] = Form.useForm()

    /**
     * 添加
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            createDeployEnv(values)
            cancel()
        })
    }

    const  cancel= () => {
        setAddVisible(false)
       form.resetFields()
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    const changeAuthType = () => {

    }
    return(
        <Modals
            visible={addVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"添加环境配置"}
        >
            <div className='dev-deploy-add-modal'>
                <Form form={form} layout='vertical' autoComplete='off'
                      initialValues={{envType:'maven'}}
                >
                    <Form.Item
                        label={'环境配置类型'}
                        name={'envType'}
                        rules={[
                            {required:true,message:'环境配置类型不能为空'},
                        ]}
                    >
                        <Select
                            defaultValue="maven"
                            options={[
                                { value: 'maven', label: 'maven' },
                            ]
                            } onChange={changeAuthType}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'名称'}
                        name={'envName'}
                        rules={[
                            {required:true,message:'名称不能为空'},
                        ]}
                    ><Input  placeholder={"任务名称"}/>
                    </Form.Item>
                    <Form.Item
                        label={'地址'}
                        name={'envAddress'}
                        rules={[{required:true,message:'地址不能为空'},]}
                    ><Input placeholder={"maven/bin 地址"}/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}
export default EnvDeployAddOrUpdate
