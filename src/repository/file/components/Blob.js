import React,{useState,useEffect} from 'react';
import {CopyOutlined,FileTextOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import {MonacoBlob} from '../../../common/editor/Monaco';
import {copy} from '../../../common/client/Client';
import {SpinLoading} from '../../../common/loading/Loading';
import RecentSubmitMsg from './RecentSubmitMsg';
import BreadChang from './BreadChang';
import Clone from './Clone';
import BlobDelModal from './BlobDelModal';
import {findCommitId,setBranch,setFileAddress} from './Common';
import './Blob.scss';

/**
 * Blob文件内容页面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Blob = props =>{

    const {repositoryStore,fileStore,location,match} = props

    const {repositoryInfo,webUrl} = repositoryStore
    const {readFile,blobFile,findCloneAddress,cloneAddress,findLatelyBranchCommit,latelyBranchCommit} = fileStore

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo)
    const filePath = setFileAddress(location,webUrl+'/blob/')
    const fileAddress = setFileAddress(location, webUrl+'/blob/'+urlInfo)
    const [delVisible,setDelVisible] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(repositoryInfo.name){
            // 获取文本内容
            readFile({
                rpyId:repositoryInfo.rpyId,
                fileAddress:fileAddress[1],
                commitBranch:branch,
                findCommitId:findCommitId(urlInfo)
            }).then(()=>setIsLoading(false))
            // 获取最近提交信息
            findLatelyBranchCommit({
                rpyId:repositoryInfo.rpyId,
                branch:branch,
                findCommitId:findCommitId(urlInfo)
            })
            // 获取文本地址
            findCloneAddress(repositoryInfo.rpyId)
        }
    },[repositoryInfo.name])

    const goEdit = () =>{
        props.history.push(`/index/repository/${webUrl}/edit/${filePath[1]}`)
    }

    return(
        <div className='blob'>
            <div className='blob-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Code'} goBack={()=>props.history.go(-1)}/>
                <div className='blob-content-head'>
                    <BreadChang
                        {...props}
                        repositoryInfo={repositoryInfo}
                        webUrl={webUrl}
                        branch={urlInfo}
                        fileAddress={fileAddress}
                        type={'blob'}
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
                            <span className='editor-title-icon'><FileTextOutlined /></span>
                            <span className='editor-title-text'>{blobFile && blobFile.fileName}</span>
                            <span className='editor-title-size'>{blobFile && blobFile.fileSize}</span>
                            <span className='editor-title-copy'>
                                <CopyOutlined onClick={()=>copy(blobFile && blobFile.fileName)}/>
                            </span>
                        </div>
                        <div className='editor-title-right'>
                            {
                                findCommitId(urlInfo) ? null :
                                    <>
                                        <div className='editor-title-item' onClick={()=>goEdit()}>编辑</div>
                                        <div className='editor-title-item'>WEB IDE</div>
                                        <div className='editor-title-item' onClick={()=>setDelVisible(true)}>删除</div>
                                        <BlobDelModal delVisible={delVisible} setDelVisible={setDelVisible} blobFile={blobFile}/>
                                    </>
                            }
                            <div className='editor-title-item' onClick={()=>copy(blobFile && blobFile.fileMessage)}>复制</div>
                            <div className='editor-title-item'>下载</div>
                        </div>
                    </div>
                    <div className='blob-editor-content'>
                        {
                            isLoading ? <SpinLoading type='table'/> :
                            <MonacoBlob readOnly={true} blobFile={blobFile}/>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore','fileStore')(observer(Blob))
