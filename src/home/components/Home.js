import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import Portal from "./Portal";
import {AppLink,HelpLink,AvatarLink} from "tiklab-licence-ui";
/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return <Portal
            {...props}
            AppLink={AppLink}
            HelpLink={HelpLink}
            AvatarLink={AvatarLink}
    />
}



export default UserVerify(Home,"/no-auth")
