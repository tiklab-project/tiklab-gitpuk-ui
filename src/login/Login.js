import React from "react";
import {Login, UserVerify} from "tiklab-eam-ui";

/**
 * 登录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LoginContent = props => {
    return   <Login
                {...props}
                loginGoRouter="/"
                bgroup={'hadess'}
                /* vaildUserAuthRouter={"/no-auth"}*/
            />
}

export default LoginContent
