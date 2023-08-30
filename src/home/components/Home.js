import React from "react";
import {UserVerify} from "tiklab-eam-ui";
import {connect} from "tiklab-plugin-core-ui";
import Portal from "./Portal";
import {AppLink} from "tiklab-licence-ui";
/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return <Portal
        {...props}
        AppLink={<AppLink isSSO={false}/>}
    />
}

function mapStateToProps(state) {
    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home,"/no-auth"))
