import React,{useState,useEffect} from 'react';
import {Form,Input} from 'antd';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import {Validation} from '../../../common/client/Client';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryPower from '../../../repository/repository/components/RepositoryPower';
import './RepositoryGroupAdd.scss';
import groupStore from '../store/RepositoryGroupStore'
import {Loading} from "../../../common/loading/Loading";
const RepositoryGroupAdd = props =>{

    const {isLoading,createGroup,findAllGroup,groupList} = groupStore

    const [form] = Form.useForm()
    const [powerType,setPowerType] = useState("public")

    useEffect(()=>{
        // 仓库组
        findAllGroup()
    },[])

    /**
     * 仓库组添加确定
     * @param value
     */
    const onOk =()  => {
        form.validateFields().then((values) => {
            createGroup({...values,rules:powerType}).then(res=>{
                if (res.code===0){
                    props.history.push(`/group/${values.name}/repository`)
                }
            })
        })
    }

    const goBack = () => {
        props.history.push('/group')
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
                                ({getFieldValue}) => ({
                                    validator(rule,value) {
                                        let nameArray = []
                                        if(groupList&&groupList.length>0){
                                            nameArray = groupList && groupList.map(item=>item.name)
                                        }
                                        if (nameArray.includes(value)) {
                                            return Promise.reject('名称已经存在')
                                        }
                                        return Promise.resolve()
                                    }
                                }),
                            ]}
                        >
                            <Input style={{background:'#fff',width:500}} placeholder={"输入仓库组名称"}/>
                        </Form.Item>
                        <RepositoryPower
                            powerType={powerType}
                            setPowerType={setPowerType}
                            powerTitle={'仓库组'}
                        />
                        <Form.Item name='remarks' label='仓库组描述'>
                            <Input.TextArea style={{background:'#fff'}} />
                        </Form.Item>
                    </Form>
                    <Btn onClick={goBack} title={'取消'} isMar={true}/>
                    <Btn onClick={onOk} type={'primary'} title={'确认'}/>
                </div>
            </div>
                {
                isLoading && <Loading/>
            }
        </div>
    )
}

export default observer(RepositoryGroupAdd)
