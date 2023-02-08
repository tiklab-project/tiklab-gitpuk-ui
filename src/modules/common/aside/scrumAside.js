import React,{useState,useEffect} from 'react'
import {PrivilegeProjectButton} from 'tiklab-privilege-ui'
import {useTranslation} from 'react-i18next'
import {Dropdown} from 'antd'
import {CaretDownOutlined, SettingOutlined,MenuFoldOutlined} from '@ant-design/icons'
import {ToggleMenu} from './toggleMenu'
import Listname from '../list/listname'

const ScrumAside = props =>{

    const {firstRouters,nav,info,list,webUrl,asideType,setIsLoading,setMenuFold} = props

    const {t} = useTranslation()

    const goSys = () =>{
        switch (asideType) {
            case 'house':
                props.history.push(`/index/${asideType}/${webUrl}/sys`)
                break
            case 'group':
                props.history.push(`/index/group/${webUrl}/sys`)
        }
    }

    const navContent = item =>{
        return  <div key={item.to}
                     className={`scrum-aside-item ${nav===item.to?'scrum-aside-select':''}`}
                     onClick={()=>props.history.push(item.to)}
                >
                    <span className='scrum-aside-item-icon'>{item.icon}</span>
                    <span className='scrum-aside-item-title'>{t(item.title)}</span>
                </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.key} code={item.enCode} domainId={''}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }

    return(
        <div className='scrum-aside'>
            <div className='scrum-aside-up'>
                <Dropdown
                    overlay={<ToggleMenu
                        {...props}
                        list={list}
                        setIsLoading={setIsLoading}
                        asideType={asideType}
                        info={info}
                    />}
                    trigger={['click']}
                    overlayClassName='aside-dropdown-scrum aside-dropdown'
                >
                    <div className='scrum-aside_chang' onClick={(e)=>e.preventDefault()}>
                        <Listname text={info.name}/>
                        <span className='dropdowns_name'>{info.name}</span>
                        <span><CaretDownOutlined /></span>
                    </div>
                </Dropdown>
                {
                    firstRouters.map(item=>navContent(item))
                }
            </div>
            <div className='scrum-aside-sys' onClick={()=>goSys()}>
                <span className='scrum-aside-item-icon'><SettingOutlined/></span>
                <span className='scrum-aside-item-title'>{t('Setting')}</span>
            </div>
            <div className='scrum-aside-sys' onClick={()=>setMenuFold('nomal')}>
                <span className='scrum-aside-item-icon'><MenuFoldOutlined/></span>
                <span className='scrum-aside-item-title'>{t('Collapse')}</span>
            </div>
        </div>
    )
}

export default ScrumAside
