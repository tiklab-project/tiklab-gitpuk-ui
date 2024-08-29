/**
 * 分支合并冲突线上解决
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React, {useEffect, useState} from 'react';
import {Col, Tooltip} from "antd";
import "./MergeClashEdit.scss"
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import MergeStore from "../store/MergeStore";
import {inject, observer} from "mobx-react";
import {MonacoEditMerge} from "../../common/editor/Monaco";
const MergeClashEdit = (props) => {
    const {repositoryStore,match} = props
    const {repositoryInfo} = repositoryStore
    const {findMergeClashFile,findMergeRequest,findClashFileData,}=MergeStore
    //冲突文件list
    const [mergeClashFileList,setMergeClashFileList]=useState(["thoughtware-hadess-server/src/main/java/io/thoughtware/hadess/repository/controller/RepositoryController.java"])
    const [fileData,setFileData]=useState(null)

    //冲突文件的路径文件
    const [filePath,setFilePath]=useState()

    // 获取修改内容的行数
    const [editPosition,setEditPosition] = useState('')
    // 修改的内容
    const [previewValue,setPreviewValue] = useState('')

    useEffect(()=>{
   /*     findMergeRequest(match.params.mergeId).then(res=>{
            if (res.code===0){
                getMergeClashFile(res.data.mergeOrigin,res.data.mergeTarget)
            }
        })*/
        findClashFileData("585456fc2e3f","thoughtware-hadess-server/src/main/java/io/thoughtware/hadess/repository/controller/RepositoryController.java").then(res=>{
            res.code===0&&setFileData(res.data)
        })
    },[])


    //查询冲突文件详情
    const getMergeClashFile = (branch,targetBranch) => {
        findMergeClashFile({
            rpyId: repositoryInfo.rpyId,
            mergeOrigin:branch,
            mergeTarget:targetBranch
        }).then(res=>{
            setFilePath(res.data.filePath)
            res.code===0&&setMergeClashFileList(res.data)
        })
    }

    //切换冲突文件
    const cutFilePath = (value) => {
        setFilePath(value)
    }


    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='xcode page-width clash-edit'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "23", offset: "1" }}
                 xxl={{ span: "23", offset: "1" }}
            >
                <div className='clash-edit-content'>
                    <BreadcrumbContent firstItem= {"在线解决冲突"}  goBack={goBack}/>
                    <div className='clash-edit-title'>正在解决 b 分支和 master 分支间的代码冲突</div>

                    <div className='clash-edit-body'>
                        <div className='edit-body-left'>
                            <div className={'body-left-title'}>已解决文件 0/1</div>
                            <div className='edit-left-body' >
                                {
                                    mergeClashFileList.length>0&&
                                    mergeClashFileList.map((item,key)=>{
                                        return(
                                            <div className='left-body-nav' key={key} onClick={()=>cutFilePath(item)}>
                                                <div className={`left-body-nav-text ${item===filePath&&'cute-body-nav'}`}  >
                                                    <Tooltip placement="top" title={item} >
                                                        {item}
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>

                        </div>
                        <div className='edit-body-right'>
                            <div className={'body-right-title'}>{filePath}</div>
                            <div className='edit-right-body'>
                                <MonacoEditMerge
                                    blobFile={{fileType:"java"}}
                                    previewValue={fileData}
                                    setPreviewValue={setFileData}
                                    setEditPosition={setEditPosition}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(MergeClashEdit))
