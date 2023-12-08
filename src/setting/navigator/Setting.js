import React from 'react';
import {
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    VerifiedOutlined,
    KeyOutlined,
    BarsOutlined,
    FileDoneOutlined,
    BuildOutlined,
} from '@ant-design/icons';
import SettingContent from './SettingContent';

const Setting = props =>{

    const applicationRouters = [

            {
                id:'/setting/role',
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
                        id:'/setting/mes/notice',
                        title:'Message Notification Scheme',
                        purviewCode:'message_type',
                    },
                    {
                        id:'/setting/mes/send',
                        title: 'Message Send Type',
                        purviewCode: 'message_setting',
                    },
                ]
            },
            {
                id:'/setting/plugin',
                title:'Plugin',
                icon:<MergeCellsOutlined />,
                purviewCode:'xcode_plugin',
            },
            {
                id:'/setting/auth',
                title: 'Keys',
                icon:<KeyOutlined />,
            },

        {
             id:'3',
             title: '代码扫描',
             icon:<FileDoneOutlined />,
               children: [
                   {
                       id:'/setting/scanScheme',
                       title: '扫描方案',
                   },
                   {
                       id:'/setting/scanRuleSet',
                       title:'扫描规则',
                   },
                   {
                       id:'/setting/scanEnv',
                       title:'扫描环境',
                   },
               ]
         },

        {
            id:'/setting/power/user',
            title:'用户仓库',
            purviewCode:'xcode_rpy_power',
            icon:<MergeCellsOutlined />,
        },
        {
            id:'5',
            title:'Security',
            icon:<LayoutOutlined />,
            children: [
                {
                    id:'/setting/myLog',
                    title:'Operation Log',
                    purviewCode:'xcode_log',
                },
                {
                    id:'/setting/backupRecovery',
                    title:'备份与恢复',
                },
            ]
        },
        {
            id:'6',
            title:'应用',
            icon:<VerifiedOutlined />,
            children: [
                {
                    id:'/setting/version',
                    title:'Version And Licence',
                    purviewCode:'xcode_version',
                },
                {
                    id:'/setting/authContent',
                    title:'应用访问权限',
                },
            ]
        },
        ]

    return  <SettingContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default Setting
