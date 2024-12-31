import React,{useState,useEffect} from 'react';
import {Modal, Form, Input, Select, Checkbox, Row, Col, Switch} from 'antd';
import {autoHeight, Validation} from '../../../../common/client/Client';
import Btn from '../../../../common/btn/Btn';
import Modals from "../../../../common/modal/Modal";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";


const HooksCompile = props =>{
    const [form] = Form.useForm()

    const {addVisible,setAddVisible,hookData,repositoryId,createRepWebHook,updateRepWebHook,title} = props
    const [enable,setEnable]=useState(0)

    const [height,setHeight] = useState(0)

    useEffect(()=>{
       if (hookData){
           form.setFieldsValue({
               name:hookData.name,
               url:hookData.url,
               secretToken:hookData.secretToken,
               events:hookData.events.split(","),
            })
       }
    },[hookData])

 /*   useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }*/

    const onOk = () =>{
        form.validateFields().then((values) => {
            if (hookData){
                updateRepWebHook({
                    ...values,
                    id:hookData.id,
                    events:values.events.join(','),
                }).then(res=>{
                    res.code===0&& setAddVisible(false)
                })
            }else {
                createRepWebHook({
                    ...values,
                    repositoryId:repositoryId,
                    enable:enable,
                    events:values.events.join(','),
                }).then(res=>{
                    res.code===0&& setAddVisible(false)
                })
            }
        })
    }

    const closePop = () => {
        form.resetFields()
        setAddVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={closePop}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={onOk}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    const enevLis = [
        {
            key:"push",
            value:'推送事件',
            desc:'推送代码、创建、删除分支'
        },
        {
            key:"tag",
            value:'标签事件',
            desc:'新建、删除tag'
        },
        {
            key:"merge",
            value:'合并事件',
            desc:'创建、执行合并请求'
        },
    ]



    return (
        <Modals
            visible={addVisible}
            onCancel={closePop}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={title}
        >
            <div className='hooks-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item label={'名称'} name={"name"}
                               rules={[{required:true,message:`名称不能为空`}]}>
                        <Input placeholder='请输入名称'/>
                    </Form.Item>
                    <Form.Item label={'路径'} name={"url"}
                               rules={[{required:true,message:`URL不能为空`},
                                   Validation('路径','webHook')]}>
                        <Input placeholder='请输入URL'/>
                    </Form.Item>
                    <Form.Item label={'secretToken'}  name={"secretToken"}
                               rules={[{required:true,message:`Token不能为空`}]}
                    >
                        <Input placeholder='请输入Token'/>
                    </Form.Item>

                    <Form.Item label={'选择事件'} name={'events'}
                               rules={[{required:true,message:`选择事件不能为空`}]}
                    >
                        <Checkbox.Group>
                            <Row>
                                {
                                    enevLis.map(item=>{
                                        return  <Col span={24} key={item.key}>
                                            <Checkbox value={item.key} style={{lineHeight: '32px'}}>
                                                <div className='event-check'>
                                                    <div className='event-check-value'>{item.value}</div>
                                                    <div className='event-check-desc'>{item.desc}</div>
                                                </div>
                                            </Checkbox>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </div>
        </Modals>

    )
}

export default HooksCompile
