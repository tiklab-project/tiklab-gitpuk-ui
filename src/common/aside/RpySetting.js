/**
 * 仓库和仓库组设置的setting
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState} from 'react';
import {renderRoutes} from 'react-router-config';
import {useTranslation} from 'react-i18next';
import {ProjectNav,PrivilegeProjectButton} from 'tiklab-privilege-ui';
import './Setting.scss';
const RpySetting = props =>{

    const {location,route,secondRouter,domainId} = props
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
        return  <PrivilegeProjectButton key={item.to} code={item.purviewCode} domainId={domainId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }

    return (
        <ProjectNav
            {...props}
            domainId={domainId}
            projectRouters={secondRouter}
           // outerPath={`/index/repository/${domainId}/set`}
        >
            <div className='xcode-setting'>
                <div className='xcode-setting-aside'>
                    <div className='xcode-setting-aside-head'>设置</div>
                    {
                        secondRouter.map(item=>renderRouter(item))
                    }
                </div>
                <div className='xcode-setting-content'>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </ProjectNav>

    )
}

export default RpySetting