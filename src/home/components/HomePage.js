import React,{useEffect,useState} from 'react';
import {Tooltip} from 'antd';
import {AimOutlined, CloudUploadOutlined, HistoryOutlined} from '@ant-design/icons';
import homePageStore from "../store/homePageStore"
import Guide from '../../common/guide/Guide';
import EmptyText from "../../common/emptyText/EmptyText";
import Listicon from "../../common/list/Listicon";
import {SpinLoading} from "../../common/loading/Loading";
import './HomePage.scss';

/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {findRecordOpenList,recordOpenList,findRecordCommitList,recordCommitList} = homePageStore

    // 最近打开的加载状态
    const [newlyLoading,setNewlyLoading] = useState(true)

    // 最近提交的加载状态
    const [commitLoading,setCommitLoading] = useState(true)

    useEffect(async ()=>{
        // 获取最近打开的仓库
        findRecordOpenList().then(()=>setNewlyLoading(false))
        // 获取最近提交的仓库
        findRecordCommitList().then(()=>setCommitLoading(false))
    },[])

    /**
     * 跳转仓库all
     */
    const goRepository =async () => {
        props.history.push("/repository")
    }

    /**
     * 跳转代码文件
     * @param repository
     */
    const goDetails = repository => {

        props.history.push(`/repository/${repository.address}/tree`)
    }
    /**
     * 跳转commit
     * @param repository
     */
    const goCommit = (repository) => {
        props.history.push(`/repository/${repository.address}/commits/master`)
    }

    /**
     * 字段过长省略
     * @param value  当前字段参数
     */
    const filedState = (value) => {
        return(
            value?.length>17?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 125,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {value}
                    </div>
                </Tooltip>
                :
                <div>{value}</div>
        )
    }

    return(
        <div className='homePage'>
            <div className='homePage-content xcode-repository-width'>
                <div className='houseRecent'>
                    <div className='houseRecent-title'>
                        <Guide title={'常用仓库'} icon={<HistoryOutlined />}/>
                     {/*   <div className='houseRecent-more-text' onClick={goRepository}>更多</div>*/}
                    </div>

                    {
                        newlyLoading ?
                        <SpinLoading type='table'/>
                        :
                        recordOpenList && recordOpenList.length > 0 ?
                            <div className="houseRecent-repository">
                                {
                                    recordOpenList.map((item,key)=>{
                                        return(
                                            key < 5 ?
                                                <div key={key} className='houseRecent-border' onClick={()=>goDetails(item.repository)}>
                                                    <div className='houseRecent-border-flex'>
                                                        <Listicon text={item?.repository?.name} colors={item?.repository.color}/>
                                                        <div className='houseRecent-border-text' >{filedState(item?.repository?.name)}</div>
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
                                                </div> : null
                                        )
                                    })
                                }
                            </div>
                            :
                            <EmptyText title={'暂无访问的仓库'}/>
                    }

                </div>
                <div className='newCommit'>
                    <Guide title={'最近提交'} icon={<CloudUploadOutlined />}/>
                       {
                           commitLoading ?
                           <SpinLoading type='table'/>
                           :
                           recordCommitList && recordCommitList.length > 0 ?
                               recordCommitList.map((item,key)=>{
                                   return(
                                       <div key={key} className='newCommit-lab newCommit-cursor' onClick={()=>goCommit(item?.repository)}>
                                           <div className='newCommit-lab-style'>
                                               <Listicon text={item?.repository.name} colors={item?.repository.color}/>
                                               <div>
                                                   <div>
                                                       <span>{`${item.groupName}`}</span>
                                                       <span className='newCommit-text-sym'>{"/"}</span>
                                                       <span className='newCommit-text-name'>{`${item?.repository.name}`}</span>
                                                   </div>
                                                    <div className='text-desc'>
                                                        { `推送信息 : ${item?.commitMsg}` }
                                                    </div>
                                               </div>
                                           </div>
                                           <div className='newCommit-time'>{item?.commitTimeBad}</div>
                                       </div>
                                   )
                                })
                                :
                                <EmptyText title={'暂无提交记录'}/>
                    }

                </div>
                <div className='home-pull'>
                    <Guide title={'提交请求'} icon={<AimOutlined/>} />
                    <EmptyText title={'暂无提交请求'}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage
