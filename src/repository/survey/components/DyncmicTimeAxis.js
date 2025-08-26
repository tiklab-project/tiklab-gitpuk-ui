import React, { Children } from "react";
import "./DyncmicTimeAxis.scss";
import DynamicListItem from "./DynamicItem";
import {observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/EmptyText";
const DyncmicTimeAxis = (props) => {
    const { logList } = props;
    console.info("logList",logList)
    return <div className="dyncmic-timeaxis">
        <div className="dyncmic-timeaxis-title">
            <div className="name">最新动态</div>
            <div className="more">
                <svg aria-hidden="true" className="svg-icon">
                    <use xlinkHref="#icon-rightjump"></use>
                </svg>
            </div>
        </div>

        {
            logList&&logList.length>0?
            <div className="dyncmic-timeaxis-content">
                {
                    logList.map((item, index) => {
                        return <div key={item.date} className="dyncmic-timeaxis-box">
                            <div className="dyncmic-timeaxis-date">
                                <div className="dyncmic-timeaxis-date-content">
                                    {item.date}
                                </div>
                            </div>
                            {
                                item.children.map((dyncmicItem, dyncmicIndex) => {
                                    return <div className={`dyncmic-timeaxis-item ${index === logList.length - 1 && dyncmicIndex === item.children.length - 1 ? "" : "dyncmic-showtimeaxis-item"}`}>


                                        <div className="dyncmic-timeaxis-item-time">{dyncmicItem.createTime.slice(10, 16)}</div>
                                        <div className="dynamic-user-icon">{dyncmicItem.user.nickname.slice(0, 1)}</div>

                                        <DynamicListItem content={dyncmicItem.data} type={dyncmicItem.actionType.name}/>

                                        {/*<svg className="img-25" aria-hidden="true">
                                        <use xlinkHref={`#icon-${getIconName(dyncmicItem.actionType.id)}`}></use>
                                    </svg>*/}
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>:
            <div className='no-data'>
                <EmptyText title={"暂无动态"}/>
            </div>
        }
    </div>
}

export default observer(DyncmicTimeAxis);
