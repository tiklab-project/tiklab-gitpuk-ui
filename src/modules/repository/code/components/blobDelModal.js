import React,{useEffect, useState} from 'react';
import {CloseOutlined} from '@ant-design/icons';
import {Modal,Form,Input} from 'antd';
import Btn from '../../../common/btn/btn';
import {autoHeight} from '../../../common/client/client';

const BlobDelModal = props =>{

    const {delVisible,setDelVisible,blobFile} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    useEffect(()=>{
        if(delVisible){
            form.setFieldsValue({
                commitMessage: `删除${blobFile && blobFile.fileName}`,
                commitBranch : 'master'
            })
        }
    },[delVisible])

    const onOk = values => {
        setDelVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setDelVisible(false)}
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

    return (
        <Modal
            visible={delVisible}
            onCancel={()=>setDelVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className='xcode bold-del-modal'
            destroyOnClose={true}
        >
            <div className='bold-del-up'>
                <div>删除{blobFile && blobFile.fileName}</div>
                <div style={{cursor:'pointer'}} onClick={()=>setDelVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='bold-del-content'>
                <Form form={form} layout="vertical" autoComplete="off">
                    <Form.Item label={'提交信息'} name={'commitMessage'}
                               rules={[{required:true,message:`提交信息不能为空`}]}
                    ><Input/></Form.Item>
                    <Form.Item label={'提交分支'} name={'commitBranch'}
                               rules={[{required:true,message:`提交分支不能为空`}]}
                    ><Input/></Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default BlobDelModal
