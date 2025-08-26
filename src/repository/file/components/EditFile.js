/**
 * 编辑文件页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useEffect,useState} from 'react';
import {Input, Form, Col} from 'antd';
import {inject,observer} from 'mobx-react';
import {MonacoEdit, MonacoPreview} from '../../../common/editor/Monaco';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import { findRefCode, getFileAddress} from './Common';
import './EditFile.scss'

import fileStore from '../store/FileStore'
import EditFilePop from "./EditFilePop";

const EditFile = props =>{

    const {repositoryStore,location,match} = props

    const {repositoryInfo} = repositoryStore
    const {readBareRepoFile,updateBareFile,createBareFolder,findRefCodeType} = fileStore

    const webUrl = `${match.params.namespace}/${match.params.name}`
    const [form] = Form.useForm()
    const urlInfo = match.params.branch


    const [blobFile,setBlobFile]=useState('')

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
   const [pageType,setPageType]=useState('')
    const [refCode,setRefCode]=useState()
    const fileAddress = getFileAddress(location,webUrl+'/edit/'+urlInfo)

    useEffect(()=>{
        let refCode
        if (location.pathname.includes(webUrl+"/new")){
            const fileName = location.pathname.substring(location.pathname.lastIndexOf("/")+1)
            setFileName(fileName)
            setPageType("create")
            //refCode
             refCode = findRefCode(location,repositoryInfo,"create")
        }else {
            setPageType("update")
            //refCode
             refCode = findRefCode(location,repositoryInfo,"edit")
            getBareRepoType(refCode)
        }
        setRefCode(refCode)
    },[repositoryInfo.name,location.pathname])

    //获取仓库Ref类型
    const getBareRepoType = (refCode) => {
        const match = location.pathname.match(/code\/([^\/]+)/);
        if (match){
            const code=match[1]
            findRefCodeType(repositoryInfo.rpyId,code).then(res=>{
                if (res.code===0){
                    //读取文件信息
                    getBareRepoFile(res.data,refCode)
                }
            })
        }else {
            getBareRepoFile("branch",refCode)
        }
    }

    //读取裸仓库文本信息
    const getBareRepoFile = (refCodeType,refCode) => {
        // 获取文本内容
        readBareRepoFile({
            rpyId:repositoryInfo.rpyId,
            fileAddress:fileAddress[1],
            refCode:refCode,
            refCodeType:refCodeType

        }).then(res=>{
            if (res.code===0){
                setPreviewValue(res.data && res.data.fileMessage)
                setEditPreviewValue(res.data && res.data.fileMessage)
                setFileName(res.data && res.data.fileName)
                setBlobFile(res.data)
            }
        })
    }




    /**
     * 提交信息
     * @param value
     */
    const commitChanges = value => {
        setEditFileVisible(true)
    }

    //修改
    const cuteViewType = (value) => {
        setPreviewValue(editPreviewValue)
        setEditType(value)
    }

    //更新文件
    const updateFile = (commitMessage) => {
        updateBareFile({
            branch:refCode,
            repositoryId:repositoryInfo.rpyId,
            filePath:fileAddress[1],
            fileData:editPreviewValue,
            commitMessage:commitMessage,
        }).then(res=>{
            if (res.code==0){
                props.history.push(`/repository/${webUrl}/blob/${refCode+fileAddress[1]}`)
            }
        })
    }

    //创建文件夹、文件
    const createFolder = (commitMessage) => {
        let newFileAddress = getFileAddress(location,webUrl+'/new/'+urlInfo)

        //创建文件的时候 文件路径不需要携带 项目名字
        let filePath=newFileAddress[1]
        if (newFileAddress[1].startsWith("/"+repositoryInfo.name)){
            filePath=  newFileAddress[1].substring(repositoryInfo.name.length+2);
        }

        //创建文件，文件的全路径不需要携带仓库的名字
      createBareFolder({
          branch:refCode,
          repositoryId:repositoryInfo.rpyId,
          filePath:filePath,
          fileName:fileName,
          fileData:editPreviewValue,
          commitMessage:commitMessage,
      }).then(res=>{
          res.code===0&& props.history.push(`/repository/${webUrl}/blob/${refCode+"/"+filePath}`)

      })
    }


    return(
        <div className='xcode page-width xcode-edit'>
            <div className='edit-content '>
                <BreadcrumbContent firstItem={'Code'} secondItem={ blobFile?.fileName} goBack={()=>props.history.go(-1)}/>
                {/* <div className='edit-content-head'>编辑文件</div>*/}
                <div className='edit-content-title'>
                        <span className='edit-title'
                              onClick={()=>props.history.push(`/repository/${webUrl}/code/${refCode}`)}
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
            <EditFilePop {...props} editFileVisible={editFileVisible}
                         setEditFileVisible={setEditFileVisible}
                         fileName={fileName}
                         type={pageType}
                         updateFile={updateFile}
                         createBareFolder={createFolder}
            />
        </div>
    )
}

export default inject('repositoryStore')(observer(EditFile))
