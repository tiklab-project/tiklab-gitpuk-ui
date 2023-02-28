import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';

const TagAdd = props =>{

    const {addTagVisible,setAddTagVisible} = props

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
                onClick={()=>setAddTagVisible(false)}
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
            visible={addTagVisible}
            onCancel={()=>setAddTagVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="xcode tag-add-modal"
            destroyOnClose={true}
        >
            <div className='tag-add-up'>
                <div>新建标签</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddTagVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='tag-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item
                        label={'标签名称'}
                        name={'1'}
                        rules={[{required:true,message:`分支名称不能为空`}]}
                    ><Input/>
                    </Form.Item>
                    <Form.Item label={'分支来源'} name={'2'}>
                        <Select>
                            <Select.Option value={2}>master</Select.Option>
                            <Select.Option value={3}>xcode-v1.0</Select.Option>
                            <Select.Option value={4}>xcode-v2.0</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={'描述信息'} name={'3'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default TagAdd
