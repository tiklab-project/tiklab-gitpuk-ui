import React,{useState,useEffect} from 'react';
import {Dropdown,Badge,Avatar} from 'antd';
import {useTranslation} from 'react-i18next';
import {AppLink} from "tiklab-integration-ui";
import {
    UserOutlined,
    GlobalOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    ProfileOutlined,
    ExpandOutlined,
    ScheduleOutlined,
    WhatsAppOutlined,
} from '@ant-design/icons'
import HeaderMessage from './HeaderMessage';
import {getUser} from "tiklab-core-ui";

/**
 * header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Head = props =>{

    let path = props.location.pathname
    const {i18n,t} = useTranslation()
    const [currentLink,setCurrentLink] = useState(path)
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        if(path.indexOf('/index/repository')===0){
            path='/index/repository'
        }
        if(path.indexOf('/index/group')===0){
            path='/index/group'
        }
        setCurrentLink(path)
    },[path])

    const routers=[
        {
            key:'home',
            to:'/index/home',
            title: `${t('Home')}`,
        },
        {
            key:'repository',
            to:'/index/repository',
            title: `${t('Repository')}`,
        },
        {
            key:'group',
            to:'/index/group',
            title: `${t('Repository_group')}`,
        },
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
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }

    /**
     * 跳转系统设置
     */
    const goSystem = () =>{
        props.history.push('/index/sys/auth')
    }

    // 渲染一级标题
    const renderRouter = routers => {
        return routers.map(routers=>{
            return  <div key={routers.key}
                         onClick={()=>changeCurrentLink(routers)}
                         className={currentLink===routers.to ? 'headers-active' : null}
            >{routers.title}</div>
        })
    }

    // 切换语言目录
    const languageMenu = (
        <div className='outMenu-lan-menu'>
            <div className='lan-menu' onClick={()=>changeLan('zh')}>中文</div>
            {/*<div className='lan-menu'>英文</div>*/}
        </div>
    )

    // 退出登录页面
    const outMenu = (
        <div className='header-outMenu'>
            <div className='header-outMenu-top'>
                <div className='outMenu-out'>
                    <Avatar icon={<UserOutlined />} />
                    <div className='outMenu-out-info'>
                        <div className='outMenu-out-name'>{getUser()?.nickname}</div>
                        <div className='outMenu-out-eamil'>{getUser()?.phone}</div>
                    </div>
                </div>
            </div>
            <div className='header-outMenu-lan'>
                <Dropdown overlay={languageMenu}>
                    <div className='outMenu-lan'>
                        <GlobalOutlined className='header-dropdown-icon'/>
                        <span className='lan'>切换语言</span>
                    </div>
                </Dropdown>
            </div>
            <div className='header-outMenu-out'>
                <div onClick={()=>goOut()} className='outMenu-out'>
                    <LogoutOutlined className='header-dropdown-icon'/>
                    <span className='bottom-out'>退出</span>
                </div>
            </div>
        </div>
    )

    // 帮助目录
    const helpMenu = (
        <div className='header-helpMenu'>
            <div className='header-helpMenu-item'>
                <ProfileOutlined className='header-dropdown-icon'/>
                文档
            </div>
            <div className='header-helpMenu-item'>
                <ExpandOutlined className='header-dropdown-icon'/>
                社区支持
            </div>
            <div className='header-helpMenu-item'>
                <ScheduleOutlined className='header-dropdown-icon'/>
                在线工单
            </div>
            <div className='header-helpMenu-item'>
                <WhatsAppOutlined className='header-dropdown-icon'/>
                在线客服
            </div>
        </div>
    )

    return(
        <div className='frame-header'>
            <div className='frame-header-right'>
                <AppLink  isSSO={false}/>
                <div className='frame-header-logo'>
                   {/* <img src={logo} alt='logo' />*/}
                    <div className='frame-header-logo-text'>Xcode</div>
                </div>
                <div className='headers-link'>
                    {renderRouter(routers)}
                </div>
            </div>
            <div className='frame-header-right'>
                <div className='frame-header-right-text'>
                    <div className='frame-header-set' onClick={()=>goSystem()}>
                        <SettingOutlined className='frame-header-icon'/>
                    </div>
                    <div className='frame-header-message' onClick={()=>setVisible(true)}>
                        <Badge count={3} size='small'>
                            <BellOutlined className='frame-header-icon'/>
                        </Badge>
                    </div>
                    <div className='frame-header-help'>
                        <Dropdown overlay={helpMenu}>
                            <QuestionCircleOutlined className='frame-header-icon'/>
                        </Dropdown>
                    </div>
                    <Dropdown overlay={outMenu}>
                        <div className='frame-header-user'>
                            <Avatar icon={<UserOutlined />} />
                        </div>
                    </Dropdown>
                </div>
            </div>

            <HeaderMessage
                {...props}
                visible={visible}
                setVisible={setVisible}
            />

        </div>
    )
}

export default Head
