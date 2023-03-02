import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';

const Home=AsyncComponent(()=>import('./home/container/Home'))

const Login=AsyncComponent(()=>import('./login/login'))
const Logout=AsyncComponent(()=>import('./login/Logout'))
const Wechat=AsyncComponent(()=>import('./login/Wechat'))
const NoProductAuthUser=AsyncComponent(()=>import('./login/NoProductAuthUser'))
const NotFound=AsyncComponent(()=>import('./login/404'))

/**
 * 首页
 */
const Homepage=AsyncComponent(()=>import('./home/components/HomePage'))

const WEBIDE=AsyncComponent(()=>import('./WEBIDE/container/WebIde'))

/**
 * 仓库
 */
const Repository=AsyncComponent(()=>import('./repository/repository/container/Repository'))
const RepositoryAdd=AsyncComponent(()=>import('./repository/repository/components/RepositoryAdd'))
const RepositoryDetails=AsyncComponent(()=>import('./repository/navigator/RepositoryAside'))
const File=AsyncComponent(()=>import('./repository/file/container/File'))
const Blob=AsyncComponent(()=>import('./repository/file/components/Blob'))
const Edit=AsyncComponent(()=>import('./repository/file/components/Edit'))
const Branch=AsyncComponent(()=>import('./repository/branch/container/Branch'))
const Tag=AsyncComponent(()=>import('./repository/tag/container/Tag'))
const RepositoryMerge=AsyncComponent(()=>import('./repository/merge/Merge'))
const Commits=AsyncComponent(()=>import('./repository/commits/container/Commits'))
const CommitsDetails=AsyncComponent(()=>import('./repository/commits/components/CommitsDetails'))
const Issue=AsyncComponent(()=>import('./repository/issue/container/Issue'))
const Pipeline=AsyncComponent(()=>import('./repository/pipeline/container/Pipeline'))
const Statistics=AsyncComponent(()=>import('./repository/statistics/container/Statistics'))
const RepositoryDetailsSet=AsyncComponent(()=>import('./repository/setting/navigator/RepositorySetting'))
const RepositoryBasicInfo=AsyncComponent(()=>import('./repository/setting/basicInfo/RepositoryBasicInfo'))
const PushRule=AsyncComponent(()=>import('./repository/setting/pushRule/container/PushRule'))
const AccessKeys=AsyncComponent(()=>import('./repository/setting/accessKeys/container/AccessKeys'))
const WebHooks=AsyncComponent(()=>import('./repository/setting/webHooks/container/Hooks'))

/**
 * 仓库组
 */
const RepositoryGroup=AsyncComponent(()=>import('./repositoryGroup/repositoryGroup/container/RepositoryGroup'))
const RepositoryGroupAdd=AsyncComponent(()=>import('./repositoryGroup/repositoryGroup/components/RepositoryGroupAdd'))
const RepositoryGroupDetails=AsyncComponent(()=>import('./repositoryGroup/navigator/RepositoryGroupAside'))
const Overview=AsyncComponent(()=>import('./repositoryGroup/overview/container/Overview'))
const GroupMerge=AsyncComponent(()=>import('./repositoryGroup/merge/Merge'))
const GroupRepository=AsyncComponent(()=>import('./repositoryGroup/repository/container/Repository'))
const GroupDetailsSet=AsyncComponent(()=>import('./repositoryGroup/setting/navigator/repositoryGroupSetting'))
const GroupBasic=AsyncComponent(()=>import('./repositoryGroup/setting/basicInfo/GroupBasicInfo'))

/**
 * 系统设置
 */
const Setting=AsyncComponent(()=>import('./setting/navigator/Setting'))

const Auth=AsyncComponent(()=>import('./setting/auth/container/Auth'))

// plugin
const Plugin=AsyncComponent(()=>import('./setting/plugins/PluginList'))

// privilege
const sysFeature=AsyncComponent(()=>import('./setting/privilege/SystemFeature'))
const sysRole=AsyncComponent(()=>import('./setting/privilege/SystemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./setting/privilege/SystemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./setting/privilege/ProjectRole'))
const ProjectFeature=AsyncComponent(()=>import('./setting/privilege/ProjectFeature'))
const DomainRole=AsyncComponent(()=>import('./setting/privilege/DomainRole'))
const ProductAuth=AsyncComponent(()=>import('./setting/privilege/ProductAuth'))

// message
const MessageManagement=AsyncComponent(()=>import('./setting/message/MessageManagement'))
const MessageType=AsyncComponent(()=>import('./setting/message/MessageType'))
const MessageSendType=AsyncComponent(()=>import('./setting/message/MessageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./setting/message/MessageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./setting/message/MessageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./setting/message/MessageNoticeTrue'))

// oplog
const MyLogList=AsyncComponent(()=>import('./setting/oplog/MyLogList'))
const LogTemplateList=AsyncComponent(()=>import('./setting/oplog/LogTemplateList'))
const LogType=AsyncComponent(()=>import('./setting/oplog/logType'))

// todotask
const MyTodoTask=AsyncComponent(()=>import('./setting/todotask/MyTodoTask'))
const TaskList=AsyncComponent(()=>import('./setting/todotask/TaskList'))
const TodoTemp=AsyncComponent(()=>import('./setting/todotask/TodoTemp'))
const TodoType=AsyncComponent(()=>import('./setting/todotask/TodoType'))

// licence
const Version=AsyncComponent(()=>import('./setting/licence/Version'))

// user
const UserList=AsyncComponent(()=>import('./setting/user/List'))
const UserDirectory=AsyncComponent(()=>import('./setting/user/Directory'))
const Org=AsyncComponent(()=>import('./setting/user/Orga'))
const UserGroup=AsyncComponent(()=>import('./setting/user/Group'))
const UserGroupTrue=AsyncComponent(()=>import('./setting/user/Groupture'))
const DomainUser=AsyncComponent(()=>import('./setting/user/DomainUser'))

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
                        component:File,
                    },
                    {
                        path:'/index/repository/:namespace/:name/tree',
                        exact: true,
                        component:File,
                    },
                    {
                        path:'/index/repository/:namespace/:name/tree/:branch',
                        component:File,
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
                                path:'/index/repository/:namespace/:name/sys/info',
                                component:RepositoryBasicInfo
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
                        component: Overview,
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
                component: Setting,
                routes: [
                    {
                        path: '/index/sys/auth',
                        component: Auth,
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
