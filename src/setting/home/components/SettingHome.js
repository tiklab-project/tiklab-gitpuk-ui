import React, {useState,useEffect} from "react";
import {Row,Col} from "antd";
import SystemCountStore from "../store/SystemCountStore";
import {applyJump, disableFunction, applySubscription, getUser} from "tiklab-core-ui";
;
import vipLight from '../../../assets/images/img/vip-light.png';
import vipDark from '../../../assets/images/img/vip-dark.png';
import "./SettingHome.scss";
import moment from "moment";
import {
    ApartmentOutlined,
    UserOutlined,
    MessageOutlined,
    GroupOutlined,
    ScheduleOutlined,
    InsertRowBelowOutlined,
    VerifiedOutlined,
    ToolOutlined,
    AlertOutlined,
    CloudOutlined,
    HistoryOutlined,
    LaptopOutlined,
    DesktopOutlined,
} from "@ant-design/icons"

const SettingHome = props => {

    const {findUseLicence,collectCount} = SystemCountStore;


    //系统设置统计数据
    const [count,setCount] = useState({});
    //当前版本
    const [licence,setLicence] = useState(null);
    //操作日志
    const [log,setLog] = useState(null);

   /* useEffect(()=>{
        findCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })
        if(version==='cloud'){
            findlogpage({
                pageParam: {pageSize: 1, currentPage: 1},
                userId:getUser().userId
            }).then(res=>{
                if(res.code===0){
                    setLog(res.data)
                }
            })
            findHomesApplyProduct().then(res=>{
                if(res.code===0){
                    setLicence(res.data)
                }
            })
        } else {
            findUseLicence().then(res=>{
                if(res.code===0){
                    setLicence(res.data)
                }
            })
        }
    },[])*/

    useEffect(()=>{
        const versionInfo = JSON.parse(localStorage.getItem("versionInfo"))
        collectCount().then(res=>{
            if(res.code===0){
                setCount(res.data)
            }
        })

        findUseLicence().then(res=>{
            if(res.code===0){
                setLicence(res.data)
            }
        })
    },[])

    /**
     * 路由跳转
     */
    const li = ['orga','user','userGroup','dir'];
    const goPath = path => {
        const authConfig = JSON.parse(localStorage.getItem("authConfig"))
        if(!authConfig.authType){
            const isAuth = li.some(item => item===path)
            if(isAuth){
                return applyJump(`${authConfig.authServiceUrl}/#/setting/${path}`)
            }
        }
        props.history.push(`/setting/${path}`)
    }


    const commonBox = (
        <>
            <div className='home-message-box'>
                <div className='home-title'>消息</div>
                <div className='home-message'>
                    <div className='home-message-item' onClick={()=>goPath('mes/notice')}>
                        <div className='home-left'>
                            <div className='home-icon'><MessageOutlined/></div>
                            <div className='home-label'>消息通知方案</div>
                        </div>
                        <div className='home-info'>
                            {count?.messageNoticeNum || 0}
                        </div>
                    </div>
                    <div className='home-message-item' onClick={()=>goPath('mes/send')}>
                        <div className='home-left'>
                            <div className='home-icon'><AlertOutlined /></div>
                            <div className='home-label'>消息发送方式</div>
                        </div>
                        <div className='home-info'>
                            {count?.messageSendTypeNum || 0}
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-config-box'>
                <div className='home-title'>安全</div>
                <div className='home-config'>
                    <div className='home-config-item' onClick={()=>goPath('backupRecovery')}>
                        <div className='home-left'>
                            <div className='home-icon'><HistoryOutlined /></div>
                            <div className='home-label'>上次备份时间</div>
                        </div>
                        <div className='home-info'>{count.backupsTime?moment(count.backupsTime).format('YYYY-MM-DD') :'无'}</div>
                    </div>
                    <div className='home-config-item' onClick={()=>goPath('myLog')} >
                        <div className='home-left'>
                            <div className='home-icon'><LaptopOutlined /></div>
                            <div className='home-label'>操作日志</div>
                        </div>
                        {/*<div className='home-info'>{count?.envNumber || 0}</div>*/}
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <Row className='setting-home'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "20" , offset: "2"  }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "14", offset: "5" }}
            >
                <div className='mf-home-limited'>
                    {
                        version==='cloud' ?
                            <>
                                <div className='home-licence-box'>
                                    <div className='home-licence'>
                                        <div className='home-licence-item'>
                                            <div className='home-licence-item-level'>
                                                <div className='licence-level-img'>
                                                    <img src={count?.subScribe === true ? vipLight:vipDark} alt={''}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='licence-level-info'>{count?.subScribe === true ? '专业版' : '免费版'}</span>
                                                        {count?.endTime &&
                                                            <span className='licence-level-issuedTime'>
                                                            {moment(count.endTime).format('YYYY-MM-DD HH:mm:ss')}到期
                                                        </span>}
                                                    </div>
                                                    <div className='licence-level-applyAuth'>
                                                        <span className='licence-level-applyAuth-title'>授权人数：</span>
                                                        <span className='licence-level-info'>
                                                            {count?.authUserNum || 0 } / {count?.subScribe === true ? count?.useNum > 0 ? count.useNum+'人' : "不限制" :"不限制" }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='home-licence-sub' onClick={()=>applySubscription('gitpuk')}>
                                            {licence?.subScribe === false ? '续订' : '订阅'}
                                        </div>
                                    </div>
                                </div>
                                <div className='home-chunk-box'>
                                {commonBox}
                                <div className='home-security-box'>
                                    <div className='home-title'>扫描</div>
                                    <div className='home-security'>
                                        <div className='home-security-item' onClick={()=>goPath('scanScheme')}>
                                            <div className='home-left'>
                                                <div className='home-icon'><HistoryOutlined /></div>
                                                <div className='home-label'>扫描方案</div>
                                            </div>
                                            <div className='home-info'>{count?.scanSchemeNum||0}</div>
                                        </div>
                                        <div className='home-security-item' onClick={()=>goPath('scanRuleSet')}>
                                            <div className='home-left'>
                                                <div className='home-icon'><LaptopOutlined /></div>
                                                <div className='home-label'>扫描规则</div>
                                            </div>
                                            <div className='home-info'>{count?.scanRuleNum || '0'}</div>
                                        </div>
                                        <div className='home-security-item' onClick={()=>goPath('scanEnv')}>
                                            <div className='home-left'>
                                                <div className='home-icon'><LaptopOutlined /></div>
                                                <div className='home-label'>扫描环境</div>
                                            </div>
                                            <div className='home-info'>{count?.scanSchemeNum || '0'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            <>
                                <div className='home-licence-box'>
                                    <div className='home-licence'>
                                        <div className='home-licence-item'>
                                            <div className='home-licence-item-level'>
                                                <div className='licence-level-img'>
                                                    <img src={count?.version?.expired ?vipDark: vipLight} alt={''}/>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='licence-level-info'>{count?.version?.expired===false ? '企业版' : '社区版'}</span>
                                                        {licence?.issuedTime &&
                                                            <span className='licence-level-issuedTime'>
                                                            {moment(licence.issuedTime).format('YYYY-MM-DD HH:mm:ss')}到期
                                                        </span>}
                                                    </div>
                                                    <div className='licence-level-applyAuth'>
                                                        <span className='licence-level-applyAuth-title'>授权人数：</span>
                                                        <span className='licence-level-info'>
                                                            {count?.authUserNum || 0 } / {count?.version?.expired === false ? licence?.userNum > 0 ? licence.userNum+'人' : "不限制" :"不限制" }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='home-licence-sub' onClick={()=>applySubscription('gitpuk')}>
                                            {count?.version === false ? '续订' : '订阅'}
                                        </div>
                                    </div>
                                </div>
                                <div className='home-chunk-box'>
                                    <div className='home-user-box'>
                                        <div className='home-title'>用户与权限</div>
                                        <div className='home-user'>
                                            <div className='home-user-item' onClick={()=>goPath('user')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><UserOutlined/></div>
                                                    <div className='home-label'>用户</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.userNum || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('orga')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><ApartmentOutlined /></div>
                                                    <div className='home-label'>部门</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.orgaNum || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('userGroup')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><GroupOutlined /></div>
                                                    <div className='home-label'>用户组</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.userGroupNum || 0}
                                                </div>
                                            </div>
                                            <div className='home-user-item' onClick={()=>goPath('role')}>
                                                <div className='home-left'>
                                                    <div className='home-icon'><ScheduleOutlined /></div>
                                                    <div className='home-label'>权限</div>
                                                </div>
                                                <div className='home-info'>
                                                    {count?.roleNum || 0}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {commonBox}
                                </div>
                            </>
                    }
                </div>
            </Col>
        </Row>
    )
};

export default SettingHome;
