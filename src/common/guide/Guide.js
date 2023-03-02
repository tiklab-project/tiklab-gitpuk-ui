import React from 'react';
import {withRouter} from 'react-router-dom';
import {RightOutlined} from '@ant-design/icons';
import './Guide.scss';

/**
 * 动态，代办……标题
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Guide = props =>{

    const {title,type,icon} = props

    const goDetails = title =>{
        switch (title) {
            case '我的待办':
                // props.history.push('/index/agency')
                break
            case '近期动态':
                // props.history.push('/index/dyna')
                break
            case '流水线动态':
                // props.history.push(`/index/task/${pipelineId}/dyna`)
        }
    }

    return(
        <div className='xcode-guide'>
            <div className='xcode-guide-title'>
                <span className='xcode-guide-title-icon'>{icon && icon}</span>
                <span className='xcode-guide-title-name'>{title}</span>
            </div>
            {
                type &&
                <div className='xcode-guide-ac'>
                    <span onClick={()=>goDetails(title)}>
                        <RightOutlined />
                    </span>
                </div>
            }
        </div>
    )
}

export default withRouter(Guide)
