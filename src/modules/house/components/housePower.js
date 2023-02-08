import React from 'react'
import {LockOutlined,UnlockOutlined} from '@ant-design/icons'
import './housePower.scss'

const HousePower = props =>{

    const {set,powerType,setPowerType,powerTitle} = props

    const powerLis = [
        {
            id:1,
            title:'全局',
            icon:<UnlockOutlined />,
            desc:'公共项目，全部成员可见。不支持TFVC等某些功能。'
        },
        {
            id:2,
            title:'私有',
            icon:<LockOutlined />,
            desc: '只有您授予访问权限的人才能查看此项目。'
        }
    ]

    return (
        <div className='house-power'>
            <div className='house-power-title'>{powerTitle}权限</div>
            <div className='house-power-content'>
                {
                    powerLis.map(item=>{
                        return <div
                            key={item.id}
                            className={`house-power-item ${set?'house-power-set':'house-power-noSet'} ${powerType===item.id?'house-power-select':''}`}
                            onClick={()=>setPowerType(item.id)}
                        >
                            <div className='power-item'>
                                <div>
                                    <div className='power-title power-icon'>{item.icon}</div>
                                    <div className='power-title power-name'>{item.title}</div>
                                </div>
                                {
                                    powerType===item.id && <div className='power-select-show'/>
                                }
                            </div>
                            <div className='power-desc'> {item.desc} </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default HousePower
