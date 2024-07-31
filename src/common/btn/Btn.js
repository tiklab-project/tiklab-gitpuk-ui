import React from 'react';
import {Space, Tooltip} from 'antd';
import './Btn.scss';
import {LoadingOutlined} from "@ant-design/icons";

/**
 * 操作按钮
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Btn = props =>{

    const {icon,type,title,onClick,isMar,isTooltip,tooltipTitle} = props

    return  <div
                className={`xcode-btn ${type?`xcode-btn-${type}`:''} ${isMar?'xcode-btn-mar':''}`}
                onClick={onClick}
            >
                {
                    isTooltip?
                        <Tooltip placement="top" title={tooltipTitle} >
                            <Space>
                                {
                                    icon &&  <span className='xcode-btn-icon'>{icon}</span>
                                }
                                <span className='xcode-btn-text-size'>{title!=='加载中'?title:<LoadingOutlined />}</span>
                            </Space>
                        </Tooltip>:
                        <Space>
                            {
                                icon &&  <span className='xcode-btn-icon'>{icon}</span>
                            }
                            <span className='xcode-btn-text-size'>{title!=='加载中'?title:<LoadingOutlined />}</span>
                        </Space>
                }
            </div>
}

export default Btn
