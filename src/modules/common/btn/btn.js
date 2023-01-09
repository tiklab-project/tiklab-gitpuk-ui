import React from "react";
import {Space} from "antd";
import "./btn.scss";

const Btn = props =>{

    const {icon,type,title,onClick,isMar} = props

    return  <div
                className={`code-btn ${type?`code-btn-${type}`:""} ${isMar?"code-btn-mar":""}`}
                onClick={onClick}
            >
                <Space>
                    {
                        icon &&  <span className="code-btn-icon">{icon && icon}</span>
                    }
                    {title}
                </Space>
            </div>
}

export default Btn
