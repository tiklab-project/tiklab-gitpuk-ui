import React from 'react';
import {Redirect} from 'react-router-dom';
import AsyncComponent from './common/lazy/SyncComponent';
import NotFoundContent from "./setting/not/NotFoundContent";
import NoAccessContent from "./setting/not/NoAccessContent";

const Home=AsyncComponent(()=>import('./home/components/Home'))

const Login=AsyncComponent(()=>import('./login/login'))
const Logout=AsyncComponent(()=>import('./login/Logout'))
const ExcludeProductUser=AsyncComponent(()=>import('./login/ExcludeProductUser'))
const error=AsyncComponent(()=>import('./login/error'))

/**
 * 首页
 */
const Homepage=AsyncComponent(()=>import('./home/components/HomePage'))
const TodoPageList=AsyncComponent(()=>import('./home/components/TodoPageList'))

const WEBIDE=AsyncComponent(()=>import('./WEBIDE/components/WebIde'))

/**
 * 仓库
 */

//概览
const Survey=AsyncComponent(()=>import('./repository/survey/components/Survey'))


const Repository=AsyncComponent(()=>import('./repository/repository/components/Repository'))
const RepositoryAdd=AsyncComponent(()=>import('./repository/repository/components/RepositoryAdd'))
const RepositoryAside=AsyncComponent(()=>import('./repository/navigator/RepositoryAside'))

const File=AsyncComponent(()=>import('./repository/file/components/File'))
const Blob=AsyncComponent(()=>import('./repository/file/components/Blob'))
const Edit=AsyncComponent(()=>import('./repository/file/components/Edit'))
const Branch=AsyncComponent(()=>import('./repository/branch/components/Branch'))
const Tag=AsyncComponent(()=>import('./repository/tag/components/Tag'))

const Commits=AsyncComponent(()=>import('./repository/commits/components/Commits'))
const CommitsDetails=AsyncComponent(()=>import('./repository/commits/components/CommitsDetails'))
const Issue=AsyncComponent(()=>import('./repository/issue/components/Issue'))
const Pipeline=AsyncComponent(()=>import('./repository/pipeline/components/Pipeline'))

const notRepository=AsyncComponent(()=>import('./repository/repository/components/404'))
const RepositoryToLead=AsyncComponent(()=>import('./repository/tolead/components/RepositoryToLead'))
const thirdList=AsyncComponent(()=>import('./repository/tolead/components/RepositoryThirdList'))

//合并分支
const RepositoryMerge=AsyncComponent(()=>import('./repository/merge/Merge'))
const MergeAdd=AsyncComponent(()=>import('./merge/components/MergeAdd'))
const MergeAddVerify=AsyncComponent(()=>import('./merge/components/MergeAddVerify'))
const MergeClashEdit=AsyncComponent(()=>import('./merge/components/MergeClashEdit'))

//统计
const StatisticsNav=AsyncComponent(()=>import('./repository/statistics/components/StatisticsNav'))
const StatisticsCommit=AsyncComponent(()=>import('./repository/statistics/components/StatisticsCommit'))
const StatisticsCode=AsyncComponent(()=>import('./repository/statistics/components/StatisticsCode'))

/*仓库设置*/
const BranchSetting=AsyncComponent(()=>import('./repository/setting/branch/BranchSetting'))
const RepositoryUser=AsyncComponent(()=>import("./repository/setting/user/RepositoryUser"))
const RepositoryRole=AsyncComponent(()=>import('./repository/setting/user/RepositoryRole'))
const RemoteList=AsyncComponent(()=>import('./repository/setting/remote/components/RemoteList'))
const RepositoryDetailsSet=AsyncComponent(()=>import('./repository/setting/navigator/RepositorySetting'))
const RepositoryBasicInfo=AsyncComponent(()=>import('./repository/setting/basicInfo/RepositoryBasicInfo'))
const PushRule=AsyncComponent(()=>import('./repository/setting/pushRule/components/PushRule'))
const AccessKeys=AsyncComponent(()=>import('./repository/setting/accessKeys/components/AccessKeys'))
const WebHooks=AsyncComponent(()=>import('./repository/setting/webHooks/components/Hooks'))
const RepositoryClean=AsyncComponent(()=>import('./repository/setting/RepositoryClean/components/RepositoryClean'))


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
const SettingHome=AsyncComponent(()=>import('./setting/home/components/SettingHome'))
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

//备份 恢复
const BackupRecoveryContent=AsyncComponent(()=>import('./setting/backups/BackupRecoveryContent'))




//已经提交过代码的仓库列表
const CommitRepository=AsyncComponent(()=>import('./setting/operation/CommitRepository'))
const PowerUserList=AsyncComponent(()=>import('./setting/repository/components/UserList'))
const UserRpyList=AsyncComponent(()=>import('./setting/repository/components/UserRpyList'))

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
const AuthContent=AsyncComponent(()=>import('./setting/licence/AuthContent'))

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

//资源监控
const Resources =AsyncComponent(()=>import('./setting/resources/components/Resources'))
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
        exact: true,
        path: '/404',
        render: props => <NotFoundContent {...props} homePath={'/'}/>
    },
    {
        path: '/',
        exact:true,
        render:()=><Redirect to={'/index'}/>,
    },
    {
        path:'/',
        component:Home,
        routes:[
            {
                path:'/index',
                exact:true,
                component:Homepage,
            },
            {
                path:'/index/todoList',
                exact:true,
                component:TodoPageList,
            },
            {
                path:'/ide/*',
                component:WEBIDE,
            },
            {
                path:'/repository',
                exact:true,
                component:Repository,
            },
            {
                path:'/repository/add',
                exact:true,
                component:RepositoryAdd,
            },
            {
                path:'/repository/lead',
                exact:true,
                component:RepositoryToLead,
            },
            {
                path:'/repository/lead/thirdList/:authId',
                exact:true,
                component:thirdList,
            },
            {
                path:'/group',
                exact:true,
                component:RepositoryGroup,
            },
            {
                path:'/group/new',
                exact:true,
                component:RepositoryGroupAdd,
            },
            {
                path:'/repository/:namespace/:name',
                component:RepositoryAside,
                routes:[
                    {
                        path:'/repository/:namespace/:name/overview',
                        exact: true,
                        component:Survey,
                    },
                    {
                        path:'/repository/:namespace/:name/code',
                        exact: true,
                        component:File,
                    },
                    {
                        path:'/repository/:namespace/:name',
                        exact: true,
                        component:File,
                    },
                    {
                        path:'/repository/:namespace/:name/code',
                        exact: true,
                        component:File,
                    },
                    {
                        path:'/repository/:namespace/:name/code/:branch',
                        component:File,
                    },
                    {
                        path:'/repository/:namespace/:name/blob/:branch/*',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/repository/:namespace/:name/edit/:branch/*',
                        exact:false,
                        component:Edit,
                    },
                    {
                        path:'/repository/:namespace/:name/branch',
                        exact:true,
                        component:Branch,
                    },
                    {
                        path:'/repository/:namespace/:name/tag',
                        exact:true,
                        component:Tag,
                    },
                    {
                        path:'/repository/:namespace/:name/mergeRequest',
                        exact:true,
                        component:RepositoryMerge,
                    },
                    {
                        path:'/repository/:namespace/:name/mergeAdd',
                        exact:true,
                        component:MergeAdd,
                    },
                    {
                        path:'/repository/:namespace/:name/mergeAdd/:mergeId',
                        exact:true,
                        component:MergeAddVerify,
                    },
                    {
                        path:'/repository/:namespace/:name/mergeClashEdit/:mergeId',
                        exact:true,
                        component:MergeClashEdit,
                    },
                    {
                        path:'/repository/:namespace/:name/commits',
                        component:Commits,
                    },
                    {
                        path:'/repository/:namespace/:name/commit/:commitsId',
                        component:CommitsDetails,
                    },

                    {
                        path:'/repository/:namespace/:name/issue',
                        component: Issue
                    },
                    {
                        path:'/repository/:namespace/:name/pipeline',
                        component: Pipeline
                    },
                    {
                        path: '/repository/:namespace/:name/statistics',
                        component: StatisticsNav,
                        routes:[
                            {
                                path:'/repository/:namespace/:name/statistics/commit',
                                component: StatisticsCommit
                            },
                            {
                                path:'/repository/:namespace/:name/statistics/code',
                                component: StatisticsCode
                            },
                        ]
                    },
                    {
                        path:'/repository/:namespace/:name/setting',
                        component: RepositoryDetailsSet,
                        routes:[
                            {
                                path:'/repository/:namespace/:name/setting/info',
                                component:RepositoryBasicInfo
                            },
                            {
                                path:'/repository/:namespace/:name/setting/pushRule',
                                component:PushRule
                            },
                            {
                                path:'/repository/:namespace/:name/setting/keys',
                                component:AccessKeys
                            },
                            {
                                path:'/repository/:namespace/:name/setting/hooks',
                                component:WebHooks
                            },
                            {
                                path:'/repository/:namespace/:name/setting/clean',
                                component:RepositoryClean
                            },

                            {
                                path:'/repository/:namespace/:name/setting/user',
                                component: RepositoryUser
                            },
                            {
                                path:'/repository/:namespace/:name/setting/role',
                                component: RepositoryRole
                            },
                            {
                                path:'/repository/:namespace/:name/setting/branch',
                                component: BranchSetting
                            },
                            {
                                path:'/repository/:namespace/:name/setting/remote',
                                component:RemoteList
                            },

                            {
                                exact: true,
                                path: '/noaccess',
                                render: props => <NotFoundContent {...props} homePath={'/'} type='noaccess'/>
                            },

                        ]
                    },
                ]
            },
            {
                path:'/group/:name',
                component: RepositoryGroupDetails,
                routes: [
                    {
                        path:'/group/:name/survey',
                        component: Overview,
                        exact: true,
                    },
                    {
                        path:'/group/:name/merge_requests',
                        component: GroupMerge,
                        exact: true,
                    },
                    {
                        path:'/group/:name/repository',
                        component: GroupRepository,
                        exact: true,
                    },
                    {
                        exact: true,
                        path: '/noaccess',
                        render: props => <NotFoundContent {...props} homePath={'/'} type='noaccess'/>
                    },
                    {
                        path:'/group/:name/setting',
                        component: GroupDetailsSet,
                        routes:[
                            {
                                path:'/group/:name/setting/info',
                                component:GroupBasic,
                                exact:true
                            },
                            {
                                path:'/group/:name/setting/member',
                                component: RepositoryGroupUser,
                                exact:true
                            },
                            {
                                path:'/group/:name/setting/role',
                                component: RepositoryGroupRole,
                                exact:true
                            },
                            {
                                exact: true,
                                path: '/noaccess',
                                render: props => <NotFoundContent {...props} homePath={'/'} type='noaccess'/>
                            },
                        ]
                    },
                    /* {
                         path:'/group/:name/!*',
                         render:()=><Redirect to={'/error'}/>,
                     }*/
                ]
            },
            {
                path:'/setting',
                component: Setting,
                routes: [
                    {
                        path: '/setting/home',
                        component: SettingHome,
                    },
                    {
                        path: '/setting/auth',
                        component: Auth,
                    },
                    {
                        path: '/setting/plugin',
                        component: Plugin,
                    },
                    {
                        path: '/setting/role',
                        component: sysRole,
                    },
                    {
                        path: '/setting/roletrue',
                        component: sysRoleTrue,
                    },
                    {
                        path: '/setting/syr/feature',
                        component: sysFeature,
                    },
                    {
                        path: '/setting/project/role',
                        component: ProjectRole,
                    },
                    {
                        path: '/setting/project/feature',
                        component: ProjectFeature,
                    },
                    {
                        path: '/setting/task',
                        component: Task,
                    },
                    {
                        path: '/setting/todoTask',
                        component: MyTodoTask,
                    },
                    {
                        path: '/setting/todoTemp',
                        component: TodoTemp,
                    },
                    {
                        path: '/setting/todoType',
                        component: TodoType,
                    },
                    {
                        path:'/setting/myLog',
                        component: MyLog,
                    },
                    {
                        path:'/setting/logTemplate',
                        component: LogTemplate,
                    },{

                        path:'/setting/logType',
                        component: LogType,
                    },
                    {
                        path: '/setting/orga',
                        component: Orga,
                    },
                    {
                        path: '/setting/userGroup',
                        component: UserGroup,
                    },
                    {
                        path: '/setting/dir',
                        component: Directory,
                    },
                    {
                        path: '/setting/user',
                        component: User,
                    },
                    {
                        path:'/setting/mes/management',
                        component: MessageManagement,
                    },
                    {
                        path:'/setting/mes/type',
                        component: MessageType,
                    },
                    {
                        path:'/setting/mes/send',
                        component: MessageSendType,
                    },
                    {
                        path:'/setting/mes/sendtrue',
                        component: MessageSendTypeTrue,
                    },
                    {
                        path:'/setting/mes/notice',
                        component: MessageNotice,
                    },
                    {
                        path:'/setting/mes/noticetrue',
                        component: MessageNoticeTrue,
                    },
                    {
                        path:'/setting/backupRecovery',
                        component: BackupRecoveryContent,
                    },
                    {
                        path:'/setting/commitRepository',
                        component: CommitRepository,
                    },
                    {
                        path:'/setting/userpower',
                        component: PowerUserList,
                    },
                    {
                        path:'/setting/power/repository/:userId',
                        component: UserRpyList,
                    },
                    {
                        path: '/setting/user/userGrouptrue',
                        component: UserGroupTrue,
                    },
                    {
                        path:'/setting/version',
                        component: Version,
                    },
                    {
                        path:'/setting/authContent',
                        component: AuthContent,
                    },
                    {
                        path:'/setting/resources',
                        component: Resources,
                    },

                    {
                        exact: true,
                        path: '/noaccess',
                        render: props => <NotFoundContent {...props} homePath={'/'} type='noaccess'/>
                    },
                ]
            },
            {
                path:'/error',
                component:error,
            },
            {
                path:'/:namespace/:name/404',
                component:notRepository
            },
        ],

    },


]

export default routers
