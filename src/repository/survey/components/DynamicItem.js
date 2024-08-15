import React from "react";
import { withRouter } from "react-router";
import "./DynamicItem.scss"
const DynamicListItem = (props) => {
    const { content,type } = props;
    const data = JSON.parse(content)
    const { userName, message} = data;
    return (
        <div className='dynamic-content'>
            <div className='dynamic-work-action'>{userName}{type}</div>
            <div className="dynamic-work-item">
                <div className="dynamic-work-title" >{message}</div>
            </div>
        </div>
    )
}

export default withRouter(DynamicListItem);
