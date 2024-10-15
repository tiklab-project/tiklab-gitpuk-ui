/**
 * 分支添加确认界面
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Col, Dropdown, message, Tooltip} from 'antd';
import "./MergeAddVerify.scss"
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import mergeStore from "../store/MergeStore";
import Tabs from "../../common/tabs/Tabs";
import Btn from "../../common/btn/Btn";
import {inject, observer} from "mobx-react";
import MergePop from "./MergePop";
import MergeAddVerifyBasic from "./MergeAddVerifyBasic";
import mergeConditionStore from "../store/MergeConditionStore";
import MergeAddVerifyCommit from "./MergeAddVerifyCommit";
import MergeAddVerifyFile from "./MergeAddVerifyFile";
import commitsStore from "../../repository/commits/store/CommitsStore";
import mergeAuditorStore from "../store/MergeAuditor";
import {getUser} from "tiklab-core-ui";
import {DownOutlined} from "@ant-design/icons";
const MergeAddVerify = (props) => {
    const {repositoryStore,match}=props
    const {repositoryInfo} = repositoryStore
    const {findMergeRequest,execMerge,updateMergeRequest,fresh}=mergeStore
    const {findMergeConditionList,createMergeComment,deleteMergeComment,conFresh}=mergeConditionStore
    const {findStatisticsByBranchs,findStatisticsByMergeId,findCommitDiffBranch,findDiffCommitByMergeId} = commitsStore
    const {findMergeAuditorList,updateMergeAuditor}=mergeAuditorStore

    const userId=getUser().userId
    const webUrl = `${match.params.namespace}/${match.params.name}`

    //合并请求
    const [mergeData,setMergeData]=useState(null)
    //添加合并分支table类型
    const [mergeTableType,setMergeTableType]=useState("basics")

    //审核状态
    const [auditorVisible,setAuditorVisible]=useState()

    //合并分支下拉 状态
    const [mergeTypeVisible,setMergeTypeVisible]=useState(false)
    //合并分支弹窗状态
    const [mergeVisible,setMergeVisible]=useState(false)
    //合并分支弹窗类型
    const [mergeWay,setMergeWay]=useState()
    //是否删除源分支
    const [deleteOrigin,setDeleteOrigin]=useState()

    //关闭合并请求状态
    const [closeVisible,setCloseVisible]=useState(false)

    //扫描执行状态
    const [mergeExecState,setMergeExecState]=useState(false)

    //合并请求动态
    const [mergeConditionList,setMergeConditionList]=useState([])

    //查询动态的类型
    const [findConditionType,setFindConditionType]=useState("all")
    //分支不同统计数据
    const [commitsStatistics,setCommitsStatistics]=useState()

    //提交list
    const [commitsList,setCommitsList]=useState([])

    //审核人
    const [auditorUserList,setAuditorUserList]=useState([])
    //审核状态
    const [auditorState,setAuditorState]=useState(0)

    //查询当前登陆用户是否是审核用户
    const isUser=auditorUserList.filter(a=>a.user.id===userId).length;

    useEffect(()=>{
        findMergeRequest(match.params.mergeId).then(res=>{
            if (res.code===0){
                setMergeData(res.data)
                if (res.data){
                    getMergeConditionList(res.data.id)
                    //查询审核人
                    getMergeAuditorList()
                    getDiffCommitStatistics(res.data)
                    getCommitDiffBranch(res.data,res.data.mergeOrigin,res.data.mergeTarget)
                }
            }
        })
    },[fresh])

    useEffect(()=>{
        if (mergeData){
            getMergeConditionList(mergeData.id,findConditionType)
        }
    },[conFresh])


    //查询审核
    const getMergeAuditorList = () => {
        findMergeAuditorList({mergeRequestId:match.params.mergeId}).then(res=>{
            if (res.code===0){
                setAuditorUserList(res.data)
                if (res.data.length>0){
                    const auditor=  res.data.filter(item=>item.user.id===getUser().userId)
                    setAuditorState(auditor&&auditor[0].auditStatus)
                }
            }
        })
    }


    //查询两个分支的统计
    const getDiffCommitStatistics = (mergeData) => {
        if (mergeData.mergeState===2){
            findStatisticsByMergeId(mergeData.id).then(res=>{
                res.code===0&&setCommitsStatistics(res.data)
            })
        }else {
            findStatisticsByBranchs({
                rpyId:repositoryInfo.rpyId,
                branch:mergeData.mergeOrigin,
                targetBranch:mergeData.mergeTarget,
            }).then(res=>{
                res.code===0&&setCommitsStatistics(res.data)
            })
        }
    }

    //获取分支的提交信息
    const getCommitDiffBranch = (mergeData,branch,targetBranch) => {
        //查询已经合并的提交信息
        if (mergeData.mergeState===2){
            findDiffCommitByMergeId(mergeData.id).then(res=>{
                res.code===0&&setCommitsList(res.data)
            })
        }else {
            findCommitDiffBranch({
                rpyId:repositoryInfo.rpyId,
                branch:branch,
                findCommitId:false,
                targetBranch:targetBranch,
            }).then(res=>{
                res.code===0&&setCommitsList(res.data)
            })
        }
    }


    /**
     * 切换类型
     * @param item
     */
    const clickType =async item => {
        setMergeTableType(item.id)
    }

    //执行合并
    const starMerger = (message) => {
        setMergeExecState(true)
        execMerge({
            mergeRequestId:match.params.mergeId,
            rpyId:repositoryInfo.rpyId,
            mergeOrigin:mergeData.mergeOrigin,
            mergeTarget:mergeData.mergeTarget,
            mergeMessage:message,
            mergeType:"branch",
            mergeWay:mergeWay,
            deleteOrigin:deleteOrigin,
         /*   commitMessages:commitsList*/
            commitMessageList:commitsList,
        }).then(res=>{
            setMergeExecState(false)
            if (res.code===0){
                setMergeVisible(false)
            }
        })
    }

    //关闭、打开合并请求
    const updateMergeReq = (state,execType) => {
        updateMergeRequest({
            ...mergeData,
            mergeState:state,
            execType:execType,
        }).then(res=>{
            setCloseVisible(false)
            getMergeConditionList(mergeData.id,findConditionType)
        })
    }

    //打开mergePop
    const openMergePop = (type) => {
        setMergeVisible(true)
        setMergeTypeVisible(false)
        setMergeWay(type)
    }

    //审核  1:通过、2：不通过
    const editorAuditor = (state) => {
        updateMergeAuditor({
            mergeRequestId:match.params.mergeId,
            user:{
                id:getUser().userId
            },
            auditStatus:state
        }).then(res=>{
            if (res.code===0){
                message.success(state===1?"审核通过":"审核不通过")
                setAuditorState(state)
                setAuditorVisible(false)
                getMergeConditionList(mergeData.id,findConditionType)
            }
        })

    }


    //查询合并请求的动态
    const getMergeConditionList = (mergeId,type) => {
        findMergeConditionList({
            mergeRequestId:mergeId,
            findType:type
        }).then(res=>{
            res.code===0&&setMergeConditionList(res.data)
        })
    }

    //通过查询动态类型合并请求动态
    const addFindConditionType = (type) => {
        setFindConditionType(type)
        getMergeConditionList(mergeData.id,type)

    }

    //默认获取动态信息
    const deGetMergeConditionList = () => {
        getMergeConditionList(mergeData.id,findConditionType)
    }




    //审核下拉
    const auditorPullDown = (
        <div className='merge-auditor-menu'>
            {
                auditorState===1&&
                <div className={`auditor-menu-nav`} onClick={()=>editorAuditor(2)}>
                    <div>不通过</div>
                </div>||
                auditorState===2&&
                <div className={`auditor-menu-nav`}  onClick={()=>editorAuditor(1)}>
                    <div>通过</div>
                </div>||
                auditorState===0&&
                <>
                    <div className={`auditor-menu-nav`} onClick={()=>editorAuditor(2)}>
                        <div>不通过</div>
                    </div>
                    <div className={`auditor-menu-nav`}  onClick={()=>editorAuditor(1)}>
                        <div>通过</div>
                    </div>
                </>
            }
        </div>
    )

    //合并分支下拉框
    const mergePullDown = (
        <div className='merge-select-menu'>
            <div className='merge-select-nav'  onClick={()=>openMergePop("createNode")}>
                <div>创建一个合并节点</div>
                <div className='merge-select-nav-desc'>创建一个合并节点，记录合并信息</div>
            </div>
            <div className='merge-select-nav' onClick={()=>openMergePop("squash")}>
                <div>Squash合并</div>
                <div className='merge-select-nav-desc'>合并源分支的提交压缩成一条，添加到目标分支</div>
            </div>
            <div className='merge-select-nav' onClick={()=>openMergePop("rebase")}>
                <div>Rebase合并</div>
                <div className='merge-select-nav-desc'>源分支的1个提交将被重新定位并提交到目标分支</div>
            </div>
            <div className='merge-select-nav' onClick={()=>openMergePop("fast")}>
                <div>Fast-forward-only合并</div>
                <div className='merge-select-nav-desc'>不创建合并分支的提交记录</div>
            </div>
        </div>
    )

    //关闭合并请求的下拉框
    const closePullDown = () => (
        <div className='merge-close-menu'>
            <div className='close-menu-nav' onClick={()=>updateMergeReq(3,"close")}>关闭合并请求</div>
        </div>
    )


    const goBack = () => {
        props.history.go(-1)
    }
    return(
        <div className='xcode page-width merge-verify'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                {
                    mergeData&&
                    <div className='merge-verify-content'>
                        <BreadcrumbContent firstItem= {mergeData.title}  goBack={goBack}/>
                        <div className='merge-verify-title'>
                            <div className='merge-verify-title-nav'>
                                <div className='merge-verify-title-desc'>
                                    {
                                        mergeData.mergeState===1&&
                                        <div className='merge-verify-border merge-verify-border-open'>已开启</div>||
                                        mergeData.mergeState===2&&
                                        <div className='merge-verify-border merge-verify-border-success'>已合并</div>||
                                        mergeData.mergeState===3&&
                                        <div className='merge-verify-border merge-verify-border-close'>已关闭</div>
                                    }

                                    <div className='title-desc-merge'>
                                        <div>{mergeData.user.name}发起合并</div>
                                        <div className='title-desc-border'>{mergeData.mergeOrigin}</div>
                                        合并到
                                        <div className='title-desc-border'> {mergeData.mergeTarget}</div>
                                    </div>
                                </div>

                                <div className='merge-verify-title-bt'>
                                    {
                                        mergeData.mergeState===1&&
                                        <Fragment>
                                            {
                                                isUser>0?
                                                    <Dropdown
                                                        overlay={auditorPullDown}
                                                        trigger={['click']}
                                                        placement={'bottomLeft'}
                                                        visible={auditorVisible}
                                                        getPopupContainer={e => e.parentElement}
                                                        onVisibleChange={auditorVisible=>setAuditorVisible(auditorVisible)}
                                                    >
                                                        <div  onClick={()=>setAuditorVisible(!auditorVisible)}>
                                                            <div className='select-view'>
                                                                <div className='select-content'>
                                                                    {

                                                                        auditorState===0&&<div>未审核</div>||
                                                                        auditorState===1&&<div>通过</div>||
                                                                        auditorState===2&&<div>不通过</div>
                                                                    }
                                                                    <DownOutlined style={{fontSize:10}} twoToneColor="#52c41a"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Dropdown>:
                                                    <Btn
                                                        type={'disabled'}
                                                        title={'审核'}
                                                        isTooltip={true}
                                                        tooltipTitle={'没有权限操作该合并'}
                                                        onClick={()=>setMergeTypeVisible(!mergeTypeVisible)}
                                                    />
                                            }

                                            {
                                                ( auditorState===1&& isUser>0&&commitsStatistics?.clash===0)?
                                                    <Dropdown
                                                        overlay={mergePullDown}
                                                        trigger={['click']}
                                                        placement={'bottomRight'}
                                                        visible={mergeTypeVisible}
                                                        getPopupContainer={e => e.parentElement}
                                                        onVisibleChange={mergeTypeVisible=>setMergeTypeVisible(mergeTypeVisible)}
                                                    >
                                                        <Btn
                                                            type={'primary'}
                                                            title={'合并'}
                                                            onClick={()=>setMergeTypeVisible(!mergeTypeVisible)}
                                                        />
                                                    </Dropdown>:
                                                    <Btn
                                                        type={'disabled'}
                                                        title={'合并'}
                                                        onClick={()=>setMergeTypeVisible(!mergeTypeVisible)}
                                                    />
                                            }
                                            {
                                                isUser>0&&
                                                <Dropdown
                                                    overlay={closePullDown}
                                                    trigger={['click']}
                                                    placement={'bottomRight'}
                                                    visible={closeVisible}
                                                    overlayStyle={{width:105}}
                                                    getPopupContainer={e => e.parentElement}
                                                    onVisibleChange={closeVisible=>setCloseVisible(closeVisible)}
                                                >
                                                    <Btn
                                                        type={'common'}
                                                        title={'...'}
                                                        onClick={()=>setCloseVisible(!closeVisible)}
                                                    />
                                                </Dropdown>
                                            }

                                        </Fragment>||
                                        (mergeData.mergeState===3&& isUser>0)&&
                                        <>
                                            {
                                                mergeData.branchExist?
                                                <Btn
                                                    type={'common'}
                                                    title={'重新打开'}
                                                    onClick={()=>updateMergeReq(1,"open")}
                                                />:
                                                    <Btn
                                                        type={'disabled'}
                                                        title={'重新打开'}
                                                        isTooltip={true}
                                                        tooltipTitle={"源分支或目标分支不存在"}
                                                    />
                                            }
                                        </>

                                    }
                                </div>
                            </div>
                        </div>

                        <div className='merge-verify-table'>
                            <Tabs
                                type={mergeTableType}
                                tabLis={[
                                    {id:"basics", title:'基础信息'},
                                    {id:"commit", title:`提交记录(${commitsStatistics?.commitNum})`},
                                    {id:"file", title:`文件改动(${commitsStatistics?.fileNum})`}
                                ]}
                                onClick={clickType}
                            />
                        </div>
                        <div className='merge-verify-table'>
                            {mergeTableType==='basics'&&
                                <MergeAddVerifyBasic
                                        {...props}
                                        mergeData={mergeData}
                                        mergeConditionList={mergeConditionList}
                                        createMergeComment={createMergeComment}
                                        deleteMergeComment={deleteMergeComment}
                                        findConditionType={findConditionType}
                                        setFindConditionType={addFindConditionType}
                                        commitsStatistics={commitsStatistics}
                                        auditorUserList={auditorUserList}
                                        repositoryInfo={repositoryInfo}
                                        getMergeAuditorList={getMergeAuditorList}
                                        deGetMergeConditionList={deGetMergeConditionList}
                                />||
                                mergeTableType==='commit'&&
                                <MergeAddVerifyCommit
                                        {...props}
                                        commitsList={commitsList}
                                        webUrl={webUrl}
                                />||
                                mergeTableType==='file'&&
                                <MergeAddVerifyFile
                                        {...props}
                                        repositoryInfo={repositoryInfo}
                                        mergeData={mergeData}
                                        webUrl={webUrl}
                                />
                            }
                        </div>
                    </div>
                }
            </Col>
            <MergePop {...props}
                    visible={mergeVisible}
                      setVisible={setMergeVisible}
                      mergeWay={mergeWay}
                      setDeleteOrigin={setDeleteOrigin}
                      starMerger={starMerger}
                      mergeData={mergeData}
                      mergeExecState={mergeExecState}
            />
        </div>
    )


}
export default inject('repositoryStore')(observer(MergeAddVerify))
