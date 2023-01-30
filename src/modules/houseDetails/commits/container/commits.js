import React,{useState,useEffect} from 'react'
import {inject,observer} from 'mobx-react'
import {Input,Avatar,Select} from 'antd'
import {CopyOutlined,FolderOpenOutlined,SearchOutlined} from '@ant-design/icons'
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
        houseInfo.name && findBranchCommit({
            codeId:houseInfo.codeId,
            branchName: match.params.branch?match.params.branch:'master'
        })
    },[houseInfo.name,location.pathname])

    const changBranch = value => {
    }

    const commitsData = [
        {
            id:'1',
            time:'200-11-11 12:20:01',
            num:'2',
            commit:[
                {
                    id:'1-1',
                    msg:'更改认证方式',
                    time:'1个小时前提交',
                    user:'admin',
                    code:'2212'
                },
                {
                    id:'1-2',
                    msg:'更改动态',
                    time:'2个小时前提交',
                    user:'admin',
                    code:'232454'
                }
            ]
        },
        {
            id:'2',
            time:'200-11-11 12:20:01',
            num:'1',
            commit:[
                {
                    id:'2-1',
                    msg:'更改配置',
                    time:'5天前',
                    user:'admin',
                    code:'23532523'
                },
            ]
        }
    ]

    const goDetails = item =>{
        props.history.push(`/index/house/${houseInfo.name}/commit/${item.commitId}`)
    }

    const renderCommits = item => {
        return (
            <div className='msg-item' key={item.commitId}>
                <div className='msg-item-left'>
                    <div className='msg-item-icon'>
                        <Avatar
                            style={{
                                backgroundColor: '#f56a00',
                                verticalAlign: 'middle',
                            }}
                            size='large'
                        />
                    </div>
                    <div className='msg-item-msg' onClick={()=>goDetails(item)}>
                        <div className='msg-item-title'>{item.commitMessage}</div>
                        <div className='msg-item-desc'>
                            <span className='desc-user'>{item.commitUser}</span>
                            <span className='desc-time'>{item.commitTime}</span>
                        </div>
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
