import React from "react";
import {DomainUser} from "tiklab-user-ui";
import {inject,observer} from "mobx-react";

/**
 * 项目成员
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainUserContent = props =>{


    return <DomainUser {...props} domainId={""} bgroup={"xcode"}/>

}

export default DomainUserContent
