import React from 'react';
import {AimOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Guide from '../../../common/guide/Guide';
import './Overview.scss';
import {Col} from "antd";

const Overview = props =>{
    return (
        <div className='xcode page-width overview'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='overview-content  '>
                    <BreadcrumbContent firstItem={'overview'}/>
                    <div className='overview-dyna'>
                        <Guide title={"动态"} icon={<AimOutlined/>} type={"dynamic"}/>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default Overview
