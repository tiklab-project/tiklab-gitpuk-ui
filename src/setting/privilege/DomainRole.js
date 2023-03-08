import React from "react";
import {DomainRole} from "tiklab-privilege-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRoleContent = props =>{

    return <DomainRole {...props} domainId={""}  bgroup={"matflow"}/>

}

export default DomainRoleContent
