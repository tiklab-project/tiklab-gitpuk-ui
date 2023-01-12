import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Home=AsyncComponent(()=>import('./modules/home/container/portal'))

const Login=AsyncComponent(()=>import("./modules/eam/login"))
const Logout=AsyncComponent(()=>import("./modules/eam/Logout"))
const Wechat=AsyncComponent(()=>import("./modules/eam/wechat"))
const NoProductAuthUser=AsyncComponent(()=>import("./modules/eam/noProductAuthUser"))

const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))
const Storehouse=AsyncComponent(()=>import('./modules/house/container/house'))
const StorehouseGroup=AsyncComponent(()=>import('./modules/houseGroup/container/houseGroup'))

const StorehouseDetails=AsyncComponent(()=>import('./modules/houseDetails/common/houseDetails'))
const Code=AsyncComponent(()=>import('./modules/houseDetails/code/container/code'))
const Blob=AsyncComponent(()=>import('./modules/houseDetails/code/components/blob'))
const Edit=AsyncComponent(()=>import('./modules/houseDetails/code/components/edit'))
const Branch=AsyncComponent(()=>import('./modules/houseDetails/branch/container/branch'))
const Tag=AsyncComponent(()=>import('./modules/houseDetails/tag/container/tag'))
const Merge=AsyncComponent(()=>import('./modules/houseDetails/merge/container/merge'))
const Commits=AsyncComponent(()=>import('./modules/houseDetails/commits/container/commits'))
const Question=AsyncComponent(()=>import('./modules/houseDetails/question/container/question'))
const Pipeline=AsyncComponent(()=>import('./modules/houseDetails/pipeline/container/pipeline'))
const Statistics=AsyncComponent(()=>import('./modules/houseDetails/statistics/container/statistics'))

const StorehouseSet=AsyncComponent(()=>import('./modules/houseSet/common/houseSet'))
const HouseSet=AsyncComponent(()=>import('./modules/houseSet/set/houseSet'))
const PushRule=AsyncComponent(()=>import('./modules/houseSet/pushRule/container/pushRule'))
const Keys=AsyncComponent(()=>import('./modules/houseSet/keys/container/keys'))
const WebHooks=AsyncComponent(()=>import('./modules/houseSet/webHooks/container/hooks'))

const routers = [
    {
        path:"/login",
        component:Login,
    },
    {
        path:"/logout",
        component:Logout,
    },
    {
        path:"/no-auth",
        exact:true,
        component:NoProductAuthUser,
    },
    {
        path: "/project",
        exact:true,
        component:Wechat,
    },
    {
        path:'/index',
        component:Home,
        routes:[
            {
                path: "/index",
                exact:true,
                render:()=><Redirect to={"/index/home"}/>,
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
                path:'/index/group',
                exact:true,
                component:StorehouseGroup,
            },
            {
                path:'/index/house/:name',
                component:StorehouseDetails,
                routes:[
                    {
                        path:'/index/house/:name/tree',
                        exact:false,
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/tree/:branch',
                        exact:false,
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/tree/:branch/*',
                        exact:false,
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/blob',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/blob/:branch',
                        exact:false,
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/blob/:branch/*',
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/edit',
                        exact:false,
                        component:Edit,
                    },
                    {
                        path:'/index/house/:name/edit/:branch',
                        exact:false,
                        component:Edit,
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
                        component:Merge,
                    },
                    {
                        path:'/index/house/:name/commits',
                        component:Commits,
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
                        ]
                    }
                ]
            }
        ]
    },
    {
        path:'/',
        component: Home,
        exact: true,
        render:()=><Redirect to='/index'/>,
    },
]

export default routers
