import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';

const Home=AsyncComponent(()=>import('./modules/home/container/home'))

const Login=AsyncComponent(()=>import('./modules/eam/login'))
const Logout=AsyncComponent(()=>import('./modules/eam/Logout'))
const Wechat=AsyncComponent(()=>import('./modules/eam/wechat'))
const NoProductAuthUser=AsyncComponent(()=>import('./modules/eam/noProductAuthUser'))
const NotFound=AsyncComponent(()=>import('./modules/eam/404'))

/*
    首页
 */
const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))

/*
    仓库
 */
const Storehouse=AsyncComponent(()=>import('./modules/house/container/house'))

/*
     仓库组
 */
const StorehouseGroup=AsyncComponent(()=>import('./modules/houseGroup/container/houseGroup'))

const WEBIDE=AsyncComponent(()=>import('./modules/WEBIDE/container/webIde'))

/*
    仓库详情
 */
const StorehouseDetails=AsyncComponent(()=>import('./modules/houseDetails/common/houseDetails'))
const Code=AsyncComponent(()=>import('./modules/houseDetails/code/container/code'))
const Blob=AsyncComponent(()=>import('./modules/houseDetails/code/components/blob'))
const Edit=AsyncComponent(()=>import('./modules/houseDetails/code/components/edit'))
const Branch=AsyncComponent(()=>import('./modules/houseDetails/branch/container/branch'))
const Tag=AsyncComponent(()=>import('./modules/houseDetails/tag/container/tag'))
const HouseMerge=AsyncComponent(()=>import('./modules/houseDetails/merge/merge'))
const Commits=AsyncComponent(()=>import('./modules/houseDetails/commits/container/commits'))
const CommitsDetails=AsyncComponent(()=>import('./modules/houseDetails/commits/components/commitsDetails'))
const Question=AsyncComponent(()=>import('./modules/houseDetails/question/container/question'))
const Pipeline=AsyncComponent(()=>import('./modules/houseDetails/pipeline/container/pipeline'))
const Statistics=AsyncComponent(()=>import('./modules/houseDetails/statistics/container/statistics'))

/*
    仓库设置
 */
const StorehouseSet=AsyncComponent(()=>import('./modules/houseDetailsSet/common/houseSet'))
const HouseSet=AsyncComponent(()=>import('./modules/houseDetailsSet/set/houseSet'))
const PushRule=AsyncComponent(()=>import('./modules/houseDetailsSet/pushRule/container/pushRule'))
const Keys=AsyncComponent(()=>import('./modules/houseDetailsSet/keys/container/keys'))
const WebHooks=AsyncComponent(()=>import('./modules/houseDetailsSet/webHooks/container/hooks'))

/*
    仓库组详情
 */
const HouseGroupDetails=AsyncComponent(()=>import('./modules/houseGroupDetails/common/groupDetails'))
const Survey=AsyncComponent(()=>import('./modules/houseGroupDetails/survey/container/survey'))
const GroupMerge=AsyncComponent(()=>import('./modules/houseGroupDetails/merge/merge'))
const GroupHouse=AsyncComponent(()=>import('./modules/houseGroupDetails/house/container/house'))

/* 系统设置 */
const sys=AsyncComponent(()=>import('./modules/sys/common/system'))

/* 插件 */
const Plugin=AsyncComponent(()=>import('./modules/sys/plug-in/plugin'))

/* 权限 */
const sysFeature=AsyncComponent(()=>import('./modules/sys/privilege/systemFeature'))
const sysRole=AsyncComponent(()=>import('./modules/sys/privilege/systemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./modules/sys/privilege/systemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./modules/sys/privilege/projectRole'))
const ProjectFeature=AsyncComponent(()=>import('./modules/sys/privilege/projectFeature'))
const DomainRole=AsyncComponent(()=>import('./modules/sys/privilege/domainRole'))

/* 消息 */
const MessageManagement=AsyncComponent(()=>import('./modules/sys/message/messageManagement'))
const MessageType=AsyncComponent(()=>import('./modules/sys/message/messageType'))
const MessageSendType=AsyncComponent(()=>import('./modules/sys/message/messageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./modules/sys/message/messageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./modules/sys/message/messageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./modules/sys/message/messageNoticeTrue'))

/* 日志 */
const MyLogList=AsyncComponent(()=>import('./modules/sys/oplog/myLogList'))
const LogTemplateList=AsyncComponent(()=>import('./modules/sys/oplog/logTemplateList'))
const LogList=AsyncComponent(()=>import('./modules/sys/oplog/logList'))
const LogType=AsyncComponent(()=>import('./modules/sys/oplog/logType'))

/* 代办 */
const MyTodoTask=AsyncComponent(()=>import('./modules/sys/todotask/myTodoTask'))
const TaskList=AsyncComponent(()=>import('./modules/sys/todotask/taskList'))
const TodoTemp=AsyncComponent(()=>import('./modules/sys/todotask/todoTemp'))
const TodoType=AsyncComponent(()=>import('./modules/sys/todotask/todoType'))

/*
    licence管理
 */
// 产品授权页面
const ProductUser=AsyncComponent(()=>import('./modules/sys/licence/productUser'))

const Version=AsyncComponent(()=>import('./modules/sys/licence/version'))

const UserList=AsyncComponent(()=>import('./modules/sys/user/list'))
const UserDirectory=AsyncComponent(()=>import('./modules/sys/user/directory'))
const Org=AsyncComponent(()=>import('./modules/sys/user/org'))
const UserGroup=AsyncComponent(()=>import('./modules/sys/user/group'))
const UserGroupTrue=AsyncComponent(()=>import('./modules/sys/user/groupture'))
const DomainUser=AsyncComponent(()=>import('./modules/sys/user/domainUser'))


const routers = [
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/logout',
        component:Logout,
    },
    {
        path:'/no-auth',
        exact:true,
        component:NoProductAuthUser,
    },
    {
        path: '/project',
        exact:true,
        component:Wechat,
    },
    {
        path:'/index',
        component:Home,
        routes:[
            {
                path: '/index',
                exact:true,
                render:()=><Redirect to={'/index/home'}/>,
            },
            {
                path:'/index/home',
                exact:true,
                component:Homepage,
            },
            {
                path:'/index/storehouse',
                exact:true,
                component:Storehouse,
            },
            {
                path:'/index/storehouseGroup',
                exact:true,
                component:StorehouseGroup,
            },
            {
                path:'/index/ide/*',
                component:WEBIDE,
            },

            {
                path:'/index/house/:name',
                component:StorehouseDetails,
                routes:[
                    {
                        path:'/index/house/:name/tree',
                        exact: true,
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/tree/:branch',
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/blob/:branch/*',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/edit/:branch/*',
                        exact:false,
                        component:Edit,
                    },
                    {
                        path:'/index/house/:name/branch',
                        exact:true,
                        component:Branch,
                    },
                    {
                        path:'/index/house/:name/tag',
                        exact:true,
                        component:Tag,
                    },
                    {
                        path:'/index/house/:name/merge',
                        exact:true,
                        component:HouseMerge,
                    },
                    {
                        path:'/index/house/:name/commits/:branch',
                        exact: true,
                        component:Commits,
                    },
                    {
                        path:'/index/house/:name/commit/:commitsId',
                        component:CommitsDetails,
                    },
                    {
                        path:'/index/house/:name/statistics',
                        component: Statistics
                    },
                    {
                        path:'/index/house/:name/question',
                        component: Question
                    },
                    {
                        path:'/index/house/:name/pipeline',
                        component: Pipeline
                    },
                    {
                        path:'/index/house/:name/sys',
                        component: StorehouseSet,
                        routes:[
                            {
                                path:'/index/house/:name/sys/set',
                                component:HouseSet
                            },
                            {
                                path:'/index/house/:name/sys/pushRule',
                                component:PushRule
                            },
                            {
                                path:'/index/house/:name/sys/keys',
                                component:Keys
                            },
                            {
                                path:'/index/house/:name/sys/hooks',
                                component:WebHooks
                            },
                            {
                                path:'/index/house/:name/sys/user',
                                component: DomainUser
                            },
                            {
                                path:'/index/house/:name/sys/role',
                                component: DomainRole
                            }
                        ]
                    },
                    {
                        path:'/index/house/:name/*',
                        render:()=><Redirect to={'/index/404'}/>,
                    }
                ]
            },
            {
                path:'/index/group/:name',
                component: HouseGroupDetails,
                routes: [
                    {
                        path:'/index/group/:name/survey',
                        component: Survey
                    },
                    {
                        path:'/index/group/:name/merge',
                        component: GroupMerge
                    },
                    {
                        path:'/index/group/:name/house',
                        component: GroupHouse
                    },
                ]
            },
            {
                path:'/index/sys',
                component: sys,
                routes: [
                    {
                        path: '/index/sys/productUser',
                        component: ProductUser,
                    },
                    {
                        path: '/index/sys/plugin',
                        component: Plugin,
                    },
                    {
                        path: '/index/sys/role',
                        component: sysRole,
                    },
                    {
                        path: '/index/sys/roletrue',
                        component: sysRoleTrue,
                    },
                    {
                        path: '/index/sys/syr/feature',
                        component: sysFeature,
                    },
                    {
                        path: '/index/sys/project/role',
                        component: ProjectRole,
                    },
                    {
                        path: '/index/sys/project/feature',
                        component: ProjectFeature,
                    },
                    {
                        path: '/index/sys/task',
                        component: TaskList,
                    },
                    {
                        path: '/index/sys/todoTask',
                        component: MyTodoTask,
                    },
                    {
                        path: '/index/sys/todoTemp',
                        component: TodoTemp,
                    },
                    {
                        path: '/index/sys/todoType',
                        component: TodoType,
                    },
                    {
                        path:'/index/sys/myLog',
                        component: MyLogList,
                    },
                    {
                        path:'/index/sys/logTemplate',
                        component: LogTemplateList,
                    },{

                        path:'/index/sys/logType',
                        component: LogType,
                    },
                    {
                        path: '/index/sys/user/org',
                        component: Org,
                    },
                    {
                        path: '/index/sys/user/userGroup',
                        component: UserGroup,
                    },
                    {
                        path: '/index/sys/user/directory',
                        component: UserDirectory,
                    },
                    {
                        path: '/index/sys/user/list',
                        component: UserList,
                    },
                    {
                        path:'/index/sys/mes/management',
                        component: MessageManagement,
                    },
                    {
                        path:'/index/sys/mes/type',
                        component: MessageType,
                    },
                    {
                        path:'/index/sys/mes/send',
                        component: MessageSendType,
                    },
                    {
                        path:'/index/sys/mes/sendtrue',
                        component: MessageSendTypeTrue,
                    },
                    {
                        path:'/index/sys/mes/notice',
                        component: MessageNotice,
                    },
                    {
                        path:'/index/sys/mes/noticetrue',
                        component: MessageNoticeTrue,
                    },
                    {
                        path: '/index/sys/user/userGrouptrue',
                        component: UserGroupTrue,
                    },
                    {
                        path:'/index/sys/version',
                        component: Version,
                    },
                    {
                        path:'/index/system/*',
                        render:()=><Redirect to={'/index/404'}/>,
                    }
                ]
            },
            {
                path:'/index/404',
                component:NotFound,
            },
            {
                path:'/index/*',
                render:()=><Redirect to={'/index/404'}/>,
            }
        ]
    },
    {
        path:'/',
        component: Home,
        exact: true,
        render:()=><Redirect to='/index'/>,
    },
    {
        path: '*',
        render:()=><Redirect to='/index/404'/>,
    },
]

export default routers
