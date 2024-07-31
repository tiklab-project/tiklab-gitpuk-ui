import React,{useState,useEffect} from 'react';
import {DatePicker, Form, Input, Modal, Tooltip} from 'antd';
import "./Auth.scss"
import {autoHeight,Validation} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import Modals from '../../../common/modal/Modal';
import {QuestionCircleOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
const AuthAdd = props =>{

    const {addVisible,setAddVisible,createAuth,updateAuthSsh,keysList,authData,setAuthData,andTitle} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    //过期时间
    const [expireTime,setExpireTime]=useState(null)

    useEffect(()=>{
        if (authData){
            form.setFieldsValue({
                title: authData.title,
                })
            setExpireTime(authData.expireTime)
        }
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height,authData,addVisible])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    /**
     * 添加密钥
     */
    const onOk = () => {
        form.validateFields().then((values) => {
           if (authData){
              updateAuthSsh({...authData,title:values.title,expireTime:expireTime?expireTime:"0"})
           }else {
               createAuth( {...values,type:'public',expireTime:expireTime})
           }
            setAddVisible(false)
        })
    }

    //选择过期时间
    const onChange = (date, dateString) => {
        setExpireTime(dateString)
    }


    //跳转文档
    const goDoc = () => {
      window.open("https://thoughtware.cn/document/78aa45b76d4c")
    }

    const cancelVisible = () => {
        setAddVisible(false)
        form.resetFields();
        setAuthData(null)
        setExpireTime(null)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancelVisible} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    const defaultValue = dayjs('2024-01-01');
    return (
        <Modals
            visible={addVisible}
            onCancel={cancelVisible}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={andTitle}
        >
            <Form form={form} layout='vertical' autoComplete='off'>
                <Form.Item
                    label={'标题'}
                    name={'title'}
                    rules={[
                        {required:true,message:'标题不能为空'},
                        Validation('标题','blank '),
                        /*({ getFieldValue }) => ({
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
                        })*/
                    ]}
                ><Input placeholder={'公钥钥标题'}/>
                </Form.Item>
                {
                    !authData&&
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
                                    if(value&&!value.startsWith("ssh-rsa")&&!value.startsWith("ssh-ed")){
                                        return Promise.reject('公钥格式错误')
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]}
                    >
                        <div>
                            <div>
                                <span className='auth-add-desc'>把你的公钥粘贴到这里，查看 </span>
                                <span className='auth-add-desc-cursor' onClick={goDoc}>怎样生成公钥</span>
                            </div>
                            <Input.TextArea autoSize={{ minRows: 5}}  placeholder={"请粘贴以ssh-ras、ssh-ed25519开头的公钥"}/>
                        </div>
                    </Form.Item>
                }
                <div className='sys-keys-add'>
                    <div className='sys-keys-add-title'>
                        <div className='sys-keys-add-text'>过期时间</div>
                        <Tooltip placement="top" title={"超过过期时间公钥将自动失效，如未设置视为「永久有效」"} >
                            <QuestionCircleOutlined className='sys-keys-add-icon'/>
                        </Tooltip>
                    </div>
                    <div>
                        {
                            ( expireTime&&expireTime!=="0")?
                                <DatePicker onChange={onChange} defaultValue={defaultValue} />:
                                <DatePicker onChange={onChange}/>
                        }

                    </div>
                </div>
            </Form>

        </Modals>
    )
}

export default AuthAdd
