import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config';
import {Dropdown, Layout, Tooltip} from 'antd';
import {
    BarChartOutlined,
    CaretDownOutlined, CaretLeftOutlined,
    CaretRightOutlined, HomeOutlined,
    MenuUnfoldOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {Loading} from '../loading/Loading';
import {interceptUrl} from '../client/Client';
import AsideMenu from './AsideMenu';
import Listicon from '../list/Listicon';
import './Aside.scss';
import UpgradePopup from "../upgrade/UpgradePopup"
import {getUser, getVersionInfo, productWhiteImg} from "tiklab-core-ui";
import MoreMeu from "./MoreMeu";

const {Sider} = Layout;
/**
 * 左侧路由（二级标题）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Aside = props => {

    const {location,route,firstRouters,list,info,asideType,repositoryAddress,setNavLevel,setFoldState} = props
    let path = location.pathname
    const {t} = useTranslation()
    const isSide = localStorage.getItem('isSide')

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "gray");
    const [nav,setNav] = useState('')
    const [normalOrScrum,setNormalOrScrum] = useState('normal')
    const [isLoading,setIsLoading] = useState(false)
    const [triggerVisible,setTriggerVisible] = useState(false)
    const [upgradeVisible,setUpgradeVisible]=useState(false)

    const [moreMenu, setMoreMenu] = useState()
    const [morePath, setMorePath] = useState()
    const [projectRouter, setProjectRouter] = useState([]);
    const [menuNum,setMenuNum]=useState()
    //导航折叠状态
    const [collapsed, setCollapsed] = useState(true);

    const [themeClass, setThemeClass] = useState("theme-gray")

    useEffect(()=>{
        //查询主题
        getThemeClass(theme)

    },[])

    useEffect(()=>{
        // 侧边栏 -- 展开/收起
        setNormalOrScrum(isSide?isSide:'normal')

    },[normalOrScrum])

    useEffect(()=>{

        // 激活菜单
        let indexPath
        switch (asideType) {
            case 'repository':
                indexPath = renderType(interceptUrl(path)[4])
                break
            case 'group':
                indexPath = path
        }
        setNav(indexPath)
    },[path,info])

    useEffect(() => {
        resizeUpdate(document.getElementById("root"))
        window.addEventListener("resize", resizeUpdate);
        return () => {
            // 组件销毁时移除监听事件
            window.removeEventListener('resize', resizeUpdate);
        }

    }, [firstRouters])



    const resizeUpdate = (e) => {
        // 通过事件对象获取浏览器窗口的高度
        const documentHeight = e.target ? e.target.innerHeight : e.clientHeight;
        const menuHeight = documentHeight - 250;
        const menuNum = Math.floor(menuHeight / 60);
        let num = menuNum > 7 ? 8 : menuNum;

         setProjectRouter(firstRouters.slice(0, num))
         const hiddenMenu = firstRouters.slice(num, firstRouters.length)
         setMoreMenu(hiddenMenu)
         let data = [];
         hiddenMenu.map(item => {
             data.push(item.id)
         })
         setMorePath([...data])

        setMenuNum(num)
    };

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


    const renderType = pathType =>{
        let path = `/repository/${repositoryAddress}`
        if(!pathType){
            return path
        }
        switch (pathType) {
            case 'code':
            case 'blob':
            case 'edit':
                return path+'/code'
            case 'statistics':
                return `${path}/statistics/commit`
            case 'commit':
                return `${path}/commits`
            case 'scanRecord':
                return `${path}/scanPlay`
            case 'scanDetails':
                return `${path}/scanPlay`

            case 'commits':
                return `${path}/commits`
            case 'mergeAdd':
                return `${path}/mergeRequest`
            case 'mergeClashEdit':
                return `${path}/mergeRequest`
            default:
                return path + '/'+pathType
        }

    }

    /**
     * 点击折叠或展开菜单
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
        setFoldState(!collapsed)
    }

    /**
     * 跳转设置页面
     */
    const goSys = () =>{
        switch (asideType) {
            case 'repository':
                props.history.push(`/repository/${repositoryAddress}/setting/info`)
                break
            case 'group':
                props.history.push(`/group/${repositoryAddress}/setting/info`)
        }
    }

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {

        return  <div  key={item.id} className={`${nav===item.id&&' tab-link-active'} tab-link `} onClick={()=> goPage(item)}>
                        {
                            collapsed ?
                                <div className='table-close-nav'>
                                    <div className='rpy-nav-icon'>{item.icon}</div>
                                    <div>{t(item.title)}</div>
                                </div> :
                                <div className='table-open-nav'>
                                    {
                                        item.title==="代码扫描"?
                                            <div className='open-icon-style'>
                                                <BarChartOutlined className='rpy-nav-icon'/>
                                            </div> :
                                            <div className='open-icon-style'>{item.icon}</div>
                                    }
                                    <div>{t(item.title)}</div>
                                    {
                                        ( item.title==="代码扫描"&&getVersionInfo().expired)&& <div className='open-icon-vip'>{item.icon}</div>
                                    }
                                </div>
                        }
                </div>
    }

    //跳转界面
    const goPage = (item) => {
        if (item.id.endsWith("codeScan")&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
            setUpgradeVisible(true)
        }else {
            props.history.push(item.id)
        }
    }

    //跳转首页
    const backHome = () => {
        setNavLevel(1)
        props.history.push(`/${asideType}`)
    }

    return (
        <Layout className='rpy-nav'>
            <Sider trigger={null} collapsible collapsed={collapsed}  collapsedWidth="75" width="200" className={`${themeClass} rpy-nav-style`}>
                <div>
                    <div  className={`${collapsed?"rpy-close-nav-repository":'rpy-open-nav-repository'}`}>
                        <Dropdown
                            overlay={<AsideMenu
                                {...props}
                                list={list}
                                info={info}
                                asideType={asideType}
                                setIsLoading={setIsLoading}
                                setTriggerVisible={setTriggerVisible}
                            />}
                            trigger={['click']}
                            visible={triggerVisible}
                            onVisibleChange={visible=>setTriggerVisible(visible)}
                            overlayClassName={` aside-dropdown ${collapsed?" aside-dropdown-close":" aside-dropdown-open"}`}
                        >
                            {

                                    collapsed?
                                        <div className={`repository-nav repository-nav-close`}   data-title-right={info?.name}>
                                            <Listicon text={info?.name}
                                                      colors={info?.color}
                                                      type={"closeNav"}/>
                                        </div>:
                                        <div className='repository-nav' >
                                            <div>
                                                <Listicon text={info.name}
                                                          colors={info?.color}
                                                          type={"openNav"}
                                                />
                                            </div>
                                            <div className='repository-open-nav-name'>{info.name}</div>
                                            <div><CaretDownOutlined  className='repository-nav-icon'/></div>
                                        </div>
                            }

                        </Dropdown>

                    </div>
                    <div className='go-back-style'>
                        {
                            collapsed?
                                <div className='nav-go-close-back tab-link' onClick={backHome} data-title-right={'返回首页'}>
                                     <HomeOutlined className='rpy-nav-close-icon'/>
                                </div>:
                                <div className='nav-go-open-back tab-link' onClick={backHome}>
                                    <div className='nav-go-back-left'>
                                        <div className='nav-go-back-icon'>
                                            <HomeOutlined className='rpy-nav-open-icon'/>
                                        </div>
                                        <div>返回首页</div>
                                    </div>
                                </div>
                        }
                    </div>
                    {
                        projectRouter.map(item=>renderTaskRouter(item))
                    }
                    {(menuNum<8&&asideType==='repository') &&
                        <MoreMeu {...props}
                                 moreMenu={moreMenu}
                                 morePath={morePath}
                                 nav={nav}
                                 setUpgradeVisible={setUpgradeVisible}
                                 collapsed={collapsed}
                                 theme={theme}
                                 themeClass={themeClass}
                        />}

                </div>
                <div className="rpy-nav-setting" onClick={()=>goSys()}>
                    {
                        collapsed?
                            <div className='nav-close-setting-place tab-link'>
                                <SettingOutlined className='close-iconfont'/>
                            </div>:
                            <div className='nav-open-setting-place tab-link'>
                                <div className='open-icon-setting-style'>
                                    <SettingOutlined className={`open-iconfont`}/>
                                </div>
                                <div>{t('Setting')}</div>
                            </div>
                    }

                </div>

                <div className="menu-box-right-border" >
                    <div className={"menu-box-isexpanded"} onClick={toggleCollapsed}>
                        {
                            collapsed ?
                                <CaretRightOutlined  className='first-menu-expend-icon'/>
                                : <CaretLeftOutlined className='first-menu-expend-icon'/>
                        }
                    </div>
                </div>
            </Sider>
            <Layout>
                {
                    isLoading ? <Loading/> :
                        <div className='rpy-nav-content'>
                            {renderRoutes(route.routes)}
                        </div>
                }

            </Layout>

            <UpgradePopup visible={upgradeVisible}
                          setVisible={setUpgradeVisible}
                          title={'代码扫描'}
                          desc={'如需使用代码扫描，请购买企业版Licence'}
            />
        </Layout>
    )
}

export default Aside
