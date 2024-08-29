import React from "react";
import {Plugin} from "thoughtware-plugin-manager-ui";

/**
 * 插件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PluginContent = props =>{

    return <Plugin {...props}  bgroup={"gitpuk"}/>

}

export default PluginContent
