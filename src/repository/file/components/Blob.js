import React,{useState,useEffect} from 'react';
import {CopyOutlined, DeleteOutlined, FileTextOutlined, PlusOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import MonacoBlob from '../../../common/editor/MonacoBlob';
import {copy} from '../../../common/client/Client';
import {SpinLoading} from '../../../common/loading/Loading';
import RecentSubmitMsg from './RecentSubmitMsg';
import BreadChang from './BreadChang';
import Clone from './Clone';
import {setFileAddress,findRefCode} from './Common';
import './Blob.scss';
import fileStore from '../store/FileStore'
import {Col, Tooltip} from "antd";
import EditFilePop from "./EditFilePop";
import {getUser} from "tiklab-core-ui";
/**
 * Blob文件内容页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Blob = props =>{
    const {repositoryStore,location,match} = props

    const {repositoryInfo} = repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`
    const {readBareRepoFile,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit,findRefCodeType} = fileStore

     //refCode
    const refCode = findRefCode(location,repositoryInfo,"blob")
    const urlInfo = match.params.branch

    const filePath = setFileAddress(location,webUrl+'/blob/')

    const fileAddress = setFileAddress(location, webUrl+'/blob/'+urlInfo)
    const [delVisible,setDelVisible] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [refCodeType,setRefCodeType]=useState("branch")

    //文件
    const [blobFile,setBlobFile]=useState('')

    useEffect(()=>{
        if(repositoryInfo.name){
            getBareRepoType()
            // 获取文本地址
            findCloneAddress(repositoryInfo.rpyId)
        }
    },[repositoryInfo.name,location.pathname])


    const getBareRepoType = () => {
           const match = location.pathname.match(/blob\/([^\/]+)/);
           if (match){
               const code=match[1]
              findRefCodeType(repositoryInfo.rpyId,code).then(res=>{
                  if (res.code===0){
                      setRefCodeType(res.data)
                      //读取文件信息
                      getBareRepoFile(res.data)
                      getNewCommit(res.data)
                  }
              })
          }else {
               getBareRepoFile("branch")
               getNewCommit("branch")
           }
    }


    //读取裸仓库文本信息
    const getBareRepoFile = (refCodeType) => {
        // 获取文本内容
        readBareRepoFile({
            rpyId:repositoryInfo.rpyId,
            fileAddress:fileAddress[1],
            refCode:refCode,
            refCodeType:refCodeType

        }).then(res=>{
            setIsLoading(false)
            if (res.code===0){
                setBlobFile(res.data)
            }
        })
    }


    //获取最近的提交
    const getNewCommit = (refCodeType) => {
        // 获取最近提交信息
        findLatelyBranchCommit({
            rpyId:repositoryInfo.rpyId,
            refCode:refCode,
            refCodeType:refCodeType
        })
    }


    //下载lfs文件
    const downLoadLfsFile = (data) => {
        window.location.href=`${node_env? base_url:window.location.origin}/repositoryFile/downloadLfsFile?rpyId=${repositoryInfo.rpyId}&filePath=${data.filePath}&oid=${data.oid}&branch=${refCode}`
    }




    //下载裸仓库中的文件
    const downLoadBareFile = (data) => {
        window.location.href=`${node_env? base_url:window.location.origin}/repositoryFile/downLoadBareFile?rpyId=${repositoryInfo.rpyId}&filePath=${data.filePath}&branch=${refCode}`
    }

    //跳转
    const goLfs = () => {
        props.history.push(`/repository/${webUrl}/setting/lfs#delete`)
    }


    //编辑
    const goEdit = () =>{
        props.history.push(`/repository/${webUrl}/edit/${filePath[1]}`)
    }

    return(
        <div className=' xcode page-width blob'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='blob-content  '>
                    <BreadcrumbContent firstItem={'Code'} secondItem={ blobFile?.fileName} goBack={()=>props.history.go(-1)}/>
                    <div className='blob-content-head'>
                        <BreadChang
                            {...props}
                            repositoryInfo={repositoryInfo}
                            webUrl={webUrl}
                            branch={urlInfo}
                            fileAddress={fileAddress}
                            type={'blob'}
                            refCode={refCode}
                        />
                        <div className='blob-head-right'>
                            <div className='blob-clone'>
                                <Clone cloneAddress={cloneAddress}/>
                            </div>
                        </div>
                    </div>
                    <RecentSubmitMsg {...props} latelyBranchCommit={latelyBranchCommit} webUrl={webUrl}/>
                    <div className='blob-content-editor'>
                        <div className='blob-editor-title'>
                            <div className='editor-title-left'>
                                <div className='editor-title-icon'><FileTextOutlined /></div>
                                <div className='editor-title-text'>
                                    <div className='editor-title-text-name'>{blobFile && blobFile.fileName}</div>
                                    {
                                        blobFile.oid&&<div className='editor-title-text-fls'>LFS</div>
                                    }
                                </div>
                                <div className='editor-title-size'>
                                    <span>|</span>
                                    <span className='editor-title-size-text'>{blobFile && blobFile.fileSize}</span>
                                </div>

                               {/* <span className='editor-title-copy'>
                                <CopyOutlined onClick={()=>copy(blobFile && blobFile.fileName)}/>
                                </span>*/}
                            </div>
                            {
                                blobFile.oid?
                                    <Tooltip title='删除'>
                                        <DeleteOutlined onClick={()=>setDelVisible(true)}/>
                                    </Tooltip> :
                                    <div className='editor-title-right'>
                                        {
                                            refCodeType==='branch'?
                                                <>
                                                    <div className='editor-title-item' onClick={()=>goEdit()}>编辑</div>
                                                    <div className='editor-title-item' onClick={()=>setDelVisible(true)}>删除</div>
                                                </>:
                                                <>
                                                    <Tooltip placement="topRight" title={"只有分支下的文件可以编辑"}>
                                                        <div className='not-editor-title-item'>编辑</div>
                                                    </Tooltip>
                                                    <Tooltip placement="topRight" title={"只有分支下的文件可以删除"}>
                                                        <div className='not-editor-title-item'>删除</div>
                                                    </Tooltip>
                                                </>
                                        }
                                        {/*<div className='editor-title-item'>WEB IDE</div>*/}
                                            {/* <BlobDelModal delVisible={delVisible} setDelVisible={setDelVisible} blobFile={blobFile}/>*/}
                                            <div className='editor-title-item' onClick={()=>copy(blobFile && blobFile.fileMessage)}>复制</div>
                                            <div className='editor-title-item' onClick={()=>downLoadBareFile(blobFile)}>下载</div>
                                    </div>
                            }
                        </div>
                        {
                            blobFile.oid?
                            <div className='blob-editor-desc'>
                                {
                                    blobFile.fileExist?
                                        <>
                                            <div>{'不支持预览此文件,'}</div>
                                            <div className='blob-editor-desc-download' onClick={()=>downLoadLfsFile(blobFile)}>点此下载</div>
                                        </>:
                                        <>
                                            <div>{'文件资源不存在,'}</div>
                                            <div className='blob-editor-desc-download' onClick={()=>goLfs(blobFile)}>查看 LFS 文件删除记录</div>
                                        </>
                                }
                             </div>:
                            <div className='blob-editor-content' >
                                {

                                    isLoading ? <SpinLoading type='table'/> :
                                        <MonacoBlob readOnly={true} blobFile={blobFile}/>
                                }
                            </div>

                        }
                    </div>
                </div>
            </Col>

            <EditFilePop {...props} editFileVisible={delVisible}
                         setEditFileVisible={setDelVisible}
                         fileName={blobFile?.fileName}
                         type={"delete"}
                         fileAddress={fileAddress[1]}
                         branch={urlInfo}
                         repositoryInfo={repositoryInfo}
                         webUrl={webUrl}
            />
        </div>
    )
}

export default inject('repositoryStore')(observer(Blob))
