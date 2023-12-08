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


    return(
        <div className='xcode-guide'>
            <div className='xcode-guide-title'>
                <span className='xcode-guide-title-icon'>{icon && icon}</span>
                <span className='xcode-guide-title-name'>{title}</span>
            </div>
        </div>
    )
}

export default withRouter(Guide)
