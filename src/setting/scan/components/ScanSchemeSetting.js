/**
 * @name: ScanSchemeSetting
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description： 扫描方案设置
 * @update: 2023-11-1 10:13
 */

import {Form, Input, Popconfirm, Tooltip} from "antd";
import React,{useState,useEffect,Fragment} from 'react';
import Btn from "../../../common/btn/Btn";
import {PrivilegeProjectButton} from "thoughtware-privilege-ui";
import "./ScanSchemeSetting.scss"
import ScanPlayStore from "../../../repository/scan/store/ScanPlayStore";
import {DeleteOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
const { TextArea } = Input;
const layout = {
    labelCol: { span: 6},
    wrapperCol: { span: 12},
};
const ScanSchemeSetting = (props) => {
    const {scanScheme,updateScanScheme,deleteScanScheme}=props

    const {findScanPlayList}=ScanPlayStore
    const [form] = Form.useForm()
    const [deleteState,setDeleteState]=useState(false)

    useEffect(()=>{
        form.setFieldsValue({
            schemeName:scanScheme.schemeName,
            describe:scanScheme.describe
            })

        findScanPlayList({scanSchemeId:scanScheme.id}).then(res=>{
            if (res.code===0&&res.data&&res.data.length>0){
                
                setDeleteState(true)
            }else {
                setDeleteState(false)
            }
        })
    },[scanScheme])

    //确认
    const onOk = () => {
        form.validateFields().then(async values => {
            updateScanScheme({...scanScheme,schemeName:values.schemeName,describe:values.describe})
        })

    }
    return(
        <Fragment>
            <Form form={form}
                  {...layout}
                  layout='vertical'
                  autoComplete='off'
            >
                <Form.Item
                    label={'方案名称'}
                    name={'schemeName'}
                    rules={[{required:true,message:'方案名称不能为空'}]}
                >
                    <Input  placeholder={"方案名称"}/>
                </Form.Item>
                <Form.Item
                    label={'方案描述'}
                    name={'describe'}
                >
                    <TextArea showCount maxLength={200}  placeholder="方案描述"   style={{
                        height: 120,
                        resize: 'none',
                    }}/>
                </Form.Item>
            </Form>
            <Btn
                type={'primary'}
                title={'确定'}
                onClick={() => {
                    form.validateFields()
                        .then((values) => {
                            onOk(values)
                        })
                }}
            />



            <div className='scanSchemeSetting'>
                <div className='delete-title'>删除方案</div>
                <div className='delete-des'>删除后不可恢复，请谨慎操作  </div>
            </div>
            {
                !deleteState?
                    <Popconfirm
                        title="你确定删除吗"
                        onConfirm={()=>deleteScanScheme(scanScheme.id)}
                        okText="确定"
                        cancelText="取消"
                        placement="topRight"
                    >
                        <Btn
                            type={'primary'}
                            title={'删除'}

                        />
                    </Popconfirm>
                    :
                    <Tooltip title='已存在关联的扫描计划，请先将所关联的计划切换至其他方案后再试'>
                        <span>
                            <Btn
                                type={'disabled'}
                                title={'删除'}
                            />
                        </span>

                    </Tooltip >

            }
        </Fragment>
    )
}
export default observer(ScanSchemeSetting)
