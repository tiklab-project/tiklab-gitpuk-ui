import React from "react";
import {Redirect} from "react-router-dom";
import AsyncComponent from "./common/lazy/SyncComponent";

const Home=AsyncComponent(()=>import('./modules/home/container/portal'))

const Homepage=AsyncComponent(()=>import('./modules/home/components/homePage'))
const Storehouse=AsyncComponent(()=>import('./modules/storehouse/container/storehouse'))

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
            }
        ]
    }
]

export default routers
