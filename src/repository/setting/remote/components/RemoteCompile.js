/**
 * @name: BasicInfo
 * @author: limingliang
 * @date: 2023-07-12 14:30
 * @description：远程代码库编辑
 * @update: 2023-07-12 14:30
 */
import React,{useState,useEffect} from 'react';
import './Remote.scss';
import {Form, Input, Modal, Select} from "antd";
import Btn from "../../../../common/btn/Btn";
import {autoHeight} from '../../../../common/client/Client';

const RemoteCompile = (props) => {
    const {open,setOpen,createRemoteInfo,rpyId,remoteInfo,updateRemoteInfo}=props
    const [form] = Form.useForm()

    const [authWay,setAuthWay]=useState("password")  //认证方式
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])


    useEffect(()=>{
       if (remoteInfo){
           form.setFieldsValue({
               name:remoteInfo?.name,
               authWay:remoteInfo?.authWay,
               address:remoteInfo?.address,
               account:remoteInfo?.account,
               password:remoteInfo?.password,
               secretKey:remoteInfo?.secretKey
           })
           setAuthWay(remoteInfo?.authWay)
       }

    },[remoteInfo])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    //切换认证方式
    const handleChangeWay = (value) => {
        setAuthWay(value)
    }

    const close = () => {
      form.resetFields()
      setOpen(false)
    }

    const compileRemote = () =>{
        form.validateFields().then((values) => {
            if (remoteInfo){
                updateRemoteInfo({...values,authWay:authWay,id:remoteInfo.id})
            }else {
                createRemoteInfo({...values,authWay:authWay,rpyId:rpyId})
            }
            close(false)
        })
    }



    const modalFooter = (
        <>
            <Btn
                onClick={()=>close(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={compileRemote}
                title={"确定"}
                type={"primary"}
            />
        </>
    )




    return(
        <Modal
            open={open}
            onCancel={()=>close(false)}
            footer={modalFooter}
            closable={false}
            className='xcode remote-compile'
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
        >
            <div className='remote-add-up'>
                创建连接
            </div>
            <div className='remote-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item label={'镜像名称'} name={'name'}
                               rules={[{required:true,message:`标题不能为空`}]}
                    >
                        <Input placeholder={"请输入镜像名称"}/>
                    </Form.Item>
                    <Form.Item label={'地址'}  name={'address'} rules={[{required:true,message:`地址不能为空`}]}>
                        <Input placeholder={"仓库地址 例：https://gitlab.com/group/project.git"}/>
                    </Form.Item>
                    <Form.Item name={'authWay'} label={'认证方式'} >
                        <Select
                            defaultValue="password"
                            value={authWay}
                            onChange={handleChangeWay}
                            options={[
                                {
                                    value: 'password',
                                    label: '账号密码',
                                },
                                {
                                    value: 'token',
                                    label: '个人令牌',
                                }]}
                            />
                    </Form.Item>
                    {
                        authWay==='password'?
                            <>
                                <Form.Item label={'账号'} name='account' rules={[{required:true,message:`账号不能为空`}]}>
                                    <Input placeholder={"请输入账号"} />
                                </Form.Item>
                                <Form.Item label={'密码'} name='password' rules={[{required:true,message:`密码不能为空`}]}>
                                    <Input placeholder={"请输入密码"}/>
                                </Form.Item>
                            </>:
                            <Form.Item label={'个人令牌'} name='secretKey' rules={[{required:true,message:`密钥不能为空`}]}>
                                <Input placeholder={"请输入个人令牌"}/>
                            </Form.Item>
                    }
                </Form>
            </div>
        </Modal>

    )
}
export default RemoteCompile
