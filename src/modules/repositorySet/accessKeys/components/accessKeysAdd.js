import React,{useState,useEffect} from 'react';
import {Modal,Form,Input} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/client';
import Btn from '../../../common/btn/btn';

const AccessKeysAdd = props =>{

    const {addVisible,setAddVisible} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onOk = () =>{

    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddVisible(false)}
                title={"取消"}
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
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    return (
        <Modal
            visible={addVisible}
            onCancel={()=>setAddVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="xcode keys-add-modal"
            destroyOnClose={true}
        >
            <div className='keys-add-up'>
                <div>新建秘钥</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='keys-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item label={'标题'} name={'1'}
                               rules={[{required:true,message:`标题不能为空`}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={'秘钥'} name={'3'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default AccessKeysAdd
