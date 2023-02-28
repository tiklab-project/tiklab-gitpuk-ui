import React,{useState,useEffect} from 'react';
import {Select} from 'antd';
import {inject,observer} from 'mobx-react';
import EmptyText from '../../../common/emptyText/EmptyText';
import {findCommitId, setBranch} from './Common';
import './BranchSelect.scss';

/**
 * 切换分支
 */
const BranchSelect = props => {

    const {branchStore,repositoryInfo,webUrl,type,match} = props

    const {findAllBranch,branchList} = branchStore

    const urlInfo = match.params.branch
    const branch = setBranch(urlInfo,repositoryInfo && repositoryInfo)

    useEffect(()=>{
        repositoryInfo.name && findAllBranch(repositoryInfo.rpyId)
    },[repositoryInfo.name])

    const changBranch = value => {
        switch (type) {
            case 'commit':
                props.history.push(`/index/repository/${webUrl}/commits/${value}`)
                break
            case 'code':
                props.history.push(`/index/repository/${webUrl}/tree/${value}`)
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

export default inject('branchStore')(observer(BranchSelect))
