import React,{useState,useEffect} from 'react'
import {Modal,Form,Input,Select} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {autoHeight} from '../../../common/client/client'
import Btn from '../../../common/btn/btn'

const BranchAdd = props =>{

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
            className="xcode branch-add-modal"
            destroyOnClose={true}
        >
            <div className='branch-add-up'>
                <div>新建分支</div>
                <div style={{cursor:'pointer'}}
                     onClick={()=>setAddVisible(false)}
                >
                    <CloseOutlined />
                </div>
            </div>
            <div className='branch-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item label={'分支名称'} name={'1'}
                               rules={[{required:true,message:`分支名称不能为空`}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label={'分支来源'} name={'2'}>
                        <Select>
                            <Select.Option value={2}>master</Select.Option>
                            <Select.Option value={3}>xcode-v1.0</Select.Option>
                            <Select.Option value={4}>xcode-v2.0</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default BranchAdd
