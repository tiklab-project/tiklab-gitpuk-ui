import React from "react";
import {MessageSendType} from "thoughtware-message-ui";

/**
 * 消息通知类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MessageSendTypeContent = props => {

    return <MessageSendType {...props} bgroup={"gittork"}/>

}

export default MessageSendTypeContent
