import React from "react";
import {Space} from "antd"
import {LeftOutlined} from "@ant-design/icons";
import "./breadcrumb.scss";


// 面包屑
const BreadcrumbContent = props =>{

    const {firstItem,secondItem,goBack} = props

    return  <div className="code-breadcrumb">
                <Space>
                    {goBack && <LeftOutlined onClick={goBack} style={{color:"#0063FF"}}/>}
                    <span className={secondItem ? "code-breadcrumb-span":""}>
                        {firstItem}
                    </span>
                    {secondItem && <span> / &nbsp; {secondItem}</span>}
                </Space>
            </div>
}

export default BreadcrumbContent
