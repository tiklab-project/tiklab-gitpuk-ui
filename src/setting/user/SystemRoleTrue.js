import React from "react";
import {SystemRole} from "tiklab-privilege-ui";

/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SystemRoleTrue = props =>{

    return <SystemRole {...props} bgroup={"xcode"} isBase={true}/>

}

export default SystemRoleTrue
