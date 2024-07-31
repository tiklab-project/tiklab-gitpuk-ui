import React from 'react';
import Btn from '../../../common/btn/Btn';
import './Pipeline.scss';
import {Col} from "antd";

const Pipeline = props => {
    return (
        <div className='xcode gittok-width pipeline'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='pipeline-content'>
                    <div className='pipeline-add-btn'>
                        <Btn type={'primary'} title={'创建流水线'}/>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default Pipeline
