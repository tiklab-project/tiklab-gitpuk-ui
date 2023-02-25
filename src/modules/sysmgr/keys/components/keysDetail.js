import React from 'react';
import {Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';

const KeysDetail = props =>{

    const {formValue,setDetailsVisible} = props

    return (
        <div className='sys-keys-detail'>
            <div className='sys-keys-detail-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'密钥详情'} goBack={()=>setDetailsVisible(false)}/>
                <div className='keys-detail-title'>
                    标题：{formValue && formValue.title}
                </div>
                <div className='keys-detail-time'>
                    创建于： {formValue && formValue.createTime} ,
                    最后使用时间为：{formValue && formValue.userTime?formValue.userTime:'暂无使用'}
                </div>
                <Input.TextArea
                    autoSize={{ minRows: 5}}
                    value={formValue && formValue.value}
                />
            </div>
        </div>
    )
}

export default KeysDetail
