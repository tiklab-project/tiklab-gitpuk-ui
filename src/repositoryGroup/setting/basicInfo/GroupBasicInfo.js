import React,{useState,useEffect,Fragment} from 'react';
import {Modal, Form, Input, Col} from 'antd';
import {
    ExclamationCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from '@ant-design/icons'
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryPower from '../../../repository/repository/components/RepositoryPower';
import './GroupBasicInfo.scss';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
import GroupDeletePop from "./GroupDeletePop";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
const GroupBasicInfo = props =>{
    const {repositoryStore}=props
    const {findRepositoryList}=repositoryStore
    const {groupInfo,deleteGroup,updateGroup} = groupStore
    const [form] = Form.useForm()
    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合
    const [powerType,setPowerType] = useState("")  //  仓库权限类型

    const [repositoryList,setRepositoryList]=useState([])  //制品库下面的仓库

    const [deleteVisible,setDeleteVisible]=useState(false)  //删除弹窗状态


    useEffect(()=>{
        if (groupInfo){
            setPowerType(groupInfo?.rules)
            form.setFieldsValue({
                name:groupInfo.name,
                remarks:groupInfo.remarks
            })

            findRepositoryList({groupId:groupInfo.groupId
            }).then(res=>{
                res.code===0&&setRepositoryList(res.data)
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
        form.validateFields(['name'])
        updateGroup({...value,groupId:groupInfo.groupId,rules:powerType}).then(res=>{
            if (res.code===0){

                props.history.push(`/group/${value.name}/setting/info`)
            }
        })
    }

    /**
     * 删除仓库组
     */
    const delGroup = () =>{
        deleteGroup(groupInfo.groupId).then(res=>{
            res.code===0 && props.history.push('/group')
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
                    name='name'
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
                    <PrivilegeProjectButton code={"rpy_group_update"} domainId={groupInfo && groupInfo.groupId}>
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
                    </PrivilegeProjectButton>

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

                {
                    repositoryList.length>0?
                        <Fragment>
                            <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                                仓库组存在仓库，请先移出仓库
                            </div>
                            <Btn title={'取消'} isMar={true} onClick={()=>setOpenOrClose(2)}/>
                            <Btn type={'disabled'} title={'删除'}/>
                        </Fragment>:
                        <Fragment>
                            <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                                此操作无法恢复！请慎重操作！
                            </div>
                            <Btn title={'取消'} isMar={true} onClick={()=>setOpenOrClose(2)}/>
                            <PrivilegeProjectButton code={"rpy_group_delete"} domainId={groupInfo && groupInfo.groupId}>
                                <Btn onClick={()=>setDeleteVisible(true)} type={'dangerous'} title={'删除'}/>
                            </PrivilegeProjectButton>
                        </Fragment>
                }
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


    return(
        <div className='groupSetting gittok-width xcode'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
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
            </Col>
            <GroupDeletePop {...props}
                            deleteVisible={deleteVisible}
                            group={groupInfo}
                            setDeleteVisible={setDeleteVisible}
                            deleteGroup={deleteGroup}
            />
        </div>
    )
}

export default inject('repositoryStore')(observer(GroupBasicInfo))
