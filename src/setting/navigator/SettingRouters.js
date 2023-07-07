import React from "react";
import {
    BarsOutlined,
    GroupOutlined,
    MenuOutlined,
    ProjectOutlined,
    TeamOutlined,
} from "@ant-design/icons";

// 用户与部门路由
export const departmentRouters =[
    {
        id: "1",
        title: "用户与部门",
        icon: <TeamOutlined/>,
        children: [
            {
                id: "/index/sys/org",
                title: "部门",
                icon: <GroupOutlined/>,
                purviewCode: "orga",
            },
            {
                id: "/index/sys/user",
                title: "Users",
                icon: <TeamOutlined/>,
                purviewCode: "user",
            },
            {
                id: "/index/sys/userGroup",
                title: "用户组",
                icon: <TeamOutlined/>,
                purviewCode: "user_group",
            },
            {
                id: "/index/sys/directory",
                title: "用户目录",
                icon: <BarsOutlined/>,
                purviewCode: "user_dir",
            },
        ]
    }
]

// 基础数据路由
export const templateRouter = [
    {
        id:"6",
        title:"基础数据",
        icon:<ProjectOutlined />,
        children:[
            {
                id:"/index/sys/syr/feature",
                title:"系统功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/roletrue",
                title:"系统角色",
                icon: <MenuOutlined />,
            },
            {
                id:"/index/sys/project/feature",
                title:"项目功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/project/role",
                title:"项目角色",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/todoTask",
                title:"待办任务",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/task",
                title:"待办事项",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/todoTemp",
                title:"代办模板 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/todoType",
                title:"代办类型 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/logTemplate",
                title:"日志模板",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/logType",
                title:"日志类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/management",
                title:"消息管理",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/type",
                title:"消息类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/sendtrue",
                title:"消息通知类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/index/sys/noticetrue",
                title:"通知方案",
                icon:<MenuOutlined />
            },
            {
                id:"/index/sys/userGrouptrue",
                title:"用户组true",
                icon:<MenuOutlined />
            },
        ]
    }
]
