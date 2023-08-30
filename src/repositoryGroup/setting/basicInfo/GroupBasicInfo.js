import React,{useState,useEffect} from 'react';
import {Modal,Form, Input} from 'antd';
import {
    ExclamationCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from '@ant-design/icons'
import {PrivilegeProjectButton} from 'tiklab-privilege-ui';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryPower from '../../../repository/repository/components/RepositoryPower';
import './GroupBasicInfo.scss';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
const GroupBasicInfo = props =>{


    const {groupInfo,deleteGroup,updateGroup} = groupStore
    const [form] = Form.useForm()
    const [expandedTree,setExpandedTree] = useState([1])  // 树的展开与闭合
    const [powerType,setPowerType] = useState("")  //  仓库权限类型


    useEffect(()=>{
        if (groupInfo){
            setPowerType(groupInfo?.rules)
            form.setFieldsValue({
                name:groupInfo.name,
                remarks:groupInfo.remarks
            })
        }


    },[groupInfo])

    const onConfirm = () =>{
        Modal.confirm({
            title: '删除',
            icon: <ExclamationCircleOutlined />,
            content: '删除后数据无法恢复',
            onOk:()=>delGroup(),
            okText: '确认',
            cancelText: '取消',
        });
    }

    /**
     * 确定更新仓库组信息
     * @param value
     */
    const onOk = value => {
        updateGroup({...value,groupId:groupInfo.groupId,rules:powerType})
        form.validateFields(['name'])
    }

    /**
     * 删除仓库组
     */
    const delGroup = () =>{
        deleteGroup(groupInfo.groupId).then(res=>{
            res.code===0 && props.history.push('/index/group')
        })

    }

    const lis = [
        {
            key:1,
            title:'仓库组信息',
            desc: '更新仓库组信息',
            icon: <EditOutlined />,
            enCode:'house_update',
            content: <div className='bottom-rename'>
                <Form
                    form={form}
                    autoComplete='off'
                    layout='vertical'
                    initialValues={{name:groupInfo?.name,remarks:groupInfo?.remarks}}
                >
                    <Form.Item label='仓库组名称' name='name'
                               rules={[{max:30,message:'请输入1~31位以内的名称'}]}
                    ><Input/></Form.Item>
                    <RepositoryPower
                        powerType={powerType}
                        setPowerType={setPowerType}
                        set={true}
                    />
                    <Form.Item name='remarks' label='仓库组描述'>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
                <div className='bottom-rename-btn'>
                    <Btn
                        title={'取消'}
                        isMar={true}
                        onClick={()=>setOpenOrClose(1)}
                    />
                    <Btn
                        type={'primary'}
                        title={'确定'}
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)

                                })
                        }}
                    />
                </div>
            </div>
        },
        {
            key:2,
            title:'仓库组删除',
            desc: '删除仓库组',
            icon: <DeleteOutlined />,
            enCode:'house_delete',
            content: <div className='bottom-delete'>
                <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                    此操作无法恢复！请慎重操作！
                </div>
                <Btn title={'取消'} isMar={true} onClick={()=>setOpenOrClose(2)}/>
                <Btn onClick={onConfirm} type={'dangerous'} title={'删除'}/>
            </div>
        }
    ]

    // 是否存在key -- ture || false
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    // 展开和闭合
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const lisItem = item =>{
        return <div key={item.key} className='groupSetting-li'>
            <div
                className={`groupSetting-li-top ${isExpandedTree(item.key) ?'groupSetting-li-select':''}`}
                onClick={()=>setOpenOrClose(item.key)}
            >
                <div className='groupSetting-li-icon'>
                    {item.icon}
                </div>
                <div className='groupSetting-li-center'>
                    <div className='groupSetting-li-title'>{item.title}</div>
                    {
                        !isExpandedTree(item.key) &&
                        <div className='groupSetting-li-desc'>{item.desc}</div>
                    }
                </div>
                <div className='groupSetting-li-down'>
                    {
                        isExpandedTree(item.key)? <DownOutlined />:<RightOutlined />
                    }
                </div>
            </div>
            <div className={`${isExpandedTree(item.key)? 'groupSetting-li-bottom':'groupSetting-li-none'}`}>
                {
                    isExpandedTree(item.key) &&
                    item.content
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
        <div className='groupSetting xcode-home-limited xcode'>
            <div className='groupSetting-up'>
                <BreadcrumbContent firstItem={'Setting'}/>
            </div>
            <div className='groupSetting-content'>
                <div className='groupSetting-ul'>
                    {
                        lis.map(item=> lisItem(item) )
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(GroupBasicInfo)
