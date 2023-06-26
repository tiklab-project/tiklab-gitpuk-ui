import React,{useEffect,useState} from 'react';
import {Space, Spin, Tooltip} from 'antd';
import {AimOutlined,HistoryOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Guide from '../../common/guide/Guide';
import EmptyText from "../../common/emptyText/EmptyText";
import './HomePage.scss';
import {getUser} from "tiklab-core-ui";
import Listicon from "../../common/list/Listicon";
import groupStore from "../../repositoryGroup/repositoryGroup/store/RepositoryGroupStore"
/**
 * 首页
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = props =>{

    const {repositoryStore} = props

    const {findRecordOpenList,recordOpenList,createOpenRecord,findRecordCommitList,recordCommitList} = repositoryStore
    const {findUserGroup,groupList} = groupStore

    const [openState,setOpenState]=useState(false)
    useEffect(async ()=>{

        // 仓库组
        findUserGroup()

       await findRepository()
    },[])

    const findRepository =async () => {
        setOpenState(true)
        await findRecordOpenList()

        await findRecordCommitList()

        setOpenState(false)
    }

    const renderStableList = item => {
        return(
            <div key={item.id} className='quickIn-group' onClick={()=>props.history.push(item.to)}>
                <div className='quickIn-group-wrap'>
                    <div className='quickIn-group-title'>
                        <span className='quickIn-group-icon'>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref={`${item.icon}`}/>
                            </svg>
                        </span>
                        <span>{item.title}</span>
                    </div>
                    <div className='quickIn-group-number'>
                        {item.listLength}
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 跳转仓库all
     */
    const goRepository =async () => {
        props.history.push("/index/repository")
    }

    /**
     * 跳转代码文件
     * @param text
     * @param record
     */
    const goDetails = (repository) => {
        createOpenRecord(repository.rpyId)
        props.history.push(`/index/repository/${repository.rpyId}/tree`)
    }
    /**
     * 跳转commit
     * @param repository
     */
    const goCommit = (repository) => {
        props.history.push(`/index/repository/${repository.rpyId}/commits/master`)
    }

    /**
     * 字段过长省略
     * @param value  当前字段参数
     */
    const filedState = (value) => {
        return(
            value?.length>20?
                <Tooltip placement="right" title={value}>
                    <div style={{
                        width: 110,
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
            <Spin  spinning={openState}>
                <div className='homePage-content xcode-home-limited'>

                    <div className='houseRecent'>
                        <div className='houseRecent-title'>
                            <Guide title={'最近访问的仓库'} icon={<HistoryOutlined />}/>
                            <div className='houseRecent-more-text' onClick={goRepository}>更多</div>
                        </div>
                        {
                            !openState&&recordOpenList?
                                <div className="houseRecent-repository">
                                    {
                                        recordOpenList?.map((item,key)=>{
                                            return(
                                                key<6?
                                                    <div key={key} className='houseRecent-border' onClick={()=>goDetails(item.repository)}>
                                                        <div className='houseRecent-border-flex'>
                                                            <Listicon text={item?.repository?.name}/>
                                                            <div className='houseRecent-border-text' >{filedState(item?.repository?.name)}</div>
                                                        </div>
                                                        <div className='houseRecent-border-flex houseRecent-border-text-top'>
                                                            <div className='houseRecent-border-desc'>
                                                                <span className='title-color'>分支</span>
                                                                <span className='desc-text'>2</span>
                                                            </div>
                                                            <div className='houseRecent-border-desc'>
                                                                <span className='title-color'>成员</span>
                                                                <span className='desc-text'>5</span>
                                                            </div>
                                                        </div>
                                                    </div>:null
                                            )
                                        })
                                    }
                                </div>:

                                <EmptyText title={'暂无访问的仓库'}/>
                        }

                    </div>
                    <div className='newCommit'>
                        <Guide title={'最近提交的仓库'} icon={<HistoryOutlined />}/>
                        {
                           recordCommitList?
                               <div className=''>
                                   {
                                       recordCommitList?.map((item,key)=>{
                                           return(
                                               <div key={key} className='newCommit-lab newCommit-cursor' onClick={()=>goCommit(item?.repository)}>
                                                   <div className='newCommit-lab-style'>
                                                       <Listicon text={item?.repository.name}/>
                                                       <div>
                                                           <div className='newCommit-text-name'>{item?.repository.name}</div>
                                                           <div className='newCommit-desc'>{item?.repository.remarks}</div>
                                                       </div>
                                                   </div>
                                                   <div className='newCommit-time'>{item?.commitTimeBad}</div>
                                               </div>
                                           )
                                       })
                                   }
                               </div>
                                :
                                <EmptyText title={'暂无访问的仓库'}/>
                        }

                    </div>
                    <div className='home-dyna'>
                        <Guide title={'Pull requests'} icon={<AimOutlined/>} />
                        <EmptyText title={'暂无pull请求'}/>
                    </div>
                </div>
            </Spin>

        </div>
    )
}

export default inject('repositoryStore')(observer(HomePage))
