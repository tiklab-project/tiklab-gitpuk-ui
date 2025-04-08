import {store as gitpukStore} from "./store";
import App from "./app";
import Routers from "./routes";
import Portal from "./home/components/Portal";
import SettingContent from "./setting/navigator/SettingContent";

import AsyncComponent from "./common/lazy/SyncComponent";
//语言
import xcodeZh from "./common/language/zh.json"

//公共组件
const SearchInput=AsyncComponent(()=>import('./common/input/SearchInput'))
const Breadcrumb=AsyncComponent(()=>import('./common/breadcrumb/Breadcrumb'))
const DeleteExec=AsyncComponent(()=>import('./common/delete/DeleteExec'))
const Btn=AsyncComponent(()=>import('./common/btn/Btn'))
const UserIcon=AsyncComponent(()=>import('./common/list/UserIcon'))
const Listicon=AsyncComponent(()=>import('./common/list/Listicon'))
const Modal=AsyncComponent(()=>import('./common/modal/Modal'))
const Omit=AsyncComponent(()=>import('./common/omit/Omit'))
const Page=AsyncComponent(()=>import('./common/page/Page'))
const TimeTaskPop=AsyncComponent(()=>import('./common/timetask/TimeTaskPop'))
const EmptyText=AsyncComponent(()=>import('./common/emptyText/EmptyText'))
const DownSelect=AsyncComponent(()=>import('./common/downSelect/DownSelect'))
const Loading=AsyncComponent(()=>import('./common/loading/Loading'))

const ExcludeProductUser=AsyncComponent(()=>import('./login/ExcludeProductUser'))

/**
 * 首页
 */
const Homepage=AsyncComponent(()=>import('./home/components/HomePage'))
const TodoPageList=AsyncComponent(()=>import('./home/components/TodoPageList'))

const WEBIDE=AsyncComponent(()=>import('./WEBIDE/components/WebIde'))

const repository_white = require("./assets/images/img/repository-white.png").default;
/**
 * 仓库
 */
const Repository=AsyncComponent(()=>import('./repository/repository/components/Repository'))
const RepositoryAdd=AsyncComponent(()=>import('./repository/repository/components/RepositoryAdd'))
const RepositoryDetails=AsyncComponent(()=>import('./repository/navigator/RepositoryAside'))
const File=AsyncComponent(()=>import('./repository/file/components/File'))
const Blob=AsyncComponent(()=>import('./repository/file/components/Blob'))
const Edit=AsyncComponent(()=>import('./repository/file/components/EditFile'))
const Branch=AsyncComponent(()=>import('./repository/branch/components/Branch'))
const Tag=AsyncComponent(()=>import('./repository/tag/components/Tag'))
const Commits=AsyncComponent(()=>import('./repository/commits/components/Commits'))
const CommitsDetails=AsyncComponent(()=>import('./repository/commits/components/CommitsDetails'))
const Issue=AsyncComponent(()=>import('./repository/issue/components/Issue'))
const Pipeline=AsyncComponent(()=>import('./repository/pipeline/components/Pipeline'))
const Statistics=AsyncComponent(()=>import('./repository/statistics/components/StatisticsCommit'))
const RepositoryDetailsSet=AsyncComponent(()=>import('./repository/setting/navigator/RepositorySetting'))
const RepositoryBasicInfo=AsyncComponent(()=>import('./repository/setting/basicInfo/RepositoryBasicInfo'))
const PushRule=AsyncComponent(()=>import('./repository/setting/pushRule/components/PushRule'))
const AccessKeys=AsyncComponent(()=>import('./repository/setting/accessKeys/components/AccessKeys'))
const WebHooks=AsyncComponent(()=>import('./repository/setting/webHooks/components/Hooks'))
const RepositoryRole=AsyncComponent(()=>import('./repository/setting/element/RepositoryRole'))
const RepositoryUser=AsyncComponent(()=>import('./repository/setting/element/RepositoryUser'))
const BranchSetting=AsyncComponent(()=>import('./repository/setting/branch/BranchSetting'))
const NotRepository=AsyncComponent(()=>import('./repository/repository/components/404'))
const error=AsyncComponent(()=>import('./login/error'))
const RemoteList=AsyncComponent(()=>import('./repository/setting/remote/components/RemoteList'))
const RepositoryToLead=AsyncComponent(()=>import('./repository/tolead/components/RepositoryToLead'))
const RepositoryThirdList=AsyncComponent(()=>import('./repository/tolead/components/RepositoryThirdList'))

//合并分支
const RepositoryMerge=AsyncComponent(()=>import('./repository/merge/Merge'))
const MergeAdd=AsyncComponent(()=>import('./merge/components/MergeAdd'))
const MergeAddVerify=AsyncComponent(()=>import('./merge/components/MergeDetails'))
const MergeClashEdit=AsyncComponent(()=>import('./merge/components/MergeClashEdit'))

//代码扫描
const ScanPlay=AsyncComponent(()=>import('./repository/scan/components/ScanPlay'))
const ScanRecord=AsyncComponent(()=>import('./repository/scan/components/ScanRecord'))
const ScanDetails=AsyncComponent(()=>import('./repository/scan/components/ScanDetails'))

//扫描方案
const ScanScheme=AsyncComponent(()=>import('./setting/scan/components/ScanScheme'))
const ScanRule=AsyncComponent(()=>import('./setting/scan/components/ScanRule'))
const ScanRuleDetails=AsyncComponent(()=>import('./setting/scan/components/ScanRuleDetails'))
const EnvServer=AsyncComponent(()=>import('./setting/scan/components/ScanEnvironment'))
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
const RepositoryGroupUser=AsyncComponent(()=>import("./repositoryGroup/setting/user/RepositoryGroupUser"))
const RepositoryGroupRole=AsyncComponent(()=>import("./repositoryGroup/setting/user/RepositoryGroupRole"))
/**
 * 系统设置
 */
const SettingHome=AsyncComponent(()=>import('./setting/home/components/SettingHome'))
const Setting=AsyncComponent(()=>import('./setting/navigator/Setting'))

const Auth=AsyncComponent(()=>import('./setting/auth/components/Auth'))


// message
const MessageManagement=AsyncComponent(()=>import('./setting/message/MessageManagement'))
const MessageType=AsyncComponent(()=>import('./setting/message/MessageType'))
const MessageSendType=AsyncComponent(()=>import('./setting/message/MessageSendType'))
const MessageSendTypeTrue=AsyncComponent(()=>import('./setting/message/MessageSendTypeTrue'))
const MessageNotice=AsyncComponent(()=>import('./setting/message/MessageNotice'))
const MessageNoticeTrue=AsyncComponent(()=>import('./setting/message/MessageNoticeTrue'))


//备份 恢复
const BackupRecoveryContent=AsyncComponent(()=>import('./setting/backups/BackupRecoveryContent'))


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

const CommitRepository=AsyncComponent(()=>import('./setting/operation/CommitRepository'))
// element
const User=AsyncComponent(()=>import("./setting/element/User"))
const Directory=AsyncComponent(()=>import("./setting/element/Directory"))
const Orga=AsyncComponent(()=>import("./setting/element/Orga"))
const UserGroup=AsyncComponent(()=>import("./setting/element/Group"))
const UserGroupTrue=AsyncComponent(()=>import("./setting/element/Groupture"))
const sysFeature=AsyncComponent(()=>import('./setting/element/SystemFeature'))
const sysRole=AsyncComponent(()=>import('./setting/element/SystemRole'))
const sysRoleTrue=AsyncComponent(()=>import('./setting/element/SystemRoleTrue'))
const ProjectRole=AsyncComponent(()=>import('./setting/element/ProjectRole'))
const ProjectFeature=AsyncComponent(()=>import('./setting/element/ProjectFeature'))

const Login=AsyncComponent(()=>import('./login/login'))
const Logout=AsyncComponent(()=>import('./login/Logout'))
// 仓库权限
const PowerUserList=AsyncComponent(()=>import('./setting/repository/components/UserList'))
const UserRpyList=AsyncComponent(()=>import('./setting/repository/components/UserRpyList'))

//资源监控
const Resources =AsyncComponent(()=>import('./setting/resources/components/Resources'))

const SettingRouters=AsyncComponent(()=>import('./setting/navigator/SettingRouters'))

const gitTokImg = {
    repository_white
};


export {
    gitTokImg,

    SearchInput,
    Routers,
    xcodeZh,

    Breadcrumb,
    DeleteExec,
    Btn,
    UserIcon,
    Listicon,
    Modal,
    Omit,
    Page,
    TimeTaskPop,
    EmptyText,
    DownSelect,
    Loading,

    App,
     Homepage,
    TodoPageList,
     WEBIDE,
     Repository,
     RepositoryAdd,
     RepositoryDetails,
     File,
     Blob,
     Edit,
     Branch,
     Tag,
     RepositoryMerge,
    MergeAdd,
    MergeAddVerify,
    MergeClashEdit,
     Commits,
     CommitsDetails,
     Issue,
     Pipeline,
     Statistics,
     RepositoryDetailsSet,
     RepositoryBasicInfo,
     PushRule,
     AccessKeys,
    WebHooks,
    RepositoryRole,
    RepositoryUser,
    BranchSetting,
    NotRepository,
    error,
    RemoteList,
    RepositoryToLead,
    RepositoryThirdList,
    RepositoryGroup,
    RepositoryGroupAdd,
    RepositoryGroupDetails,
    Overview,
    GroupMerge,
    GroupRepository,
    GroupDetailsSet,
    GroupBasic,
    RepositoryGroupUser,
    RepositoryGroupRole,
    SettingHome,
    Setting,
    Auth,
    MessageManagement,
    MessageType,
    MessageSendType,
    MessageSendTypeTrue,
    MessageNotice,
    MessageNoticeTrue,

    BackupRecoveryContent,
    MyLog,
    LogTemplate,
    LogType ,
    MyTodoTask,
    Task,
    TodoTemp,
    TodoType,
    Version,
    AuthContent,
    User ,
    Directory,
    Orga,
    UserGroup,
    UserGroupTrue,
    sysFeature ,
    sysRole,
    sysRoleTrue,
    ProjectRole,
    ProjectFeature,
    Login,
    Logout,

    SettingContent,
    Portal,
    gitpukStore,
    ExcludeProductUser,
    CommitRepository,

    ScanPlay,
    ScanRecord,
    ScanDetails,
    ScanScheme,
    ScanRule,
    ScanRuleDetails,
    EnvServer,
    PowerUserList,
    UserRpyList,
    Resources,
    RepositoryClean,
    SettingRouters,
}
