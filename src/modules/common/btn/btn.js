import React from 'react'
import {Space} from 'antd'
import './btn.scss'

const Btn = props =>{

    const {icon,type,title,onClick,isMar} = props

    return  <div
                className={`xcode-btn ${type?`xcode-btn-${type}`:''} ${isMar?'xcode-btn-mar':''}`}
                onClick={onClick}
            >
                <Space>
                    {
                        icon &&  <span className='xcode-btn-icon'>{icon && icon}</span>
                    }
                    {title}
                </Space>
            </div>
}

export default Btn
