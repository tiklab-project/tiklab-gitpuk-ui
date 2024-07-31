/**
 * Header 头部
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from "react";
import "./Header.scss"
import {PortalDropdown} from "../dropdown/DropdownMenu";
import {Badge} from "antd";
import {BellOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import PortalFeature from "../../home/components/PortalFeature";
import PortalMessage from "../../home/components/PortalMessage";
const Header = (props) => {
    const {HelpLink,AvatarLink} = props
    const [unread,setUnread] = useState(0)
    const [visible,setVisible] = useState(false)
 /*   <MenuUnfoldOutlined /> : <MenuFoldOutlined />*/

    return (
        <div className="gittok-header">
            <div className='gittok-left-tab'>
                <MenuUnfoldOutlined />
            </div>
            <div className="gittok-header-tab">
                <PortalDropdown
                    tooltip={'消息'}
                    Icon={ <Badge count={unread} size="small">
                        <BellOutlined className="header-tab-icon"/>
                    </Badge>}
                    onClick={()=>setVisible(true)}
                />
                {HelpLink}
                <div className="gittok-header-text">
                    <PortalFeature/>
                </div>
                {AvatarLink}
            </div>
            <PortalMessage
                {...props}
                visible={visible}
                setVisible={setVisible}
                unread={unread}
                setUnread={setUnread}
            />
        </div>
    )
}
export default Header
