/**
 * @name: FirstNav
 * @author: limingliang
 * @date: 2024-07-10 10:53
 * @description：一级导航栏
 */

import React ,{useEffect,useState}from 'react';
import "./FirstNav.scss"
import {
    BellOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    CodeOutlined,
    HomeOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {productImg,productFrameImg,productWhiteImg, productWhitePureImg} from "tiklab-core-ui";
import {renderRoutes} from "react-router-config";
import {useTranslation} from "react-i18next";
import homePage from "../../assets/images/img/homePage.png"
import group from "../../assets/images/img/group.png"
import repository from "../../assets/images/img/repository.png"
import {Badge, Layout, Tooltip} from "antd";
import TopNav from "./TopNav";
import NavigationImage from "../image/NavigationImage";
const {Sider} = Layout
const FirstNav = (props) => {
    const {location,AppLink,HelpLink,AvatarLink}=props
    const {i18n,t} = useTranslation()

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "gray");
    const [navPath,setNavPath]=useState('')   //选中的导航栏路径

    const [themeClass, setThemeClass] = useState("theme-gray")
    //导航折叠状态
    const [collapsed, setCollapsed] = useState(true);


    useEffect(()=> {
        getThemeClass(theme)
        return null;
    }, [theme])

    useEffect(async () => {

        if (location){
            if (location.pathname.startsWith("/repository")){
                setNavPath("/repository")
            }else if (location.pathname.startsWith("/group")){
                setNavPath("/group")
            }else if (location.pathname.startsWith("/index")){
                setNavPath("/index")
            } else {
                setNavPath(location.pathname)
            }

        }
    }, [location.pathname]);


    const getThemeClass = (theme) => {
        let name
        switch (theme) {
            case "black":
                name = "theme-black";
                break;
            case "gray":
                name = "theme-gray";
                break;
            case "blue":
                name = "theme-blue";
                break;
            default:
                name = "theme-gray";
                break;

        }
        setThemeClass(name)
        setTheme(theme)
        return name;
    }

    let navigation = [
        {
            key: 'home',
            id:`/index`,
            title:'home',
            icon:  <HomeOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },
        {
            key: 'repository',
            id:`/repository`,
            title:'Repository',
            icon: <NavigationImage theme={theme} icon={"repository"} type={`${collapsed?'close':'open'}`}/>
        },
        {
            key: 'group',
            id:`/group`,
            title:'Repository_group',
            icon: <NavigationImage theme={theme} icon={"group"} type={`${collapsed?'close':'open'}`}/>

        },
      /*  {
            key: 'setting',
            id:`/setting/version`,
            title:'设置',
            icon:  <SettingOutlined className={`${collapsed?'close-iconfont':'open-iconfont'}`}/>
        },*/
    ];

    //切换nav
    const cuteNav = (value) => {
        setNavPath(value.id)
        if (value.key==='setting'){
            if (version==='cloud'){
                props.history.push('/setting/myLog')
            }else {
                props.history.push('/setting/version')
            }
        }else {
            props.history.push(value.id)
        }
    }
    /**
     * 点击折叠或展开菜单
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return(
        <div className="fist-nav">
            <Sider trigger={null} collapsible collapsed={collapsed}
                   className={`${themeClass } fist-nav-style`}
                   collapsedWidth="75"
                   width="200"
            >
                <div className='fist-tab-up'>
                    <div className='fist-nav-icon'>
                        {
                            collapsed?
                                <div className='fist-nav-close-icon'>
                                    {
                                        (theme==='default'||theme==='gray')?
                                            <img  src={productImg.gitpuk }  className='icon-size'/>:
                                            <img  src={productWhiteImg.gitpuk }  className='icon-size'/>
                                    }

                                </div>:
                                <div className='fist-nav-open-icon'>
                                    {
                                        (theme==='default'||theme==='gray')?
                                            <img  src={productImg.gitpuk }  className='icon-size'/>:
                                            <img  src={productWhiteImg.gitpuk }  className='icon-size'/>
                                    }
                                    <div className='icon-text'>GitPuk</div>
                                </div>
                        }
                    </div>

                    {navigation?.map(item=>{
                        return(
                            <div key={item.key} className={`${navPath===item.id&&' tab-link-active'} tab-link `} onClick={()=>cuteNav(item)} >
                                {
                                    collapsed?
                                        <div className='table-close-nav'>
                                            <div>
                                                <div>{item.icon}</div>
                                                <div> {t(item.title)}</div>
                                            </div>
                                        </div>:
                                        <div className='table-open-nav'>
                                            <div className='open-icon-style'>{item.icon}</div>
                                            <div> {t(item.title)}</div>
                                        </div>
                                }
                            </div>
                        )
                    })}
                </div>

                <TopNav {...props} showType={"all"} collapsed={collapsed}
                        setTheme={setTheme}
                        AppLink={AppLink}
                        HelpLink={HelpLink}
                        AvatarLink={AvatarLink}
                />
                <div className="menu-box-right-border" >
                    <div className={"menu-box-isexpanded"} onClick={toggleCollapsed}>
                        {
                            collapsed ?
                                <CaretRightOutlined  className='first-menu-expend-icon'/>
                                :
                                <CaretLeftOutlined className='first-menu-expend-icon'/>
                        }
                    </div>
                </div>
            </Sider>
        </div>
    )
}
export default FirstNav
