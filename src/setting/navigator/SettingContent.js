import React,{useEffect,useState} from 'react';
import {DownOutlined, ExportOutlined, HomeOutlined, UpOutlined} from '@ant-design/icons';
import {PrivilegeButton,SystemNav} from 'tiklab-privilege-ui';
import {renderRoutes} from 'react-router-config';
import {useTranslation} from 'react-i18next';
import {inject, observer} from "mobx-react";
import './SettingContent.scss';
import {getVersionInfo} from "tiklab-core-ui";
import UpgradePopup from "../../common/upgrade/UpgradePopup";
import member from "../../assets/images/img/member.png";

const SettingContent= props =>  {

    const {route,isDepartment,applicationRouters,systemRoleStore,templateRouter,setNavLevel} = props
    const {systemPermissions}=systemRoleStore

    const {t} = useTranslation()

    const path = props.location.pathname
    const [selectKey,setSelectKey] = useState(path)
    const [expandedTree,setExpandedTree] = useState([''])  // 树的展开与闭合
    const [authConfig,setAuthConfig]=useState(null)

    const [upgradeVisible,setUpgradeVisible]=useState(false)

    useEffect(()=>{
        if (path.startsWith("/setting/scanRule")){
            setSelectKey("/setting/scanRuleSet")
        }else {
            if (path.startsWith("/setting/power")){
                setSelectKey("/setting/powerUser")
            }else {
                setSelectKey(path)
            }
        }

        const authConfig=localStorage.getItem('authConfig')
        setAuthConfig(JSON.parse(authConfig))
    },[path])

    // 菜单
    let menus = () => {
        try{
            if(isDepartment && devProduction){
                return [...applicationRouters]
            }
            if(!isDepartment && devProduction){
                return [...applicationRouters,...templateRouter]
            }
            if(isDepartment && !devProduction){
                return [...applicationRouters]
            }
            else {
                return [...applicationRouters]
            }
        }catch {
            return [...applicationRouters]
        }
    }

    //跳转
    const skip = data =>{
        const value=data.id;
        if (value.endsWith("orga")||value.endsWith("user")||value.endsWith("userGroup")||value.endsWith("dir")){
            //统一登陆
            if (!authConfig.authType) {
                const a =value.substring(value.lastIndexOf("/"));
                window.open(`${authConfig.authUrl}/#/setting${a}`)
            }else {
                props.history.push(data.id)
            }
        }else {
            props.history.push(data.id)
        }
    }

    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    //导航栏数的展开关闭
    const setOpenOrClose = key => {
        if (key==="3"&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
            setUpgradeVisible(true)
        }else {
            if (isExpandedTree(key)) {
                setExpandedTree(expandedTree.filter(item => item !== key))
            } else {
                setExpandedTree(expandedTree.concat(key))
            }
        }

    }

    const renderMenu = (data,deep)=> {
        return (
            <PrivilegeButton key={data.id} code={data.purviewCode} {...props}>
                <li style={{cursor:'pointer',paddingLeft:`${deep===0?20:40}`}}
                    className={`system-aside-li system-aside-second ${data.id=== selectKey ? 'system-aside-select' :null}`}
                    onClick={()=>skip(data)}
                    key={data.id}
                >
                    <div className='sys-content-tab-style'>
                        <span className='sys-content-icon'>{data.icon}</span>
                        <span className='nav-style-title'>{t(data.title)}</span>
                        {!authConfig?.authType&&(data.id.endsWith("orga")||data.id.endsWith("user")||
                                data.id.endsWith("userGroup")||data.id.endsWith("dir"))&&
                            <span>
                                <ExportOutlined  />
                            </span>
                        }
                        </div>
                </li>
            </PrivilegeButton>
        )
    }

    const subMenu = (item,deep)=> {
        return (
            <li key={item.id} className='system-aside-li'>
                <div className='system-aside-item system-aside-first '
                     style={{paddingLeft: `${deep * 20 + 20}`}}
                     onClick={()=>setOpenOrClose(item.id)}
                >
                    <span className='sys-content-tab-style'>
                        <div className='sys-content-icon'>{item.icon}</div>
                        <span className='system-aside-title'>{t(item.title)}</span>
                        {item.id==="3"&&(getVersionInfo().expired&&getVersionInfo().release!==3)&&
                            <img  src={member}  style={{width:18,height:18}}/>
                        }
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
    //跳转首页
    const backHome = () => {
        setNavLevel(1)
        props.history.push(`/repository`)
    }
    //跳转设置首页
    const goSettingHome = () => {
        props.history.push(`/setting/home`)
    }

    return (
        <SystemNav
            {...props}
            expandedTree={expandedTree} // 树的展开和闭合(非必传)
            setExpandedTree={setExpandedTree} // 树的展开和闭合(非必传)
            applicationRouters={applicationRouters} // 菜单
            outerPath={"/setting"} // 系统设置Layout路径
            noAccessPath={"/noaccess"} //没有资源访问权限页面的路由参数
        >
            <div className='system'>
                <div className='system-aside'>
                    <div className='system-icon' onClick={goSettingHome}>
                        <div className='aside-text-size'>设置</div>
                    </div>
                    <div className='system-aside-goHome'>
                        <div className='system-aside-title-nav' onClick={backHome}>
                            <HomeOutlined className='system-aside-icon'/>
                            <div>返回首页</div>
                        </div>
                    </div>
                    <ul className='system-aside-top' style={{padding:0}}>
                        {
                            menus().map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem,0) : renderMenu(firstItem,0)
                            })
                        }
                    </ul>
                </div>
                <div className='system-data-tab'>
                    {renderRoutes(route.routes)}
                </div>

            </div>
            <UpgradePopup visible={upgradeVisible}
                          setVisible={setUpgradeVisible}
                          title={'代码扫描配置'}
                          desc={"如需配置代码扫描，请购买企业版Licence"}/>
        </SystemNav>
    )

}

export default inject("systemRoleStore")(observer(SettingContent))
