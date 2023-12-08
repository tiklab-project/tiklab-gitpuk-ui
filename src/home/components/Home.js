import React from "react";
import {UserVerify} from "thoughtware-eam-ui";
import {connect} from "thoughtware-plugin-core-ui";
import Portal from "./Portal";
import {AppLink} from "thoughtware-licence-ui";
/**
 * 首页入口
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Home = props => {
    return <Portal{...props} AppLink={<AppLink/>}
    />
}

function mapStateToProps(state) {

    return {
        pluginStore: state.pluginStore
    }
}

export default connect(mapStateToProps)(UserVerify(Home,"/no-auth"))
