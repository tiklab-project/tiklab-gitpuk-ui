import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';

const Home=AsyncComponent(()=>import('./home/components/Home'))

const Login=AsyncComponent(()=>import('./login/login'))
const Logout=AsyncComponent(()=>import('./login/Logout'))
const Wechat=AsyncComponent(()=>import('./login/Wechat'))
const ExcludeProductUser=AsyncComponent(()=>import('./login/ExcludeProductUser'))
const NotFound=AsyncComponent(()=>import('./login/error'))

/**
 * 首页
 */
const Homepage=AsyncComponent(()=>import('./home/components/HomePage'))

const WEBIDE=AsyncComponent(()=>import('./WEBIDE/components/WebIde'))

/**
 * 仓库
 */
const Repository=AsyncComponent(()=>import('./repository/repository/components/Repository'))
const RepositoryAdd=AsyncComponent(()=>import('./repository/repository/components/RepositoryAdd'))
const RepositoryDetails=AsyncComponent(()=>import('./repository/navigator/RepositoryAside'))
const File=AsyncComponent(()=>import('./repository/file/components/File'))
const Blob=AsyncComponent(()=>import('./repository/file/components/Blob'))
const Edit=AsyncComponent(()=>import('./repository/file/components/Edit'))
const Branch=AsyncComponent(()=>import('./repository/branch/components/Branch'))
const Tag=AsyncComponent(()=>import('./repository/tag/components/Tag'))
const RepositoryMerge=AsyncComponent(()=>import('./repository/merge/Merge'))
const Commits=AsyncComponent(()=>import('./repository/commits/components/Commits'))
const CommitsDetails=AsyncComponent(()=>import('./repository/commits/components/CommitsDetails'))
const Issue=AsyncComponent(()=>import('./repository/issue/components/Issue'))
const Pipeline=AsyncComponent(()=>import('./repository/pipeline/components/Pipeline'))
const Statistics=AsyncComponent(()=>import('./repository/statistics/components/Statistics'))
const RepositoryDetailsSet=AsyncComponent(()=>import('./repository/setting/navigator/RepositorySetting'))
const RepositoryBasicInfo=AsyncComponent(()=>import('./repository/setting/basicInfo/RepositoryBasicInfo'))
const PushRule=AsyncComponent(()=>import('./repository/setting/pushRule/components/PushRule'))
const AccessKeys=AsyncComponent(()=>import('./repository/setting/accessKeys/components/AccessKeys'))
const WebHooks=AsyncComponent(()=>import('./repository/setting/webHooks/components/Hooks'))
const SonarQube=AsyncComponent(()=>import('./repository/detection/components/SonarQube'))
const RemoteList=AsyncComponent(()=>import('./repository/setting/remote/components/RemoteList'))
const notRepository=AsyncComponent(()=>import('./repository/repository/components/404'))
const RepositoryUser=AsyncComponent(()=>import("./repository/setting/user/RepositoryUser"))
const RepositoryRole=AsyncComponent(()=>import('./repository/setting/user/RepositoryRole'))
const RepositoryToLead=AsyncComponent(()=>import('./repository/tolead/components/RepositoryToLead'))
const ThirdInfo=AsyncComponent(()=>import('./repository/tolead/components/ThirdInfo'))
const thirdList=AsyncComponent(()=>import('./repository/tolead/components/RepositoryThirdList'))
const BranchSetting=AsyncComponent(()=>import('./repository/setting/branch/BranchSetting'))

/**
 * 仓库组
 */
const RepositoryGroup=AsyncComponent(()=>import('./repositoryGroup/repositoryGroup/components/RepositoryGroup'))
const RepositoryGroupAdd=AsyncComponent(()=>import('./repositoryGroup/repositoryGroup/components/RepositoryGroupAdd'))
const RepositoryGroupDetails=AsyncComponent(()=>import('./repositoryGroup/navigator/RepositoryGroupAside'))
const Overview=AsyncComponent(()=>import('./repositoryGroup/overview/components/Overview'))
const GroupMerge=AsyncComponent(()=>import('./repositoryGroup/merge/Merge'))
const GroupRepository=AsyncComponent(()=>import('./repositoryGroup/repository/components/Repository'))
const GroupDetailsSet=AsyncComponent(()=>import('./repositoryGroup/setting/navigator/repositoryGroupSetting'))
const GroupBasic=AsyncComponent(()=>import('./repositoryGroup/setting/basicInfo/GroupBasicInfo'))
const RepositoryGroupUser=AsyncComponent(()=>import('./repositoryGroup/setting/user/RepositoryGroupUser'))
const RepositoryGroupRole=AsyncComponent(()=>import('./repositoryGroup/setting/user/RepositoryGroupRole'))

/**
 * 系统设置
 */
const Setting=AsyncComponent(()=>import('./setting/navigator/Setting'))

const Auth=AsyncComponent(()=>import('./setting/auth/components/Auth'))

// plugin
const Plugin=AsyncComponent(()=>import('./setting/plugins/Plugin'))

// message
const MessageManagement=AsyncComponent(()=>import('./setting/message/MessageManagement'))
const MessageType=AsyncComponent(()=>import('./setting/message/MessageType'))
const MessageSendType=AsyncComponent(()=>import('./setting/message/MessageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./setting/message/MessageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./setting/message/MessageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./setting/message/MessageNoticeTrue'))

//deploy
const EnvDeploy=AsyncComponent(()=>import('./setting/deploy/components/EnvDeploy'))
const ServerDeploy=AsyncComponent(()=>import('./setting/deploy/components/ServerDeploy'))

//备份 恢复
const Backups=AsyncComponent(()=>import('./setting/backups/components/Backups'))
const Recover=AsyncComponent(()=>import('./setting/backups/components/Recover'))

//已经提交过代码的仓库列表
const CommitRepository=AsyncComponent(()=>import('./setting/operation/CommitRepository'))

// security
const MyLog=AsyncComponent(()=>import("./setting/security/MyLog"))
const LogTemplate=AsyncComponent(()=>import("./setting/security/LogTemplate"))
const LogType=AsyncComponent(()=>import("./setting/security/LogType"))

// todotask
const MyTodoTask=AsyncComponent(()=>import("./setting/todotask/MyTodoTask"))
const Task=AsyncComponent(()=>import("./setting/todotask/Task"))
const TodoTemp=AsyncComponent(()=>import("./setting/todotask/TodoTemp"))
const TodoType=AsyncComponent(()=>import("./setting/todotask/TodoType"))

// licence
const Version=AsyncComponent(()=>import('./setting/licence/Version'))


// user
const User=AsyncComponent(()=>import("./setting/user/User"))
const Directory=AsyncComponent(()=>import("./setting/user/Directory"))
const Orga=AsyncComponent(()=>import("./setting/user/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/user/Group"))
const UserGroupTrue=AsyncComponent(()=>import("./setting/user/Groupture"))
const sysFeature=AsyncComponent(()=>import('./setting/user/SystemFeature'))
const sysRole=AsyncComponent(()=>import('./setting/user/SystemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./setting/user/SystemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./setting/user/ProjectRole'))
const ProjectFeature=AsyncComponent(()=>import('./setting/user/ProjectFeature'))

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
        component:ExcludeProductUser,
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
                path:'/index/repository/lead',
                exact:true,
                component:RepositoryToLead,
            },
            {
                path:'/index/repository/lead/info/:type',
                exact:true,
                component:ThirdInfo,
            },
            {
                path:'/index/repository/lead/thirdList/:authId',
                exact:true,
                component:thirdList,
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
                        path:'/index/repository/:namespace/:name/sonarQube',
                        component:SonarQube
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
                                component: RepositoryUser
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/role',
                                component: RepositoryRole
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/branch',
                                component: BranchSetting
                            },
                            {
                                path:'/index/repository/:namespace/:name/sys/remote',
                                component:RemoteList
                            },

                        ]
                    },
                 /*   {
                        path:'/index/repository/:namespace/:name/!*',
                        render:()=><Redirect to={'/index/error'}/>,
                    }*/
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
                                path:'/index/group/:name/sys/info',
                                component:GroupBasic,
                                exact:true
                            },
                            {
                                path:'/index/group/:name/sys/member',
                                component: RepositoryGroupUser,
                                exact:true
                            },
                            {
                                path:'/index/group/:name/sys/role',
                                component: RepositoryGroupRole,
                                exact:true
                            }
                        ]
                    },
                   /* {
                        path:'/index/group/:name/!*',
                        render:()=><Redirect to={'/index/error'}/>,
                    }*/
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
                        component: Task,
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
                        component: MyLog,
                    },
                    {
                        path:'/index/sys/logTemplate',
                        component: LogTemplate,
                    },{

                        path:'/index/sys/logType',
                        component: LogType,
                    },
                    {
                        path: '/index/sys/org',
                        component: Orga,
                    },
                    {
                        path: '/index/sys/userGroup',
                        component: UserGroup,
                    },
                    {
                        path: '/index/sys/directory',
                        component: Directory,
                    },
                    {
                        path: '/index/sys/user',
                        component: User,
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
                        path:'/index/sys/deploy/env',
                        component: EnvDeploy,
                    },
                    {
                        path:'/index/sys/deploy/backups',
                        component: Backups,
                    },

                    {
                        path:'/index/sys/deploy/recover',
                        component: Recover,
                    },
                    {
                        path:'/index/sys/commitRepository',
                        component: CommitRepository,
                    },
                    {
                        path:'/index/sys/deploy/server',
                        component:ServerDeploy ,
                    },
                    {
                        path: '/index/sys/user/userGrouptrue',
                        component: UserGroupTrue,
                    },
                    {
                        path:'/index/sys/version',
                        component: Version,
                    }
                ]
            },
            {
                path:'/index/error',
                component:NotFound,
            },
            {
                path:'/index/:namespace/:name/404',
                component:notRepository
            },
          /*  {
                path:'/index/!*',
                render:()=><Redirect to={'/index/error'}/>,
            }*/
        ]
    },
    {
        path:'/',
        component: Home,
        exact: true,
        render:()=><Redirect to='/index'/>,
    },
 /*   {
        path: '*',
        render:()=><Redirect to='/index/error'/>,
    },*/
]

export default routers
