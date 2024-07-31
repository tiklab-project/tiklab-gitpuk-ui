import React from "react";
import {
    MenuOutlined,
    ProjectOutlined,
} from "@ant-design/icons";



// 基础数据路由
export const templateRouter = [
    {
        id:"16",
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
