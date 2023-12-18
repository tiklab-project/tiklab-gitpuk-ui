import React ,{useEffect}from 'react';
import RpySetting from '../../../common/aside/RpySetting';
import {inject, observer} from "mobx-react";

const RepositorySetting = props =>{

    const {match,repositoryStore} = props
    const {repositoryInfo}=repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`


    // 设置
    const secondRouter = [
        {
            to:`/repository/${webUrl}/setting/info`,
            title:`RepositoryInfo`,
        },
        {
            to:`/repository/${webUrl}/setting/member`,
            title:`Member`,
            purviewCode: "xcode_user",
        },
        {
            to:`/repository/${webUrl}/setting/role`,
            title:`Privilege`,
            purviewCode: "xcode_project_shiro",
        },
        {
            to:`/repository/${webUrl}/setting/branch`,
            title:`BranchSetting`,
        },
        {
            to:`/repository/${webUrl}/setting/pushRule`,
            title:`Push_rules`,

        },
        {
            to:`/repository/${webUrl}/setting/keys`,
            title:`Access_keys`,
        },
        {
            to:`/repository/${webUrl}/setting/hooks`,
            title:'WebHooks',
        },
        {
            to:`/repository/${webUrl}/setting/remote`,
            title:'仓库镜像',
            purviewCode: "xcode_mirror",
        },
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={repositoryInfo?.rpyId}
            />
}

export default inject('repositoryStore')(observer(RepositorySetting))
