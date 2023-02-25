import React,{useEffect,useState} from 'react';
import {Input,Form} from 'antd';
import {inject,observer} from 'mobx-react';
import {MonacoEdit,MonacoPreview} from '../../../common/editor/monaco';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import Btn from '../../../common/btn/btn';
import {findCommitId, setBranch, setFileAddress} from './common';

import './edit.scss'

const Edit = props =>{

    const {repositoryStore,codeStore,location,match} = props

    const {repositoryInfo,webUrl} = repositoryStore
    const {readFile,blobFile,writeFile} = codeStore

    const [form] = Form.useForm()
    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo)
    const fileAddress = setFileAddress(location,webUrl+'/edit/'+urlInfo)
    const [editType,setEditType] = useState('compile')
    const [previewValue,setPreviewValue] = useState('')
    const [fileName,setFileName] = useState('')
    const [editPosition,setEditPosition] = useState('')  // 获取修改内容的行数

    if(findCommitId(urlInfo)){
        props.history.go(-1)
    }

    useEffect(()=>{
        repositoryInfo.name && readFile({
            rpyId:repositoryInfo.rpyId,
            fileAddress:fileAddress[1],
            commitBranch:branch,
            findCommitId:false
        })
        .then(res=>{
            if(res.code===0){
                setPreviewValue(res.data && res.data.fileMessage)
                setFileName(res.data && res.data.fileName)
            }
        })
    },[repositoryInfo.name])

    const onOk = value => {
        writeFile({
            rpyId:repositoryInfo.rpyId,
            newFileName:fileName?fileName:blobFile.fileName,
            oldFileName:blobFile.fileName,
            fileAddress:fileAddress[1],
            fileContent:previewValue,
            ...value
        }).then(res=>{
            // res.code===0 && props.history.push(`/index/${webUrl}/tree/${urlInfo}`)
        })
    }

    return(
        <div className='xcode-edit'>
            <div className='edit-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Code'} goBack={()=>props.history.go(-1)}/>
                <div className='edit-content-head'>编辑文件</div>
                <div className='edit-content-title'>
                    <span className='edit-title'
                          onClick={()=>props.history.push(`/index/repository/${webUrl}/tree/${branch}`)}
                    >{repositoryInfo.name}</span>
                    <span className='edit-title'>/</span>
                    <span className='edit-title'>
                        <Input
                            value={fileName && fileName}
                            style={{width:'auto'}}
                            onChange={e=>setFileName(e.target.value)}
                        />
                    </span>
                </div>
                <div className='edit-content-editor'>
                    <div className='edit-editor-title'>
                        <span className={`editor-title-compile ${editType==='compile'?'editor-title-active':''}`}
                              onClick={()=>setEditType('compile')}
                        >编辑</span>
                        <span className={`editor-title-preview ${editType==='preview'?'editor-title-active':''}`}
                              onClick={()=>setEditType('preview')}
                        >预览</span>
                    </div>
                    <div className='edit-editor-content'>
                        {
                            editType==='compile'?
                            <MonacoEdit
                                blobFile={blobFile}
                                previewValue={previewValue}
                                setPreviewValue={setPreviewValue}
                                setEditPosition={setEditPosition}
                            />
                                :
                            <MonacoPreview
                                newValue={previewValue}
                                blobFile={blobFile}
                                renderOverviewRuler={true}
                                editPosition={editPosition}
                            />
                        }
                    </div>
                </div>
                <div className='edit-content-msg'>
                    <Form
                        form={form}
                        autoComplete='off'
                        layout='vertical'
                        initialValues={{commitMessage:`更新`,commitBranch:'master'}}
                    >
                        <Form.Item label='提交信息' name='commitMessage'
                                   rules={[{required:true,message:'提交信息不能为空'},]}
                        ><Input.TextArea/></Form.Item>
                        <Form.Item label='目标分支' name='commitBranch'
                                   rules={[{required:true,message:'目标分支不能为空'},]}
                        ><Input/></Form.Item>
                    </Form>
                </div>
                <div className='edit-content-btn'>
                    <Btn
                        title={'取消'}
                        isMar={true}
                        onClick={()=>props.history.go(-1)}
                    />
                    <Btn
                        title={'提交更改'}
                        type={'primary'}
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)
                                    form.resetFields()

                                })
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore','codeStore')(observer(Edit))
