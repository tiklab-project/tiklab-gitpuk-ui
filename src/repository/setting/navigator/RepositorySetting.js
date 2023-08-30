import React from 'react';
import RpySetting from '../../../common/aside/RpySetting';
import {inject, observer} from "mobx-react";

const RepositorySetting = props =>{

    const {match,repositoryStore} = props
    const {repositoryInfo}=repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 设置
    const secondRouter = [
        {
            to:`/index/repository/${webUrl}/sys/info`,
            title:`RepositoryInfo`,
        },
        {
            to:`/index/repository/${webUrl}/sys/member`,
            title:`Member`,
            purviewCode: "xcode_user",
        },
        {
            to:`/index/repository/${webUrl}/sys/role`,
            title:`Privilege`,
            purviewCode: "xcode_project_shiro",
        },
        {
            to:`/index/repository/${webUrl}/sys/branch`,
            title:`BranchSetting`,
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
        {
            to:`/index/repository/${webUrl}/sys/remote`,
            title:'仓库镜像',
            purviewCode: "xcode_mirror",
        },
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={repositoryInfo.rpyId}
            />
}

export default inject('repositoryStore')(observer(RepositorySetting))
