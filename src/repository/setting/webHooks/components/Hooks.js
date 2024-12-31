import React,{useState,useEffect} from 'react';
import BreadcrumbContent from '../../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../../common/btn/Btn';
import HooksAdd from './HooksCompile';
import './Hooks.scss';
import {Col, Dropdown, Menu, Modal, Space, Switch, Table, Tooltip} from "antd";
import {inject, observer} from "mobx-react";
import WebHookStore from "../store/WebHookStore";
import {SpinLoading} from "../../../../common/loading/Loading";
import EmptyText from "../../../../common/emptyText/EmptyText";
import {EllipsisOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import Page from "../../../../common/page/Page";
const { confirm } = Modal;

const Hooks = props => {
    const {repositoryStore,match} = props

    const {findRepWebHookPag,deleteRepWebHook,updateRepWebHook,createRepWebHook,fresh} = WebHookStore
    const {repositoryInfo} = repositoryStore
    const [addVisible,setAddVisible] = useState(false)
    const [hookData,setHookData]=useState()

    const [webHookList,setWebHookList]=useState([])
    const [pageSize]=useState(15)
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()

    const [title,setTitle]=useState(null)


    useEffect(()=>{
        getRepWebHookPag(currentPage)
    },[fresh])

    const columns = [
        {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
            ellipsis:true,
            width:'20%',

        },
        {
            title: 'URL',
            dataIndex: 'url',
            key:'url',
            width:'40%',
            ellipsis:true,
        },
        {
            title: '启用',
            dataIndex: 'enable',
            key:'enable',
            width:'10%',
            render:(text,record)=>  {
                return(
                    text===1?
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={()=>openEnable(record,0)} />:
                        <Switch  unCheckedChildren="关闭" onChange={()=>openEnable(record,1)}/>
                )
            }
        },
        {
            title: '最后执行时间',
            dataIndex: 'updateTime',
            key:'updateTime',
            width:'20%',
            ellipsis:true,
        },
        {
            title: '操作',
            key: 'activity',
            width: '10%',
            ellipsis:true,
            render:(text,record)=> {
                return(
                    <Dropdown    overlay={()=>execPullDown(record)}
                                 placement="bottomRight"
                                 trigger={['click']}
                    >
                        <div style={{cursor:"pointer"}}>
                            <EllipsisOutlined style={{fontSize:20}}/>
                        </div>
                    </Dropdown>
                )
            }
        },
    ]

    //分页查询RepWebHookPag
    const getRepWebHookPag = (currentPage) => {
        findRepWebHookPag({
            pageParam:{currentPage:currentPage,
                        pageSize:pageSize},
            repositoryId:repositoryInfo?.rpyId
        }).then(res=>{
            if (res.code===0){
                setWebHookList(res.data?.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }


    const execPullDown=(value) => (
        <Menu>
            <Menu.Item  style={{width:100}} onClick={()=>updateHook(value)}>
                编辑
            </Menu.Item>
            <Menu.Item onClick={()=>DeletePop(value.id)}>
                删除
            </Menu.Item>
        </Menu>
    )

    //是否启用
    const openEnable = (data,state) => {
        updateRepWebHook({
            ...data,
            enable:state,
        })
    }

    //编辑
    const updateHook = (value) => {
        setAddVisible(true)
        setHookData(value)
        setTitle("更新WebHooks")
    }
    //添加
    const addHook=()=>{
        setHookData(null)
        setAddVisible(true)
        setTitle("添加WebHooks")
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        getRepWebHookPag(value)
    }
    //刷新查询
    const refreshFind = () => {
        getRepWebHookPag(currentPage)
    }

    //删除弹窗
    const  DeletePop = (value) =>{
        confirm({
            title: "确认删除",
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteRepWebHook(value)
            },
            onCancel() {
            },
        });
    }


    return (
        <div className='xcode  hooks'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='hooks-content  '>
                    <div className='hooks-up'>
                        <BreadcrumbContent firstItem={'WebHooks'}/>
                        <Btn
                            type={'primary'}
                            title={'添加WebHooks'}
                            onClick={addHook}
                        />
                    </div>
                    <div className='hooks-illustrate'>
                        <div>每次您 push 代码后，都会给远程 HTTP URL 发送一个 POST 请求 更多说明</div>
                        <div>
                            更多
                        </div>
                    </div>
                </div>

                <Table
                    bordered={false}
                    columns={columns}
                    dataSource={webHookList}
                    rowKey={record=>record.id}
                    pagination={false}
                    locale={{emptyText: webHookList.length ?
                            <SpinLoading type="table"/>: <EmptyText title={"没有WebHook"}/>}}
                />
                <Page pageCurrent={currentPage}
                      changPage={changPage}
                      totalPage={totalPage}
                      totalRecord={totalRecord}
                      refresh={refreshFind}
                />

                <HooksAdd
                    addVisible={addVisible}
                    setAddVisible={setAddVisible}
                    createRepWebHook={createRepWebHook}
                    updateRepWebHook={updateRepWebHook}
                    repositoryId={repositoryInfo?.rpyId}
                    hookData={hookData}
                    title={title}
                />
            </Col>
        </div>
    )
}

export default inject('repositoryStore')(observer(Hooks))
