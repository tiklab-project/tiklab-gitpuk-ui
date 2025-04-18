import React from 'react';
import {CopyOutlined} from '@ant-design/icons';
import {copy} from '../../../common/client/Client';
import './RecentSubmitMsg.scss';
import {observer} from "mobx-react";
import UserIcon from "../../../common/list/UserIcon";

/**
 * 最近提交信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RecentSubmitMsg = props =>{

    const {latelyBranchCommit,webUrl,repositoryInfo} = props
    const goDetails = () => {
        props.history.push(`/repository/${webUrl}/commit`)
    }

    return (
        <div className='recent-submit-msg'>
           <UserIcon text={latelyBranchCommit && latelyBranchCommit.commitUser} size={"middle"}/>
            <div className='code-commit-msg'>
                <div className='msg-title' onClick={()=>props.history.push(`/repository/${webUrl}/commit/${latelyBranchCommit.commitId}`)}>
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

export default observer(RecentSubmitMsg)
