import React,{useState,useEffect} from 'react';
import {Modal,Form,Input} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../../common/client/Client';
import Btn from '../../../../common/btn/Btn';

const AccessKeysAdd = props =>{

    const {addVisible,setAddVisible,createAuth,rpyId} = props


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
        form.validateFields().then((values) => {
            createAuth( {...values,type:'private',repository:{rpyId:rpyId}})
            setAddVisible(false)
        })
    }

    const modalFooter = (
        <>
            <Btn onClick={()=>setAddVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
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
                    <Form.Item label={'标题'} name={'title'}
                               rules={[{required:true,message:`标题不能为空`}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={'公钥'} name={'value'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default AccessKeysAdd
