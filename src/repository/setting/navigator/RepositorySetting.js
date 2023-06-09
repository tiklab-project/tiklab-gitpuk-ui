import React from 'react';
import Setting from '../../../common/aside/Setting';

const RepositorySetting = props =>{

    const {match} = props

    const rpyId=match.params.rpyId
    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 设置
    const secondRouter = [
        {
            to:`/index/repository/${rpyId}/sys/info`,
            title:`仓库信息`,
        },
        {
            to:`/index/repository/${rpyId}/sys/member`,
            title:`Member`,
        },
        {
            to:`/index/repository/${rpyId}/sys/role`,
            title:`Privilege`,
        },
        {
            to:`/index/repository/${rpyId}/sys/pushRule`,
            title:`Push_rules`,
        },
        {
            to:`/index/repository/${rpyId}/sys/keys`,
            title:`Access_keys`,
        },
        {
            to:`/index/repository/${rpyId}/sys/hooks`,
            title:'WebHooks',
        },
    ]

    return  <Setting
                {...props}
                secondRouter={secondRouter}
            />
}

export default RepositorySetting
