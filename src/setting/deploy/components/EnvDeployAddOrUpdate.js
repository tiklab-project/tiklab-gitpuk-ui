/**
 * @name: DevDeployAddOrUpdate
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：创建更新环境配置
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import Btn from "../../../common/btn/Btn";
import {CloseOutlined} from "@ant-design/icons";
import "./EnvDeploy.scss"
const EnvDeployAddOrUpdate = (props) => {
    const {addVisible,setAddVisible,createDeployEnv} = props
    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

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
        <Modal
            visible={addVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className='xcode dev-deploy-add-modal'
            destroyOnClose={true}
        >
            <div className='dev-deploy-add-up'>
                <div>添加环境配置</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='dev-deploy-add-content'>
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
        </Modal>
    )
}
export default EnvDeployAddOrUpdate