import React,{useState,useEffect} from "react";
import {Dropdown, Badge, Tooltip, Layout} from "antd";
import {useTranslation} from "react-i18next";
import {getUser,productImg,productWhiteImg} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import {
    BellOutlined, SettingOutlined,
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import { PortalDropdown } from "../../common/dropdown/DropdownMenu";
import PortalMessage from "./PortalMessage";
import "./Portal.scss";
import FirstNav from "../../common/navigation/FirstNav"
/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const  Portal = props =>{

    const {location,route,systemRoleStore,repositoryStore} = props

    const {getSystemPermissions} = systemRoleStore
    const {navLevel,setNavLevel}=repositoryStore

    let path = props.location.pathname
    const {i18n,t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)
    const [unread,setUnread] = useState(0)

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
        setCurrentLink(path)
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


    // 渲染一级标题
    const renderRouter = routers => {
        return routers && routers.map(routers=>{

            return  <div key={routers.key}
                         onClick={()=>changeCurrentLink(routers)}
                         className={`headers-active-item ${currentLink===routers.to ? "headers-active" : null}`}
            >
                <span>
                      {t(routers.title)}
                </span>
            </div>
        })
    }

    return(
        <Layout className='gittok-portal'>
            {
                navLevel===1&&
                <FirstNav {...props}/>
            }
            <Layout>
                <div className='portals-content'>
                    {renderRoutes(route.routes)}
                </div>
            </Layout>
        </Layout>
        /*<div className='frame'>
            {
                navLevel===1&&
                <FirstNav {...props}/>
            }
            {renderRoutes(route.routes)}
        </div>*/

       /* <div className="frame">
            <div className="frame-header">
                <div className="frame-header-right">
                    {AppLink}
                    <div className="frame-header-logo" onClick={goHomePage}>
                        <div style={{paddingTop:13}}>

                            <img  src={productWhiteImg.sward }  style={{width:22,height:22}}/>
                        </div>
                        <div className={'text'}>
                            {"GitTok"}
                        </div>
                    </div>
                </div>
                <div className="frame-header-right">
                    <div className="frame-header-right-text">
                        <PortalDropdown
                            tooltip={'消息'}
                            Icon={ <Badge count={unread} size="small">
                                <BellOutlined className="frame-header-icon"/>
                            </Badge>}
                            onClick={()=>setVisible(true)}
                        />
                        {HelpLink}
                        <div className="layout-header-text">
                            <PortalFeature/>
                        </div>
                        {AvatarLink}
                    </div>
                </div>
                <PortalMessage
                    {...props}
                    visible={visible}
                    setVisible={setVisible}
                    unread={unread}
                    setUnread={setUnread}
                />
            </div>
            <div className="frame-content">
                {
                    navLevel===1&&
                    <FirstNav {...props} HelpLink={HelpLink}/>
                }
                {renderRoutes(route.routes)}
            </div>
        </div>*/
    )
}

export default inject("systemRoleStore","repositoryStore")(observer(Portal))
