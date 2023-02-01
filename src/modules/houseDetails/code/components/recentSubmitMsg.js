import React from 'react'
import {CopyOutlined} from '@ant-design/icons'
import {copy} from '../../../common/client/client'
import './recentSubmitMsg.scss'

const RecentSubmitMsg = props =>{

    const {latelyBranchCommit} = props

    return (
        <div className='recent-submit-msg'>
            <div className='code-commit-icon'/>
            <div className='code-commit-msg'>
                <div className='msg-title'>
                    { latelyBranchCommit && latelyBranchCommit.commitMessage }
                </div>
                <div className='msg-desc'>
                    {
                        latelyBranchCommit ?
                            latelyBranchCommit.commitUser + ' ' +
                            latelyBranchCommit.commitTime + ' '
                            : null
                    }
                    提交</div>
            </div>
            <div className='code-commit-ident'>
                <div className='ident-title'>
                    {latelyBranchCommit && latelyBranchCommit.commitId.substring(0,8)}
                </div>
                <div className='ident-btn' onClick={()=>copy(latelyBranchCommit && latelyBranchCommit.commitId)}>
                    <CopyOutlined/>
                </div>
            </div>
        </div>
    )
}

export default RecentSubmitMsg
