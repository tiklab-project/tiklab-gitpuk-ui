import React from 'react';
import {
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    VerifiedOutlined,
    KeyOutlined,
    FileDoneOutlined
} from '@ant-design/icons';
import SettingContent from './SettingContent';

const Setting = props =>{

    const applicationRouters = a =>{
        return [
            {
                id:'/index/sys/role',
                title:'Privilege',
                icon: <SafetyCertificateOutlined />,
                purviewCode:'pipeline_permission',
            },
            {
                id:'2',
                title: 'Message',
                icon:<SoundOutlined/>,
                purviewCode: a[2],
                children: [
                    {
                        id:'/index/sys/mes/notice',
                        title:'Message Notification Scheme',
                        icon:<SoundOutlined />,
                        purviewCode:'message_setting',
                    },
                    {
                        id:'/index/sys/mes/send',
                        title: 'Message Send Type',
                        icon:<SoundOutlined />,
                        purviewCode: 'message_type',
                    },
                ]
            },
            {
                id:'/index/sys/auth',
                title: 'Keys',
                icon:<KeyOutlined />,
            },
            {
                id:'/index/sys/hooks',
                title: 'WebHooks',
                icon:<FileDoneOutlined />,
            },
            {
                id:'/index/sys/plugin',
                title:'Plugin',
                icon:<MergeCellsOutlined />,
                purviewCode:'pipeline_plugin',
            },
            {
                id:'5',
                title:'Security',
                icon:<LayoutOutlined />,
                purviewCode:a[3],
                children: [
                    {
                        id:'/index/sys/myLog',
                        title:'Operation Log',
                        icon:<LayoutOutlined />,
                        purviewCode:'pipeline_log',
                    }
                ]
            },
            {
                id:'/index/sys/version',
                title:'Version And Licence',
                icon:<VerifiedOutlined />,
                purviewCode:'pipeline_version',
            },
        ]
    }

    return  <SettingContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default Setting
