import React,{useState,useEffect} from 'react';
import {Form,Input,Modal} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight,Validation} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';

const AuthAdd = props =>{

    const {addVisible,setAddVisible,createAuth,keysList} = props

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

    /**
     * 添加密钥
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            createAuth(values)
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
            className='xcode sys-keys-add-modal'
            destroyOnClose={true}
        >
            <div className='sys-keys-add-up'>
                <div>新建密钥</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='sys-keys-add-content'>
                <Form form={form} layout='vertical' autoComplete='off'>
                    <Form.Item
                        label={'标题'}
                        name={'title'}
                        rules={[
                            {required:true,message:'标题不能为空'},
                            Validation('标题','blank '),
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    let nameArray = []
                                    if(keysList){
                                        nameArray = keysList && keysList.map(item=>item.title)
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject('标题已经存在')
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}
                    ><Input />
                    </Form.Item>
                    <Form.Item
                        label={'公钥'}
                        name={'value'}
                        rules={[
                            {required:true,message:'公钥不能为空'},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    let nameArray = []
                                    if(keysList){
                                        nameArray = keysList && keysList.map(item=>item.value)
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject('公钥已经存在')
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}
                    ><Input.TextArea autoSize={{ minRows: 5}}/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default AuthAdd
