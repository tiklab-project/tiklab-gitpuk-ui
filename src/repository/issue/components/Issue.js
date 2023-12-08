import React from 'react';
import Btn from '../../../common/btn/Btn';
import './Issue.scss';

const Issue = props => {
    return (
        <div className='question'>
            <div className='question-content xcode-repository-width xcode'>
                <div className='question-add-btn'>
                    <Btn type={'primary'} title={'添加问题'}/>
                </div>
            </div>
        </div>
    )
}

export default Issue
