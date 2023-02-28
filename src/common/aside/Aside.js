import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config';
import {Dropdown} from 'antd';
import {CaretDownOutlined, MenuUnfoldOutlined, SettingOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {Loading} from '../loading/Loading';
import {interceptUrl} from '../client/Client';
import AsideMenu from './AsideMenu';
import Listname from '../list/Listname';
import './Aside.scss';

const Aside = props => {

    const {location,route,firstRouters,list,info,webUrl,asideType} = props

    let path = location.pathname
    const {t} = useTranslation()
    const isSide = localStorage.getItem('isSide')
    const [nav,setNav] = useState('')
    const [normalOrScrum,setNormalOrScrum] = useState('normal')
    const [isLoading,setIsLoading] = useState(false)
    const [triggerVisible,setTriggerVisible] = useState(false)

    // 侧边栏 -- 展开/收起
    useEffect(()=>{
        setNormalOrScrum(isSide?isSide:'normal')
    },[normalOrScrum])

    useEffect(()=>{
        let indexPath
        switch (asideType) {
            case 'repository':
                indexPath = renderType(interceptUrl(path)[5])
                break
            case 'group':
                indexPath = path
        }
        setNav(indexPath)
    },[path,info])

    const renderType = pathType =>{
        let path = `/index/repository/${webUrl}`
        if(!pathType){
            return path
        }
        switch (pathType) {
            case 'tree':
            case 'blob':
            case 'edit':
                return path
            case 'commit':
            case 'commits':
                return `${path}/commits/${info && info.defaultBranch}`
            default:
                return path + '/'+pathType
        }
    }

    // 侧边栏 -- 展开/收起(事件event)
    const setMenuFold = () =>{
        if(normalOrScrum==='scrum') {
            setNormalOrScrum('normal')
            localStorage.setItem('isSide', 'normal')
            return
        }
        setNormalOrScrum('scrum')
        localStorage.setItem('isSide','scrum')
    }

    // 项目设置
    const goSys = () =>{
        switch (asideType) {
            case 'repository':
                props.history.push(`/index/repository/${webUrl}/sys/set`)
                break
            case 'group':
                props.history.push(`/index/group/${webUrl}/sys/set`)
        }
    }

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return  <div  key={item.to}
                      className={`${normalOrScrum}-aside-item ${nav===item.to ? `${normalOrScrum}-aside-select`:''}`}
                      onClick={()=> props.history.push(item.to)}
                >
                    <div className={`${normalOrScrum}-aside-item-icon`}>{item.icon}</div>
                    <div className={`${normalOrScrum}-aside-item-title`}>{t(item.title)}</div>
                </div>
    }

    return (
        <div className='xcode-layout'>
            <div className={`${normalOrScrum}-aside`}>
                <div  className={`${normalOrScrum}-aside-up`}>
                    <Dropdown
                        overlay={<AsideMenu
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
                        overlayClassName={`aside-dropdown-${normalOrScrum} aside-dropdown`}
                    >
                        <div className={`${normalOrScrum}-aside_chang`} onClick={(e)=>e.preventDefault()}>
                            <Listname text={info.name}/>
                            {
                                normalOrScrum === 'scrum' &&
                                <span className='dropdowns_name'>{info.name}</span>
                            }
                            <span><CaretDownOutlined /></span>
                        </div>
                    </Dropdown>
                    {
                        firstRouters.map(item=>renderTaskRouter(item))
                    }
                </div>

                <div className={`${normalOrScrum}-aside-item`} onClick={()=>goSys()}>
                    <div className={`${normalOrScrum}-aside-item-icon`}><SettingOutlined/></div>
                    <div className={`${normalOrScrum}-aside-item-title`}>{t('Setting')}</div>
                </div>
                <div className={`${normalOrScrum}-aside-item`} onClick={()=>setMenuFold()}>
                    <div className={`${normalOrScrum}-aside-item-icon`}><MenuUnfoldOutlined/></div>
                    <div className={`${normalOrScrum}-aside-item-title`}>{t(normalOrScrum==='scrum'?'Collapse':'Expand')}</div>
                </div>
            </div>
            {
                isLoading ? <Loading/> :
                <div className='xcode-layout-content'>
                    {renderRoutes(route.routes)}
                </div>
            }
        </div>
    )
}

export default Aside
