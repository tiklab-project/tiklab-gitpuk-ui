/**
 * @name: BasicInfo
 * @author: limingliang
 * @date: 2023-05-22 14:30
 * @description：仓库信息
 * @update: 2023-05-22 14:30
 */
import React,{useState,useEffect} from 'react';
import {Modal, Form, Input, Select} from 'antd';
import {
    ExclamationCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from '@ant-design/icons';
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import {Loading} from '../../../common/loading/Loading';
import RepositoryPower from '../../repository/components/RepositoryPower';
import './RepositoryBasicInfo.scss';
import FileStore from "../../file/store/FileStore";
import GroupStore from "../../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore";
import {getUser} from "tiklab-core-ui";
import {Validation} from "../../../common/client/Client";

const RepositoryBasicInfo = props =>{

    const {repositoryStore,match} = props

    const {repositoryInfo,deleteRpy,isLoading,updateRpy} = repositoryStore
    const {findCloneAddress}=FileStore
    const {findCanCreateRpyGroup}=GroupStore

    const [form] = Form.useForm()
    const [expandedTree,setExpandedTree] = useState([1])  // 树的展开与闭合
    const [powerType,setPowerType] = useState("")  //  仓库权限类型
    const [repositoryName,setRepositoryName]=useState('')
    const [prepAddress,setPrepAddress]=useState('')  //前置地址

    const [groupList,setGroupList]=useState([])  //仓库组list
    const [groupData,setGroupData]=useState()   //选择仓库组信息
    const [groupOptions,setGroupOptions]=useState([])   //仓库组的opt
    const [name,setName]=useState()  //仓库地址的仓库组名或者用户名

    const [errorMsg,setErrorMsg]=useState('')


    const webUrl = `${match.params.namespace}/${match.params.name}`

    useEffect(()=>{
        setPowerType(repositoryInfo.rules)
        setGroupData(repositoryInfo.group)
        setName(match.params.namespace)
        address()
        findGroup()
    },[repositoryInfo])



    //截取项目地址
    const address =async () => {
         const res=await findCloneAddress(repositoryInfo.rpyId)
        if (res.code===0){
            const httpAddress=res.data.httpAddress
            const prepAddress=httpAddress.substring(0,httpAddress.indexOf(match.params.name));
            setPrepAddress(prepAddress)
        }
    }

    const onConfirm = () =>{
        Modal.confirm({
            title: '删除',
            icon: <ExclamationCircleOutlined />,
            content: '删除后数据无法恢复',
            onOk:()=>delRepository(),
            okText: '确认',
            cancelText: '取消',
        });
    }

    //提交更新
    const onOk =async value => {
       const repositoryPath=name+"/"+value.address;
        const res=await updateRpy({...value,user:repositoryInfo.user,rpyId:repositoryInfo.rpyId,rules:powerType,
            address:repositoryPath,group:groupData
        })
        if (res.code===9000){
            setErrorMsg(res.msg)
            form.validateFields(['name'])
        }
        if (res.code===9001){
            setErrorMsg(res.msg)
            form.validateFields(['address'])
        }
        props.history.push(`/index/repository/${repositoryPath}/sys/info`)

    }

    /**
     * 删除仓库
     */
    const delRepository = () =>{
        deleteRpy(repositoryInfo.rpyId).then(res=>{
            res.code===0 && props.history.push('/index/repository')
        })
    }

    const inputName = (value) => {
        setErrorMsg('')
      setRepositoryName(value)
    }

    const inputAddress = () => {
        setErrorMsg('')
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



    const lis = [
        {
            key:1,
            title:'仓库信息',
            desc: '更新仓库信息',
            icon: <EditOutlined />,
            enCode:'house_update',
            content: <div className='bottom-rename'>
                        <Form
                            form={form}
                            autoComplete='off'
                            layout='vertical'
                            name='name'
                            initialValues={{name:repositoryInfo.name,remarks:repositoryInfo.remarks,address:match.params.name,
                                group:match.params.namespace
                        }}
                        >
                            <Form.Item label='仓库名称' name='name' rules={[
                                {required:true,message:'请输入名称'},
                                Validation('名称','appoint'),
                                {max:30,message:'请输入1~31位以内的名称'},
                                ({getFieldValue}) => ({
                                validator(rule,value) {
                                    if (errorMsg) {
                                        return Promise.reject(errorMsg)
                                    }
                                return Promise.resolve()
                                 }
                                }),
                            ]}>
                                <Input key={repositoryName} onChange={inputName}/>
                            </Form.Item>


                            <Form.Item  label='仓库地址' name='address' rules={[
                                {required:true,message:'请输入地址'},
                                Validation('路径','appoint'),
                                ({getFieldValue}) => ({
                                    validator(rule,value) {
                                        if (errorMsg) {
                                            return Promise.reject(errorMsg)
                                        }
                                        return Promise.resolve()
                                    }
                                }),
                            ]}>
                                    <Input addonBefore={`${prepAddress}`}    onChange={inputAddress}/>
                            </Form.Item>
                            <Form.Item  label='仓库组' name='group'>
                                <Select
                                    defaultValue={match.params.namespace}
                                    value={match.params.namespace}
                                    onChange={value=>selectGroup(value)}
                                    options={option}
                                />
                            </Form.Item>
                            <RepositoryPower
                                powerType={powerType}
                                setPowerType={setPowerType}
                                set={true}
                            />
                            <Form.Item name='remarks' label='仓库描述'>
                                <Input.TextArea/>
                            </Form.Item>
                        </Form>
                        <div className='bottom-rename-btn'>
                            <Btn
                                title={'取消'}
                                isMar={true}
                                onClick={()=>setOpenOrClose(1)}
                            />
                            <PrivilegeProjectButton code={"xcode_update"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                                <Btn
                                    type={'primary'}
                                    title={'确定'}
                                    onClick={() => {
                                        form.validateFields()
                                            .then((values) => {
                                                onOk(values)

                                            })
                                    }}
                                />
                            </PrivilegeProjectButton>

                        </div>
                     </div>
        },

        {
            key:3,
            title:'仓库删除',
            desc: '删除仓库',
            icon: <DeleteOutlined />,
            enCode:'house_delete',
            content: <div className='bottom-delete'>
                        <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                            此操作无法恢复！请慎重操作！
                        </div>
                        <Btn title={'取消'} isMar={true} onClick={()=>setOpenOrClose(2)}/>
                        <PrivilegeProjectButton code={"xcode_delete"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                             <Btn onClick={onConfirm} type={'dangerous'} title={'删除'}/>
                        </PrivilegeProjectButton>
                    </div>
        }
    ]

    /**
     * 是否存在key
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const lisItem = (item,index) =>{
        return <div key={item.key} className={`${index>0?' border-top':''}`}>
                <div className={`houseReDel-li-top ${isExpandedTree(item.key) ?'houseReDel-li-select':''}`}
                     onClick={()=>setOpenOrClose(item.key)}>
                    <div className='houseReDel-li-icon'>{item.icon}</div>
                    <div className='houseReDel-li-center'>
                        <div className='houseReDel-li-title'>{item.title}</div>
                        {
                            !isExpandedTree(item.key) &&
                            <div className='houseReDel-li-desc'>{item.desc}</div>
                        }
                    </div>
                    <div className='houseReDel-li-down'>
                        {isExpandedTree(item.key)? <DownOutlined />:<RightOutlined />}
                    </div>
                </div>
            <div className={`${isExpandedTree(item.key)? 'houseReDel-li-bottom':'houseReDel-li-none'}`}>
                {
                    isExpandedTree(item.key) && item.content
                }
            </div>
        </div>
    }

    const renderLisItem = item => {
        return  <PrivilegeProjectButton code={item.enCode} key={item.key} domainId={houseId}>
                    {lisItem(item)}
                </PrivilegeProjectButton>
    }

    return(
        <div className='houseReDel xcode-home-limited xcode'>
            <div className='houseReDel-up'>
                <BreadcrumbContent firstItem={'仓库信息'}/>
            </div>
            <div className='houseReDel-li'>
                {
                    lis.map((item,index)=> lisItem(item,index) )
                }
            </div>
            {
                isLoading && <Loading/>
            }
        </div>
    )
}

export default inject('repositoryStore')(observer(RepositoryBasicInfo))
