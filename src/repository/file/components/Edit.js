import React,{useEffect,useState} from 'react';
import {Input, Form, Col} from 'antd';
import {inject,observer} from 'mobx-react';
import {MonacoEdit, MonacoPreview} from '../../../common/editor/Monaco';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import {findCommitId, setBranch, setFileAddress} from './Common';
import './Edit.scss'

import fileStore from '../store/FileStore'
import MonacoBlob from "../../../common/editor/MonacoBlob";
import EditFilePop from "./EditFilePop";
/**
 * 编辑文件页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Edit = props =>{

    const {repositoryStore,location,match} = props

    const {repositoryInfo} = repositoryStore
    const {readFile,blobFile,updateBareFile} = fileStore

    const webUrl = `${match.params.namespace}/${match.params.name}`
    const [form] = Form.useForm()
    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo)
    const fileAddress = setFileAddress(location,webUrl+'/edit/'+urlInfo)

    // 编写 || 预览
    const [editType,setEditType] = useState('compile')

    // 原内容
    const [previewValue,setPreviewValue] = useState('')

    // 修改后的内容
    const [editPreviewValue,setEditPreviewValue] = useState('')

    // 文件名称
    const [fileName,setFileName] = useState('')

    // 获取修改内容的行数
    const [editPosition,setEditPosition] = useState('')

    // 编辑文件弹窗状态
    const [editFileVisible,setEditFileVisible]=useState(false)

    if(findCommitId(urlInfo)){
        props.history.go(-1)
    }

    useEffect(()=>{
        // 获取文本内容
        repositoryInfo.name && readFile({
            rpyId:repositoryInfo.rpyId,
            fileAddress:fileAddress[1],
            commitBranch:branch,
            findCommitId:false
        })
        .then(res=>{
            if(res.code===0){
                setPreviewValue(res.data && res.data.fileMessage)
                setEditPreviewValue(res.data && res.data.fileMessage)
                setFileName(res.data && res.data.fileName)
            }
        })
    },[repositoryInfo.name])

    /**
     * 提交信息
     * @param value
     */
    const commitChanges = value => {
        setEditFileVisible(true)

        // writeFile({
        //     rpyId:repositoryInfo.rpyId,
        //     newFileName:fileName?fileName:blobFile.fileName,
        //     oldFileName:blobFile.fileName,
        //     fileAddress:fileAddress[1],
        //     fileContent:previewValue,
        //     ...value
        // }).then(res=>{
        //     res.code===0 && props.history.push(`/${webUrl}/code/${urlInfo}`)
        // })
    }

    //修改
    const cuteViewType = (value) => {
        setPreviewValue(editPreviewValue)
        setEditType(value)
    }

    //更新文件
    const updateFile = (commitMessage) => {
        updateBareFile({
            branch:branch,
            repositoryId:repositoryInfo.rpyId,
            filePath:fileAddress[1],
            fileData:editPreviewValue,
            commitMessage:commitMessage,
        }).then(res=>{
            if (res.code==0){

                props.history.push(`/repository/${webUrl}/blob/${branch+fileAddress[1]}`)
            }
        })
    }


    return(
        <div className='xcode gittok-width xcode-edit'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='edit-content '>
                    <BreadcrumbContent firstItem={'Code'} secondItem={ blobFile?.fileName} goBack={()=>props.history.go(-1)}/>
                   {/* <div className='edit-content-head'>编辑文件</div>*/}
                    <div className='edit-content-title'>
                        <span className='edit-title'
                              onClick={()=>props.history.push(`/repository/${webUrl}/code/${branch}`)}
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
                              onClick={()=>cuteViewType('compile')}
                        >编辑</span>
                            <span className={`editor-title-preview ${editType==='preview'?'editor-title-active':''}`}
                                  onClick={()=>cuteViewType('preview')}
                            >预览</span>
                        </div>
                        <div className='edit-editor-content'>
                            {
                                editType==='compile'?
                                  /*  <MonacoBlob readOnly={true} blobFile={blobFile}/>*/
                                    <MonacoEdit
                                        blobFile={blobFile}
                                        previewValue={previewValue}
                                        setEditPreviewValue={setEditPreviewValue}
                                        setEditPosition={setEditPosition}
                                        editPosition={editPosition}
                                    />
                                    :
                                    <MonacoPreview
                                        newValue={editPreviewValue}
                                        blobFile={blobFile}
                                        renderOverviewRuler={true}
                                        editPosition={editPosition}
                                    />
                            }
                        </div>
                    </div>
                  {/*  <div className='edit-content-msg'>
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
                    </div>*/}
                    <div className='edit-content-btn'>
                        {
                            blobFile?.fileMessage===editPreviewValue?
                                <Btn
                                    title={'提交更改'}
                                    type={'disabled'}
                                />:
                                <Btn
                                    title={'提交更改'}
                                    type={'primary'}
                                    onClick={() => {
                                        form
                                            .validateFields()
                                            .then((values) => {
                                                commitChanges(values)
                                                form.resetFields()
                                            })
                                    }}
                                />
                        }

                        <Btn
                            title={'取消'}
                            isMar={true}
                            onClick={()=>props.history.go(-1)}
                        />

                    </div>
                </div>
            </Col>
            <EditFilePop {...props} editFileVisible={editFileVisible}
                         setEditFileVisible={setEditFileVisible}
                         fileName={blobFile?.fileName}
                         type={"update"}
                         updateFile={updateFile}
            />
        </div>
    )
}

export default inject('repositoryStore')(observer(Edit))
