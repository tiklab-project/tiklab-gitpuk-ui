/**
 * 创建文件夹弹窗
 * @param props
 */
import React,{useState,useEffect} from 'react';
import Modals from '../../../common/modal/Modal';
import Btn from "../../../common/btn/Btn";
import {Form, Input} from "antd";
import fileStore from "../store/FileStore";
const CreateFolderPop = (props) => {
    const {folderVisible,setFolderVisible,webUrl,folderPath,branch}=props
    const [form] = Form.useForm()

    //创建文件夹
    const onOk = () => {
        form.validateFields().then(async values => {
            props.history.push(`/repository/${webUrl}/new/${branch}/${folderPath}/${values.folderName}/${values.fileName}`)
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
            <Btn onClick={()=>setFolderVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={folderVisible}
            onCancel={()=>setFolderVisible(false)}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"新建文件夹"}
        >
            <Form
                form={form}
                layout='vertical'
                autoComplete='off'
            >
                <Form.Item
                    label={'文件夹名称'}
                    name={'folderName'}
                    rules={[{required:true,message:'文件夹名称不能为空'}]}
                >
                    <Input addonBefore={<CustomPrefix />}  placeholder={"请输入文件夹名称"}/>
                </Form.Item>
                <Form.Item
                    label={'文件名称'}
                    name={'fileName'}
                    rules={[{required:true,message:'文件名称不能为空'}]}
                >
                    <Input placeholder={"请输入文件名称"}/>
                 {/*   <div style={{color:"#999999",paddingTop:5}}>Git 文件夹不允许为空，因此需要同时创建一个文件</div>*/}
                </Form.Item>

            </Form>
        </Modals>
    )


}
export default CreateFolderPop
