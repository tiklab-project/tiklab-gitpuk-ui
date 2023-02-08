import React,{useState,useEffect} from 'react'
import {renderRoutes} from 'react-router-config'
import NomalAside from './nomalAside'
import ScrumAside from './scrumAside'
import Loading from '../loading/loading'
import {interceptUrl} from '../client/client'
import './aside.scss'

const Aside = props => {

    const {location,route,firstRouters,list,info,webUrl,asideType} = props

    let path = location.pathname
    const isSide = localStorage.getItem('isSide')

    const [nomalOrScrum,setMomalOrScrum] = useState('nomal')
    const [isLoading,setIsLoading] = useState(false)
    const [nav,setNav] = useState('')

    // 侧边栏 -- 展开/收起
    useEffect(()=>{
        setMomalOrScrum(isSide)
    },[nomalOrScrum])

    useEffect(()=>{
        let indexPath
        switch (asideType) {
            case 'house':
                indexPath = `/index/house/${webUrl}/${renderType(interceptUrl(path)[5])}`
                break
            case 'group':
                indexPath = path
        }
        setNav(indexPath)
    },[path,info])

    const renderType = pathType =>{
        switch (pathType) {
            case 'tree':
            case 'blob':
            case 'edit':
                return 'tree'
            case 'commit':
            case 'commits':
                return `commits/${info && info.defaultBranch}`
            default:
                return pathType
        }
    }

    // 侧边栏 -- 展开/收起(事件event)
    const setMenuFold = type =>{
        setMomalOrScrum(type)
        localStorage.setItem('isSide',type)
    }

    return (
        <div className='xcode-layout'>
            {
                nomalOrScrum==='scrum' ?
                    <ScrumAside
                        {...props}
                        firstRouters={firstRouters}
                        list={list}
                        webUrl={webUrl}
                        info={info}
                        asideType={asideType}
                        nav={nav}
                        setMenuFold={setMenuFold}
                        setIsLoading={setIsLoading}
                    />
                    :
                    <NomalAside
                        {...props}
                        firstRouters={firstRouters}
                        list={list}
                        webUrl={webUrl}
                        info={info}
                        asideType={asideType}
                        nav={nav}
                        setMenuFold={setMenuFold}
                        setIsLoading={setIsLoading}
                    />
            }
            {
                isLoading ?
                    <Loading/>
                    :
                    <div className='xcode-layout-content'>
                        {renderRoutes(route.routes)}
                    </div>
            }
        </div>
    )
}

export default Aside
