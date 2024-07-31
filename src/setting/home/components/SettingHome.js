/**
 * 设置统计界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useRef,useEffect} from 'react';
import {Col, Input} from 'antd';
import "./SettingHome.scss"
import SystemCountStore from "../store/SystemCountStore";
import {observer} from "mobx-react";
import {getVersionInfo} from "thoughtware-core-ui";
const SettingHome = (props) => {

    const {collectCount,systemCount}=SystemCountStore
    const [authConfig,setAuthConfig]=useState(null)

    useEffect(()=>{
        collectCount();
        const authConfig=localStorage.getItem('authConfig')
        setAuthConfig(JSON.parse(authConfig))
    },[])


    //跳转各nav
    const gotNav = (value) => {
        if (value==='orga'||value==='user'||value==='userGroup'||value==='dir'){
            //统一登陆
            if (!authConfig.authType) {
                window.open(`${authConfig.authUrl}/#/setting/${value}`)
            }else {
                props.history.push(`/setting/${value}`)
            }
        }else {
            props.history.push(`/setting/${value}`)
        }
    }

    return (
        <div className='xcode gittok-width setting-home'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='mf-home-limited'>
                    <div className='setting-home-chunk'>
                        <div className='setting-home-title'>用户与权限</div>
                        <div className='system-home-box'>
                            {
                                version!=='cloud'&&
                                <>
                                    <div className='setting-home-item' onClick={()=>gotNav("orga")}>
                                        <div >{systemCount?.orgaNum}</div>
                                        <div className='item-text'>部门</div>
                                    </div>
                                    <div className='setting-home-item' onClick={()=>gotNav("user")}>
                                        <div >{systemCount?.userNum}</div>
                                        <div className='item-text'>用户</div>
                                    </div>
                                    <div className='setting-home-item' onClick={()=>gotNav("userGroup")}>
                                        <div >{systemCount?.userGroupNum}</div>
                                        <div className='item-text'>用户组</div>
                                    </div>
                                    <div className='setting-home-item'  onClick={()=>gotNav("dir")}>
                                        <div >{systemCount?.userDirNum}</div>
                                        <div className='item-text'>用户目录</div>
                                    </div>
                                </>
                            }
                            <div className='setting-home-item' onClick={()=>gotNav("role")}>
                                <div >{systemCount?.roleNum}</div>
                                <div className='item-text'>权限</div>
                            </div>
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='setting-home-title' >消息</div>
                        <div className='system-home-box' >
                            <div className='setting-home-item' onClick={()=>gotNav("mes/notice")}>
                                <div >{systemCount?.messageNoticeNum}</div>
                                <div className='item-text'>消息通知方案</div>
                            </div>
                            <div className='setting-home-item' onClick={()=>gotNav("mes/send")}>
                                <div >{systemCount?.messageSendTypeNum}</div>
                                <div className='item-text'>消息发送方式</div>
                            </div>
                           {/* <div className='setting-home-item' onClick={()=>gotNav("plugin")}>
                                <div >{systemCount?.installPluginNum}</div>
                                <div className='item-text'>插件</div>
                            </div>*/}
                        </div>
                    </div>
                    <div className='setting-home-chunk'>
                        <div className='setting-home-title'>仓库配置</div>
                        <div className='system-home-box' >
                            <div className='setting-home-item' onClick={()=>gotNav("auth")}>
                                <div className='item-text'>SSH密钥</div>
                            </div>
                            <div className='setting-home-item' onClick={()=>gotNav("userpower")}>
                                <div className='item-text'>用户仓库</div>
                            </div>
                            <div className='setting-home-item' onClick={()=>gotNav("resources")}>
                                <div className='item-text'>资源监控</div>
                            </div>
                        </div>
                    </div>
                    {
                        (!getVersionInfo().expired||getVersionInfo().release===3)&&
                        <div className='setting-home-chunk'>
                            <div className='setting-home-title'>扫描设置</div>
                            <div className='system-home-box' >
                                <div className='setting-home-item' onClick={()=>gotNav("scanScheme")}>
                                    <div >{systemCount?.scanSchemeNum}</div>
                                    <div className='item-text'>扫描方案</div>
                                </div>
                                <div className='setting-home-item' onClick={()=>gotNav("scanRuleSet")}>
                                    <div className='item-text'>扫描规则集</div>
                                </div>
                                <div className='setting-home-item' onClick={()=>gotNav("scanEnv")}>
                                    <div className='item-text'>扫描环境</div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='setting-home-chunk'>
                        <div className='setting-home-title'>安全</div>
                        <div className='system-home-box' >
                            <div className='setting-home-item' onClick={()=>gotNav("backupRecovery")}>
                                <div className='item-text'>操作日志</div>
                            </div>
                            <div className='setting-home-item' onClick={()=>gotNav("myLog")}>
                                <div className='item-text'>备份与恢复</div>
                            </div>
                        </div>
                    </div>
                    {
                        version!=='cloud'&&
                        <div className='setting-home-chunk'>
                            <div className='setting-home-title'>应用</div>
                            <div className='system-home-box'>
                                <div className='setting-home-item' onClick={()=>gotNav("version")}>
                                    <div className='item-text'>备份与恢复</div>
                                </div>
                                <div className='setting-home-item' onClick={()=>gotNav("authContent")}>
                                    <div >{systemCount?.authUserNum}</div>
                                    <div className='item-text'>应用访问权限</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        </div>
    )
}
export default observer(SettingHome)
