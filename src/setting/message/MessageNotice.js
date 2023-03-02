import React from 'react';
import {MessageNotice} from 'tiklab-message-ui';

/**
 * 消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageNoticeContent = props =>{

    return <MessageNotice {...props} bgroup={'xcode'}/>

}

export default MessageNoticeContent
