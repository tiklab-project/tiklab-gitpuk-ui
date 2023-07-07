import React from 'react';
import Setting from '../../../common/aside/Setting';

const RepositorySetting = props =>{

    const {match} = props


    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 设置
    const secondRouter = [
        {
            to:`/index/repository/${webUrl}/sys/info`,
            title:`仓库信息`,
        },
        {
            to:`/index/repository/${webUrl}/sys/member`,
            title:`Member`,
        },
        {
            to:`/index/repository/${webUrl}/sys/role`,
            title:`Privilege`,
        },
        {
            to:`/index/repository/${webUrl}/sys/pushRule`,
            title:`Push_rules`,
        },
        {
            to:`/index/repository/${webUrl}/sys/keys`,
            title:`Access_keys`,
        },
        {
            to:`/index/repository/${webUrl}/sys/hooks`,
            title:'WebHooks',
        },
    ]

    return  <Setting
                {...props}
                secondRouter={secondRouter}
            />
}

export default RepositorySetting
