/**
 * @name: LfsList
 * @author: limingliang
 * @date: 2024-9-5 10:30
 * @description：lfs文件
 * @update: 2024-9-5 10:30
 */
import React,{useState,useEffect} from 'react';
import {Col, Dropdown, Menu, Modal, Switch, Table} from 'antd';
const { confirm } = Modal;
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import "./LfsList.scss"
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import {SpinLoading} from "../../../../common/loading/Loading";
import EmptyText from "../../../../common/emptyText/EmptyText";
import {PrivilegeButton} from 'tiklab-privilege-ui';
import DeleteExecLibrary from "../../../../common/delete/DeleteExec";
import lfsListStore from "../store/LfsListStore";
import {
    DownloadOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
const LfsList = (props) => {
    const {repositoryStore,match:{params}}=props
    const {repositoryInfo} = repositoryStore

    const {findRepositoryLfsList,lfsRefresh,refresh,deleteRepositoryLfs}=lfsListStore

    const [flsList,setFlsList]=useState([])
    const [tableType,setTableType]=useState("list")

    const columns = [
        {
            title: '文件OID',
            dataIndex: 'oid',
            key: 'oid',
            ellipsis:true,
            width:'40%',
        },
        {
            title: '文件类型',
            dataIndex: 'fileType',
            key:'fileType',
            width:'10%',
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            key:'fileSize',
            width:'10%',
        },
        {
            title: '操作时间',
            dataIndex: 'updateTime',
            key:'updateTime',
            width:'20%',
        },
        {
            title: '操作',
            key: 'activity',
            width: '5%',
            ellipsis:true,
            render: (text, record) => {
                return (
                    <div className='lfs-table-exec'>
                        <div onClick={()=>downLoad(record)}>
                            <DownloadOutlined />
                        </div>
                        <PrivilegeButton>
                            <Dropdown   overlay={()=>pullDown(record)}
                                        placement="bottomRight"
                                        trigger={['click']}
                            >
                                <EllipsisOutlined style={{fontSize:18}} />
                            </Dropdown>
                        </PrivilegeButton >
                    </div>

                )
            }
        },
    ]

    useEffect(async () => {
        if (props.location.hash==='#delete'){
            setTableType('delete')
            findFlsList(0)
        }else {
            findFlsList()
        }
    }, [refresh]);

    //查询fls文件
    const findFlsList = (isDelete) => {
        findRepositoryLfsList({repositoryId:repositoryInfo.rpyId, isDelete:isDelete}).then(res=>{
            if(res.code===0){
                setFlsList(res.data)
            }
        })
    }

    //切换类型
    const cuteTabType = (value) => {
      setTableType(value)
        if (value==='list'){
            findFlsList(1)
        }else {
            findFlsList(0)
        }
    }



    //下载
    const downLoad = (data) => {
        window.location.href=`${node_env? base_url:window.location.origin}/repositoryFile/downloadLfsFile?rpyId=${data.repositoryId}&filePath=${data.oid}&oid=${data.oid}&branch=branch`
    }

    /**
     * 操作下拉
     */
    const pullDown=(value) => (
        <Menu>
            <Menu.Item  onClick={()=>DeletePop(value)} >
                删除
            </Menu.Item>
        </Menu>
    );

    //删除弹窗
    const  DeletePop = (value) =>{
        confirm({
            title: "确认删除lfs文件",
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',

            onOk() {
                deleteRepositoryLfs(value.id)
            },
            onCancel() {
            },
        });
    }

    return(
        <div className='xcode  lfs-list'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={'大文件存储'}/>
                <div className='lfs-list-desc'>
                    {"针对容量较大的仓库，Git LFS 支持将大型文件（如图片、音视频或其他二进制文件）转储至 LFS 服务，释放仓库容量，同时提升 Git 仓库读写速度。"}
                </div>
                <div className='lfs-list-tab'>
                    <div className={`${tableType==='list'&& ' choose-lfs-tab '}  lfs-list-tab-nav`} onClick={()=>cuteTabType("list")}>文件列表</div>
                    <div className={`${tableType==='delete'&& ' choose-lfs-tab '}  lfs-list-tab-nav`} onClick={()=>cuteTabType("delete")}>删除文件</div>
                </div>
                <div className='lfs-list-table'>
                   <Table
                       bordered={false}
                       columns={columns}
                       dataSource={flsList}
                       rowKey={record=>record.id}
                       pagination={false}
                       locale={{emptyText: lfsRefresh ?
                               <SpinLoading type="table"/>: <EmptyText title={"暂无LFS文件"}/>}}
                   />
               </div>
            </Col>
        </div>
    )
}
export default withRouter(inject('repositoryStore')(observer(LfsList)))
