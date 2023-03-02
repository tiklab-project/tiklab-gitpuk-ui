import React,{useState} from 'react';
import {Form,Input} from 'antd';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import {Validation} from '../../../common/client/Client';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryUser from '../../../repository/repository/components/RepositoryUser';
import RepositoryPower from '../../../repository/repository/components/RepositoryPower';
import './RepositoryGroupAdd.scss';

const RepositoryGroupAdd = props =>{

    const {groupStore} = props

    const {createGroup} = groupStore

    const [form] = Form.useForm()
    const [powerType,setPowerType] = useState(1)
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])

    /**
     * 仓库组添加确定
     * @param value
     */
    const onOk = value => {
        form.validateFields().then((values) => {
            createGroup(value).then(res=>{
                res.code===0 && props.history.push(`/index/group/${value.name}/survey`)
            })
        })
    }

    const goBack = () => {
        props.history.push('/index/group')
    }

    return(
        <div className='repository-group-add xcode'>
            <div className='repository-group-add-content'>
                <div className='repository-group-add-top'>
                    <BreadcrumbContent firstItem='新建仓库组' goBack={goBack}/>
                </div>
                <div className='repository-group-add-bottom'>
                    <Form
                        form={form}
                        autoComplete='off'
                        layout='vertical'
                    >
                        <Form.Item
                            label='仓库组名称'
                            name='name'
                            rules={[
                                {required:true,message:'仓库组名称不能为空'},
                                {max:30,message:'请输入1~31位以内的名称'},
                                Validation('名称','appoint'),
                            ]}
                        >
                            <Input style={{background:'#fff'}}/>
                        </Form.Item>
                        <RepositoryPower
                            powerType={powerType}
                            setPowerType={setPowerType}
                            powerTitle={'仓库组'}
                        />
                        {
                            powerType===2 &&
                            <RepositoryUser
                                yUserList={[yUserList]}
                                setYUserList={setYUserList}
                                nUserList={nUserList}
                                setNUserList={setNUserList}
                                userId={'11111'}
                                member={member}
                                setMember={setMember}
                                userTitle={'仓库组'}
                            />
                        }
                        <Form.Item name='remarks' label='仓库组描述'>
                            <Input.TextArea style={{background:'#fff'}} />
                        </Form.Item>
                    </Form>
                    <Btn onClick={goBack} title={'取消'} isMar={true}/>
                    <Btn onClick={onOk} type={'primary'} title={'确认'}/>
                </div>
            </div>
        </div>
    )
}

export default inject('groupStore')(observer(RepositoryGroupAdd))
