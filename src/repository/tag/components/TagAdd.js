import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import Modals from "../../../common/modal/Modal";
import {observer} from "mobx-react";
import tagStore from "../store/TagStore";
import fileStore from "../../file/store/FileStore";

const TagAdd = props =>{

    const {addTagVisible,setAddTagVisible,branchList,repositoryInfo,findTags,tagList} = props
    const {createTag}=tagStore
    const {findLatelyBranchCommit} = fileStore

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    const [branch,setBranch]=useState()
    const [tagName,setTagName]=useState(null)
    const [errorMsg,setErrorMsg]=useState(null)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }

    },[height])

    useEffect(()=>{
        if (addTagVisible){
            form.resetFields();
        }
        setErrorMsg(null)
    },[addTagVisible])

    useEffect(()=>{
        if (branchList.length>0){
            const tag=branchList.filter(item=>item.defaultBranch===true)
            if (tag.length>0){
                setBranch(tag[0].branchName)
            }
        }
    },[branchList])


    window.onresize=() =>{
        setHeight(autoHeight())
    }


    //创建标签
    const onOk = () =>{
        form.validateFields().then((values) => {
            createTag({rpyId:repositoryInfo.rpyId,
                commitId:branch?branch:repositoryInfo.defaultBranch,
                tagName:values.tagName,
                desc:values.desc}
            ).then(item=>{
               if (item.code===0){
                   setTagName(null)
                   setAddTagVisible(false)
                   findTags()
               }else {
                 form.validateFields()
                 setErrorMsg(item.msg)
               }
            })
        })

    }

    //切换分支
    const changBranch = (value) => {
        setBranch(value)
    }

    //输入tagName
    const inputTagName= (e) => {
        setTagName(e.target.value)
        setErrorMsg(null)
    }

    const closeVisible = () => {
        setTagName(null)
        form.resetFields();
        setAddTagVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={closeVisible}
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
        <Modals
            visible={addTagVisible}
            onCancel={()=>closeVisible(false)}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"新建标签"}
        >
            <div className='tag-add-content'>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{tagName:tagName}}
                >
                    <Form.Item
                        label={'标签名称'}
                        name='tagName'
                        rules={[{required:true,message:`标签名称不能为空`},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    let nameArray = []
                                    if(tagList){
                                        nameArray = tagList && tagList.map(item=>item.tagName)
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject('名称已经存在');
                                    }
                                    if (errorMsg){
                                        return Promise.reject(errorMsg);
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]
                    }
                    >
                        <Input  onChange={inputTagName}  placeholder={"输入标签名称"}/>
                    </Form.Item>
                    <Form.Item label={'分支来源'}>
                        <Select onChange={value=>changBranch(value)} value={branch}>
                            {
                                branchList&&branchList.map((item,index)=>{
                                    return(
                                        <Select.Option key={index} value={item.branchName}>{item.branchName}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label={'描述信息'} name={'desc'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default observer(TagAdd)
