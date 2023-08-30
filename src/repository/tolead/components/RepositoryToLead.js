/**
 * @name: RepositoryTable
 * @author:
 * @date: 2023-08-03 14:30
 * @description：导入仓库
 * @update: 2023-08-03 14:30
 */
import React,{useState,useEffect} from 'react';
import {observer} from "mobx-react";
import './RepositoryToLead.scss';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import gitlab from "../../../assets/images/img/gitlab.png";
import gitee from "../../../assets/images/img/gitee.png";
import github from "../../../assets/images/img/github.png";
import notice from "../../../assets/images/img/notice.png"
import link from "../../../assets/images/img/link.png"
import ToLeadStore from "../store/ToLeadStore"
import Btn from "../../../common/btn/Btn";
import {getUser} from "tiklab-core-ui";
import {Table, Tag} from "antd";
import {SpinLoading} from "../../../common/loading/Loading";
import EmptyText from "../../../common/emptyText/EmptyText";
const RepositoryToLead = (props) => {
    const {findImportAuthList,deleteImportAuth,findAllLeadRecord,leadRecordList}=ToLeadStore

    const [authInfo,setAuthInfo]=useState([])
    const [type,setType]=useState('')

    useEffect( async ()=>{
        findAllLeadRecord()
    },[])

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.push(`/index/repository`)
    }

    const goInfo = async (type) => {
        setType(type)
        const res=await findImportAuthList({type:type,userId:getUser().userId})
        if (res.code===0){

            setAuthInfo(res.data)
            if (res.data.length===0){
                props.history.push(`/index/repository/lead/info/${type}`)
            }
        }
    }

    const onOk = () => {

    }
    //跳转第三方仓库列表
    const goThirdList = () => {
        props.history.push(`/index/repository/lead/thirdList/${authInfo[0].id}`)
    }
    //解除绑定
    const deleteBound = () => {
        deleteImportAuth(authInfo[0].id)
        setAuthInfo([])
    }

    const goDetails = (text,record) => {
        props.history.push(`/index/repository/${record.repository.address}/tree`)
    }

    const columns = [
        {
            title: '仓库名称',
            dataIndex: "name",
            key: 'name',
            width: '40%',
            ellipsis: true,
            render:(text,record)=>{
                return (
                    <div>{ record?.repository.address.substring(0, record?.repository?.address.indexOf("/",1))+"/"+record.repository.name}</div>
                )
            }
        },
        {
            title: '导入方式',
            dataIndex: 'leadWay',
            key: 'leadWay',
            width: '20%',
            ellipsis: true,
        },
        {
            title: '导入时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: '20%',
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'leadState',
            key: 'leadState',
            width: '10%',
            ellipsis: true,
            render:(text,record)=>(
                <div>
                    {    text==='success'&&<Tag color={'green'} key={text}>成功</Tag>||
                        text==='error'&&<Tag color={'red'} key={text}>失败</Tag>
                    }
                </div>
                )
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            ellipsis: true,
            render:(text,record)=>(
                <div className='lead-table-text' onClick={()=>goDetails(text,record)}>查看仓库</div>
            )
        },
        ]
    return(
        <div className="xcode lead">
            <div className='lead-content'>
                <BreadcrumbContent firstItem='导入外部仓库' goBack={goBack}/>
                <div className='lead-content-title'>仓库导入方式</div>
                <div className="lead-top">
                    <div className={`lead-top-border lead-top-left ${type==='url'&&'lead-border-blue'} lead-border-back `} onClick={()=>goInfo("url")}>
                        <div className='lead-top-border-center' >
                            <img  src={link}  style={{width:45,height:45}}/>
                        </div>
                        <div  className='lead-top-border-center lead-top-border-top'>URL导入</div>
                    </div>
                    <div className={`lead-top-border lead-top-left ${type==='priGitlab'&&'lead-border-blue'} lead-border-back`} onClick={()=>goInfo("priGitlab")}>
                        <div className='lead-top-border-center'>
                            <img   src={gitlab}  style={{width:50,height:50}}/>
                        </div>
                        <div className='lead-top-border-center'>私服 GitLab</div>
                    </div>
                    <div className={`lead-top-border lead-top-left ${type==='gitlab'&&'lead-border-blue'} lead-border-back`} onClick={()=>goInfo("gitlab")}>
                        <div className='lead-top-border-center'>
                            <img  src={gitlab}  style={{width:50,height:50}}/>
                        </div>
                        <div  className='lead-top-border-center'>GitLab</div>
                    </div>
                    <div className={`lead-top-border lead-top-left ${type==='gitee'&&'lead-border-blue'} lead-border-back`} onClick={()=>goInfo("gitee")}>
                        <div className='lead-top-border-center'>
                            <img  src={gitee}  style={{width:43,height:43}}/>
                        </div>
                        <div  className='lead-top-border-center lead-top-border-top'>Gitee</div>
                    </div>
                    <div className={`lead-top-border lead-top-left ${type==='github'&&'lead-border-blue'} lead-border-back`} onClick={()=>goInfo("github")}>
                        <div className='lead-top-border-center'>
                            <img  src={github}  style={{width:43,height:43}}/>
                        </div>
                        <div  className='lead-top-border-center lead-top-border-top'>GitHub</div>
                    </div>
                </div>
                {
                    authInfo.length>0&&
                    <div className='lead-top-desc '>
                        <img   src={notice}  style={{width:25,height:25}}/>
                        <div className='lead-top-desc-left-7'>{`${type}===priGitlab`&&"已绑定私服 GitLab帐号"}</div>
                        <div className='lead-top-desc-left-70 lead-top-desc-left-text'>
                            <span onClick={deleteBound}>解除绑定</span>
                            <span onClick={goThirdList} className='lead-top-desc-left-20' >确认</span>
                        </div>

                    </div>

                }
                <div className='lead-content-title'>仓库导入记录</div>
                <div className='lead-table'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={leadRecordList}
                        rowKey={record=>record.rpyId}
                        pagination={false}
                        locale={<EmptyText title={"没有仓库"}/>}
                    />
                </div>
            </div>
        </div>
    )
}
export default observer(RepositoryToLead)
