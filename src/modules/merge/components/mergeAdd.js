import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined,ArrowRightOutlined,PlusCircleOutlined} from '@ant-design/icons';
import {autoHeight} from '../../common/client/client';
import Btn from '../../common/btn/btn';

const MergeAdd = props =>{

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
            className="xcode merge-add-modal"
            destroyOnClose={true}
        >
            <div className='merge-add-up'>
                <div>新建合并请求</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='merge-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'1-2':2}}
                >
                    <div className='merge-add-branch'>
                        <Form.Item label='源分支' name={'1-1'} rules={[{required:true,message:`源分支不能为空`}]}>
                            <Select>
                                <Select.Option value={2}>master</Select.Option>
                                <Select.Option value={3}>xcode-v1.0</Select.Option>
                                <Select.Option value={4}>xcode-v2.0</Select.Option>
                            </Select>
                        </Form.Item>
                        <div className='add-branch-arrow'><ArrowRightOutlined /></div>
                        <Form.Item label='目标分支'  name={'1-2'} rules={[{required:true,message:`源分支不能为空`}]}>
                            <Select>
                                <Select.Option value={2}>master</Select.Option>
                                <Select.Option value={3}>xcode-v1.0</Select.Option>
                                <Select.Option value={4}>xcode-v2.0</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item label={'标题'} name={'2'} rules={[{required:true,message:`分支名称不能为空`}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="5"
                        label="评审人"
                        rules={[{required: true, message: '评审人不能为空'}]}
                    >
                        <Select mode="multiple"
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Btn
                                            type={'link'}
                                            title={'邀请新成员'}
                                            icon={<PlusCircleOutlined/>}
                                        />
                                    </>
                                )}
                        >
                            <Select.Option value="red">admin</Select.Option>
                            <Select.Option value="green">莫凶凶</Select.Option>
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

export default MergeAdd
