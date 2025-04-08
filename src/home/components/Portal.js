import React,{useState,useEffect} from "react";
import {Layout} from "antd";
import {useTranslation} from "react-i18next";
import {getUser} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import {inject,observer} from "mobx-react";
import "./Portal.scss";
import FirstNav from "../../common/navigation/FirstNav"
/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const  Portal = props =>{

    const {location,route,systemRoleStore,repositoryStore,AppLink,HelpLink,AvatarLink,customLogo} = props

    const {getSystemPermissions} = systemRoleStore
    const {navLevel,setNavLevel}=repositoryStore

    let path = props.location.pathname
    const {i18n,t} = useTranslation()


    useEffect(()=>{
        getSystemPermissions(getUser().userId)
    },[])

    useEffect(()=>{
        if (navLevel===2&&(location.pathname==="/home"||location.pathname==="/repository"||
            location.pathname==="/repository/new"||location.pathname.startsWith("repository/lead")||
            location.pathname==="/group/new"||location.pathname==="/group")){
            setNavLevel(1)
        }
    },[location.pathname])

    useEffect(()=>{
        if(path.indexOf('/repository')===0){
            path='/repository'
        }
        if(path.indexOf('/group')===0){
            path='/group'
        }
    },[path])



    /**
     * 路由跳转
     * @param item
     */
    const changeCurrentLink = item => {
        props.history.push(item.to)
    }

    /**
     * 切换语言
     * @param type
     */
    const changeLan = type =>{
        i18n.changeLanguage(type)
    }

    return(
        <Layout className='gittok-portal'>
            {
                navLevel===1&&
                <FirstNav {...props}
                          AppLink={AppLink}
                          HelpLink={HelpLink}
                          AvatarLink={AvatarLink}
                          customLogo={customLogo}
                />
            }
            <Layout>
                <div className='portals-content'>
                    {renderRoutes(route.routes)}
                </div>
            </Layout>
        </Layout>
    )
}

export default inject("systemRoleStore","repositoryStore")(observer(Portal))
