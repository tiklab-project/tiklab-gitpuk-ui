import React from "react";
import {UserGroup} from "tiklab-user-ui";

/**
 * 用户组
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const GroupTrue = props => {
    return <UserGroup {...props} bgroup={"xcode"} isBase={true}/>
}

export default GroupTrue
