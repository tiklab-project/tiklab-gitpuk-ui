import React, {useEffect, useState} from 'react';
import {
    LayoutOutlined,
    SoundOutlined,
    VerifiedOutlined,
    FileDoneOutlined,
    DeploymentUnitOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    InsuranceOutlined,
    ProductOutlined,
    UserDeleteOutlined
} from '@ant-design/icons';
import SettingContent from './SettingContent';
import {templateRouter} from "./SettingRouters"
import {inject, observer} from "mobx-react";
const Setting = props =>{

    const {repositoryStore}=props
    const {setNavLevel} = repositoryStore

    const [authConfig,setAuthConfig]=useState(null)

    useEffect( ()=>{
        setNavLevel(2)

        const authConfig=localStorage.getItem('authConfig')
        setAuthConfig(JSON.parse(authConfig))
    },[])

    const applicationRouters = [
            {
                id: "1",
                title: "用户",
                icon: <TeamOutlined/>,
                children: [
                    {
                        id: "/setting/orga",
                        title: "部门",
                        purviewCode: "orga",
                    },
                    {
                        id: "/setting/user",
                        title: "Users",
                        purviewCode: "user",
                    },
                    {
                        id: "/setting/userGroup",
                        title: "用户组",
                        purviewCode: "user_group",
                    },
                    {
                        id: "/setting/dir",
                        title: "用户目录",
                        purviewCode: "user_dir",
                    },

                ]
            },
            {
                id:'/setting/role',
                title:'Privilege',
                icon: <UserDeleteOutlined />,
                purviewCode:'permission',
            },
            {
                id:'/setting/message',
                title: '消息',
                icon:<SoundOutlined/>,
                purviewCode:'message',
            },
            {
                id:'4',
                title: '仓库配置',
                icon:<DeploymentUnitOutlined />,
                children: [
                    {
                        id:'/setting/auth',
                        title: 'Keys',
                    },
                    {
                        id:'/setting/powerUser',
                        title:'成员权限',
                        purviewCode:'gittok_user_rpy',
                    },

                ]
            },
      /*      {
                 id:'3',
                 title: '扫描配置',
                 icon: <FileDoneOutlined />,
                 purviewCode:'gittok_scan',
                children: [
                       {
                           id:'/setting/oldScheme',
                           title: '扫描方案',
                       },
                       {
                           id:'/setting/scanEnv',
                           title:'扫描环境',
                       },
                    {
                        id:'/setting/scanRuleSet',
                        title:'扫描规则集',
                    },
                   ]
             },*/
            {
                id:'7',
                title: '集成开放',
                icon: <LayoutOutlined />,
                children: [
                    {
                        id:'/setting/systemInt',
                        title:'服务集成',
                    },
                    {
                        id:'/setting/openApi',
                        title:'OpenApi',
                        purviewCode:'openapi',
                    },

                ]
            },
            {
                id:'5',
                title:'Security',
                icon:<SafetyCertificateOutlined/>,
                children: [
                    {
                        id:'/setting/backupRecovery',
                        title:'备份与恢复',
                        purviewCode:'backups_and_recover',
                    },
                ]
            },
            {
                id:'6',
                title:'系统',
                icon:<VerifiedOutlined />,
                children: [
                    {
                        id:'/setting/version',
                        title:'Version And Licence',
                        purviewCode:'licence',
                    },
                    {
                        id:'/setting/authContent',
                        title:'系统访问权限',
                        purviewCode:'apply_limits',
                    },
                    {
                        id:'/setting/resources',
                        title: '资源监控',
                    },
                ]
            },
        ]



    return  <SettingContent
                {...props}
                isDepartment={false}
                applicationRouters={applicationRouters}
                templateRouter={templateRouter}
                setNavLevel={setNavLevel}
            />
}

export default inject('repositoryStore')(observer(Setting))
