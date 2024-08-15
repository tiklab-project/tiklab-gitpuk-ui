import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select,Checkbox,Row,Col} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../../common/client/Client';
import Btn from '../../../../common/btn/Btn';

const HooksAdd = props =>{

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

    const enevLis = [
        {
            value:'Push',
            desc:'仓库推送代码、推送、删除分支'
        },
        {
            value:'Tag Push',
            desc:'新建、删除tag'
        },
        {
            value:'Issue',
            desc:'新建任务、删除任务、变更任务状态、更改任务指派人'
        },
        {
            value:'Pull Request',
            desc:'新建、更新、合并、关闭Pull Request，新建、更新、删除Pull Request下便签，关联、取消关联Issue'
        },
        {
            value:'评论',
            desc:'评论仓库、任务、Pull Request、Commit'
        },

    ]

    return (
        <Modal
            visible={addVisible}
            onCancel={()=>setAddVisible(false)}
            closable={false}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="xcode hooks-add-modal"
            destroyOnClose={true}
        >
            <div className='hooks-add-up'>
                <div>新建WebHooks</div>
                <div style={{cursor:'pointer'}} onClick={()=>setAddVisible(false)}>
                    <CloseOutlined />
                </div>
            </div>
            <div className='hooks-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{'2':2}}
                >
                    <Form.Item label={'URL'} name={'1'}
                               rules={[{required:true,message:`URL不能为空`}]}
                    >
                        <Input placeholder='POST地址'/>
                    </Form.Item>
                    <Form.Item label={'选择事件'} name={'safa'}
                               rules={[{required:true,message:`选择事件不能为空`}]}
                    >
                        <Checkbox.Group>
                            <Row>
                                {
                                    enevLis.map(item=>{
                                        return  <Col span={24} key={item.value}>
                                            <Checkbox value={item.value} style={{lineHeight: '32px'}}>
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
                    <Form.Item>
                        <Checkbox style={{lineHeight: '32px'}}>
                            <div className='activate'>
                                <span className='activate-title'>激活</span>
                                <span className='activate-desc'>（激活后事件触发时将发送请求）</span>
                            </div>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item label={'描述信息'} name={'3'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default HooksAdd
