import React,{useState,useEffect} from 'react';
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../../common/btn/Btn';
import HooksAdd from './HooksAdd';
import './Hooks.scss';
import {Col} from "antd";

const Hooks = props => {

    const [addVisible,setAddVisible] = useState(false)

    return (
        <div className='xcode gittok-width hooks'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='hooks-content  '>
                    <div className='hooks-up'>
                        <BreadcrumbContent firstItem={'WebHooks'}/>
                        <Btn
                            type={'primary'}
                            title={'添加WebHooks'}
                            onClick={()=>setAddVisible(true)}
                        />
                        <HooksAdd
                            addVisible={addVisible}
                            setAddVisible={setAddVisible}
                        />
                    </div>
                    <div className='hooks-illustrate'>
                        <div>每次您 push 代码后，都会给远程 HTTP URL 发送一个 POST 请求 更多说明 »</div>

                        <div>WebHook 增加对钉钉的支持 更多说明 »</div>

                        <div>WebHook 增加对企业微信的支持 更多说明 »</div>

                        <div>WebHook 增加对飞书的支持 更多说明 »</div>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default Hooks

