import React from 'react'
import SystemContent from './systemContent'
import {
    LayoutOutlined,
    MergeCellsOutlined,
    SafetyCertificateOutlined,
    SoundOutlined,
    VerifiedOutlined,
    KeyOutlined,
    FileDoneOutlined
} from '@ant-design/icons'

const sys = props =>{

    const applicationRouters = a =>{
        return [
            {
                id:'/index/sys/role',
                title:'权限',
                icon: <SafetyCertificateOutlined />,
                purviewCode:'pipeline_permission',
            },
            {
                id:'2',
                title: '消息',
                icon:<SoundOutlined/>,
                purviewCode: a[2],
                children: [
                    {
                        id:'/index/sys/mes/notice',
                        title:'消息通知方案',
                        icon:<SoundOutlined />,
                        purviewCode:'message_setting',
                    },
                    {
                        id:'/index/sys/mes/send',
                        title: '消息发送方式',
                        icon:<SoundOutlined />,
                        purviewCode: 'message_type',
                    },
                ]
            },
            {
                id:'/index/sys/keys',
                title: '秘钥',
                icon:<KeyOutlined />,
            },
            {
                id:'/index/sys/hooks',
                title: 'WebHooks',
                icon:<FileDoneOutlined />,
            },
            {
                id:'/index/sys/plugin',
                title:'插件',
                icon:<MergeCellsOutlined />,
                purviewCode:'pipeline_plugin',
            },
            {
                id:'5',
                title:'安全',
                icon:<LayoutOutlined />,
                purviewCode:a[3],
                children: [
                    {
                        id:'/index/sys/myLog',
                        title:'操作日志',
                        icon:<LayoutOutlined />,
                        purviewCode:'pipeline_log',
                    }
                ]
            },
            {
                id:'/index/sys/version',
                title:'版本与许可证',
                icon:<VerifiedOutlined />,
                purviewCode:'pipeline_version',
            },
        ]
    }

    return  <SystemContent
                {...props}
                isDepartment={true}
                applicationRouters={applicationRouters}
            />
}

export default sys
