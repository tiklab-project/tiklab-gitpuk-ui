import React from "react";
import "./UserIcon.scss";

/**
 * 表格标题首字母，icon
 * @param text：标题
 * @param colors：颜色
 * @returns {JSX.Element}
 * @constructor
 */
const UserIcon = ({text,size}) => {
    return  <span className={`xcode-user-icon xcode-icon xcode-icon-size-${size}`}>
                {text && text.substring(0,1).toUpperCase()}
            </span>

}

export default UserIcon
