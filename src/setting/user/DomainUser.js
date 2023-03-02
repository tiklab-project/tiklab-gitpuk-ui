import React from 'react';
import {DomainUserList} from 'tiklab-user-ui';

/**
 * 项目成员
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainUser = props =>{

    return <DomainUserList {...props} domainId={''} bgroup={'xcode'}/>

}

export default DomainUser
