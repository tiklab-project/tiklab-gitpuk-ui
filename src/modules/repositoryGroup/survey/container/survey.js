import React from 'react';
import {AimOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import Guide from '../../../common/guide/guide';
import '../components/survey.scss';

const Survey = props =>{
    return (
        <div className='survey'>
            <div className='survey-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Survey'}/>
                <div className='survey-dyna'>
                    <Guide title={"动态"} icon={<AimOutlined/>} type={"dynamic"}/>
                </div>
            </div>
        </div>
    )
}

export default Survey
