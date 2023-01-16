import React from 'react'
import {CopyOutlined} from '@ant-design/icons'
import './recentSubmitMsg.scss'

const RecentSubmitMsg = props =>{

    return (
        <div className='recent-submit-msg'>
            <div className='code-commit-icon'/>
            <div className='code-commit-msg'>
                <div className='msg-title'>解决无法登录问题</div>
                <div className='msg-desc'>admin 1个小时前提交</div>
            </div>
            <div className='code-commit-ident'>
                <div className='ident-title'> 33128853</div>
                <div className='ident-btn'>
                    <CopyOutlined />
                </div>
            </div>
        </div>
    )
}

export default RecentSubmitMsg
