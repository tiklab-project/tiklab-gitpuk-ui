/**
 * @name: RepositoryUpdatePop
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：仓库更新弹窗
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import { Form, Input, Select, Col} from 'antd';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Validation} from "../../../common/client/Client";
import RepositoryPower from "./RepositoryPower";
import {getUser} from "tiklab-core-ui";
import GroupStore from "../../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore";
import FileStore from "../../file/store/FileStore";
import "./RepositoryUpdatePop.scss"
const RepositoryUpdatePop = (props) => {
    const {visible,setVisible,repository,updateRpy}=props
    const [form] = Form.useForm()

    const {findCloneAddress}=FileStore
    const {findCanCreateRpyGroup}=GroupStore

    const [powerType,setPowerType] = useState("")  //  仓库权限类型
    const [repositoryName,setRepositoryName]=useState('')
    const [prepAddress,setPrepAddress]=useState('')  //前置地址

    const [groupList,setGroupList]=useState([])  //仓库组list
    const [groupData,setGroupData]=useState()   //选择仓库组信息
    const [groupOptions,setGroupOptions]=useState([])   //仓库组的opt
    const [name,setName]=useState()  //仓库地址的仓库组名或者用户名

    const [errorMsg,setErrorMsg]=useState('')

    useEffect( async ()=>{
        if (visible&&repository) {
            const groupName=repository.address.slice(0, repository.address.indexOf(repository.name)-1)
            form.setFieldsValue({
                name:repository.name,
                remarks:repository.remarks,
                address:repository.name,
                group:groupName,
            })
            setPowerType(repository.rules)
            setGroupData(repository.group)
            if (repository.group){
                setName(repository.group.name)
            }else {
                setName(repository.user?.name)
            }
            findGroup()
            address()
        }
    },[visible])

    //查询仓库组
    const findGroup =async () => {
        const group = await findCanCreateRpyGroup()
        if (group.code===0){
            setGroupList(group.data)
            groupOption(group.data)
        }
    }
    const groupOption = (groupList) => {
        const group=groupList.length>0 && groupList.map(item=>(
            { label:item.name,
                value: item.groupId
            }
        ))
        if (group){
            setGroupOptions(group)
        }
    }
    //截取项目地址
    const address =async () => {
        const res=await findCloneAddress(repository.rpyId)
        if (res.code===0){
            const httpAddress=res.data.httpAddress
            const prepAddress=httpAddress.substring(0,httpAddress.indexOf(repository.address+".git"));
            setPrepAddress(prepAddress)
        }
    }

    //取消弹窗
    const cancelPop = () => {
        form.resetFields()
        setVisible(false)
    }

    const onOk = () => {
        form.validateFields().then((value) => {
            let rules=powerType
            const repositoryPath=name+"/"+value.address;
            //仓库组为私有 仓库组下面的仓库也需改为私有仓库
            /*   if (groupData.rules==='private'&&name===groupData.name){
                   rules="private"
               }*/
            updateRpy({...value,user:repository.user,rpyId:repository.rpyId,rules:rules,
                address:repositoryPath,group:groupData,category:repository.category
            }).then(res=>{
                if (res.code===0){
                    setPowerType(rules)
                    cancelPop()
                }
                if (res.code===56111){
                    setErrorMsg(res.msg)
                    form.validateFields(['name'])
                }
                if (res.code===56112){
                    setErrorMsg(res.msg)
                    form.validateFields(['address'])
                }
            })
        })

    }

    //切换分组
    const selectGroup = (value) => {
        setErrorMsg('')
        if (value===getUser().userId){
            setName(getUser().name?getUser().name:getUser().phone)
        }else {
            const res = groupList.filter(a => a.groupId === value)
            setGroupData(res[0])
            setName(res[0].name)
        }
    }
    //仓库名字
    const inputName = (value) => {
        setErrorMsg('')
        setRepositoryName(value.target.value)
        form.setFieldsValue({
            address: value.target.value
        })
    }

    const inputAddress = () => {
        setErrorMsg('')
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

    const modalFooter = (
        <>
            <Btn onClick={cancelPop} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return(
        <Modals
            visible={visible}
            onCancel={cancelPop}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={800}
            title={"更新仓库"}
        >
            <Form
                form={form}
                autoComplete='off'
                layout='vertical'
                name='name'
            >
                <Form.Item label='仓库名称' name='name' rules={[
                    {required:true,message:'请输入名称'},
                    Validation('名称','appoint'),
                    {max:64,message:'请输入1~31位以内的名称'},
                    ({getFieldValue}) => ({
                        validator(rule,value) {
                            if (errorMsg) {
                                return Promise.reject(errorMsg)
                            }
                            return Promise.resolve()
                        }
                    }),
                ]}>
                    <Input  onChange={inputName}/>
                </Form.Item>
                <div className='repository-update-path'>
                    <Form.Item  label={<span className={'must'}>仓库路径</span>} rules={[{required:true,message:'请输入路径'}]} >
                        <Input style={{background:'#fff'}} disabled  value={prepAddress}/>
                    </Form.Item>
                    <Form.Item name='group' label={<span style={{opacity:0}}>仓库组</span>}>
                        <Select
                            style={{background:'#fff',width:150,height:30,margin:'0 3px'}}
                            onChange={value=>selectGroup(value)}
                            options={option}
                        />
                    </Form.Item>
                    <Form.Item
                        className='path-tips rpy-add'
                        label={<span style={{opacity:0}}>归属</span>}
                        name='address'
                        rules={[
                            {required:true,message:'仓库地址不能为空'},
                            Validation('名称','appoint'),
                            {max:64,message:'请输入1~64位以内的名称'},
                            ({getFieldValue}) => ({
                                validator(rule,value) {
                                    if (errorMsg) {
                                        return Promise.reject(errorMsg)
                                    }
                                    return Promise.resolve()
                                }
                            }),
                        ]}
                    >
                        <Input style={{background:'#fff'}}  placeholder={"请输入代码库地址"} onChange={inputAddress}/>
                    </Form.Item>
                </div>
                <RepositoryPower
                    powerType={powerType}
                    setPowerType={setPowerType}
                    set={true}
                />
                <Form.Item name='remarks' label='仓库描述'>
                    <Input.TextArea rows={2}/>
                </Form.Item>
            </Form>
        </Modals>
    )
}
export default RepositoryUpdatePop
