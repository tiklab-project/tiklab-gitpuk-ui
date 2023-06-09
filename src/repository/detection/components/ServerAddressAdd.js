/**
 * @name: ServerAddressAdd
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：添加服务器地址
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import {inject, observer} from "mobx-react";
const { TextArea } = Input;
const ServerAddressAdd = (props) =>{

    const {addVisible,setAddVisible,deployStore} = props
    const {createDeployServer}=deployStore

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    const [authType,setAuthType]=useState('account')

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    /**
     * 创建供应应用地址
     * @param values
     */
    const onOk = values =>{
        createDeployServer(values)

        setAddVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddVisible(false)}
                title={'取消'}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields()
                            onOk(values)
                        })
                }}
                title={'确定'}
                type={'primary'}
            />
        </>
    )

    //切换认证类型
    const changeAuthType =async (value) => {
      setAuthType(value)
    }
    return (
        <Modal
            visible={addVisible}
            onCancel={()=>setAddVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className='xcode sonar-add-modal'
            destroyOnClose={true}

        >
            <div className='sonar-add-up'>
                <div>sonar设置</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='sonar-add-content'>
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    initialValues={{serverName:'sonar',authType:'account'}}
                >
                    <Form.Item
                        label={'授权类型'}
                        name={'serverName'}
                    >
                        <Input placeholder={"Sonar"}   disabled/>
                    </Form.Item>
                    <Form.Item
                        label={'任务名称'}
                        name={'taskName'}
                    >
                        <Input placeholder={"例如：任务1"}  />
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
                            defaultValue="userName&passWord"
                            options={[
                                { value: 'account', label: 'userName&passWord' },
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
        </Modal>
    )
}


export default inject('deployStore')(observer(ServerAddressAdd))
