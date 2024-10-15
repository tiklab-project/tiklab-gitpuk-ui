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
import Btn from "../../common/btn/Btn";
const MergeClashEdit = (props) => {
    const {repositoryStore,match} = props
    const {repositoryInfo} = repositoryStore
    const {findConflictingFile,findConflictingFileDetails,findMergeRequest,conflictResolutionFile}=MergeStore

    const [fileData,setFileData]=useState(null)
    //合并数据
    const [mergeData,setMergeData]=useState(null)

    //冲突文件list
    const [mergeClashFileList,setMergeClashFileList]=useState(["thoughtware-hadess-server/src/main/java/io/thoughtware/hadess/repository/controller/RepositoryController.java"])
    //冲突文件的路径文件
    const [filePath,setFilePath]=useState()

    // 获取修改内容的行数
    const [editPosition,setEditPosition] = useState('')

    // 修改的内容 文件路径和文件内容
    const [previewValueList,setPreviewValueList] = useState([])

    useEffect(()=>{

        findMergeRequest(match.params.mergeId).then(res=>{
            if (res.code===0){
                setMergeData(res.data)
                getConflictingFile(res.data)
            }
        })
     /*   findClashFileData("585456fc2e3f","thoughtware-hadess-server/src/main/java/io/thoughtware/hadess/repository/controller/RepositoryController.java").then(res=>{
            res.code===0&&setFileData(res.data)
        })*/
    },[])

    //查询冲突文件
    const getConflictingFile = (data) => {
        findConflictingFile({
            rpyId:repositoryInfo.rpyId,
            mergeOrigin:data.mergeOrigin,
            mergeTarget:data.mergeTarget,
        }).then(res=>{
            if (res.code===0){
                setMergeClashFileList(res.data)
                if (res.data.length){
                    setFilePath(res.data[0])
                    getConflictingFileDetails(data,res.data[0])
                }
            }
        })
    }

    //查询冲突文件详情
    const getConflictingFileDetails = (mergeData,value) => {
        findConflictingFileDetails({
            rpyId:repositoryInfo.rpyId,
            mergeOrigin:mergeData.mergeOrigin,
            mergeTarget:mergeData.mergeTarget,
            filePath:value
        }).then(res=>{
            if (res.code===0){
                setFileData(res.data.fileData)
            }
        })
    }

    //切换冲突文件
    const cutFilePath = (value) => {
        setFilePath(value)
        getConflictingFileDetails(mergeData,value)
    }

    //添加修改后的内容
    const updatePreviewValue = (value) => {
        setFileData(value)
        const data={filePath:filePath,fileData:value}
        if (previewValueList){
            const index = previewValueList.findIndex(item => item.filePath === filePath);
            if (index !== -1) {
                // 如果找到相同的元素，替换
                previewValueList[index] = data;
            } else {
                // 如果没有相同的元素，拼接到列表末尾
                previewValueList.push(data);
            }
        }else {
            setPreviewValueList([data])
        }
    }

    //提交修改的冲突文件
    const conflictFile = () => {
        conflictResolutionFile({
            mergeClashFileList:previewValueList,
            mergeOrigin:mergeData.mergeTarget,
            mergeTarget:mergeData.mergeOrigin,
            repositoryId:repositoryInfo.rpyId,
        })
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
                    <div className='clash-edit-title-style'>
                        <div className='clash-edit-title-text'>{`正在解决 ${mergeData?.mergeOrigin} 分支和 ${mergeData?.mergeTarget} 分支间的代码冲突`}</div>
                        <div>
                            {
                               1===1? <Btn
                                    title={'提交改动'}
                                    type={'primary'}
                                    onClick={conflictFile}
                                />:
                                <Btn
                                    title={'提交更改'}
                                    type={'disabled'}
                                />
                            }
                        </div>
                    </div>


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
                                {
                                    fileData&&
                                    <MonacoEditMerge
                                        blobFile={{fileType:"java"}}
                                        previewValue={fileData}
                                        setPreviewValue={updatePreviewValue}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(MergeClashEdit))