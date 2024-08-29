import React from 'react';
import {Col, Switch} from 'antd';
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import './PushRule.scss';

const PushRule = props => {
    return (
        <div className='xcode  push-rule'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={'Push_rules'}/>
                <div className='push-rule-mode'>
                    <div className='mode-title'>推送评审模式</div>
                    <div className='mode-swith'>
                        <div>
                            开启该模式后，向任意分支推送代码时，将自动创建一个以该分支为目标的合井请求，
                            评审后合入代码，保障代码质量。了解更多
                        </div>
                        <div>
                            <Switch/>
                        </div>
                    </div>
                </div>
            </Col>

        </div>
    )
}

export default PushRule
