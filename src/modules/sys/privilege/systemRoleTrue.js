import React from 'react'
import {SystemRoleList} from 'tiklab-privilege-ui'

/*
    系统权限
 */
const SystemRoleTrue = props =>{

    return <SystemRoleList {...props} bgroup={'xcode'} isBase={true}/>

}

export default SystemRoleTrue
