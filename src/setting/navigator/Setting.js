import React from 'react';
import {
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    VerifiedOutlined,
    KeyOutlined,
    TeamOutlined,
    GroupOutlined,
    BarsOutlined,
    FileDoneOutlined,
    BuildOutlined,
} from '@ant-design/icons';
import SettingContent from './SettingContent';

const Setting = props =>{

    const applicationRouters = [
            {
                id: '1',
                title: 'Users And Departments',
                icon: <TeamOutlined/>,
                children: [
                    {
                        id: '/index/sys/user/org',
                        title: 'Departments',
                        icon: <GroupOutlined/>,
                        purviewCode: 'orga',
                    },
                    {
                        id: '/index/sys/user/list',
                        title: 'Users',
                        icon: <TeamOutlined/>,
                        purviewCode: 'user',
                    },
                    {
                        id: '/index/sys/user/userGroup',
                        title: 'Users Group',
                        icon: <TeamOutlined/>,
                        purviewCode: 'user_group',
                    },
                    {
                        id: '/index/sys/user/directory',
                        title: 'Users Directory',
                        icon: <BarsOutlined/>,
                        purviewCode: 'user_dir',
                    },
                ]
            },
            {
                id:'/index/sys/role',
                title:'Privilege',
                icon: <SafetyCertificateOutlined />,
                purviewCode:'xcode_permission',
            },
            {
                id:'2',
                title: 'Message',
                icon:<SoundOutlined/>,
                children: [
                    {
                        id:'/index/sys/mes/notice',
                        title:'Message Notification Scheme',
                        icon:<SoundOutlined />,
                        purviewCode:'message_type',
                    },
                    {
                        id:'/index/sys/mes/send',
                        title: 'Message Send Type',
                        icon:<SoundOutlined />,
                        purviewCode: 'message_setting',
                    },
                ]
            },
            {
                id:'/index/sys/auth',
                title: 'Keys',
                icon:<KeyOutlined />,
            },
            {
                id:'/index/sys/plugin',
                title:'Plugin',
                icon:<MergeCellsOutlined />,
                purviewCode:'xcode_plugin',
            },
         /*   {
                id:'/index/sys/hooks',
                title: 'WebHooks',
                icon:<FileDoneOutlined />,
            },*/
            {
                id:'/index/sys/deploy/server',
                title:'server_deploy',
                icon:<FileDoneOutlined />,
            },
            {
                id:'/index/sys/deploy/env',
                title:'env_deploy',
                icon:<BuildOutlined />,
            },
            {
                id:'5',
                title:'Backups And Rec',
                purviewCode:'backups',
                icon:<BuildOutlined />,
                children: [
                    {
                        id: '/index/sys/deploy/backups',
                        title: 'Backups',
                        icon: <BarsOutlined/>,
                    },
                    {
                        id: '/index/sys/deploy/recover',
                        title: 'Recover',
                        icon: <BarsOutlined/>,
                    },
                ]
            },
            /*{
                id:'/index/sys/deploy/recover',
                title:'Recover',
                icon:<BuildOutlined />,
            },*/
            {
                id:'5',
                title:'Security',
                icon:<LayoutOutlined />,
                children: [
                    {
                        id:'/index/sys/myLog',
                        title:'Operation Log',
                        icon:<LayoutOutlined />,
                        purviewCode:'xcode_log',
                    }
                ]
            },
            {
                id:'/index/sys/version',
                title:'Version And Licence',
                icon:<VerifiedOutlined />,
                purviewCode:'xcode_version',
            },
        ]

    return  <SettingContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default Setting
