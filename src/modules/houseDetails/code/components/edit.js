import React,{useEffect,useState} from 'react'
import {Input,Form} from 'antd'
import {inject,observer} from 'mobx-react'
import {MonacoEdit,MonacoPreview} from '../../../common/editor/monaco'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from '../../../common/btn/btn'
import {interceptUrl} from '../../../common/client/client'
import './edit.scss'

const Edit = props =>{

    const {houseStore,codeStore,location,match} = props

    const {houseInfo,webUrl} = houseStore
    const {readFile,blobFile,writeFile} = codeStore

    const [form] = Form.useForm()
    const urlInfo = match.params
    const fileAddress = interceptUrl(location.pathname,webUrl+'/edit/'+urlInfo.branch)

    const [editType,setEditType] = useState('compile')
    const [previewValue,setPreviewValue] = useState('')
    const [fileName,setFileName] = useState('')
    const [editPosition,setEditPosition] = useState('')  // 获取修改内容的行数

    useEffect(()=>{
        houseInfo.name && readFile({
            codeId:houseInfo.codeId,
            fileAddress:fileAddress[1],
            commitBranch:urlInfo.branch
        })
        .then(res=>{
            if(res.code===0){
                setPreviewValue(res.data && res.data.fileMessage)
                setFileName(res.data && res.data.fileName)
            }
        })
    },[houseInfo.name])

    const onOk = value => {
        writeFile({
            codeId:houseInfo.codeId,
            newFileName:fileName?fileName:blobFile.fileName,
            oldFileName:blobFile.fileName,
            fileAddress:fileAddress[1],
            fileContent:previewValue,
            ...value
        }).then(res=>{
            res.code===0 && props.history.push(`/index/${webUrl}/tree/${urlInfo.branch}`)
        })
    }

    return(
        <div className='edit'>
            <div className='edit-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} goBack={()=>props.history.go(-1)}/>
                <div className='edit-content-head'>
                    编辑文件
                </div>
                <div className='edit-content-title'>
                    <span className='edit-title'
                        onClick={()=>props.history.push(`/index/house/${houseInfo.name}/tree`)}
                    >
                        {houseInfo.name}
                    </span>
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
                                oldValue={blobFile && blobFile.fileMessage}
                                newValue={previewValue}
                                language={blobFile && blobFile.fileType}
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
                                   rules={[
                                       {required:true,message:'提交信息不能为空'},
                                   ]}
                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item label='目标分支' name='commitBranch'
                                   rules={[
                                       {required:true,message:'目标分支不能为空'},
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
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

export default inject('houseStore','codeStore')(observer(Edit))
