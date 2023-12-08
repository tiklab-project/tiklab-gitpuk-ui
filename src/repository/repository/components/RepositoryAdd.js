import React,{useState,useEffect} from 'react';
import {Form,Input,Select} from 'antd';
import {getUser} from 'thoughtware-core-ui';
import {inject,observer} from "mobx-react";
import Btn from '../../../common/btn/Btn';
import {Loading} from '../../../common/loading/Loading';
import {Validation} from "../../../common/client/Client";
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryPower from './RepositoryPower';
import './RepositoryAdd.scss';
import groupStore from "../../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore"
const RepositoryAdd = props =>{

    const {repositoryStore,location} = props

    const {createRpy,isLoading,findRepositoryByName,createOpenRecord,getAddress,address} = repositoryStore
    const {findCanCreateRpyGroup} = groupStore

    const [groupList,setGroupList]=useState([])
    const [form] = Form.useForm()
    const [powerType,setPowerType] = useState("public")

    //输入的仓库名称
    const [rpyName,setRpyName]=useState('')
    const [group,setGroup]=useState(null)     //仓库组
    const [groupOptions,setGroupOptions]=useState([])   //仓库组的opt

    const [repositoryList,setRepositoryList]=useState()
    useEffect( async ()=>{
        // 初始化仓库
        const res= await findRepositoryByName({userId:getUser().userId})
        if (res.code===0){
            setRepositoryList(res.data)
        }
        // 仓库组
        const groups= await findCanCreateRpyGroup()
        if (groups.code===0){
            groupOption(groups.data)
            setGroupList(groups.data)
        }
        if (location.search) {
            
            initialize(groups.data,res.data)
        }

        getAddress()
    },[])



    const initialize =  (groups,repositorys) => {
        const groupName = location.search.substring(6)
        const group = groups.filter(a => a.name === groupName)
        if (group.length) {
            setGroup(group[0])
            if (repositorys){
                const repList=repositorys.filter(b=>b.groupId===group[0].groupId)
                setRepositoryList(repList)
            }
        }
    }

    /**
     * 确定添加仓库
     */
    const onOk = () => {
        form.validateFields().then((values) => {
            let address
            if (group){
                address=group.name;
            }else {
                address = getUser().name
                if (!getUser().name){
                    address= getUser().phone?getUser().phone:getUser().email
                }
            }
            createRpy({
                ...values,
                group:{groupId:group?.groupId},
                address:address+"/"+values.address,
                rules:powerType,
            }).then(res=>{

                if(res.code===0){
                    props.history.push(`/repository/${(group?group.name:address)+"/"+values.address}/tree`)
                  /* props.history.push(`/house/${groupId?groupId:userName}/${values.name}/tree`)*/
                }
                createOpenRecord(res.data)
            })
        })
    }

    //设置仓库组
    const installCodeGroup =async  (value) => {
        let res;
        if(value===getUser().userId){
             res=await findRepositoryByName({name:rpyName,userId:value})
        }else {
             res=await findRepositoryByName({name:rpyName,groupId:value,})
        }
        if (res.code===0){
            setRepositoryList(res.data)
            form.validateFields(['name'])
            form.validateFields(['address'])
        }
        if (value){
            const group1=groupList.filter(a=>value==a.groupId)[0]
            setGroup(group1)
        }

    }

    const inputRpyName = e => {
        setRpyName(e.target.value)
        form.setFieldsValue({
            address: e.target.value
        })
        form.validateFields(['address'])
    }

    //配置仓库组
    const groupOption = (groups) => {
        const group=groups.length>0 && groups.map(item=>(
            { label:item.name,
                value: item.groupId
            }
        ))
        if (group){
            setGroupOptions(group)
        }
    }
    const option=[
        {
            label: '用户',
            options: [
                {
                    label: getUser().name?getUser().name:getUser().phone,
                    value: getUser().userId
                }
            ],
        },
        {
            label: '仓库组',
            options:groupOptions
        },
    ]


    const newRepository = (
        <Form
            form={form}
            autoComplete='off'
            layout='vertical'
            initialValues={{group:group?group.groupId :getUser().userId}}
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
                <Input style={{background:'#fff'}} onChange={inputRpyName}  />
              {/*  <input className='repository-add-input'/>*/}

            </Form.Item>
            <div className='repository-add-path'>
                <Form.Item  label={<span className={'must'}>仓库路径</span>} rules={[{required:true,message:'请输入路径'}]} >
                    <Input style={{background:'#fff'}} disabled  value={address}/>
                </Form.Item>
                <Form.Item name='group' label={<span style={{opacity:0}}>仓库组</span>}>
                    <Select
                        style={{background:'#fff',width:150,height:30,margin:'0 3px'}}
                        defaultValue={group?group.groupId :getUser().userId}
                        onChange={value=>installCodeGroup(value)}
                        options={option}
                    />
                </Form.Item>
                <Form.Item
                    className='path-tips rpy-add'
                    label={<span style={{opacity:0}}>归属</span>}
                    name='address'
                    rules={[
                        {required:true,message:'请输入路径'},
                        {max:30,message:'请输入1~31位以内的名称'},
                        Validation('路径','appoint'),
                        ({ getFieldValue }) => ({
                            validator(rule,value) {
                                const address=group?group.name:getUser().name+"/"+value
                                let nameArray = []
                                if(repositoryList){
                                    nameArray = repositoryList && repositoryList.map(item=>item.address)
                                }

                                if (nameArray.includes(address)) {
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
            {/*{
                powerType==="private" &&
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
            }*/}
            <Form.Item name='remarks' label='仓库描述'>
                <Input.TextArea style={{background:'#fff'}} />
            </Form.Item>
        </Form>
    )

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.go(-1)
    }

    return(
        <div className='xcode repository-add'>
            <div className='repository-add-content'>
                <div className='repository-add-top'>
                    <BreadcrumbContent firstItem='新建仓库' goBack={goBack}/>
                </div>
                <div className='repository-add-bottom'>
                    <div className='repository-add-new'>
                        {newRepository}
                        <Btn onClick={goBack} title={'取消'} isMar={true}/>
                        <Btn onClick={onOk} type={'primary'} title={'确认'}/>
                    </div>

                </div>
            </div>
            {
                isLoading && <Loading/>
            }
        </div>
    )
}

export default inject('repositoryStore')(observer(RepositoryAdd))
