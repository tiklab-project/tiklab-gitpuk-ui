
import React,{useState,useEffect} from "react";
import {AppstoreOutlined, BellOutlined, QuestionCircleOutlined, SettingOutlined} from "@ant-design/icons";
import "./TopNav.scss"
import {getUser} from "tiklab-core-ui";
import PortalMessage from "../../home/components/PortalMessage";
import {inject,observer} from "mobx-react";

const TopNav = (props) => {
    const {repositoryStore,collapsed,setTheme,AppLink,HelpLink,AvatarLink}=props
    const [unread,setUnread] = useState()
    const [visible,setVisible] = useState(false)
    const {setNavLevel}=repositoryStore


    //切换主题
    const changeTheme = type => {
        setTheme(type)
        localStorage.setItem("theme", type)
    }

    const goSetting = () => {
        setNavLevel(2)
        props.history.push('/setting/home')
    }

    return(
        <div className='top-nav'>
            <div className='tab-link'>
                {
                    collapsed?
                        <div className="close-top-tab" onClick={goSetting} data-title-right='设置'>
                            <SettingOutlined className={`close-iconfont `} />
                        </div>:
                        <div className='open-top-tab' onClick={goSetting}>
                            <div className={` open-iconfont`}> <SettingOutlined /></div>
                            <div>设置</div>
                        </div>
                }
            </div>
            <div className='tab-link'>
                {
                    collapsed?
                        <div  className="close-top-tab" onClick={()=>setVisible(true)} data-title-right='消息'>
                            <BellOutlined className="close-iconfont" />
                        </div>:
                        <div  className='open-top-tab' onClick={()=>setVisible(true)} >
                            <div className="open-iconfont "> <BellOutlined /></div>
                            <div>消息</div>
                        </div>
                }
            </div>
            <div className='tab-link'>
                <HelpLink  bgroup={'gitpuk'}
                           iconComponent={
                               collapsed ?
                                   <div className='close-top-tab' data-title-right='帮助'>
                                       <QuestionCircleOutlined className=' close-iconfont'/>
                                   </div>
                                   :
                                   <div className='open-top-tab'>
                                       <div className="open-iconfont"><QuestionCircleOutlined/></div>
                                       <div>帮助与支持</div>
                                   </div>
                           }
                />
            </div>
            <div className='tab-link'>
                <AppLink {...props}
                         translateX={collapsed ? 75 : 200}
                         iconComponent={collapsed?
                             <div className="close-top-tab" data-title-right='应用'>
                                 <AppstoreOutlined className='close-iconfont'/>
                             </div>:
                             <div className='open-top-tab'>
                                 <div className="open-iconfont "><AppstoreOutlined/></div>
                                 <div>应用</div>
                             </div>
                         }
                />
            </div>
            <div className='tab-link'>
                <AvatarLink {...props}
                            changeTheme={changeTheme}
                            iconComponent={
                                collapsed ?
                                    <div className='close-top-tab' data-title-right='个人中心'>
                                        {
                                            getUser()?.avatar?
                                                <img  src={getUser()?.avatar} className="head-portrait"/>:
                                                <div className="head-portrait">{getUser()?.nickname.slice(0, 1).toUpperCase()}</div>
                                        }
                                    </div>
                                    :
                                    <div className='open-top-tab'>
                                        <div className='open-iconfont'>
                                            {
                                                getUser()?.avatar?
                                                    <img  src={getUser()?.avatar} className="head-open-portrait"/>:
                                                    <div className="head-open-portrait">{getUser()?.nickname.slice(0, 1).toUpperCase()}</div>
                                            }
                                        </div>
                                        <div>{getUser()?.nickname}</div>
                                    </div>
                            }
                />
            </div>

            <PortalMessage
                {...props}
                visible={visible}
                setVisible={setVisible}
                unread={unread}
                setUnread={setUnread}
                translateX={collapsed?'75px':'200px'}
            />


        </div>
    )
}
export default inject("repositoryStore")(observer(TopNav))
