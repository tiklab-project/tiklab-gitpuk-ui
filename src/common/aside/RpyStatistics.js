/**
 * 仓库和仓库组设置的setting
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState} from 'react';
import {renderRoutes} from 'react-router-config';
import {useTranslation} from 'react-i18next';
import {ProjectNav,PrivilegeProjectButton} from 'thoughtware-privilege-ui';
import './Setting.scss';
const RpyStatistics = props =>{

    const {location,route,secondRouter,domainId} = props
    let path = location.pathname
    const {t} = useTranslation()
    const [nav,setNav] = useState('')

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return  <div key={item.id}
                     className={`setting-aside-item ${nav===item.id?'setting-aside-select':''} `}
                     onClick={()=>props.history.push(item.id)}
        ><span className='setting-aside-item-title'>{t(item.title)}</span>
        </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={domainId}>
            {navContent(item)}
        </PrivilegeProjectButton>
    }

    return (
        <div className='xcode-setting'>
            <div className='xcode-setting-aside'>
                <div className='xcode-setting-aside-head'>统计</div>
                {
                    secondRouter.map(item=>renderRouter(item))
                }
            </div>
            <div className='xcode-setting-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default RpyStatistics
