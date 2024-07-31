import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import Modals from "../../../common/modal/Modal";
import {observer} from "mobx-react";
import tagStore from "../store/TagStore";
import commitsStore from "../../commits/store/CommitsStore";

const TagAdd = props =>{

    const {addTagVisible,setAddTagVisible,branchList,repositoryInfo,findTags,tagList} = props
    const {createTag}=tagStore
    const {findLatelyBranchCommit,commit} = commitsStore

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    const [branch,setBranch]=useState()
    const [tagName,setTagName]=useState(null)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    useEffect(()=>{
        if (branchList.length>0){
            const tag=branchList.filter(item=>item.defaultBranch===true)
            setBranch(tag[0].branchName)

            findLatelyBranchCommit({rpyId:repositoryInfo.rpyId,branch:tag[0].branchName,findCommitId:false})
        }
    },[branchList])


    window.onresize=() =>{
        setHeight(autoHeight())
    }

    //创建标签
    const onOk = () =>{
        form.validateFields().then((values) => {
            createTag({rpyId:repositoryInfo.rpyId,commitId:commit.commitId,tagName:values.tagName,desc:values.desc}).then(item=>{
               if (item.code===0){
                   setTagName(null)
                   findTags()
               }
            })
        })

    }

    //切换分支
    const changBranch = (value) => {
        setBranch(value)
        findLatelyBranchCommit({rpyId:repositoryInfo.rpyId,branch:value,findCommitId:false})
    }

    //输入tagName
    const inputTagName= (e) => {
        setTagName(e.target.value)
    }

    const closeVisible = () => {
        setTagName(null)
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
                        rules={[{required:true,message:`分支名称不能为空`},
                            ({ getFieldValue }) => ({
                                validator(rule,value) {
                                    let nameArray = []
                                    if(tagList){
                                        nameArray = tagList && tagList.map(item=>item.tagName)
                                    }
                                    if (nameArray.includes(value)) {
                                        return Promise.reject('名称已经存在');
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]
                    }
                    >
                        <Input  onChange={inputTagName} value={tagName}  placeholder={"输入标签名称"}/>
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


        /*<Modal
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

        </Modal>*/
    )
}

export default observer(TagAdd)
