import React,{useState,useEffect} from 'react';
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../../common/btn/Btn';
import HooksAdd from '../components/HooksAdd';
import '../components/Hooks.scss';

const Hooks = props => {

    const [addVisible,setAddVisible] = useState(false)

    return (
        <div className='hooks'>
            <div className='hooks-content xcode-home-limited xcode'>
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
        </div>
    )
}

export default Hooks

