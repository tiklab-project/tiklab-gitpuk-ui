import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';

const Home=AsyncComponent(()=>import('./modules/home/container/home'))

const Login=AsyncComponent(()=>import('./modules/login/login'))
const Logout=AsyncComponent(()=>import('./modules/login/Logout'))
const Wechat=AsyncComponent(()=>import('./modules/login/wechat'))
const NoProductAuthUser=AsyncComponent(()=>import('./modules/login/noProductAuthUser'))
const NotFound=AsyncComponent(()=>import('./modules/login/404'))

/**
 * 首页
 */
const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))

const WEBIDE=AsyncComponent(()=>import('./modules/WEBIDE/container/webIde'))

/**
 * 仓库
 */
const Repository=AsyncComponent(()=>import('./modules/repository/repository/container/repository'))
const RepositoryAdd=AsyncComponent(()=>import('./modules/repository/repository/components/repositoryAdd'))
const RepositoryDetails=AsyncComponent(()=>import('./modules/repository/common/repositoryDetails'))
const Code=AsyncComponent(()=>import('./modules/repository/code/container/code'))
const Blob=AsyncComponent(()=>import('./modules/repository/code/components/blob'))
const Edit=AsyncComponent(()=>import('./modules/repository/code/components/edit'))
const Branch=AsyncComponent(()=>import('./modules/repository/branch/container/branch'))
const Tag=AsyncComponent(()=>import('./modules/repository/tag/container/tag'))
const RepositoryMerge=AsyncComponent(()=>import('./modules/repository/merge/merge'))
const Commits=AsyncComponent(()=>import('./modules/repository/commits/container/commits'))
const CommitsDetails=AsyncComponent(()=>import('./modules/repository/commits/components/commitsDetails'))
const Issue=AsyncComponent(()=>import('./modules/repository/issue/container/issue'))
const Pipeline=AsyncComponent(()=>import('./modules/repository/pipeline/container/pipeline'))
const Statistics=AsyncComponent(()=>import('./modules/repository/statistics/container/statistics'))
const RepositoryDetailsSet=AsyncComponent(()=>import('./modules/repositorySet/common/repositorySet'))
const RepositoryBasic=AsyncComponent(()=>import('./modules/repositorySet/basicInfo/repositoryBasic'))
const PushRule=AsyncComponent(()=>import('./modules/repositorySet/pushRule/container/pushRule'))
const AccessKeys=AsyncComponent(()=>import('./modules/repositorySet/accessKeys/container/accessKeys'))
const WebHooks=AsyncComponent(()=>import('./modules/repositorySet/webHooks/container/hooks'))

/**
 * 仓库组
 */
const RepositoryGroup=AsyncComponent(()=>import('./modules/repositoryGroup/repositoryGroup/container/repositoryGroup'))
const RepositoryGroupAdd=AsyncComponent(()=>import('./modules/repositoryGroup/repositoryGroup/components/repositoryGroupAdd'))
const RepositoryGroupDetails=AsyncComponent(()=>import('./modules/repositoryGroup/common/repositoryGroupDetails'))
const Survey=AsyncComponent(()=>import('./modules/repositoryGroup/survey/container/survey'))
const GroupMerge=AsyncComponent(()=>import('./modules/repositoryGroup/merge/merge'))
const GroupRepository=AsyncComponent(()=>import('./modules/repositoryGroup/repository/container/repository'))
const GroupDetailsSet=AsyncComponent(()=>import('./modules/repositoryGroupSet/common/repositoryGroupSet'))
const GroupBasic=AsyncComponent(()=>import('./modules/repositoryGroupSet/basicInfo/groupBasic'))

/**
 * 系统设置
 */
const sys=AsyncComponent(()=>import('./modules/sysmgr/sysmgr/system'))

const Keys_sys=AsyncComponent(()=>import('./modules/sysmgr/keys/container/keys'))

// plugin
const Plugin=AsyncComponent(()=>import('./modules/sysmgr/plugins/plugin'))

// privilege
const sysFeature=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemFeature'))
const sysRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./modules/sysmgr/privilege/systemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/projectRole'))
const ProjectFeature=AsyncComponent(()=>import('./modules/sysmgr/privilege/projectFeature'))
const DomainRole=AsyncComponent(()=>import('./modules/sysmgr/privilege/domainRole'))
const ProductAuth=AsyncComponent(()=>import('./modules/sysmgr/privilege/productAuth'))

// message
const MessageManagement=AsyncComponent(()=>import('./modules/sysmgr/message/messageManagement'))
const MessageType=AsyncComponent(()=>import('./modules/sysmgr/message/messageType'))
const MessageSendType=AsyncComponent(()=>import('./modules/sysmgr/message/messageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./modules/sysmgr/message/messageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./modules/sysmgr/message/messageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./modules/sysmgr/message/messageNoticeTrue'))

// oplog
const MyLogList=AsyncComponent(()=>import('./modules/sysmgr/oplog/myLogList'))
const LogTemplateList=AsyncComponent(()=>import('./modules/sysmgr/oplog/logTemplateList'))
const LogType=AsyncComponent(()=>import('./modules/sysmgr/oplog/logType'))

// todotask
const MyTodoTask=AsyncComponent(()=>import('./modules/sysmgr/todotask/myTodoTask'))
const TaskList=AsyncComponent(()=>import('./modules/sysmgr/todotask/taskList'))
const TodoTemp=AsyncComponent(()=>import('./modules/sysmgr/todotask/todoTemp'))
const TodoType=AsyncComponent(()=>import('./modules/sysmgr/todotask/todoType'))

// licence
const ProductUser=AsyncComponent(()=>import('./modules/sysmgr/licence/productUser'))
const Version=AsyncComponent(()=>import('./modules/sysmgr/licence/version'))

// user
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
                path:'/index/ide/*',
                component:WEBIDE,
            },
            {
                path:'/index/repository',
                exact:true,
                component:Repository,
            },
            {
                path:'/index/repository/new',
                exact:true,
                component:RepositoryAdd,
            },
            {
                path:'/index/group',
                exact:true,
                component:RepositoryGroup,
            },
            {
                path:'/index/group/new',
                exact:true,
                component:RepositoryGroupAdd,
            },
            {
                path:'/index/repository/:namespace/:name',
                component:RepositoryDetails,
                routes:[
                    {
                        path:'/index/repository/:namespace/:name',
                        exact: true,
                        component:Code,
                    },
                    {
                        path:'/index/repository/:namespace/:name/tree',
                        exact: true,
                        component:Code,
                    },
                    {
                        path:'/index/repository/:namespace/:name/tree/:branch',
                        component:Code,
                    },
                    {
                        path:'/index/repository/:namespace/:name/blob/:branch/*',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/index/repository/:namespace/:name/edit/:branch/*',
                        exact:false,
                        component:Edit,
                    },
                    {
                        path:'/index/repository/:namespace/:name/branch',
                        exact:true,
                        component:Branch,
                    },
                    {
                        path:'/index/repository/:namespace/:name/tag',
                        exact:true,
                        component:Tag,
                    },
                    {
                        path:'/index/repository/:namespace/:name/merge_requests',
                        exact:true,
                        component:RepositoryMerge,
                    },
                    {
                        path:'/index/repository/:namespace/:name/commits/:branch',
                        component:Commits,
                    },
                    {
                        path:'/index/repository/:namespace/:name/commit/:commitsId',
                        component:CommitsDetails,
                    },
                    {
                        path:'/index/repository/:namespace/:name/statistics',
                        component: Statistics
                    },
                    {
                        path:'/index/repository/:namespace/:name/issue',
                        component: Issue
                    },
                    {
                        path:'/index/repository/:namespace/:name/pipeline',
                        component: Pipeline
                    },
                    {
                        path:'/index/repository/:namespace/:name/sys',
                        component: RepositoryDetailsSet,
                        routes:[
                            {
                                path:'/index/repository/:namespace/:name/sys/set',
                                component:RepositoryBasic
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/pushRule',
                                component:PushRule
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/keys',
                                component:AccessKeys
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/hooks',
                                component:WebHooks
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/member',
                                component: DomainUser
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/role',
                                component: DomainRole
                            }
                        ]
                    },
                    {
                        path:'/index/repository/:namespace/:name/*',
                        render:()=><Redirect to={'/index/404'}/>,
                    }
                ]
            },
            {
                path:'/index/group/:name',
                component: RepositoryGroupDetails,
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
                        path:'/index/group/:name/repository',
                        component: GroupRepository,
                        exact: true,
                    },
                    {
                        path:'/index/group/:name/sys',
                        component: GroupDetailsSet,
                        routes:[
                            {
                                path:'/index/group/:name/sys/set',
                                component:GroupBasic,
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
