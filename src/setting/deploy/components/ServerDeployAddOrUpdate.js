/**
 * @name: ServerDeployAddOrUpdate
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：创建更新环境配置
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Select} from 'antd';
import Btn from "../../../common/btn/Btn";
import Modals from "../../../common/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import "./EnvDeploy.scss"

const ServerDeployAddOrUpdate = (props) => {
    const {addVisible,setAddVisible,createDeployServer} = props

    const [form] = Form.useForm()
    const [authType,setAuthType]=useState('account')
    const [serverType,setServerType]=useState('')
    /**
     * 添加密钥
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            createDeployServer({...values,serverAuth:"public"})
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


    //切换认证类型
    const changeAuthType =async (value) => {
        setAuthType(value)
    }
    //切换服务类型
    const changeServerType = (value) => {
      setServerType(value)
    }
    return(
        <Modals
            visible={addVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"添加服务配置"}
        >
            <div className='server-deploy-add-modal'>
                <Form form={form} layout='vertical' autoComplete='off'
                      initialValues={{serverName:'sonar',authType:'account'}}
                >
                    <Form.Item
                        label={'授权类型'}
                        name={'serverName'}
                        rules={[
                            {required:true,message:'授权类型不能为空'},
                        ]}
                    >
                        <Select
                            defaultValue="sonar"
                            options={[
                                { value: 'sonar', label: 'sonar' },
                            ]
                            } onChange={changeServerType}
                        />
                    </Form.Item>
                    <Form.Item
                        label={'名称'}
                        name={'taskName'}
                        rules={[
                            {required:true,message:'名称不能为空'},
                        ]}
                    ><Input  placeholder={"任务名称"}/>
                    </Form.Item>
                    <Form.Item
                        label={'服务器地址'}
                        name={'serverAddress'}
                        rules={[{required:true,message:'必填'}]}
                    >
                        <Input placeholder={"sonar访问地址"}/>
                    </Form.Item>
                    <Form.Item
                        label={'认证类型'}
                        name={'authType'}
                    >
                        <Select
                            defaultValue="account"
                            options={[
                                { value: 'account', label: '账号' },
                                { value: 'privateKey', label: '私钥' },
                            ]
                            } onChange={changeAuthType}
                        />
                    </Form.Item>
                    {
                        authType==='account'?
                            <>
                                <Form.Item
                                    label={'用户名'}
                                    name={'userName'}
                                    rules={[{required:true,message:'必填'}]}
                                >
                                    <Input placeholder={"sonar登录用户名"}/>
                                </Form.Item>
                                <Form.Item
                                    label={'密码'}
                                    name={'passWord'}
                                    rules={[{required:true,message:'必填'}]}
                                >
                                    <Input placeholder={"sonar登录密码"}/>
                                </Form.Item>
                            </>:
                            <Form.Item
                                label={'私钥'}
                                name={'privateKey'}
                                rules={[{required:true,message:'必填'}]}
                            >
                                <TextArea  rows={4} placeholder={"sonar授权访问私钥"}/>
                            </Form.Item>
                    }
                </Form>
            </div>
        </Modals>
    )
}
export default ServerDeployAddOrUpdate
