import React,{useState,useEffect} from "react";
import {Dropdown,Badge} from "antd";
import {useTranslation} from "react-i18next";
import {getUser} from "thoughtware-core-ui";
import {renderRoutes} from "react-router-config";
import {
    BellOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import { PortalDropdown } from "../../common/dropdown/DropdownMenu";
import PortalMessage from "./PortalMessage";
import "./Portal.scss";
import {AvatarLink, HelpLink} from "thoughtware-licence-ui";
import xcode from "../../assets/images/img/xcode.png"
/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const  Portal = props =>{

    const {route,systemRoleStore,AppLink} = props

    const {getSystemPermissions} = systemRoleStore

    let path = props.location.pathname
    const {i18n,t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)
    const [unread,setUnread] = useState(1)

    useEffect(()=>{

        getSystemPermissions(getUser().userId)
    },[])

    useEffect(()=>{
        if(path.indexOf('/repository')===0){
            path='/repository'
        }
        if(path.indexOf('/group')===0){
            path='/group'
        }
        setCurrentLink(path)
    },[path])

    // 一级标题
    const routers=[
        {
            key:"home",
            to:"/home",
            title: "home",
        },
        {
            key:"repository",
            to:"/repository",
            title: "Repository",
        },
        {
            key:"group",
            to:"/group",
            title:"Repository_group",
        }
    ]

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

    /**
     * 退出登录
     */
    const goOut = () => {
        props.history.push({
            pathname: "/logout",
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    /**
     * 帮助文档
     */
    const goHelp = path => {
        window.open(`http://tiklab.net/${path}`)
    }

    // 渲染一级标题
    const renderRouter = routers => {
        return routers && routers.map(routers=>{

            return  <div key={routers.key}
                         onClick={()=>changeCurrentLink(routers)}
                         className={currentLink===routers.to ? "headers-active" : null}
            >
                {t(routers.title)}
            </div>
        })
    }

    // 切换语言目录
    const languageMenu = (
        <div className="outMenu-lan-menu">
            <div className="lan-menu" >中文</div>
            {/*<div className="lan-menu">英文</div>*/}
        </div>
    )

    return(
        <div className="frame">
            <div className="frame-header">
                <div className="frame-header-right">
                    {AppLink}
                    <div className="frame-header-logo">
                        <div style={{paddingTop:13}}>
                            <img  src={xcode}  style={{width:22,height:22}}/>
                        </div>
                        <div className={'text'}>
                            {"Xcode"}
                        </div>
                    </div>
                    <div className="headers-link">
                        {renderRouter(routers)}
                    </div>
                </div>
                <div className="frame-header-right">
                    <div className="frame-header-right-text">
                        <PortalDropdown
                            tooltip={'设置'}
                            Icon={<SettingOutlined className="frame-header-icon"/>}
                            onClick={()=>props.history.push("/setting/org")}
                        />
                        <PortalDropdown
                            tooltip={'消息'}
                            Icon={ <Badge count={unread} size="small">
                                <BellOutlined className="frame-header-icon"/>
                            </Badge>}
                            onClick={()=>setVisible(true)}
                        />
                        <HelpLink/>
                        <AvatarLink {...props}/>
                        {/*<PortalDropdown
                            tooltip={'帮助与支持'}
                            Icon={<QuestionCircleOutlined className="frame-header-icon"/>}
                            width={200}
                        >
                            <div className="header-helpMenu">
                                <div className="header-helpMenu-item" onClick={()=>goHelp("document/documentList")}>
                                    <ProfileOutlined className="header-dropdown-icon"/>
                                    文档
                                </div>
                                <div className="header-helpMenu-item" onClick={()=>goHelp("question/questionList")}>
                                    <ExpandOutlined className="header-dropdown-icon"/>
                                    社区支持
                                </div>
                                <div className="header-helpMenu-item" onClick={()=>goHelp("account/workOrder/workOrderList")}>
                                    <ScheduleOutlined className="header-dropdown-icon"/>
                                    在线工单
                                </div>
                                <div className="header-helpMenu-item" onClick={()=>goHelp("account/group/onlineservice")}>
                                    <WhatsAppOutlined className="header-dropdown-icon"/>
                                    在线客服
                                </div>
                            </div>
                        </PortalDropdown>*/}

                        {/*<PortalDropdown
                            tooltip={'个人中心'}
                            Icon={<Profile />}
                            width={240}
                        >
                            <div className="header-outMenu">
                                <div className="header-outMenu-top">
                                    <div className="outMenu-out">
                                        <Profile user={getUser()} />
                                        <div className="outMenu-out-info">
                                            <div className="outMenu-out-name">
                                                <span>{getUser().nickname || getUser().name || "用户"}</span>
                                            </div>
                                            <div className="outMenu-out-eamil">{getUser().phone || getUser().eamil || "--"}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-outMenu-lan">
                                    <Dropdown overlay={languageMenu}>
                                        <div className="outMenu-lan">
                                            <GlobalOutlined className="header-dropdown-icon"/>
                                            <span className="lan">切换语言</span>
                                        </div>
                                    </Dropdown>
                                </div>
                                <div className="header-outMenu-out">
                                    <div onClick={()=>goOut()} className="outMenu-out">
                                        <LogoutOutlined className="header-dropdown-icon"/>
                                        <span className="bottom-out">退出</span>
                                    </div>
                                </div>
                            </div>
                        </PortalDropdown>*/}
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
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default inject("systemRoleStore")(observer(Portal))
