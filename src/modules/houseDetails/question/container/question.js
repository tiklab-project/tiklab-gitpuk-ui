import React from 'react'
import Btn from '../../../common/btn/btn'
import '../components/question.scss'

const Question =  props => {
    return (
        <div className='question'>
            <div className='question-content xcode-home-limited xcode'>
                <div className='question-add-btn'>
                    <Btn
                        type={'primary'}
                        title={'添加问题'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Question
