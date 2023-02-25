import React,{useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import Btn from '../../../common/btn/btn';
import AccessKeysAdd from '../components/accessKeysAdd';
import EmptyText from '../../../common/emptyText/emptyText';
import '../components/accessKeys.scss';


const AccessKeys = props => {

    const [addVisible,setAddVisible] = useState(false)

    return (
        <div className='keys'>
            <div className='keys-content xcode-home-limited xcode'>
                <div className='keys-up'>
                    <BreadcrumbContent firstItem={'Access_keys'}/>
                    <Btn
                        type={'primary'}
                        title={'新建密钥'}
                        icon={<PlusOutlined/>}
                        onClick={()=>setAddVisible(true)}
                    />
                    <AccessKeysAdd
                        addVisible={addVisible}
                        setAddVisible={setAddVisible}
                    />
                </div>
                <div className='keys-illustrate'>
                    <div>
                        部署公钥允许以只读的方式访问仓库，主要用于仓库在生产服务器的部署上，
                        免去HTTP方式每次操作都要输入密码和普通SSH方式担心不小心修改仓库代码的麻烦。
                    </div>
                    <div>
                        部署公钥配置后的机器，只支持clone与pull等只读操作。
                        如果您想要对仓库进行写操作，请添加个人公钥
                    </div>
                </div>
                <div className='keys-status'>
                    已启用秘钥
                    <EmptyText title={'暂无秘钥'}/>
                </div>
            </div>
        </div>
    )
}

export default AccessKeys
