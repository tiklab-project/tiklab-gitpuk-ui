import React from "react";
import "./Listicon.scss";

/**
 * 表格标题首字母，icon
 * @param text：标题
 * @param colors：颜色
 * @returns {JSX.Element}
 * @constructor
 */
const Listicon = ({text,colors,type}) => {
    return   <span className={`xcode-listname-icon ${type}-width ${colors?`xcode-icon-${colors}`:"xcode-icon-0"} 
                            ${type!=='closeNav'?'icon-tab-mar':''}`}>
                {text && text.substring(0,1).toUpperCase()}
            </span>

}

export default Listicon
