import React ,{useEffect}from 'react';
import RpySetting from '../../../common/aside/RpySetting';
import {inject, observer} from "mobx-react";
import {LayoutOutlined} from "@ant-design/icons";

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
            purviewCode: "domain_use",
        },
        {
            id:`/repository/${webUrl}/setting/role`,
            title:`Privilege`,
            purviewCode: "domain_role",
        },
        {
            id:`/repository/${webUrl}/setting/branch`,
            title:`BranchSetting`,
            purviewCode: "rpy_branch_setting",
        },
        /*  {
           id:`/repository/${webUrl}/setting/keys`,
           title:`Access_keys`,
       },*/
        {
            id:'7',
            title: '仓库配置',
            icon: <LayoutOutlined />,
            children: [

                {
                    id:`/repository/${webUrl}/setting/forkHistory`,
                    title:'Fork历史',
                },
                {
                    id:`/repository/${webUrl}/setting/pushMerge`,
                    title:`合并设置`,
                },
                {
                    id:`/repository/${webUrl}/setting/hooks`,
                    title:'WebHooks',
                },
                {
                    id:`/repository/${webUrl}/setting/remote`,
                    title:'仓库镜像',
                },
            ]
        },
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={repositoryInfo?.rpyId}
            />
}

export default inject('repositoryStore')(observer(RepositorySetting))
