import React from 'react';
import Btn from '../../../common/btn/Btn';
import './Pipeline.scss';

const Pipeline = props => {
    return (
        <div className='pipeline'>
            <div className='pipeline-content xcode-home-limited xcode'>
                <div className='pipeline-add-btn'>
                    <Btn type={'primary'} title={'创建流水线'}/>
                </div>
            </div>
        </div>
    )
}

export default Pipeline
