import React from 'react'
import {Space} from 'antd'
import {useTranslation} from 'react-i18next'
import {LeftOutlined} from '@ant-design/icons'
import './breadcrumb.scss'


// 面包屑
const BreadcrumbContent = props =>{

    const {firstItem,secondItem,goBack} = props

    const {t} = useTranslation()

    return  <div className='xcode-breadcrumb'>
                <div className='xcode-breadcrumb-content'>
                    {goBack && <LeftOutlined onClick={goBack} style={{color:'#0063FF'}}/>}
                    <span className={secondItem ? 'xcode-breadcrumb-span':''}>
                        {t(firstItem)}
                    </span>
                    {secondItem && <span className='xcode-breadcrumb-secondItem'>&nbsp;/&nbsp;{secondItem}</span>}
                </div>
            </div>
}

export default BreadcrumbContent
