/**
 * @name: InfoSetting
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：Sonar信息设置
 * @update: 2023-05-22 14:30
 */

import React, {useState} from "react";
import {Drawer, Form} from 'antd'
import "./InfoSetting.scss"
import BasicInfo from "./BasicInfo";
const InfoSetting = (props) => {

    const {addVisible,setAddVisible,repositoryName,deployServerList,deployEnvList,createCodeScan,repositoryInfo,codeScan} = props
    const [table,setTable]=useState('basic')
    const [form] = Form.useForm()
    const cuteTable =async (value) => {
      setTable(value)
    }

    const onClose =async () => {
        form.validateFields().then((values) => {
            const param={
                ...values,
                repository:{
                    rpyId:repositoryInfo.rpyId
                },
                deployServer:{
                    id:values.deployServerId
                }
            }
            debugger
            createCodeScan(param)
        })
      setAddVisible(false)
    }
    return(
        <Drawer
            title="信息设置"
            placement='right'
            onClose={onClose}
            visible={addVisible}
            width  ={'500'}
            className='locker-top'
        >
            <div className='info-setting-type '>
                    <div className={`${table==="basic"&&" choose_type"} guide-type-title`} onClick={()=>cuteTable('basic')}>基本信息</div>
                    <div className={`${table==="trigger"&&" choose_type"} guide-type-title info-setting-title-m`} onClick={()=>cuteTable('trigger')}>触发设置</div>
            </div>
            {
                table==="basic"&&
                <div className='info-setting-top'>
                    <BasicInfo repositoryName={repositoryName} deployServerList={deployServerList} deployEnvList={deployEnvList} codeScan={codeScan} form={form} />
                </div>

            }
        </Drawer>
    )
}
export default InfoSetting
