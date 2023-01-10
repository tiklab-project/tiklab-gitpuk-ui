import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Home=AsyncComponent(()=>import('./modules/home/container/portal'))

const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))
const Storehouse=AsyncComponent(()=>import('./modules/house/container/house'))
const StorehouseGroup=AsyncComponent(()=>import('./modules/houseGroup/container/houseGroup'))

const StorehouseDetails=AsyncComponent(()=>import('./modules/houseDetails/common/houseDetails'))
const Code=AsyncComponent(()=>import('./modules/houseDetails/code/container/code'))
const Blob=AsyncComponent(()=>import('./modules/houseDetails/code/components/blob'))
const Edit=AsyncComponent(()=>import('./modules/houseDetails/code/components/edit'))
const Branch=AsyncComponent(()=>import('./modules/houseDetails/branch/container/branch'))
const Tag=AsyncComponent(()=>import('./modules/houseDetails/tag/container/tag'))

const routers = [
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
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/tree/:branch',
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/tree/:branch/*',
                        component:Code,
                    },
                    {
                        path:'/index/house/:name/blob',
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/blob/:branch',
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/blob/:branch/*',
                        component:Blob,
                    },
                    {
                        path:'/index/house/:name/edit',
                        component:Edit,
                    },
                    {
                        path:'/index/house/:name/edit/:branch',
                        component:Edit,
                    },
                    {
                        path:'/index/house/:name/edit/:branch/*',
                        component:Edit,
                    },
                    {
                        path:'/index/house/:name/branch',
                        component:Branch,
                    },
                    {
                        path:'/index/house/:name/tag',
                        component:Tag,
                    },
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
