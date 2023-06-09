/**
 * @name: BasicInfo
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：Sonar基本信息
 * @update: 2023-05-22 14:30
 */
import React, {useState,useEffect} from "react";
import {Form, Input,Select,Button,Space,Divider} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ServerAddressAdd from "./ServerAddressAdd";
import EnvDeployAdd from "./EnvDeployAdd";
const BasicInfo = (props) => {

    const {repositoryName,deployServerList,deployEnvList,codeScan,form}=props
    //打开添加服务地址
    const [addVisible,setAddVisible]=useState(false)
    //打开添加环境地址
    const [addEnvVisible,setAddEnvVisible]=useState(false)

    useEffect( ()=>{
        if (codeScan){
            form.setFieldsValue({
                taskName: codeScan.taskName,
                deployEnvId: codeScan.deployEnvId,
                deployServerId: codeScan.deployServer.id,
            })
        }

    },[codeScan])

    const openServer = () => {
      setAddVisible(true)
    }
    const openEnv = () => {
        setAddEnvVisible(true)
    }



    return(
        <div>
            <Form
                form={form}
                layout='vertical'
                autoComplete='off'
                initialValues={{taskName:`${repositoryName}检测任务`,deployEnvId:deployEnvList.length>0&&deployEnvList[0].id,
                    deployServerId:deployServerList.length>0&&deployServerList[0].id}}
            >
                <Form.Item
                    label={'任务名称'}
                    name={'taskName'}
                    rules={[{required:true,message:'必填'}]}
                ><Input/>
                </Form.Item>
                <Form.Item
                    label={'执行环境'}
                    name={'deployEnvId'}
                    rules={[{required:true,message:'必填'}]}
                >
                    <Select
                        defaultValue={deployEnvList.length>0?deployEnvList[0].id:null}
                        style={{
                            width: 450,
                        }}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space>
                                    <Button type="text" icon={<PlusOutlined />} onClick={openEnv} >
                                        添加
                                    </Button>
                                </Space>
                            </>

                        )}
                        options={deployEnvList&&deployEnvList.map((item) => ({
                            label: item.envName,
                            value: item.id,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label={'服务地址'}
                    name={'deployServerId'}
                    rules={[{required:true,message:'必填'}]}
                >
                    <Select
                        defaultValue={deployServerList.length>0?deployServerList[0].id:null}
                        style={{
                            width: 450,
                        }}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: '8px 0',
                                    }}
                                />
                                <Space>
                                    <Button type="text" icon={<PlusOutlined />} onClick={openServer} >
                                        添加
                                    </Button>
                                </Space>
                            </>

                        )}
                        options={deployServerList&&deployServerList.map((item) => ({
                            label: item.taskName,
                            value: item.id,
                        }))}
                    />
                </Form.Item>
            </Form>
            <ServerAddressAdd addVisible={addVisible} setAddVisible={setAddVisible}/>
            <EnvDeployAdd addVisible={addEnvVisible} setAddVisible={setAddEnvVisible}/>
        </div>

    )

}

export default BasicInfo
