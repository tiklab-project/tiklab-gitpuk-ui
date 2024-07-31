/**
 * @name: FirstNav
 * @author: limingliang
 * @date: 2024-07-10 10:53
 * @description：一级导航栏
 */

import React ,{useEffect,useState}from 'react';
import "./FirstNav.scss"
import {CodeOutlined, SettingOutlined} from "@ant-design/icons";
import {productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import {useTranslation} from "react-i18next";
import homePage from "../../assets/images/img/homePage.png"
import group from "../../assets/images/img/group.png"
import repository from "../../assets/images/img/repository.png"
import {Tooltip} from "antd";
import Header from "../header/Header";
const FirstNav = (props) => {
    const {location,HelpLink,AvatarLink}=props
    const {i18n,t} = useTranslation()
    const [navPath,setNavPath]=useState('')   //选中的导航栏路径

    useEffect(async () => {

        if (location){
            if (location.pathname.startsWith("/repository")){
                setNavPath("/repository")
            }else if (location.pathname.startsWith("/group")){
                setNavPath("/group")
            }else {
                setNavPath(location.pathname)
            }

        }
    }, [location.pathname]);



    let navigation = [
        {
            key: 'home',
            id:`/home`,
            title:'home',
            icon:   <img src={homePage} style={{ width:25,height:25}}/>
        },
        {
            key: 'repository',
            id:`/repository`,
            title:'Repository',
            icon:   <img src={repository} style={{ width:25,height:25}}/>
        },
        {
            key: 'group',
            id:`/group`,
            title:'Repository_group',
            icon:   <img src={group} style={{ width:24,height:24}}/>
        },
    ];

    //切换nav
    const cuteNav = (value) => {
        setNavPath(value.id)
        props.history.push(value.id)
    }

    const cutSetting = () => {
        setNavPath("setting")
        if (version==='cloud'){
            props.history.push('/setting/myLog')
        }else {
            props.history.push('/setting/version')
        }
    }


    return(
        <div className="fist-nav">
            <div className='fist-nav-style'>
                <div>
                    <div className='fist-nav-icon'>
                        <img  src={productWhiteImg.sward }  style={{width:22,height:22}}/>
                    </div>
                    {navigation?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.id&&' fist-nav-tab-choice'} fist-nav-tab `} onClick={()=>cuteNav(item)} >
                                <div className='table-nav-place'>
                                    <div>{item.icon}</div>
                                    <div> {t(item.title)}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={`${navPath==="setting"&&' fist-nav-tab-choice'} fist-nav-setting `}  onClick={cutSetting}>
                    <div className='table-nav-place'>
                        <Tooltip title='设置' placement={"left"}>
                            <SettingOutlined style={{fontSize:20}}/>
                        </Tooltip >
                    </div>
                </div>
            </div>

            <div className='fist-data-tab'>
                <Header {...props} AvatarLink={AvatarLink} HelpLink={HelpLink} />
                <div className='fist-data-data'>
                    {renderRoutes(props.route.routes)}
                </div>
            </div>
        </div>
    )
}
export default FirstNav
