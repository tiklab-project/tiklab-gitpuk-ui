/**
 * 切换分支
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React, {useState, useEffect, useRef} from 'react';
import {Input, Select} from 'antd';
import EmptyText from '../../../common/emptyText/EmptyText';
import {findCommitId, setBranch} from './Common';
import './BranchSelect.scss';
import branchStore from "../../branch/store/BranchStore"
import tagStore from "../../tag/store/TagStore";
import Omit from "../../../common/omit/Omit";
import {observer} from "mobx-react";
import {SearchOutlined} from "@ant-design/icons";

const BranchSelect = props => {

    const {repositoryInfo,type,match,setData} = props
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const {findAllBranch,branchList} = branchStore
    const {findTag,tagList} = tagStore

    const selectRef = useRef(null); // Select 组件的引用
    const [selectValue,setSelectValue]=useState()

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo && repositoryInfo)

    useEffect(()=>{
        // 获取全部分支
        repositoryInfo.name&& findAllBranch(repositoryInfo.rpyId)

        repositoryInfo.name&& findTag(repositoryInfo.rpyId)

    },[repositoryInfo.name])


    /**
     * 路由跳转
     * @param value
     * @param type 类型
     */
    const changBranch = (value,valueType) => {
        switch (valueType){
            case 'branch':
                setData({type:valueType,value:value.branchName})
                setSelectValue(value.branchName)
                //type==='commit'&&props.history.push(`/repository/${webUrl}/commits/${value.branchName}`)
                type==='code'&&props.history.push(`/repository/${webUrl}/code/${value.branchName}`)
                selectRef.current.blur(); // 关闭弹窗时使选择框失去焦点，从而关闭弹窗
                break
            case 'tag':
                setData({type:valueType,value:value.tagName})
                setSelectValue(value.tagName)
                //type==='commit'&&props.history.push(`/repository/${webUrl}/commits/${value.tagName}`)
                type==='code'&&props.history.push(`/repository/${webUrl}/code/${value.tagName}tag`)
                selectRef.current.blur(); // 关闭弹窗时使选择框失去焦点，从而关闭弹窗
                break
            case 'commit':
                setData({type:valueType,value:value.tagName})
                setSelectValue(value.tagName)
               // type==='commit'&&props.history.push(`/repository/${webUrl}/commits/${value.tagName}`)
                type==='code'&&props.history.push(`/repository/${webUrl}/code/${value.tagName}commit_id`)
                selectRef.current.blur(); // 关闭弹窗时使选择框失去焦点，从而关闭弹窗
                break

        }
    }
    return (
        <div className='drop-down branch-select'>

            <Select
                ref={selectRef}
                showSearch
                placeholder='分支'
                defaultValue={(branch&&branch!=="0")?branch:null}
                value={selectValue}
                notFoundContent={<EmptyText/>}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu=>(
                    <div className='xcode-branch-select'>
                        {
                            type!=='commit'&&
                            <div className='branchSelect-title'>分支</div>
                        }
                        {
                            branchList && branchList.map(item=>{
                                return(
                                    <div key={item.branchName} className='ant-select-item branchSelect-commit' onClick={()=>changBranch(item,"branch")}>
                                        <Omit value={item.branchName} maxWidth={"450px"}/>
                                    </div>
                                )
                            })
                        }
                        {
                            tagList&&tagList.length>0&&type!=='commit'&&
                            <>
                                <div className='branchSelect-title'>标签</div>
                                {
                                    tagList.map(item=>{
                                        return(
                                            <div key={item.rpyId} className='ant-select-item branchSelect-commit' onClick={()=>changBranch(item,"tag")}>
                                                <Omit value={item.tagName} maxWidth={"450px"}/>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        }
                        {
                            urlInfo?.endsWith("commit_id") &&
                            <>
                                <div className='branchSelect-title'>提交</div>
                                <div className='ant-select-item branchSelect-commit' onClick={()=>changBranch(branch,"commit")}>
                                    <Omit value={branch} maxWidth={"450px"}/>
                                </div>
                            </>
                        }
                    </div>
                )}
            >
            </Select>
        </div>
    )
}

export default observer(BranchSelect)
