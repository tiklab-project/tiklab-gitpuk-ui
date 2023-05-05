/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from "react";
import {SystemRole} from "tiklab-privilege-ui";
import { inject, observer } from "mobx-react";
const SystemRoleContent = props =>{

    return <SystemRole {...props} bgroup={"xcode"}/>

}

export default inject("systemRoleStore")(observer(SystemRoleContent));
