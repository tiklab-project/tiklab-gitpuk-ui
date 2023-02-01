import React,{useState,useEffect} from 'react'
import {inject,observer} from 'mobx-react'
import {Input,Select} from 'antd'
import {CopyOutlined,FolderOpenOutlined,SearchOutlined} from '@ant-design/icons'
import {Profile} from 'tiklab-eam-ui'
import {getUser} from 'tiklab-core-ui'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import {copy} from '../../../common/client/client'
import BranchChang from '../../branch/components/branchChang'
import EmptyText from '../../../common/emptyText/emptyText'
import '../components/commits.scss'

const Commits = props =>{

    const {commitsStore,houseStore,match,location} = props

    const {houseInfo} = houseStore
    const {findBranchCommit,commitsList} = commitsStore

    useEffect(()=>{
        houseInfo.name && !houseInfo.notNull && props.history.push('/index/404')
    },[houseInfo.name])

    useEffect(()=>{
        if(houseInfo.name){
            const branch = match.params.branch ? match.params.branch:houseInfo.defaultBranch
            findBranchCommit({
                codeId:houseInfo.codeId,
                branchName:branch
            })
        }
    },[houseInfo.name,location.pathname])

    const changBranch = value => {

    }

    const goDetails = item =>{
        props.history.push(`/index/house/${houseInfo.name}/commit/${item.commitId}`)
    }

    const renderCommits = item => {
        return (
            <div className='msg-item' key={item.commitId}>
                <div className='msg-item-icon'>
                    <Profile userInfo={getUser()}/>
                </div>
                <div className='msg-item-msg'>
                    <div className='msg-item-title'>
                        <span className='title-commitMsg' onClick={()=>goDetails(item)}>
                            {item.commitMessage}
                        </span>
                    </div>
                    <div className='msg-item-desc'>
                        <span className='desc-user'>{item.commitUser}</span>
                        <span className='desc-time'>{item.commitTime}</span>
                    </div>
                </div>
                <div className='msg-item-ident'>
                    <div className='ident-title'> {item.commitId.substring(0,8)}</div>
                    <div className='ident-copy'>
                        <CopyOutlined onClick={()=>copy(item.commitId)}/>
                    </div>
                    <div className='ident-folder'><FolderOpenOutlined /></div>
                </div>
            </div>
        )
    }

    const renderCommitsData = (group,groupIndex) => {
        return (
            <div className='commits-msg-item' key={groupIndex}>
                <div className='commits-msg-item-title'>
                    <span className='title-time'>{group.commitTime}</span>
                    <span className='title-num'>(
                        {
                            group.commitMessageList && group.commitMessageList.length
                        }
                    )</span>
                </div>
                <div className='commits-msg-item-content'>
                    {
                        group.commitMessageList && group.commitMessageList.map(item=>{
                            return renderCommits(item)
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='commits'>
            <div className='commits-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'提交'}/>
                <div className='commits-head'>
                    <div className='commits-head-left'>
                        <div className='commits-branch'>
                            <BranchChang
                                {...props}
                                houseInfo={houseInfo}
                                type={'commit'}
                            />
                        </div>
                    </div>
                    <div className='commits-head-right'>
                        <div className='commits-user'>
                            <Select defaultValue={'admin'} onChange={value=>changBranch(value)}>
                                <Select.Option value={'admin'}>admin</Select.Option>
                                <Select.Option value={'root'}>root</Select.Option>
                            </Select>
                        </div>
                        <div className='commits-input'>
                            <Input
                                allowClear
                                placeholder='提交信息'
                                // onChange={onChangeSearch}
                                prefix={<SearchOutlined />}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className='commits-msg'>
                    {
                        commitsList && commitsList.length > 0 ?
                        commitsList.map((group,groupIndex)=>{
                            return renderCommitsData(group,groupIndex)
                        })
                        :
                        <EmptyText/>
                    }
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','commitsStore')(observer(Commits))
