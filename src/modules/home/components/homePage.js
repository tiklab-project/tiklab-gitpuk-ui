import React,{useEffect} from "react";
import {Space} from "antd";
import {AimOutlined,HistoryOutlined} from "@ant-design/icons";
import Guide from "../../common/guide/guide";
import EmptyText from "../../common/emptyText/emptyText";
import "./homePage.scss";

const HomePage = props =>{

    // 最近访问的流水线
    const renderList = item => {
        return  <div className="pipelineRecent-item" key={item.openId}
                     onClick={()=> props.history.push(`/index/task/${item.pipeline && item.pipeline.id}/survey`)}
        >
            <div className="pipelineRecent-item-title">
                {
                    item && item.pipeline &&
                    <Space>
                        <span className={`mf-icon-${item.pipeline.color?item.pipeline.color:0} pipelineRecent-icon`}>
                            {item.pipeline.name && item.pipeline.name.substring(0,1).toUpperCase()}
                        </span>
                        <span className="pipelineRecent-name">
                            {item.pipeline.name && item.pipeline.name}
                        </span>
                    </Space>
                }
            </div>
            <div className="pipelineRecent-item-details">
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">成功</span>
                    <span>{item.pipelineExecState.successNumber}</span>
                </div>
                <div className="pipelineRecent-item-detail">
                    <span className="details-desc">失败</span>
                    <span>{item.pipelineExecState.errorNumber}</span>
                </div>
            </div>
        </div>
    }

    const stableList = [
        {
            id:1,
            title: "我的仓库",
            icon:"#icon-renwu",
            listLength:3
        },
        {
            id:2,
            title:"我的仓库",
            icon:"#icon-icon-test",
            listLength: 2
        },
        {
            id:3,
            title:"我收藏的",
            icon:"#icon-icon-test",
            listLength: 1
        },
    ]

    const renderStableList = item => {
        return(
            <div key={item.id} className="quickIn-group">
                <div className="quickIn-group-wrap">
                    <div className="quickIn-group-title">
                        <span className="quickIn-group-icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`${item.icon}`}/>
                            </svg>
                        </span>
                        <span>{item.title}</span>
                    </div>
                    <div className="quickIn-group-number">
                        {item.listLength}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="homePage">
            <div className="homePage-content xcode-home-limited">
                <div className="quickIn">
                    {
                        stableList && stableList.map(item=>{
                            return renderStableList(item)
                        })
                    }
                </div>
                <div className="pipelineRecent">
                    <Guide title={"最近访问的仓库"} icon={<HistoryOutlined />}/>
                </div>

                <div className="home-dyna">
                    <Guide
                        title={"近期动态"}
                        icon={<AimOutlined/>}
                        type={"dynamic"}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
