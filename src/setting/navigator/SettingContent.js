import React,{useEffect,useState} from 'react';
import {DownOutlined,UpOutlined} from '@ant-design/icons';
import {PrivilegeButton,SystemNav} from 'tiklab-privilege-ui';
import {departmentRouters,templateRouter} from "./SettingRouters";
import {renderRoutes} from 'react-router-config';
import {useTranslation} from 'react-i18next';
import {inject, observer} from "mobx-react";
import './SettingContent.scss';

const SettingContent= props =>  {

    const {route,isDepartment,applicationRouters,systemRoleStore} = props
    const {systemPermissions}=systemRoleStore

    const {t} = useTranslation()

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState([''])  // 树的展开与闭合


    useEffect(()=>{
        setSelectKey(path)
    },[path])

    // 菜单
    let menus = () => {
        try{
            if(isDepartment && devProduction){
                return [...departmentRouters,...applicationRouters,...templateRouter]
            }
            if(!isDepartment && devProduction){
                return [...applicationRouters,...templateRouter]
            }
            if(isDepartment && !devProduction){
                return [...departmentRouters,...applicationRouters]
            }
            else {
                return [...applicationRouters]
            }
        }catch {
            return [...applicationRouters]
        }
    }

    const select = data =>{
        props.history.push(data.id)
    }

    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li style={{cursor:'pointer',paddingLeft:`${deep*20+20}`}}
                    className={`system-aside-li system-aside-second ${data.id=== selectKey ? 'system-aside-select' :null}`}
                    onClick={()=>select(data)}
                    key={data.id}
                >
                    <span className='sys-content-icon'>{data.icon}</span>
                    <span>{t(data.title)}</span>
                </li>
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep)=> {
        return (
            <li key={item.id} className='system-aside-li'>
                <div className='system-aside-item system-aside-first'
                     style={{paddingLeft: `${deep * 20 + 20}`}}
                     onClick={()=>setOpenOrClose(item.id)}
                >
                    <span>
                        <span className='sys-content-icon'>{item.icon}</span>
                        <span className='system-aside-title'>{t(item.title)}</span>
                    </span>
                    <div className='system-aside-item-icon'>
                        {
                            item.children ?
                                (isExpandedTree(item.id)?
                                        <DownOutlined style={{fontSize: '10px'}}/> :
                                        <UpOutlined style={{fontSize: '10px'}}/>
                                ): ''
                        }
                    </div>
                </div>
                <ul className={`system-aside-ul ${isExpandedTree(item.id) ? null: 'system-aside-hidden'}`}>
                    {
                        item.children && item.children.map(item =>{
                            const deepnew = deep +1
                            return item.children && item.children.length?
                                renderSubMenu(item,deepnew) : renderMenu(item,deepnew)
                        })
                    }
                </ul>
            </li>
        )
    }

    const renderSubMenu = (item,deep) => {
        const isCode = item.children.some(list=>!list.purviewCode)
        if(isCode) return subMenu(item,deep)
        const isPromise = item.children.some(list=> systemPermissions.includes(list.purviewCode))
        return isPromise && subMenu(item,deep)
    }

    return (
        <SystemNav
            {...props}
            expandedTree={expandedTree} // 树的展开和闭合(非必传)
            setExpandedTree={setExpandedTree} // 树的展开和闭合(非必传)
            applicationRouters={applicationRouters} // 菜单
            outerPath={"/index/sys"} // 系统设置Layout路径
            notFoundPath={""}  //找不到页面路径
        >
            <div className='system'>
                <div className='system-aside'>
                    <ul className='system-aside-top' style={{padding:0}}>
                        {
                            menus().map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                            })
                        }
                    </ul>
                </div>
                <div className='system-content'>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        </SystemNav>

    )

}

export default inject("systemRoleStore")(observer(SettingContent))
