import React from "react";
import "./listname.scss";

const Listname = props => {

    const {text,colors} = props

    return  <span className={`xcode-listname-icon ${colors?`xcode-icon-${colors}`:"xcode-icon-2"}`}>
                {text && text.substring(0,1).toUpperCase()}
            </span>

}

export default Listname
