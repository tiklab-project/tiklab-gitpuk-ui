import React,{useState,useEffect} from 'react'
import {renderRoutes} from 'react-router-config'
import {Dropdown} from 'antd'
import {CaretDownOutlined, MenuUnfoldOutlined, SettingOutlined} from '@ant-design/icons'
import {useTranslation} from 'react-i18next'
import Loading from '../loading/loading'
import {interceptUrl} from '../client/client'
import {ToggleMenu} from './toggleMenu'
import Listname from '../list/listname'
import './aside.scss'

const Aside = props => {

    const {location,route,firstRouters,list,info,webUrl,asideType} = props

    let path = location.pathname
    const {t} = useTranslation()
    const isSide = localStorage.getItem('isSide')
    const [nav,setNav] = useState('')
    const [nomalOrScrum,setMomalOrScrum] = useState('nomal')
    const [isLoading,setIsLoading] = useState(false)
    const [triggerVisible,setTriggerVisible] = useState(false)

    // 侧边栏 -- 展开/收起
    useEffect(()=>{
        setMomalOrScrum(isSide?isSide:'nomal')
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
    const setMenuFold = () =>{
        if(nomalOrScrum==='scrum'){
            setMomalOrScrum('nomal')
            localStorage.setItem('isSide','nomal')
        }else {
            setMomalOrScrum('scrum')
            localStorage.setItem('isSide','scrum')
        }
    }

    // 项目设置
    const goSys = () =>{
        switch (asideType) {
            case 'house':
                props.history.push(`/index/${asideType}/${webUrl}/sys/set`)
                break
            case 'group':
                props.history.push(`/index/group/${webUrl}/sys`)
        }
    }

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return  <div  key={item.to}
                      className={`${nomalOrScrum}-aside-item ${nav===item.to ? `${nomalOrScrum}-aside-select`:''}`}
                      onClick={()=> props.history.push(item.to)}
                >
                    <div className={`${nomalOrScrum}-aside-item-icon`}>{item.icon}</div>
                    <div className={`${nomalOrScrum}-aside-item-title`}>{t(item.title)}</div>
                </div>
    }

    return (
        <div className='xcode-layout'>
            <div className={`${nomalOrScrum}-aside`}>
                <div  className={`${nomalOrScrum}-aside-up`}>
                    <Dropdown
                        overlay={<ToggleMenu
                            {...props}
                            list={list}
                            info={info}
                            asideType={asideType}
                            setIsLoading={setIsLoading}
                            setTriggerVisible={setTriggerVisible}
                        />}
                        trigger={['click']}
                        visible={triggerVisible}
                        onVisibleChange={visible=>setTriggerVisible(visible)}
                        overlayClassName={`aside-dropdown-${nomalOrScrum} aside-dropdown`}
                    >
                        <div className={`${nomalOrScrum}-aside_chang`} onClick={(e)=>e.preventDefault()}>
                            <Listname text={info.name}/>
                            {
                                nomalOrScrum === 'scrum' &&
                                <span className='dropdowns_name'>{info.name}</span>
                            }
                            <span><CaretDownOutlined /></span>
                        </div>
                    </Dropdown>
                    {
                        firstRouters.map(item=>renderTaskRouter(item))
                    }
                </div>

                <div className={`${nomalOrScrum}-aside-sys`} onClick={()=>goSys()}>
                    <div className={`${nomalOrScrum}-aside-item-icon`}><SettingOutlined/></div>
                    <div className={`${nomalOrScrum}-aside-item-title`}>{t('Setting')}</div>
                </div>
                <div className={`${nomalOrScrum}-aside-sys`} onClick={()=>setMenuFold()}>
                    <div className={`${nomalOrScrum}-aside-item-icon`}><MenuUnfoldOutlined/></div>
                    <div className={`${nomalOrScrum}-aside-item-title`}>{t(nomalOrScrum==='scrum'?'Collapse':'Expand')}</div>
                </div>
            </div>
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
