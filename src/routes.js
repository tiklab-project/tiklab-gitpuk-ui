import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';

const Home=AsyncComponent(()=>import('./modules/home/container/home'))

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Logout=AsyncComponent(()=>import('./modules/login/Logout'))
const Wechat=AsyncComponent(()=>import('./modules/login/wechat'))
const NoProductAuthUser=AsyncComponent(()=>import('./modules/login/noProductAuthUser'))
const NotFound=AsyncComponent(()=>import('./modules/login/404'))

/*
    首页
 */
const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))

/*
    仓库
 */
const Storehouse=AsyncComponent(()=>import('./modules/repository/container/repository'))

const WEBIDE=AsyncComponent(()=>import('./modules/WEBIDE/container/webIde'))

/*
    仓库详情
 */
const RepositoryDetails=AsyncComponent(()=>import('./modules/repositoryDetails/repositoryDetails/repositoryDetails'))
const Code=AsyncComponent(()=>import('./modules/repositoryDetails/code/container/code'))
const Blob=AsyncComponent(()=>import('./modules/repositoryDetails/code/components/blob'))
const Edit=AsyncComponent(()=>import('./modules/repositoryDetails/code/components/edit'))
const Branch=AsyncComponent(()=>import('./modules/repositoryDetails/branch/container/branch'))
const Tag=AsyncComponent(()=>import('./modules/repositoryDetails/tag/container/tag'))
const HouseMerge=AsyncComponent(()=>import('./modules/repositoryDetails/merge/merge'))
const Commits=AsyncComponent(()=>import('./modules/repositoryDetails/commits/container/commits'))
const CommitsDetails=AsyncComponent(()=>import('./modules/repositoryDetails/commits/components/commitsDetails'))
const Issue=AsyncComponent(()=>import('./modules/repositoryDetails/issue/container/issue'))
const Pipeline=AsyncComponent(()=>import('./modules/repositoryDetails/pipeline/container/pipeline'))
const Statistics=AsyncComponent(()=>import('./modules/repositoryDetails/statistics/container/statistics'))

/*
    仓库设置
 */
const RepositoryDetailsSet=AsyncComponent(()=>import('./modules/repositoryDetailsSet/repositoryDetailsSet/repositoryDetailsSet'))
const RepositoryBasic=AsyncComponent(()=>import('./modules/repositoryDetailsSet/basic/repositoryBasic'))
const PushRule=AsyncComponent(()=>import('./modules/repositoryDetailsSet/pushRule/container/pushRule'))
const AccessKeys=AsyncComponent(()=>import('./modules/repositoryDetailsSet/accessKeys/container/accessKeys'))
const WebHooks=AsyncComponent(()=>import('./modules/repositoryDetailsSet/webHooks/container/hooks'))


/*
     仓库组
 */
const Group=AsyncComponent(()=>import('./modules/group/container/group'))

/*
    仓库组详情
 */
const GroupDetails=AsyncComponent(()=>import('./modules/groupDetails/groupDetails/groupDetails'))
const Survey=AsyncComponent(()=>import('./modules/groupDetails/survey/container/survey'))
const GroupMerge=AsyncComponent(()=>import('./modules/groupDetails/merge/merge'))
const GroupRepository=AsyncComponent(()=>import('./modules/groupDetails/repository/container/repository'))

/*
    仓库组详情设置
 */
const GroupDetailsSet=AsyncComponent(()=>import('./modules/groupDetailsSet/common/groupDetailsSet'))
const GroupSetting=AsyncComponent(()=>import('./modules/groupDetailsSet/setting/groupSetting'))

/* 系统设置 */
const sys=AsyncComponent(()=>import('./modules/sysmgr/common/system'))

const Keys_sys=AsyncComponent(()=>import('./modules/sysmgr/keys/container/keys'))

/* 插件 */
const Plugin=AsyncComponent(()=>import('./modules/sysmgr/plug-in/plugin'))

/* 权限 */
const sysFeature=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemFeature'))
const sysRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/projectRole'))
const ProjectFeature=AsyncComponent(()=>import('./modules/sysmgr/privilege/projectFeature'))
const DomainRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/domainRole'))
const ProductAuth=AsyncComponent(()=>import('./modules/sysmgr/privilege/productAuth'))

/* 消息 */
const MessageManagement=AsyncComponent(()=>import('./modules/sysmgr/message/messageManagement'))
const MessageType=AsyncComponent(()=>import('./modules/sysmgr/message/messageType'))
const MessageSendType=AsyncComponent(()=>import('./modules/sysmgr/message/messageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./modules/sysmgr/message/messageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./modules/sysmgr/message/messageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./modules/sysmgr/message/messageNoticeTrue'))

/* 日志 */
const MyLogList=AsyncComponent(()=>import('./modules/sysmgr/oplog/myLogList'))
const LogTemplateList=AsyncComponent(()=>import('./modules/sysmgr/oplog/logTemplateList'))
const LogType=AsyncComponent(()=>import('./modules/sysmgr/oplog/logType'))

/* 代办 */
const MyTodoTask=AsyncComponent(()=>import('./modules/sysmgr/todotask/myTodoTask'))
const TaskList=AsyncComponent(()=>import('./modules/sysmgr/todotask/taskList'))
const TodoTemp=AsyncComponent(()=>import('./modules/sysmgr/todotask/todoTemp'))
const TodoType=AsyncComponent(()=>import('./modules/sysmgr/todotask/todoType'))

/*
    licence管理
 */
const ProductUser=AsyncComponent(()=>import('./modules/sysmgr/licence/productUser'))
const Version=AsyncComponent(()=>import('./modules/sysmgr/licence/version'))

const UserList=AsyncComponent(()=>import('./modules/sysmgr/user/list'))
const UserDirectory=AsyncComponent(()=>import('./modules/sysmgr/user/directory'))
const Org=AsyncComponent(()=>import('./modules/sysmgr/user/org'))
const UserGroup=AsyncComponent(()=>import('./modules/sysmgr/user/group'))
const UserGroupTrue=AsyncComponent(()=>import('./modules/sysmgr/user/groupture'))
const DomainUser=AsyncComponent(()=>import('./modules/sysmgr/user/domainUser'))

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
                path:'/index/house',
                exact:true,
                component:Storehouse,
            },
            {
                path:'/index/ide/*',
                component:WEBIDE,
            },
            {
                path:'/index/group',
                exact:true,
                component:Group,
            },
            {
                path:'/index/house/:namespace/:name',
                component:RepositoryDetails,
                routes:[
                    {
                        path:'/index/house/:namespace/:name',
                        exact: true,
                        component:Code,
                    },
                    {
                        path:'/index/house/:namespace/:name/tree',
                        exact: true,
                        component:Code,
                    },
                    {
                        path:'/index/house/:namespace/:name/tree/:branch',
                        component:Code,
                    },
                    {
                        path:'/index/house/:namespace/:name/blob/:branch/*',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/index/house/:namespace/:name/edit/:branch/*',
                        exact:false,
                        component:Edit,
                    },
                    {
                        path:'/index/house/:namespace/:name/branch',
                        exact:true,
                        component:Branch,
                    },
                    {
                        path:'/index/house/:namespace/:name/tag',
                        exact:true,
                        component:Tag,
                    },
                    {
                        path:'/index/house/:namespace/:name/merge_requests',
                        exact:true,
                        component:HouseMerge,
                    },
                    {
                        path:'/index/house/:namespace/:name/commits/:branch',
                        component:Commits,
                    },
                    {
                        path:'/index/house/:namespace/:name/commit/:commitsId',
                        component:CommitsDetails,
                    },
                    {
                        path:'/index/house/:namespace/:name/statistics',
                        component: Statistics
                    },
                    {
                        path:'/index/house/:namespace/:name/issue',
                        component: Issue
                    },
                    {
                        path:'/index/house/:namespace/:name/pipeline',
                        component: Pipeline
                    },
                    {
                        path:'/index/house/:namespace/:name/sys',
                        component: RepositoryDetailsSet,
                        routes:[
                            {
                                path:'/index/house/:namespace/:name/sys/set',
                                component:RepositoryBasic
                            },
                            {
                                path:'/index/house/:namespace/:name/sys/pushRule',
                                component:PushRule
                            },
                            {
                                path:'/index/house/:namespace/:name/sys/keys',
                                component:AccessKeys
                            },
                            {
                                path:'/index/house/:namespace/:name/sys/hooks',
                                component:WebHooks
                            },
                            {
                                path:'/index/house/:namespace/:name/sys/member',
                                component: DomainUser
                            },
                            {
                                path:'/index/house/:namespace/:name/sys/role',
                                component: DomainRole
                            }
                        ]
                    },
                    {
                        path:'/index/house/:namespace/:name/*',
                        render:()=><Redirect to={'/index/404'}/>,
                    }
                ]
            },
            {
                path:'/index/group/:name',
                component: GroupDetails,
                routes: [
                    {
                        path:'/index/group/:name/survey',
                        component: Survey,
                        exact: true,
                    },
                    {
                        path:'/index/group/:name/merge_requests',
                        component: GroupMerge,
                        exact: true,
                    },
                    {
                        path:'/index/group/:name/house',
                        component: GroupRepository,
                        exact: true,
                    },
                    {
                        path:'/index/group/:name/sys',
                        component: GroupDetailsSet,
                        routes:[
                            {
                                path:'/index/group/:name/sys/set',
                                component:GroupSetting,
                                exact:true
                            },
                            {
                                path:'/index/group/:name/sys/member',
                                component: DomainUser,
                                exact:true
                            },
                            {
                                path:'/index/group/:name/sys/role',
                                component: DomainRole,
                                exact:true
                            }
                        ]
                    },
                    {
                        path:'/index/group/:name/*',
                        render:()=><Redirect to={'/index/404'}/>,
                    }
                ]
            },
            {
                path:'/index/sys',
                component: sys,
                routes: [
                    {
                        path: '/index/sys/keys',
                        component: Keys_sys,
                    },
                    {
                        path: '/index/sys/productUser',
                        component: ProductAuth,
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
