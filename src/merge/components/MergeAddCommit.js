/**
 * 合并分支的提交记录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Tooltip} from "antd";
import "./MergeAdd.scss"
import {copy} from "../../common/client/Client";
import {CopyOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {commitU4} from "../../repository/file/components/Common";
const MergeAddCommit = (props) => {
    const {commitsList,webUrl}=props


    /**
     * 跳转到提交详情
     * @param item
     */
    const goDetails = item =>{
        window.open(`#/repository/${webUrl}/commit/${item.commitId}`)
    }

    /**
     * 跳转到源文件
     * @param item
     */
    const findFile = item => {
        window.open(`#/repository/${webUrl}/code/${item.commitId+commitU4}`)
       // props.history.push(`/repository/${webUrl}/code/${item.commitId+commitU4}`)
    }

    //提交信息
    const renderCommits = item => {
        return (
            <div className='info-item' key={item.commitId}>
                <div className='info-item-icon'>
                    {/*   <Profile userInfo={getUser()}/>*/}
                </div>
                <div className='info-item-msg'>
                    <div className='info-item-title'>
                        <span className='title-commitMsg' onClick={()=>goDetails(item)}>
                            {item.commitMessage}
                        </span>
                    </div>
                    <div className='title-item-desc'>
                        <span className='desc-user'>{item.commitUser}</span>
                        <span className='desc-time'>{item.commitTime}</span>
                    </div>
                </div>
                <div className='title-item-ident'>
                    <div className='ident-title'>
                        <div className= 'ident-title-id'>
                            {item.commitId.substring(0,8)}
                        </div>

                    </div>
                    <Tooltip title={'复制'}>
                        <div className='ident-copy' onClick={()=>copy(item.commitId)}>
                            <CopyOutlined />
                        </div>
                    </Tooltip>
                    <Tooltip title={'查看源文件'}>
                        <div className='ident-folder' onClick={()=>findFile(item)}>
                            <FolderOpenOutlined />
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }

    return(
        <div className='merge-add-table'>
            {
               commitsList.map((group,groupIndex)=>{
                    return(
                        <div className='commit-info' key={groupIndex}>
                            <div className='commit-info-item-title'>
                                <span className='title-time'>{group.commitTime}</span>
                                <span className='title-num'>(
                                    {group.commitMessageList && group.commitMessageList.length})</span>
                            </div>
                            <div className='commits-info-item-content'>
                                {
                                    group.commitMessageList && group.commitMessageList.map(item=>renderCommits(item))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default MergeAddCommit
