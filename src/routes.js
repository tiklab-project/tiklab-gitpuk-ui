import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Home=AsyncComponent(()=>import('./modules/home/container/portal'))

const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))
const Storehouse=AsyncComponent(()=>import('./modules/house/container/house'))
const StorehouseGroup=AsyncComponent(()=>import('./modules/houseGroup/container/houseGroup'))

const StorehouseDetails=AsyncComponent(()=>import('./modules/houseDetails/common/houseDetails'))
const Code=AsyncComponent(()=>import('./modules/houseDetails/code/container/code'))

const routers = [
    {
        path:'/index',
        component:Home,
        routes:[
            {
                path:'/index/home',
                component:Homepage,
            },
            {
                path:'/index/storehouse',
                component:Storehouse,
            },
            {
                path:'/index/group',
                component:StorehouseGroup,
            },
            {
                path:'/index/house/:id',
                component:StorehouseDetails,
                routes:[
                    {
                        path:'/index/house/:id/code',
                        component:Code,
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
