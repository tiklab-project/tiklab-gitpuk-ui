import React,{useState,useEffect} from 'react'
import {CopyOutlined,FileTextOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import Btn from '../../../common/btn/btn'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {MonacoBlob} from '../../../common/editor/monaco'
import {copy,interceptUrl} from '../../../common/client/client'
import RecentSubmitMsg from './recentSubmitMsg'
import BreadChang from './breadChang'
import Clone from './clone'
import BlobDelModal from './blobDelModal'
import './blob.scss'


const Blob = props =>{

    const {location,houseStore,codeStore} = props

    const {houseInfo} = houseStore
    const {readFile,blobFile} = codeStore

    const filePath = interceptUrl(location.pathname,'/'+houseInfo.name+'/blob')
    const fileAddress = interceptUrl(location.pathname,'/'+houseInfo.name+'/blob/master')

    const [delVisible,setDelVisible] = useState(false)

    useEffect(()=>{
        houseInfo.name && readFile({
            codeId:houseInfo.codeId,
            fileAddress:fileAddress[1]
        })
    },[houseInfo.name])

    const goEdit = () =>{
        props.history.push(`/index/house/${houseInfo.name}/edit${filePath[1]}`)
    }

    return(
        <div className='blob'>
            <div className='blob-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} goBack={()=>props.history.go(-1)}/>
                <div className='blob-content-head'>
                    <BreadChang
                        {...props}
                        houseInfo={houseInfo}
                        type={'blob'}
                    />
                    <div className='blob-head-right'>
                        {/* <div className='blob-desc'>
                            <Btn
                                title={'下载'}
                            />
                        </div> */}
                        <div className='blob-clone'>
                            <Clone/>
                        </div>
                    </div>
                </div>
                <RecentSubmitMsg
                    {...props}
                    houseInfo={houseInfo}
                />
                <div className='blob-content-editor'>
                    <div className='blob-editor-title'>
                        <div className='editor-title-left'>
                            <span className='editor-title-icon'><FileTextOutlined /></span>
                            <span className='editor-title-text'>
                                {blobFile && blobFile.fileName}
                            </span>
                            <span className='editor-title-size'>
                                {blobFile && blobFile.fileSize}
                            </span>
                            <span className='editor-title-copy'>
                                <CopyOutlined onClick={()=>copy(blobFile && blobFile.fileName)}/>
                            </span>
                        </div>
                        <div className='editor-title-right'>
                            <div className='editor-title-item' onClick={()=>copy(blobFile && blobFile.fileMessage)}>复制</div>
                            <div className='editor-title-item' onClick={()=>goEdit()}>编辑</div>
                            <div className='editor-title-item'>WEB IDE</div>
                            <div className='editor-title-item' onClick={()=>setDelVisible(true)}>删除</div>
                            <BlobDelModal
                                delVisible={delVisible}
                                setDelVisible={setDelVisible}
                                blobFile={blobFile}
                            />
                            <div className='editor-title-item'>下载</div>
                        </div>
                    </div>
                    <div className='blob-editor-content'>
                        <MonacoBlob
                            readOnly={true}
                            blobFile={blobFile}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','codeStore')(observer(Blob))
