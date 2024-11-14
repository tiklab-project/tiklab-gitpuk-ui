/**
 * 添加
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect,Fragment} from 'react';
import {Col, Dropdown} from 'antd';
import "./MergeAdd.scss"
import BreadcrumbContent from "../../common/breadcrumb/Breadcrumb";
import {ArrowRightOutlined, CaretDownOutlined, InfoCircleFilled, InfoCircleOutlined} from "@ant-design/icons";
import MergeAddDrop from "./MergeAddDrop";
import {inject, observer} from "mobx-react";
import branchStore from "../../repository/branch/store/BranchStore";
import Tabs from "../../common/tabs/Tabs";
import commitsStore from "../../repository/commits/store/CommitsStore";
import MergeFileInfo from "./MergeAddFile";
import mergeStore from "../store/MergeStore";
import {getUser} from "tiklab-core-ui";
import MergeEmpty from "../../common/emptyText/MergeEmpty";
import MergeAddBasic from "./MergeAddBasic";
import MergeAddCommit from "./MergeAddCommit";
import MergeAddFile from "./MergeAddFile";
import mergeAuditorStore from "../store/MergeAuditor";
const MergeAdd = (props) => {
    const {repositoryStore,match,location} = props
    const {repositoryInfo} = repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`
    const {fresh,findBranchList} = branchStore
    const {findCommitDiffBranch,findDiffBranchFileDetails,findStatisticsByBranchs} = commitsStore
    const {createMergeRequest,findMergeRequestList}=mergeStore
    const {findDmUserList,createMergeAuditor}=mergeAuditorStore

    const userId=getUser().userId
    //合并请求提交
    const [mergeRequestList,setMergeRequestList]=useState([])
    //分支list
    const [branchList,setBranchList]=useState([])
    //提交list
    const [commitsList,setCommitsList]=useState([])
    //分支不同统计数据
    const [commitsStatistics,setCommitsStatistics]=useState()

    //源分支下拉框状态
    const [originDropDownVisible,setOriginDropDownVisible] = useState(false)
    //目标分支下拉框状态
    const [targetDropDownVisible,setTargetDropDownVisible] = useState(false)

    //源分支
    const [originBranch,setOriginBranch]=useState(null)
    //目标分支
    const [targetBranch,setTargetBranch]=useState()
    //添加合并分支类型
    const [mergeType,setMergeType]=useState("basics")

    //审核用户
    const [auditorUser,setAuditorUser]=useState([])


    useEffect(()=>{
        if (repositoryInfo){
            getBranchList()
        }

    },[repositoryInfo.name,fresh])


    //获取分支的list
    const getBranchList = (name) => {
        findBranchList({rpyId:repositoryInfo.rpyId,name:name}).then(res=>{
            if (res.code===0){
                setBranchList(res.data)
               const defaultBranch= res.data.filter(a=>a.defaultBranch===true)[0]
                setTargetBranch(defaultBranch)

                //路径中存在源分支(分支界面进入创建和并请求)
                if (location.search&&location.search.indexOf("source_branch")!=-1) {
                    const sourceBranchName = location.search.substring(location.search.indexOf("=")+1)
                    const defaultBranch= res.data.filter(a=>a.branchName===sourceBranchName)[0]
                    setOriginBranch(defaultBranch)
                }

                if (location.search){
                    const search= location.search
                    const branch=search.slice(search.indexOf("=")+1)
                    getMergeRequestList(branch,defaultBranch.branchName)
                    getCommitDiffBranch(branch,defaultBranch.branchName)
                    getDiffCommitStatistics(branch,defaultBranch.branchName)
                }
            }
        })
    }

    //通过源分支和目标分支 查询打开中的合并请求
    const getMergeRequestList=(mergeOrigin,mergeTarget)=>{
        findMergeRequestList({
            rpyId:repositoryInfo.rpyId,
            mergeState:1,
            mergeOrigin:mergeOrigin,
            mergeTarget:mergeTarget
        }).then(res=>{
            if (res.code===0){
                setMergeRequestList(res.data)
            }
            return res.data
        })
    }

    //获取分支的提交信息
    const getCommitDiffBranch = (branch,targetBranch) => {
        findCommitDiffBranch({
            rpyId:repositoryInfo.rpyId,
            branch:branch,
            findCommitId:false,
            targetBranch:targetBranch,
        }).then(res=>{
            res.code===0&&setCommitsList(res.data)
        })
    }

    //查询两个分支的统计
    const getDiffCommitStatistics = (branch,targetBranch) => {
        findStatisticsByBranchs({
            rpyId:repositoryInfo.rpyId,
            branch:branch,
            targetBranch:targetBranch,
        }).then(res=>{
            res.code===0&&setCommitsStatistics(res.data)
        })
    }


    //查询两个分支的查询提交
    const findCommitsList = (value,type) => {
        //目标分支
        if (type==='target'&&originBranch){
            getMergeRequestList(originBranch.branchName,value)
            getCommitDiffBranch(originBranch.branchName,value)
            getDiffCommitStatistics(originBranch.branchName,value)
        }
        //源分支
        if (type==='origin'&&targetBranch){
            getMergeRequestList(value,targetBranch.branchName)
            getCommitDiffBranch(value,targetBranch.branchName)
            getDiffCommitStatistics(value,targetBranch.branchName)
        }
        //切换分支 table初始化到基本信息
        setMergeType("basics")
    }


    //查询分支
    const queryBranch= (e) => {
        const name=e.target.value
        getBranchList(name)
    }

    /**
     * 切换类型
     * @param item
     */
    const clickType =async item => {
        setMergeType(item.id)
    }

    /**
     * 创建合并请求
     * @param item
     */
    const createMerge = (value) => {
        createMergeRequest({
            ...value,
            repository:{
                rpyId:repositoryInfo.rpyId,
            },
            mergeOrigin:originBranch.branchName,
            mergeTarget:targetBranch.branchName,
            execType:"create",
            user:{
                id:getUser().userId
            }
        }).then(res=>{
                if (res.code===0){
                    //创建者默认为审核者
                    const index = auditorUser.indexOf(userId);
                    if (index ===-1) {
                        auditorUser.push(userId);
                    }
                    auditorUser&&auditorUser.map(item=>{
                        createMergeAuditor({
                            repositoryId:repositoryInfo.rpyId,
                            mergeRequestId:res.data,
                            user:{
                                id:item
                            },
                            auditStatus:0
                        })
                    })
                    props.history.push(`/repository/${webUrl}/mergeAdd/${res.data}`)
                }
        })
    }

    //存在开启的合并分支，跳转合并详情
    const goMergeAddVerify = (mergeReqId) => {
        props.history.push(`/repository/${webUrl}/mergeAdd/${mergeReqId}`)
    }


    const goBack = () => {
        props.history.go(-1)
    }

    return (
        <div className='xcode page-width merge-add'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='merge-add-content'>
                    <BreadcrumbContent firstItem={'新建合并请求'}  goBack={goBack}/>
                    <div className='merge-add-select'>
                        <div className='merge-add-select-nav'>
                            <div>源分支</div>
                            <Dropdown
                                overlay={<MergeAddDrop
                                    branchList={branchList}
                                    changBranch={queryBranch}
                                    setDropDownVisible={setOriginDropDownVisible}
                                    setBranch={setOriginBranch}
                                    cuteBranch={findCommitsList}
                                    type={"origin"}
                                />}
                                trigger={['click']}
                                placement={'bottomLeft'}
                                visible={originDropDownVisible}
                                onVisibleChange={visible=>setOriginDropDownVisible(visible)}
                            >
                                <div className='merge-add-select-input'>
                                    <div className='merge-add-select-title'>{webUrl}</div>
                                    <div className='merge-add-select-icon'>
                                        <div>{originBranch?.branchName}</div>
                                        <CaretDownOutlined/>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>

                      {/*   <div>
                            <ArrowRightOutlined />
                        </div>*/}
                        <div className='merge-add-select-nav'>
                            <div>目标分支</div>
                            <Dropdown
                                overlay={<MergeAddDrop
                                    branchList={branchList}
                                    /*   changFile={changFile}*/
                                    changBranch={queryBranch}
                                    setDropDownVisible={setTargetDropDownVisible}
                                    setBranch={setTargetBranch}
                                    cuteBranch={findCommitsList}
                                    type={"target"}
                                />}
                                trigger={['click']}
                                placement={'bottomLeft'}
                                visible={targetDropDownVisible}
                                onVisibleChange={visible=>setTargetDropDownVisible(visible)}
                            >
                                <div className='merge-add-select-input'>
                                    <div className='merge-add-select-title'>{webUrl}</div>
                                    <div className='merge-add-select-icon'>
                                        <div>{targetBranch?.branchName}</div>
                                        <CaretDownOutlined/>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    {
                        commitsStatistics?.clash===1&&
                        <div className='commit-info-clash'>
                            <InfoCircleFilled  className='commit-info-clash-icon'/>
                            <div className='commit-info-clash-text'>
                                <span>  存在代码冲突 , 您仍然可以创建合并请求</span>
                            </div>
                        </div>
                    }
                    {
                        mergeRequestList.length>0&&
                        <div className='commit-info-error'>
                           <InfoCircleFilled  className='commit-info-error-icon'/>
                            <div className='commit-info-error-nav'>
                                <span>两个分支已存在开启中的合并请求</span>
                                <span className='commit-info-error-text' onClick={()=>goMergeAddVerify(mergeRequestList[0].id)}>查看合并请求</span>
                            </div>
                        </div>||
                        (mergeRequestList.length===0&&originBranch!==null&&commitsList.length===0)&&
                        <div className='commit-info-error'>
                            <InfoCircleFilled  className='commit-info-error-icon'/>
                            <div className='commit-info-error-nav'>
                                <span>两个分支没有可合并的差异,请切换分支</span>
                            </div>
                        </div>||
                        originBranch===null&&<div className='commit-info-margin'>
                            <MergeEmpty text={"选择需要合并的分支后，可查看两个分支之间的差异"}/>
                        </div>||
                        mergeRequestList.length===0&&commitsList.length>0&&
                        <div className='merge-add-table'>
                            <Tabs
                                type={mergeType}
                                tabLis={[
                                    {id:"basics", title:'基础信息'},
                                    {id:"commit", title:`提交记录(${commitsStatistics?.commitNum})`},
                                    {id:"file", title:`文件改动(${commitsStatistics?.fileNum})`}
                                ]}
                                onClick={clickType}
                            />
                            {
                                mergeType==='basics'&&
                                <MergeAddBasic {...props}
                                                 createMerge={createMerge}
                                                 findDmUserList={findDmUserList}
                                                 repositoryInfo={repositoryInfo}
                                                 setAuditorUser={setAuditorUser}
                                />||
                                mergeType==='commit'&&commitsList.length>0&&
                                <MergeAddCommit {...props}
                                                 commitsList={commitsList}
                                                 webUrl={webUrl}
                                />||
                                mergeType==='file'&&
                                <MergeAddFile {...props}
                                               webUrl={webUrl}
                                               repositoryInfo={repositoryInfo}
                                               originBranch={originBranch.branchName}
                                               targetBranch={targetBranch.branchName}
                                               findDiffBranchFileDetails={findDiffBranchFileDetails}
                                />
                            }
                        </div>}
                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(MergeAdd))
