import React from "react";
import "./listname.scss";

const Listname = props => {

    const {text,onClick,colors} = props

    return  <span
                className={`${onClick?"code-listname-href":""}`}
                onClick={onClick}
            >
                <span className={`code-listname-icon ${colors?`code-icon-${colors}`:"code-icon-2"}`}>
                    {text && text.substring(0,1).toUpperCase()}
                </span>
                <span className={`${onClick?"code-listname-name":"code-listname-home"}`}>
                    {text}
                </span>
            </span>
            
}

export default Listname
