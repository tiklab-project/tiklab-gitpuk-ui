import React from 'react';
import Btn from '../../../common/btn/Btn';
import './Issue.scss';
import {Col} from "antd";

const Issue = props => {
    return (
        <div className='xcode page-width question'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='question-add-btn'>
                    <Btn type={'primary'} title={'添加问题'}/>
                </div>
            </Col>
        </div>
    )
}

export default Issue
