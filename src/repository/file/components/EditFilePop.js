/**
 * 编辑文件弹窗 (删除、修改)
 * @param props
 */
import React,{useState,useEffect} from 'react';
import Modals from '../../../common/modal/Modal';
import Btn from "../../../common/btn/Btn";
import fileStore from "../store/FileStore";
import {autoHeight} from "../../../common/client/Client";
import {Checkbox, Form, Input} from "antd";


const EditFilePop = (props) => {
    const [form] = Form.useForm()
    const {editFileVisible,setEditFileVisible,repositoryInfo,webUrl,fileName,fileAddress,branch,type,updateFile}=props
    const [height,setHeight] = useState(0)
    const {deleteBareFile,updateBareFile} = fileStore

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    //创建合并请求的状态
    const [pullState,setPullState]=useState(false)
    const onOk = () => {
        form.validateFields().then(async values => {
            form.resetFields()
            if (type==='delete'){
                deleteBareFile({
                    branch:branch,
                    repositoryId:repositoryInfo.rpyId,
                    filePath:fileAddress,
                    commitMessage:values.commitMessage,
                }).then(res=>{
                    if (res.code==0){
                        props.history.push(`/repository/${webUrl}/tree/${branch}`)
                    }
                })
            }

            if (type==='update'){
                updateFile(values.commitMessage)
            }
        })}

    const onChange = (e) => {
        setPullState(e.target.checked)
    }

    const modalFooter = (
        <>
            <Btn onClick={()=>setEditFileVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={editFileVisible}
            onCancel={()=>setEditFileVisible(false)}
            closable={false}
            style={{height:height,top:60}}
            footer={modalFooter}
            destroyOnClose={true}
            title={type==='delete'?"提交修改":"提交删除"}
        >
            <Form
                form={form}
                layout='vertical'
                autoComplete='off'
                initialValues={{commitMessage:`${type==='delete'?'delete ':'edited '} ${fileName} `} }
            >
                <Form.Item
                    label={'提交信息'}
                    name={'commitMessage'}
                    rules={[{required:true,message:'提交信息不能为空'}]}
                >
                    <Input.TextArea   />
                </Form.Item>
                <Checkbox style={{paddingBottom:15}} onChange={onChange}>创建新分支，并发起合并请求</Checkbox>
                {
                    pullState &&
                    <>
                        <Form.Item
                            label={'分支名称'}
                            name={'branchName'}
                            rules={[{required: true, message: '分支名称不能为空'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={'评审人'}
                            name={'reviewer'}
                            rules={[{required: true, message: '分支名称不能为空'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </>
                }
            </Form>
        </Modals>
    )
}
export default EditFilePop
