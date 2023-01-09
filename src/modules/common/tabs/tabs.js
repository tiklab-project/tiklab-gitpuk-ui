import React from "react";
import "./tabs.scss";

const Tabs = props =>{

    const {tabLis,type,onClick} = props

    const renderTabItem = item =>{
        return  <div
                    key={item.id}
                    className={`code-tab ${type===item.id?"code-active-tab":null}`}
                    onClick={()=>onClick(item)}
                >
                    {item.title}
                </div>
    }

    return (
        <div className="code-tabs">
            {
                tabLis.map(item=>{
                    return renderTabItem(item)
                })
            }
        </div>
    )
}

export default Tabs
