import React,{useEffect} from 'react'
import {Dropdown} from 'antd'
import {useTranslation} from 'react-i18next'
import {CaretDownOutlined, SettingOutlined,MenuUnfoldOutlined} from '@ant-design/icons'
import {ToggleMenu} from './toggleMenu'
import Listname from "../list/listname";

const NomalAside = props =>{

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

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return  <div  key={item.to}
                      className={`nomal-aside-item ${nav===item.to ? 'nomal-aside_active':''}`}
                      onClick={()=> props.history.push(item.to)}
                >
                    <div className='nomal-aside-item_icon'>{item.icon}</div>
                    <div className='nomal-aside-item_title'>{t(item.title)}</div>
                </div>
    }

    return (
        <div className='nomal-aside'>
            <div  className='nomal-aside-up'>
                <Dropdown
                    overlay={<ToggleMenu
                        {...props}
                        list={list}
                        setIsLoading={setIsLoading}
                        asideType={asideType}
                        info={info}
                    />}
                    trigger={['click']}
                    overlayClassName='aside-dropdown-nomal aside-dropdown'
                >
                    <div className='nomal-aside_chang' onClick={(e)=>e.preventDefault()}>
                        <Listname text={info.name}/>
                        <span><CaretDownOutlined /></span>
                    </div>
                </Dropdown>
                {
                    firstRouters.map(item=>renderTaskRouter(item))
                }
            </div>

            <div className='nomal-aside-sys' onClick={()=>goSys()}>
                <div className='nomal-aside-item_icon'><SettingOutlined/></div>
                <div>{t('Setting')}</div>
            </div>
            <div className='nomal-aside-sys' onClick={()=>setMenuFold('scrum')}>
                <div className='nomal-aside-item_icon'><MenuUnfoldOutlined/></div>
                <div>{t('Expand')}</div>
            </div>
        </div>
    )
}

export default NomalAside
