import React from "react";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {getUser} from "thoughtware-core-ui"

const ProfileContent = ({userInfo = undefined}) => {

    const user = userInfo ? userInfo : getUser();

    const renderEl = () => {
        if (user.avatar && user.avatar !== "null") {
            return <Avatar src={user.avatar}/>
        }

        if(user.nickname && user.nickname !== "null"){
            return <Avatar >{user.nickname.substring(0, 1)}</Avatar>
        }

        if (user.name && user.name !== "null") {
            return <Avatar >{user.name.substring(0, 1)}</Avatar>
        }

        return <Avatar size={32} icon={<UserOutlined />} />
    }

    return  <div className={'thoughtware-profile'}>
                {renderEl()}
            </div>
}
export default ProfileContent;
