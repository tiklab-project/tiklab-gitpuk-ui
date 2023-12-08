import React from 'react';
import {AimOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Guide from '../../../common/guide/Guide';
import './Overview.scss';

const Overview = props =>{
    return (
        <div className='overview'>
            <div className='overview-content xcode-repository-width xcode'>
                <BreadcrumbContent firstItem={'overview'}/>
                <div className='overview-dyna'>
                    <Guide title={"动态"} icon={<AimOutlined/>} type={"dynamic"}/>
                </div>
            </div>
        </div>
    )
}

export default Overview
