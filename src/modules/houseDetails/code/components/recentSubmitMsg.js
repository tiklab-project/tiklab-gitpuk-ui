import React,{useEffect} from 'react'
import {CopyOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import {copy} from '../../../common/client/client'
import './recentSubmitMsg.scss'

const RecentSubmitMsg = props =>{

    const {houseInfo,commitsStore,match} = props

    const {findLatelyBranchCommit,latelyBranchCommit} = commitsStore

    useEffect(()=>{
        houseInfo.name && findLatelyBranchCommit({
            codeId:houseInfo.codeId,
            branchName:match.params.branch?match.params.branch:'master'
        })
    },[houseInfo.name])

    return (
        <div className='recent-submit-msg'>
            <div className='code-commit-icon'/>
            <div className='code-commit-msg'>
                <div className='msg-title'>
                    {
                        latelyBranchCommit && latelyBranchCommit.commitMessage
                    }
                </div>
                <div className='msg-desc'>
                    {
                        latelyBranchCommit ?
                            latelyBranchCommit.commitUser + ' ' +
                            latelyBranchCommit.commitTime + ' '
                            :
                            null
                    }
                    提交</div>
            </div>
            <div className='code-commit-ident'>
                <div className='ident-title'>
                    {latelyBranchCommit && latelyBranchCommit.commitId.substring(0,8)}
                </div>
                <div className='ident-btn'>
                    <CopyOutlined onClick={()=>copy(latelyBranchCommit && latelyBranchCommit.commitId)}/>
                </div>
            </div>
        </div>
    )
}

export default inject('commitsStore')(observer(RecentSubmitMsg))
