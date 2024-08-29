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
import bitbucket from "../../../assets/images/img/bitbucket.png";
import notice from "../../../assets/images/img/notice.png"
import link from "../../../assets/images/img/link.png"
import ToLeadStore from "../store/ToLeadStore"
import {getUser} from "thoughtware-core-ui";
import {Col, Table, Tag} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import ThirdInfoPop from "./ThirdInfoPop";

const RepositoryToLead = (props) => {
    const {findImportAuthList,deleteImportAuth,findAllLeadRecord,leadRecordList,refresh}=ToLeadStore

    const [authInfo,setAuthInfo]=useState([])

    const [type,setType]=useState('')   //类型
    const [infoVisible,setInfoVisible]=useState(false)    //弹窗状态
    const [title,setTitle]=useState(null)

    useEffect( async ()=>{
        findAllLeadRecord()
    },[])

    useEffect( async ()=>{
        findImportAuthList({type:type,userId:getUser().userId}).then(res=>{
            setAuthInfo(res.data)
        })

    },[refresh])

    /**
     * 跳转到上一级路由
     */
    const goBack = () => {
        props.history.push(`/repository`)
    }

    //打开第三方信息
    const openInfo = async (type) => {
        setTitle("添加"+type+"信息");
        setType(type)
        const res=await findImportAuthList({type:type,userId:getUser().userId})
        if (res.code===0){
            setAuthInfo(res.data)
            if (res.data.length===0){
                setInfoVisible(true)
            }
        }
    }

    //跳转第三方仓库列表
    const goThirdList = () => {
        props.history.push(`/repository/lead/thirdList/${authInfo[0].id}`)
    }
    //解除绑定
    const deleteBound = () => {
        deleteImportAuth(authInfo[0].id)
        setAuthInfo([])
    }

    const goDetails = (text,record) => {
        props.history.push(`/repository/${record.repository.address}/code`)
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
        <div className="xcode page-width lead">
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='lead-content'>
                    <BreadcrumbContent firstItem='导入外部仓库' goBack={goBack}/>
                    <div className='lead-content-title'>仓库导入方式</div>
                    <div className="lead-top">
                      {/*  <div className={`lead-top-border  ${type==='url'&&'lead-border-blue'} lead-border-back `} onClick={()=>openInfo("url")}>
                            <div className='lead-top-border-center' >
                                <img  src={link}  style={{width:45,height:45}}/>
                            </div>
                            <div  className='lead-top-border-center lead-top-border-top'>URL导入</div>
                        </div>*/}
                        <div className={`lead-top-border ${type==='priGitlab'&&'lead-border-blue'} lead-border-back`} onClick={()=>openInfo("priGitlab")}>
                            <div className='lead-top-border-center'>
                                <img   src={gitlab}  style={{width:50,height:50}}/>
                            </div>
                            <div className='lead-top-border-center'>私有 GitLab</div>
                        </div>
                        <div className={`lead-top-border lead-top-left ${type==='gitlab'&&'lead-border-blue'} lead-border-back`} onClick={()=>openInfo("gitlab")}>
                            <div className='lead-top-border-center'>
                                <img  src={gitlab}  style={{width:50,height:50}}/>
                            </div>
                            <div  className='lead-top-border-center'>GitLab</div>
                        </div>
                        <div className={`lead-top-border lead-top-left ${type==='gitee'&&'lead-border-blue'} lead-border-back`} onClick={()=>openInfo("gitee")}>
                            <div className='lead-top-border-center'>
                                <img  src={gitee}  style={{width:43,height:43}}/>
                            </div>
                            <div  className='lead-top-border-center lead-top-border-top'>Gitee</div>
                        </div>
                        <div className={`lead-top-border lead-top-left ${type==='github'&&'lead-border-blue'} lead-border-back`} onClick={()=>openInfo("github")}>
                            <div className='lead-top-border-center'>
                                <img  src={github}  style={{width:43,height:43}}/>
                            </div>
                            <div  className='lead-top-border-center lead-top-border-top'>GitHub</div>
                        </div>
                        <div className={`lead-top-border lead-top-left ${type==='bitbucket'&&'lead-border-blue'} lead-border-back`} onClick={()=>openInfo("priBitbucket")}>
                            <div className='lead-top-border-center'>
                                <img  src={bitbucket}  style={{width:41,height:41}}/>
                            </div>
                            <div  className='lead-top-border-center lead-top-border-top'>私有bitbucket</div>
                        </div>
                    </div>
                    {
                        authInfo.length>0&&
                        <div className='lead-top-desc '>
                            <img   src={notice}  style={{width:25,height:25}}/>
                            <div className='lead-top-desc-left-7'>{type==='priGitlab'?"已绑定私服GitLab账号":"已绑定"+type+"账号"}</div>
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
                <ThirdInfoPop visible={infoVisible} setVisible={setInfoVisible} type={type} title={title}/>
            </Col>
        </div>
    )
}
export default observer(RepositoryToLead)
