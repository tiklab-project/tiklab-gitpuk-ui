import React from 'react';
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined,
    TeamOutlined,
} from '@ant-design/icons';

// 用户与部门路由
export const departmentRouters = a =>{
    return [
        {
            id: '1',
            title: 'Users And Departments',
            purviewCode: a[0],
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
                    purviewCode: 'user',
                },
                {
                    id: '/index/sys/user/directory',
                    title: 'Users Directory',
                    icon: <BarsOutlined/>,
                    purviewCode: 'user_dir',
                },
            ]
        }
    ]
}

// 基础数据路由
export const templateRouter = [
    {
        id:'6',
        title:'基础数据',
        icon:<ProjectOutlined />,
        purviewCode:'basics',
        children:[
            {
                id:'/index/sys/syr/feature',
                title:'系统功能',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/roletrue',
                title:'系统角色',
                icon: <MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/project/feature',
                title:'项目功能',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/project/role',
                title:'项目角色',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/todoTask',
                title:'待办任务',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/task',
                title:'待办事项',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/todoTemp',
                title:'代办模板 ',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/todoType',
                title:'代办类型 ',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/logTemplate',
                title:'日志模板',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/logType',
                title:'日志类型',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/mes/management',
                title:'消息管理',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/mes/type',
                title:'消息类型',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/mes/sendtrue',
                title:'消息通知类型',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/mes/noticetrue',
                title:'通知方案',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
            {
                id:'/index/sys/user/userGrouptrue',
                title:'用户组true',
                icon:<MenuOutlined />,
                purviewCode:'basics',
            },
        ]
    }
]
