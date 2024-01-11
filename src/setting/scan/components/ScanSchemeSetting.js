/**
 * @name: ScanSchemeSetting
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description： 扫描方案设置
 * @update: 2023-11-1 10:13
 */

import {Form, Input, Popconfirm, Select, Tooltip} from "antd";
import React,{useState,useEffect,Fragment} from 'react';
import Btn from "../../../common/btn/Btn";
import "./ScanSchemeSetting.scss"
import {observer} from "mobx-react";
import scanEnvStore from "../store/ScanEnvStore";
const { TextArea } = Input;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 12},
};
const ScanSchemeSetting = (props) => {
    const {updateScanSchemeSonar,scanSonar,findScanSchemeSonarList,setScanSonar}=props

    const {deployEnvList,findDeployEnvList,findDeployServerList,deployServerList} = scanEnvStore

    const [maven,setMaven]=useState('')
    const [sonar,setSonar]=useState('')
    const [form] = Form.useForm()


    useEffect(()=>{
        findDeployEnvList();
        findDeployServerList("sonar")
        setMaven(scanSonar.deployEnv.id)
        setSonar(scanSonar.deployServer.id)
    },[])

    //确认
    const onOk = () => {
        form.validateFields().then(async values => {
            updateScanSchemeSonar({...scanSonar,deployEnv:{id:maven},deployServer:{id:sonar}}).then(res=>{
                res.code===0&&findScanSchemeSonarList({scanSchemeId:scanSonar.scanSchemeId}).then(res=>{
                    if (res.code===0&&res.data){
                        setScanSonar(res.data[0])
                    }
                })
            })
        })
    }

    //修改maven环境
    const changeMaven= (value) => {
        setMaven(value)
    }
    //修改sonar环境
    const changeSonar = (value) => {
        setSonar(value)
    }

    return(
        <Fragment>
            <Form form={form}
                  {...layout}
                  layout='vertical'
                  autoComplete='off'
            >
                <Form.Item
                    label={'maven环境'}
                    name={'envId'}

                >
                    <Select defaultValue={scanSonar.deployEnv.id} onSelect={changeMaven}>
                        {
                            deployEnvList&&deployEnvList.map(item=>{
                                return(
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.envName}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'sonar环境'}
                    name={'serverId'}
                >
                    <Select defaultValue={scanSonar.deployServer.id} onSelect={changeSonar}>
                        {
                            deployServerList&&deployServerList.map(item=>{
                                return(
                                    <Select.Option key={item.id} value={item.id}>
                                        {item. serverName}
                                    </Select.Option>
                                )
                            })
                        }

                    </Select>
                </Form.Item>
            </Form>

            {
                maven!==scanSonar.deployEnv.id||sonar!==scanSonar.deployServer.id?
                <Btn type={'primary'} title={'确定'}
                     onClick={() => {
                         form.validateFields()
                             .then((values) => {
                                 onOk(values)
                             })
                     }}
                />:
                <Btn type={'disabled'} title={'确定'}/>

            }
        </Fragment>
    )
}
export default observer(ScanSchemeSetting)
