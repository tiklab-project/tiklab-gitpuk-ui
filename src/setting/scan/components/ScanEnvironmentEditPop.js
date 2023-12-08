/**
 * @name: ScanEnvironmentEditPop
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：创建更新扫描环境
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Form, Input, Select} from 'antd';
import Btn from "../../../common/btn/Btn";
import Modals from "../../../common/modal/Modal";
import "./EnvExec.scss";
import TextArea from "antd/es/input/TextArea";
import deployStore from "../store/DeployStore";
const ScanEnvironmentEditPop = (props) => {
    const {addVisible,setAddVisible} = props
    const {createDeployEnv,createDeployServer} = deployStore

    const [form] = Form.useForm()

    const [envType,setEnvType]=useState('maven')  //认证信息
    const [authType,setAuthType]=useState('account')  //认证信息

    /**
     * 添加
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            if (envType==='maven'){
                createDeployEnv(values)
            }
            if (envType==='sonar'){
                createDeployServer({...values,authType:authType,taskName:values.envName,serverName:'sonar',serverAddress:values.envAddress,serverAuth:"public"})
            }

            cancel()
        })
    }
    //取消
    const  cancel= () => {
        setEnvType('')
        setAuthType('')
        setAddVisible(false)
        form.resetFields()
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    //切换环境信息
    const changeEnvType = (value) => {

        setEnvType(value)
    }
    //切换认证信息
    const changeAuthType = (value) => {
        setAuthType(value)
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
                                { value: 'sonar', label: 'sonar' },
                            ]
                            } onChange={changeEnvType}
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
                    {
                        envType==='sonar'&&
                        <Fragment>
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
                        </Fragment>
                    }
                </Form>
            </div>
        </Modals>
    )

}
export default ScanEnvironmentEditPop
