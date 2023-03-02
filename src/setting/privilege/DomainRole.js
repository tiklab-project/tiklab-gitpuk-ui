import React from 'react'
import {DomainRoleList} from 'tiklab-privilege-ui'

/**
 * 项目权限
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainRole = props =>{
    return <DomainRoleList {...props} domainId={''}  bgroup={'xcode'}/>
}

export default DomainRole
