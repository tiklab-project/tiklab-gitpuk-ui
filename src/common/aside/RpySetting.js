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
import member from "../../assets/images/img/member.png";
import UpgradePopup from "../upgrade/UpgradePopup";
const RpySetting = props =>{

    const {location,route,secondRouter,domainId} = props
    let path = location.pathname
    const {t} = useTranslation()
    const [nav,setNav] = useState('')
    const [upgradeVisible,setUpgradeVisible]=useState(false)

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return  <div key={item.id} className={`setting-aside-item ${nav===item.id?'setting-aside-select':''} `}
                     onClick={()=>goPage(item.id)}>
                        <span className='setting-nav-text'>
                            {t(item.title)}
                            {
                                item.id.endsWith("/setting/lfs")&&getVersionInfo().expired&&
                                <span style={{marginLeft:10}}>{<img  src={member}  style={{width:18,height:18}}/>}</span>
                            }
                        </span>
                </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.id} code={item.purviewCode} domainId={domainId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }

    //跳转界面
    const goPage = (value) => {
        if (value.endsWith("/setting/lfs")&&getVersionInfo().expired){
            setUpgradeVisible(true)
        }else {
            props.history.push(value)
        }
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
                        {
                            secondRouter.map(item=>renderRouter(item))
                        }
                    </div>
                    <div className='xcode-setting-content'>
                        {renderRoutes(route.routes)}
                    </div>
                </div>
            </ProjectNav>
            <UpgradePopup visible={upgradeVisible}
                          setVisible={setUpgradeVisible}
                          title={'LFS大文件存储'}
                          desc={getVersionInfo().release===3?"如需使用LFS大文件存储功能，请先订阅":'如需使用LFS大文件存储功能，请购买企业版Licence'}
            />
        </div>


    )
}

export default RpySetting
