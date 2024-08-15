/**
 * 仓库概览
 * @param props
 * @constructor
 */
import React,{useEffect,useState,useRef} from 'react';
import "./Survey.scss"
import {Input, Tooltip, Popconfirm, Col, Dropdown, Menu, Modal} from 'antd';
import {SpinLoading} from "../../../common/loading/Loading";
import SurveyStore from "../store/SurveyStore";
import {inject, observer} from "mobx-react";
import noData from "../../../assets/images/img/noData.png";
import DyncmicTimeAxis from "./DyncmicTimeAxis";
import progress from "../../../assets/images/img/todo-progress.png";
import finish from "../../../assets/images/img/todo-finish.png";
import overdue from "../../../assets/images/img/todo-overdue.png";
import all from "../../../assets/images/img/todo-all.png";
import SurveyCommit from "../../../common/statistics/SurveyCommit";
import SurveyMergeReq from "../../../common/statistics/SurveyMergeReq";
import SurveyMergeReview from "../../../common/statistics/SurveyMergeReview";
import statisticsStore from "../../statistics/store/StatisticsStore";
import SurveyUserCommit from "../../../common/statistics/SurveyUserCommit";
import EmptyText from "../../../common/emptyText/EmptyText";
const Survey = (props) => {
    const {repositoryStore,match,location} = props
    const {repositoryInfo} = repositoryStore

    const {findLatelyCommit,findLogPage,logList} = SurveyStore
    const {statisticsTodoWorkByStatus} = statisticsStore

    //提交list
    const [commitList,setCommitList]=useState([])

    // 最近提交的加载状态
    const [commitLoading,setCommitLoading] = useState(false)
    const [todoSum,setTodoSum]=useState(null)


    useEffect(()=>{
        findLatelyCommit(repositoryInfo.rpyId,4).then(res=>{
            if (res.code===0){
                setCommitList(res.data)
            }})

          findLogPage({ repositoryId: repositoryInfo.rpyId, currentPage: 1 })

        statisticsTodoWorkByStatus({repositoryId:repositoryInfo.rpyId}).then(res=>{
            res.code===0&&setTodoSum(res.data)
        })

        }, [])


    return(
        <div className=' gittok-width survey'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='survey-style'>
                    {/*<BreadcrumbContent firstItem={'最近提交'}/>*/}
                    <div>
                        <div className='survey-title'>{'最近提交'}</div>
                        <div className='survey-new-commit-style'>
                            {
                                commitLoading ?
                                    <SpinLoading type='table'/>:
                                    commitList && commitList.length > 0 ?
                                        commitList.map((item,key)=>{
                                            return(
                                                <div key={key} className='survey-commit-tab '>
                                                    <div className='survey-commit-left'>
                                                        <div className="survey-commit-icon">{item.commitUser.slice(0, 1).toUpperCase()}</div>
                                                        <div>
                                                            <div className='survey-commit-message'>{item.commitMessage}</div>
                                                            <div className='survey-commit-desc'>{item.commitUser} 提交于 {item.commitTime}</div>
                                                        </div>

                                                    </div>

                                                    <div className='survey-commit-time'>
                                                        <div>master</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <EmptyText title={"暂无提交记录"}/>
                            }
                        </div>
                    </div>

                    <div className='survey-todo-style'>
                        <div className='survey-title'>{'待办事项'}</div>
                        <div className='survey-todo-tab'>
                            <div className='todo-tab-item' >
                                <img src={all}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.total}</div>
                                    <div>全部待办</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' >
                                <img src={progress}  style={{width:35,height:35}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.progress}</div>
                                    <div>进行中</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' >
                                <img src={finish}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.end}</div>
                                    <div>已完成</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' >
                                <img src={overdue}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.overdue}</div>
                                    <div>逾期</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='survey-statistics-commit-style'>
                        <div className='survey-title'>{'提交统计'}</div>
                        <div className='survey-statistics-content'>
                           <SurveyCommit repositoryId={repositoryInfo.rpyId}/>
                            <SurveyUserCommit repositoryId={repositoryInfo.rpyId}/>
                        </div>
                    </div>
                    <div className='survey-statistics-merge-style'>
                        <div className='survey-title'>{'合并统计'}</div>
                        <div className='survey-statistics-content'>
                            <SurveyMergeReq repositoryId={repositoryInfo.rpyId}/>
                            <SurveyMergeReview repositoryId={repositoryInfo.rpyId}/>
                        </div>
                    </div>

                    <DyncmicTimeAxis logList={logList}/>

                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(Survey))
