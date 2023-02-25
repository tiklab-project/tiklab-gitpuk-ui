import React,{useState,useEffect} from 'react';
import {Form,Input,Select} from 'antd';
import {getUser} from 'tiklab-core-ui';
import {inject,observer} from "mobx-react";
import Btn from '../../../common/btn/btn';
import {Loading} from '../../../common/loading/loading';
import {Validation} from '../../../common/client/client';
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb';
import RepositoryUser from './repositoryUser';
import RepositoryPower from './repositoryPower';
import './repositoryAdd.scss';

const RepositoryAdd = props =>{

    const {repositoryStore,groupStore} = props

    const {createRpy,isLoading,findUserRpy,repositoryList} = repositoryStore
    const {findUserGroup,groupList} = groupStore

    const userName = getUser().name
    const [form] = Form.useForm()
    const [addType,setAddType] = useState(1)
    const [powerType,setPowerType] = useState(1)
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])
    const [codeGroup,setCodeGroup] = useState(null)

    useEffect(()=>{
        // 初始化仓库
        findUserRpy()
        // 仓库组
        findUserGroup()
    },[])

    const onOk = () => {
        form.validateFields().then((values) => {
            createRpy({
                ...values,
                codeGroup:{groupId:codeGroup}
            }).then(res=>{
                if(res.code===0){
                    props.history.push(`/index/house/${codeGroup?codeGroup:userName}/${values.name}/tree`)
                }
            })
        })
    }

    const onValuesChange = value => {
        if(value.name){
            form.setFieldsValue({
                address:value.name
            })
        }
    }

    const newRepository = (
        <Form
            form={form}
            autoComplete='off'
            layout='vertical'
            initialValues={{group:1}}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label='仓库名称'
                name='name'
                rules={[
                    {required:true,message:'请输入名称'},
                    {max:30,message:'请输入1~31位以内的名称'},
                    Validation('名称','appoint'),
                    ({getFieldValue}) => ({
                        validator(rule,value) {
                            let nameArray = []
                            if(repositoryList){
                                nameArray = repositoryList && repositoryList.map(item=>item.name)
                            }
                            if (nameArray.includes(value)) {
                                return Promise.reject('名称已经存在')
                            }
                            return Promise.resolve()
                       }
                   }),
               ]}
            >
                <Input style={{background:'#fff'}}/>
            </Form.Item>
            <div className='repository-add-path'>
                <Form.Item label={<span style={{opacity:0}}>归属</span>}>
                    <Input style={{background:'#fff'}} disabled={true} value={'http://xcode.tiklab.net'}/>
                </Form.Item>
                <Form.Item label={<span style={{opacity:0}}>仓库组</span>}>
                    <Select
                        style={{background:'#fff',width:150,height:30,margin:'0 3px'}}
                        defaultValue={null}
                        onChange={value=>setCodeGroup(value)}
                    >
                        <Select.Option value={null}>不选择分组</Select.Option>
                        {
                            groupList && groupList.map(item=>(
                                <Select.Option value={item.groupId} key={item.groupId}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    className='path-tips'
                    label='仓库路径'
                    name='address'
                    rules={[
                        {required:true,message:'请输入路径'},
                        {max:30,message:'请输入1~31位以内的名称'},
                        Validation('路径','appoint'),
                        ({ getFieldValue }) => ({
                            validator(rule,value) {
                                let nameArray = []
                                if(repositoryList){
                                    nameArray = repositoryList && repositoryList.map(item=>item.address)
                                }
                                if (nameArray.includes(value)) {
                                    return Promise.reject('路径已经存在')
                                }
                                return Promise.resolve()
                            }
                        })
                    ]}
                >
                    <Input style={{background:'#fff'}}/>
                </Form.Item>
            </div>
            <RepositoryPower
                powerType={powerType}
                setPowerType={setPowerType}
                powerTitle={'仓库'}
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
                    userTitle={'仓库'}
                />
            }
            <Form.Item name='remark' label='仓库描述'>
                <Input.TextArea style={{background:'#fff'}} />
            </Form.Item>
        </Form>
    )

    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='xcode repository-add'>
            <div className='repository-add-content'>
                <div className='repository-add-top'>
                    <BreadcrumbContent firstItem='新建仓库' goBack={goBack}/>
                    {
                        addType===1?
                        <div className='repository-add-top-leadingIn'>
                            <span>在其他网站已经有仓库了吗？</span>
                            <span className='leadingIn'>点击导入</span>
                        </div>
                            :
                        <div className='repository-add-top-leadingIn'>
                            <span className='leadingIn' onClick={()=>setAddType(1)}>创建新存储库</span>
                        </div>
                    }
                </div>
                <div className='repository-add-bottom'>
                    {
                        addType===1 &&
                        <div className='repository-add-new'>
                            {newRepository}
                            <Btn onClick={goBack} title={'取消'} isMar={true}/>
                            <Btn onClick={onOk} type={'primary'} title={'确认'}/>
                        </div>
                    }
                </div>
            </div>
            {
                isLoading && <Loading/>
            }
        </div>
    )
}

export default inject('repositoryStore','groupStore')(observer(RepositoryAdd))