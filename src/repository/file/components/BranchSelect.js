import React,{useState,useEffect} from 'react';
import {Select} from 'antd';
import {inject,observer} from 'mobx-react';
import EmptyText from '../../../common/emptyText/EmptyText';
import {findCommitId, setBranch} from './Common';
import './BranchSelect.scss';
import branchStore from "../../branch/store/BranchStore"
/**
 * 切换分支
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BranchSelect = props => {

    const {repositoryInfo,type,match} = props

    const {findAllBranch,branchList} = branchStore

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo && repositoryInfo)

    useEffect(()=>{
        // 获取全部分支
        repositoryInfo.name && findAllBranch(repositoryInfo.rpyId)
    },[repositoryInfo.name])

    /**
     * 路由跳转
     * @param value
     */
    const changBranch = value => {
        switch (type) {
            case 'commit':
                props.history.push(`/index/repository/${repositoryInfo.rpyId}/commits/${value}`)
                break
            case 'code':
                props.history.push(`/index/repository/${repositoryInfo.rpyId}/tree/${value}`)
        }
    }

    return (
        <div className='branch-select'>
            <Select
                showSearch
                defaultValue={branch}
                onChange={value=>changBranch(value)}
                notFoundContent={<EmptyText/>}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu=>(
                    <div className='xcode-branch-select'>
                        <div className='branchSelect-title'>分支</div>
                        {menu}
                        {
                            findCommitId(urlInfo) &&
                            <>
                                <div className='branchSelect-title'>提交</div>
                                <div className='ant-select-item branchSelect-commit'>{branch}</div>
                            </>
                        }
                    </div>
                )}
            >
                {
                    branchList && branchList.map(item=>(
                        <Select.Option value={item.branchName} key={'a'+item.branchName}>
                            {item.branchName}
                        </Select.Option>
                    ))
                }
            </Select>
        </div>
    )
}

export default BranchSelect
