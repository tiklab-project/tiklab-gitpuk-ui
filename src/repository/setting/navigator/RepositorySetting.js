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
            id:`/repository/${webUrl}/setting/info`,
            title:`RepositoryInfo`,
        },
        {
            id:`/repository/${webUrl}/setting/user`,
            title:`Member`,
            purviewCode: "rpy_user",
        },
        {
            id:`/repository/${webUrl}/setting/role`,
            title:`Privilege`,
            purviewCode: "rpy_authority",
        },
        {
            id:`/repository/${webUrl}/setting/branch`,
            title:`BranchSetting`,
            purviewCode: "rpy_branch_setting",
        },
        {
            id:`/repository/${webUrl}/setting/pushRule`,
            title:`Push_rules`,

        },
        {
            id:`/repository/${webUrl}/setting/keys`,
            title:`Access_keys`,
        },
        {
            id:`/repository/${webUrl}/setting/hooks`,
            title:'WebHooks',
        },
        {
            id:`/repository/${webUrl}/setting/lfs`,
            title:'大文件存储',
        },
        {
            id:`/repository/${webUrl}/setting/clean`,
            title:'仓库清理',
            purviewCode: "rpy_clean",
        },
        {
            id:`/repository/${webUrl}/setting/remote`,
            title:'仓库镜像',
            purviewCode: "rpy_mirror",
        },
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={repositoryInfo?.rpyId}
            />
}

export default inject('repositoryStore')(observer(RepositorySetting))
