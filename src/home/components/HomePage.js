import React,{useEffect,useState,Fragment} from 'react';
import {Tooltip, Col, Select} from 'antd';
import homePageStore from "../store/homePageStore"
import Guide from '../../common/guide/Guide';
import EmptyText from "../../common/emptyText/EmptyText";
import Listicon from "../../common/list/Listicon";
import {SpinLoading} from "../../common/loading/Loading";
import './HomePage.scss';
import HomeUserCommit from "../../common/statistics/HomeUserCommit";
import HomeRpyCommit from "../../common/statistics/HomeRpyCommit";
import HomeMergeReq from "../../common/statistics/HomeMergeReq";
import HomeUserMergeReq from "../../common/statistics/HomeUserMergeReq";
import all from "../../assets/images/img/todo-all.png";
import progress from "../../assets/images/img/todo-progress.png";
import finish from "../../assets/images/img/todo-finish.png";
import overdue from "../../assets/images/img/todo-overdue.png";
import statisticsStore from "../store/StatisticsStore";
/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {findRecordOpenList,recordOpenList,findRecordCommitList,recordCommitList,findTodoPage} = homePageStore

    const {statisticsTodoWorkByStatus} = statisticsStore

    // 最近打开的加载状态
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 最近提交的加载状态
    const [commitLoading,setCommitLoading] = useState(true)

    const [innerWidth,setInnerWidth]=useState(window.innerWidth)

    //待办
    const [todoTaskList,setTodoTaskList]=useState([])
    //待办状态
    const [todoTaskStatus,setTodoTaskStatus]=useState(1)

    //合并请求的查询时间
    const [findMergeTime,setFindMergeTime]=useState(1)
    //提交请求的查询时间
    const [findCommitTime,setFindCommitTime]=useState(1)

    const [todoSum,setTodoSum]=useState(null)

    useEffect(async ()=>{
        // 获取最近打开的仓库
        findRecordOpenList().then(()=>setNewlyLoading(false))
        // 获取最近提交的仓库
        findRecordCommitList().then(()=>setCommitLoading(false))

        statisticsTodoWorkByStatus({}).then(res=>{
            res.code===0&&setTodoSum(res.data)
        })
       // getTodoPage(todoTaskStatus)
    },[])


    const findData=[{key:1,value:"今天"},
        {key:2,value:"昨天"},
        {key:3,value:"前天"},
        {key:7,value:"7天内"},
    ]


    //实时获取浏览器宽度
    window.onresize = function() {
        let windowWidth = window.innerWidth;
        setInnerWidth(windowWidth)
        console.log(windowWidth);
    };



    //分页查询待办
    const getTodoPage = (todoTaskStatus) => {
        findTodoPage(1,todoTaskStatus).then(res=>{
            if (res.code===0){
               let data=res.data.dataList;
                if (data.length>5){
                    data=data.slice(0,5)
                }
                setTodoTaskList(data)
            }
        })
    }

    //切换待办类型
    const clickType = (value) => {
        setTodoTaskStatus(value.id)
        getTodoPage(value.id)
    }


    /**
     * 跳转代码文件
     * @param repository
     */
    const goDetails = repository => {

        props.history.push(`/repository/${repository.address}/code`)
    }
    /**
     * 跳转commit
     * @param repository
     */
    const goCommit = (repository) => {
        props.history.push(`/repository/${repository.address}/commits/master`)
    }

    //跳转待办界面
    const goTodoPag = () => {
        props.history.push(`/index/todoList`)
    }

    //修改查询合并请求时间
    const changMergeTime = (value) => {
        setFindMergeTime(value)
    }
    //修改查询提交请求时间
    const changCommitTime = (value) => {
        setFindCommitTime(value)
    }

    const openBorder = (item) => {
      return(
          <Fragment>
              <div className='houseRecent-border-flex'>
                  <Listicon text={item?.repository?.name}
                            colors={item?.repository.color}
                            type={"common"}
                  />
                  <div className='houseRecent-border-text' >
                      {/*{filedState(item?.repository?.name)}*/}
                      {item?.repository?.name}
                  </div>
              </div>
              <div className='houseRecent-border-flex houseRecent-border-text-top'>
                  <div className='houseRecent-border-desc'>
                      <span className='title-color'>分支</span>
                      <span className='desc-text'>{item?.branchNum}</span>
                  </div>
                  <div className='houseRecent-border-desc'>
                      <span className='title-color'>成员</span>
                      <span className='desc-text'>{item?.memberNum}</span>
                  </div>
              </div>
          </Fragment>
      )
    }


    return(
        <div className='homePage page-width drop-down'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='homePage-content'>
                    <div className='houseRecent'>
                        <div className='houseRecent-title'>
                            <Guide title={'常用仓库'}/>
                        </div>
                        {
                            newlyLoading ?
                            <SpinLoading type='table'/>
                            :
                            recordOpenList && recordOpenList.length >0 ?
                                <div className="houseRecent-repository">
                                    {
                                        recordOpenList.map((item,key)=>{
                                            return(
                                                (innerWidth>=1700&&key < 5) &&
                                                    <div key={key} className='houseRecent-border houseRecent-border-width-20' onClick={()=>goDetails(item.repository)}>
                                                        {openBorder(item)}
                                                    </div> ||
                                                (innerWidth<1700&&key < 4) &&
                                                <div key={key} className='houseRecent-border houseRecent-border-width-25' onClick={()=>goDetails(item.repository)}>
                                                    {openBorder(item)}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                            <div className='no-data'>
                                <EmptyText/>
                            </div>
                        }
                    </div>

                    <div className='home-page-statistics'>
                        <div className='home-page-statistics-find'>
                            <Guide title={'代码统计'} />
                            <Select value={findCommitTime}
                                    style={{minWidth:150}}
                                    onChange={value=>changCommitTime(value)}
                                    getPopupContainer={triggerNode => triggerNode.parentElement}
                            >
                                {findData.map(item=>{
                                    return(
                                        <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div className='statistics-content'>
                            <HomeRpyCommit findTime={findCommitTime}/>
                            <HomeUserCommit findTime={findCommitTime}/>
                        </div>
                    </div>

                    <div className='home-page-statistics'>
                        <div className='home-page-statistics-find'>
                            <Guide title={'合并统计'} />
                            <Select value={findMergeTime}
                                    style={{minWidth:150}}
                                    onChange={value=>changMergeTime(value)}
                                    getPopupContainer={triggerNode => triggerNode.parentElement}
                            >
                                {findData.map(item=>{
                                        return(
                                            <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
                                        )
                                    })}
                            </Select>
                        </div>

                        <div className='statistics-content'>
                            <HomeMergeReq findTime={findMergeTime}/>
                            <HomeUserMergeReq findTime={findMergeTime}/>
                        </div>
                    </div>

                  {/*  <div className='newCommit'>
                        <Guide title={'最近提交'} />
                           {
                               commitLoading ?
                               <SpinLoading type='table'/>
                               :
                               recordCommitList && recordCommitList.length > 0 ?
                                   recordCommitList.map((item,key)=>{
                                       return(
                                           <div key={key} className='newCommit-lab ' onClick={()=>goCommit(item?.repository)}>
                                               <div className='newCommit-lab-style'>
                                                   <Listicon text={item?.repository.name} colors={item?.repository.color}/>
                                                   <div>
                                                       <div className='option-commit-nav'>
                                                           <span>{`${item.groupName}`}</span>
                                                           <span className='newCommit-text-sym'>{"/"}</span>
                                                           <span className='newCommit-text-name'>{`${item?.repository.name}`}</span>
                                                       </div>
                                                        <div className='text-desc'>
                                                            <div>{item.commitId.substring(0,8)}:</div>
                                                            <div>{item?.commitMsg}</div>
                                                        </div>
                                                   </div>
                                               </div>
                                               <div className='newCommit-time'>{item?.commitTimeBad}</div>
                                           </div>
                                       )
                                    })
                                    :
                                   <div className='no-data'>
                                       <img  src={noData}  style={{width:40,height:40}}/>
                                       <div>暂无提交记录</div>
                                   </div>

                        }
                    </div>*/}

                    <div className='home-todo'>
                        <div className='home-todo-title'>
                            <Guide title={'待办事项'} />
                        </div>
                        <div className='home-todo-tab'>
                            <div className='todo-tab-item' onClick={goTodoPag}>
                                <img src={all}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.total}</div>
                                    <div>全部待办</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' onClick={goTodoPag}>
                                <img src={progress}  style={{width:35,height:35}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.progress}</div>
                                    <div>进行中</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' onClick={goTodoPag}>
                                <img src={finish}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.end}</div>
                                    <div>已完成</div>
                                </div>
                            </div>
                            <div className='todo-tab-item' onClick={goTodoPag}>
                                <img src={overdue}  style={{width:32,height:32}}/>
                                <div>
                                    <div className='todo-tab-item-num'>{todoSum?.overdue}</div>
                                    <div>逾期</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default HomePage
