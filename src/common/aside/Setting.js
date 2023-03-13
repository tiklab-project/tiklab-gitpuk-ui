import React,{useEffect,useState} from 'react';
import {renderRoutes} from 'react-router-config';
import {useTranslation} from 'react-i18next';
import {PrivilegeProjectButton} from 'tiklab-user-ui';
import './Setting.scss';

/**
 * 左侧菜单（三级标题）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Setting = props =>{

    const {location,route,secondRouter} = props

    let path = location.pathname
    const {t} = useTranslation()
    const [nav,setNav] = useState('')

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return  <div key={item.to}
                     className={`setting-aside-item ${nav===item.to?'setting-aside-select':''} `}
                     onClick={()=>props.history.push(item.to)}
                ><span className='setting-aside-item-title'>{t(item.title)}</span>
                </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.to} code={item.enCode} domainId={''}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }

    return (
        <div className='xcode-setting'>
            <div className='xcode-setting-aside'>
                <div className='xcode-setting-aside-head'>设置</div>
                {
                    secondRouter.map(item=>navContent(item))
                }
            </div>
            <div className='xcode-setting-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Setting
