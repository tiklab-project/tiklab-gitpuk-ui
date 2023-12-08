import React from "react";
import {User} from "thoughtware-user-ui";

/**
 * 用户
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserContent = props =>{

    return <User {...props} bgroup={"gittork"}/>

}

export default UserContent
