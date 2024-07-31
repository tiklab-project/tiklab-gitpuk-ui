import React,{useState,useEffect} from 'react';
import {renderRoutes} from 'react-router-config';
import {Dropdown, Tooltip} from 'antd';
import {CaretDownOutlined, MenuUnfoldOutlined, SettingOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {Loading} from '../loading/Loading';
import {interceptUrl} from '../client/Client';
import AsideMenu from './AsideMenu';
import Listicon from '../list/Listicon';
import './Aside.scss';
import UpgradePopup from "../upgrade/UpgradePopup"
import {getUser,getVersionInfo} from "thoughtware-core-ui";
import goBack from "../../assets/images/img/goBack.png"
import {inject, observer} from "mobx-react";
import MoreMeu from "./MoreMeu";
/**
 * 左侧路由（二级标题）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Aside = props => {

    const {location,route,firstRouters,list,info,asideType,repositoryAddress,setNavLevel} = props
    let path = location.pathname
    const {t} = useTranslation()
    const isSide = localStorage.getItem('isSide')
    const [nav,setNav] = useState('')
    const [normalOrScrum,setNormalOrScrum] = useState('normal')
    const [isLoading,setIsLoading] = useState(false)
    const [triggerVisible,setTriggerVisible] = useState(false)
    const [upgradeVisible,setUpgradeVisible]=useState(false)

    const [moreMenu, setMoreMenu] = useState()
    const [morePath, setMorePath] = useState()
    const [projectRouter, setProjectRouter] = useState([]);
    const [menuNum,setMenuNum]=useState()


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



    const renderType = pathType =>{
        let path = `/repository/${repositoryAddress}`
        if(!pathType){
            return path
        }
        switch (pathType) {
            case 'tree':
            case 'blob':
            case 'edit':
                return path
            case 'statistics':
                return `${path}/statistics/commit`
            case 'commit':
                return `${path}/commits/${info && info.defaultBranch}`
            case 'scanRecord':
                return `${path}/scanPlay`
            case 'scanDetails':
                return `${path}/scanPlay`

            case 'commits':
                return `${path}/commits/${(info && info.defaultBranch)?info.defaultBranch:0}`
            case 'mergeAdd':
                return `${path}/merge_requests`
            default:
                return path + '/'+pathType
        }

    }

    /**
     * 侧边栏收起||展开
     */
    const setMenuFold = () =>{
        if(normalOrScrum==='scrum') {
            setNormalOrScrum('normal')
            localStorage.setItem('isSide', 'normal')
            return
        }
        setNormalOrScrum('scrum')
        localStorage.setItem('isSide','scrum')
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

        return  <div  key={item.id}
                      className={`${normalOrScrum}-aside-item ${nav===item.id ? `${normalOrScrum}-aside-select`:''}`}
                      onClick={()=> goPage(item)}
                >
                    <div className={`${normalOrScrum}-aside-item-icon`}>{item.icon}</div>
                    <div className={`${normalOrScrum}-aside-item-title`}>{t(item.title)}</div>
                </div>
    }

    //跳转界面
    const goPage = (item) => {
        if (item.id.endsWith("scanPlay")&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
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
        <div className='xcode-layout'>
            <div className={`${normalOrScrum}-aside`}>
            <div  className={`${normalOrScrum}-aside-up`}>
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
                    overlayClassName={`aside-dropdown-${normalOrScrum} aside-dropdown`}
                >
                    <div className={`${normalOrScrum}-aside_chang`} onClick={(e)=>e.preventDefault()}>
                        <Tooltip placement="right" title={info?.name} >
                            <div>  <Listicon text={info?.name} colors={info?.color}/></div>
                        </Tooltip >

                        {
                            normalOrScrum === 'scrum' &&
                            <span className='dropdowns_name'>{info?.name}</span>
                        }
                        <span><CaretDownOutlined /></span>
                    </div>
                </Dropdown>
                <div>

                    <div className='go-back-style'>
                        <div className='nav-go-back' onClick={backHome}>
                            <img src={goBack} className='nav-go-back-icon'/>
                            <div>返回首页</div>
                        </div>
                    </div>
                </div>

                {
                    projectRouter.map(item=>renderTaskRouter(item))
                }
                {menuNum<8 && <MoreMeu {...props} moreMenu={moreMenu} morePath={morePath} nav={nav} setUpgradeVisible={setUpgradeVisible} />}
            </div>

                <div className={`${normalOrScrum}-aside-item`} onClick={()=>goSys()}>
                    <div className={`${normalOrScrum}-aside-item-icon`}><SettingOutlined/></div>
                    <div className={`${normalOrScrum}-aside-item-title`}>{t('Setting')}</div>
                </div>
            </div>
            {
                isLoading ? <Loading/> :
                <div className='xcode-layout-content'>
                    {renderRoutes(route.routes)}
                </div>
            }

            <UpgradePopup visible={upgradeVisible}
                          setVisible={setUpgradeVisible}
                          title={'代码扫描'}
                          desc={'如需使用代码扫描，请购买企业版Licence'}
            />
        </div>
    )
}

export default Aside
