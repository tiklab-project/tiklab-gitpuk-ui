import React from "react";
import {DomainRole} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRoleContent = props =>{

    return <DomainRole {...props} domainId={""}  bgroup={"xcode"}/>

}

export default DomainRoleContent
