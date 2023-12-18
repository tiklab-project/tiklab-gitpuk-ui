import React from 'react';
import {useTranslation} from 'react-i18next';
import {LeftOutlined} from '@ant-design/icons';
import './Breadcrumb.scss';

/**
 * 面包屑
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const BreadcrumbContent = props =>{

    const {firstItem,secondItem,goBack,children} = props

    const {t} = useTranslation()
    return  <div className='xcode-breadcrumb'>
                <div className='xcode-breadcrumb-content'>
                    { goBack && <LeftOutlined onClick={goBack} style={{color:'#0063FF',paddingRight:8}}/>}
                    <span className={secondItem ? 'xcode-breadcrumb-span':''}>
                        {t(firstItem)}
                    </span>
                    {secondItem && <span className='xcode-breadcrumb-secondItem'>/&nbsp;&nbsp;{secondItem}</span>}
                </div>
                <div>{children}</div>
            </div>
}

export default BreadcrumbContent
