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
import {getVersionInfo} from "tiklab-core-ui";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import LfsFree from "../upgrade/LfsFree";
import PushRuleFree from "../upgrade/PushRuleFree";
import RepCleanFree from "../upgrade/RepCleanFree";
const RpySetting = props =>{

    const {location,route,secondRouter,domainId} = props
    let path = location.pathname
    const {t} = useTranslation()
    const [nav,setNav] = useState('')
    const [expandedTree,setExpandedTree] = useState([''])  // 树的展开与闭合
    const [lfsVisible,setLfsVisible]=useState(false)
    const [pushRuleVisible,setPushRuleVisible]=useState(false)
    const [repCleanVisible,setRepCleanVisible]=useState(false)

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return  <div key={item.id} className={`setting-aside-item ${nav===item.id?'setting-aside-select':''} `}
                     onClick={()=>goPage(item.id)}>
                        <span className='setting-nav-text'>
                            {t(item.title)}
                         {/*   {
                                item.id.endsWith("/setting/lfs")&&getVersionInfo().expired&&
                                <span style={{marginLeft:10}}>{<img  src={member}  style={{width:18,height:18}}/>}</span>
                            }*/}
                        </span>
                </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={domainId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }


    const renderSubMenu = (item) => {
        return  <div>
                    <div key={item.id} className={`setting-aside-item  `}
                         onClick={()=>setOpenOrClose(item.id)}>
                                <span className='setting-nav-style'>
                                    {t(item.title)}
                                    <div className='system-aside-item-icon'>
                                     {
                                         item.children ?
                                             (isExpandedTree(item.id)?
                                                     <DownOutlined style={{fontSize: '10px'}}/> :
                                                     <UpOutlined style={{fontSize: '10px'}}/>
                                             ): ''
                                     }
                                    </div>

                                </span>
                    </div>
            <div>
                {
                    isExpandedTree(item.id)&&item.children.map(childrenItem=>{
                        return(
                            <div key={childrenItem.id} onClick={()=>goPage(childrenItem.id)} className={`setting-aside-item ${nav===childrenItem.id?'setting-aside-select':''}`}>
                                <div style={{paddingLeft:15}}>
                                    {t(childrenItem.title)}
                                </div>
                            </div>
                        )
                    })}
            </div>

        </div>

    }

    //导航栏数的展开关闭
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key))
        }

    }
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    //跳转界面
    const goPage = (value) => {
        props.history.push(value)
        /*if (value.endsWith("/setting/lfs")&&getVersionInfo().expired){
            setLfsVisible(true)
        }else if(value.endsWith("/setting/pushRule")&&getVersionInfo().expired){
            setPushRuleVisible(true)
        }else if(value.endsWith("/setting/clean")&&getVersionInfo().expired){
            setRepCleanVisible(true)
        }else {
            props.history.push(value)
        }*/
    }


    return (
        <div>
            <ProjectNav
                {...props}
                domainId={domainId}
                projectRouters={secondRouter}
                noAccessPath={"/noaccess"}  //找不到页面路径
                pathkey={'id'}
                // outerPath={`/repository/${domainId}/set`}
            >
                <div className='xcode-setting'>
                    <div className='xcode-setting-aside'>
                        <div className='xcode-setting-aside-head'>设置</div>
                      {/*  {
                            secondRouter.map(item=>renderRouter(item))
                        }*/}
                        {
                            secondRouter.map(firstItem => {
                                return firstItem.children && firstItem.children.length > 0 ?
                                    renderSubMenu(firstItem) : renderRouter(firstItem)
                            })
                        }
                    </div>
                    <div className='xcode-setting-content'>
                        {renderRoutes(route.routes)}
                    </div>
                </div>
            </ProjectNav>

           {/* <LfsFree visible={lfsVisible}
                          setVisible={setLfsVisible}
           />

            <PushRuleFree visible={pushRuleVisible}
                     setVisible={setPushRuleVisible}
            />
            <RepCleanFree visible={repCleanVisible}
                          setVisible={setRepCleanVisible}
            />*/}
        </div>


    )
}

export default RpySetting
