/**
 * 系统权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from "react";
import {SystemRole} from "thoughtware-privilege-ui";
import { inject, observer } from "mobx-react";
const SystemRoleContent = props =>{

    return <SystemRole {...props} bgroup={"gittork"}/>

}

export default inject("systemRoleStore")(observer(SystemRoleContent));
