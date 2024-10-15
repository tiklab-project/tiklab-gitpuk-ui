/**
 * 创建文件弹窗
 * @param props
 */
import React,{useState,useEffect} from 'react';
import Modals from '../../../common/modal/Modal';
import Btn from "../../../common/btn/Btn";
import {Form, Input} from "antd";
import fileStore from "../store/FileStore";
const CreateFilePop = (props) => {
    const {fileVisible,setFileVisible,webUrl,folderPath,branch}=props
    const [form] = Form.useForm()

    //创建文件夹
    const onOk = () => {
        form.validateFields().then(async values => {
            props.history.push(`/repository/${webUrl}/new/${branch}/${folderPath}/${values.fileName}`)
        })}

    const CustomPrefix = () => (
        <span style={{ maxWidth: '250px',
            display: 'inline-block',
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"

        }}>
            {folderPath+"/"}
  </span>);

    const modalFooter = (
        <>
            <Btn onClick={()=>setFileVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={fileVisible}
            onCancel={()=>setFileVisible(false)}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"新建文件"}
        >
            <Form
                form={form}
                layout='vertical'
                autoComplete='off'
            >
                <Form.Item
                    label={'文件名称'}
                    name={'fileName'}
                    rules={[{required:true,message:'请输入文件名称'}]}
                >
                    <Input addonBefore={<CustomPrefix />}  placeholder={"请输入文件名称"}/>
                </Form.Item>
            </Form>
        </Modals>
    )


}
export default CreateFilePop
