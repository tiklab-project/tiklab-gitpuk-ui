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
                id: "/setting/org",
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
                id: "/setting/directory",
                title: "用户目录",
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
                id:"/setting/syr/feature",
                title:"系统功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/roletrue",
                title:"系统角色",
                icon: <MenuOutlined />,
            },
            {
                id:"/setting/project/feature",
                title:"项目功能",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/project/role",
                title:"项目角色",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/todoTask",
                title:"待办任务",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/task",
                title:"待办事项",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/todoTemp",
                title:"代办模板 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/todoType",
                title:"代办类型 ",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/logTemplate",
                title:"日志模板",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/logType",
                title:"日志类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/management",
                title:"消息管理",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/type",
                title:"消息类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/sendtrue",
                title:"消息通知类型",
                icon:<MenuOutlined />,
            },
            {
                id:"/setting/noticetrue",
                title:"通知方案",
                icon:<MenuOutlined />
            },
            {
                id:"/setting/userGrouptrue",
                title:"用户组true",
                icon:<MenuOutlined />
            },
        ]
    }
]
