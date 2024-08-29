/**
 * 合并请求
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState} from 'react';
import {Col} from 'antd';
import {
    SearchOutlined,
    PullRequestOutlined,
} from '@ant-design/icons';
import BreadcrumbContent from '../../common/breadcrumb/Breadcrumb';
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
import Btn from '../../common/btn/Btn';
import Tabs from '../../common/tabs/Tabs';
import EmptyText from '../../common/emptyText/EmptyText';
import MergeDetails from './MergeDetails';
import './Merge.scss';
import MergeStore from "../store/MergeStore";
import {inject, observer} from "mobx-react";
import Page from "../../common/page/Page";
import SearchInput from "../../common/input/SearchInput";


const Merge = (props) => {
    const {repositoryStore,webUrl}=props
    const {findMergeRequestPage,findMergeStateNum,fresh}=MergeStore
    const {repositoryInfo} = repositoryStore
    const [mergeType,setMergeType] = useState(0)
    const [details,setDetails] = useState(false)

    const [mergeNum,setMergeNum]=useState(null)  //合并请求数

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)
    const [mergeRequestList,setMergeRequest]=useState([])   //合并请求list

    const [mergeReqTitle,setMergeReqTitle]=useState()  //搜索合并分支请求的标题


    useEffect(()=>{
        getMergeRequestPage(1)
        findMergeStateNum({rpyId:repositoryInfo.rpyId}).then(res=>{
            res.code===0&&setMergeNum(res.data)
        })
    },[repositoryInfo,fresh])


    //条件分页查询 合并请求
    const getMergeRequestPage = (currentPage,mergeState) => {
        findMergeRequestPage({
            pageParam:{currentPage:currentPage,pageSize:pageSize},
            rpyId:repositoryInfo.rpyId,
            mergeState:mergeState,
            title:mergeReqTitle
        }).then(res=>{
            setMergeRequest(res.data?.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
            setCurrentPage(res.data.currentPage)
        })
    }

    //切换类型
    const clickType = item => {
        setMergeType(item.id)
        if (item.id===0){
            getMergeRequestPage(1)
        }else {
            getMergeRequestPage(1,item.id)
        }
    }


    //跳转合并分支确认
    const goDetails = (value) => {
        props.history.push(`/repository/${webUrl}/mergeAdd/${value.id}`)
       // setDetails(true)
    }


    //输入搜合并分支请求名称
    const onChangeSearch = (e) => {
        const value = e.target.value
        if (value === '') {
            setMergeReqTitle(null)
        } else {
            setMergeReqTitle(value)
        }
    }
    //通过标题搜索合并分支的请求
    const onSearch = () => {
        if (mergeType===0){
            getMergeRequestPage(1)
        }else {
            getMergeRequestPage(1,mergeType)
        }
    }

    //分页查询
    const changPage = (value) => {
        setCurrentPage(value)
        if (mergeType===0){
            getMergeRequestPage(value)
        }else {
            getMergeRequestPage(value,mergeType)
        }
    }
    const refreshFind = () => {
        getMergeRequestPage(currentPage,mergeType)
    }


    //跳转添加合并分支页面
    const goMergeAdd = () => {
        props.history.push(`/repository/${webUrl}/mergeAdd`)
    }

    if(details){
        return  <MergeDetails
                    setDetails={setDetails}
                />
    }

    const lis = [
        {
            id:0,
            title:`全部 ${mergeNum&&mergeNum.allNum?mergeNum.allNum:0}`,
        },
        {
            id:1,
            title:`已开启 ${mergeNum&&mergeNum.openNum?mergeNum.openNum:0}`,
        },
        {
            id:2,
            title:`已合并 ${mergeNum&&mergeNum.mergeNum?mergeNum.mergeNum:0}`,
        },
        {
            id:3,
            title:`已关闭 ${mergeNum&&mergeNum.closeNum?mergeNum.closeNum:0}`,
        },
    ]

    return (
        <div className='xcode page-width merge'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='merge-content '>
                    <div className='merge-top'>
                        <BreadcrumbContent firstItem={'Merge Requests'}/>
                        <PrivilegeProjectButton code={"rpy_merge"} domainId={repositoryInfo && repositoryInfo.rpyId}>
                            <Btn
                                type={'primary'}
                                title={'新建合并请求'}
                                /* icon={<PlusOutlined/>}*/
                                onClick={goMergeAdd}
                            />
                        </PrivilegeProjectButton>
                    </div>
                    <div className='merge-filter'>
                        <Tabs
                            type={mergeType}
                            tabLis={lis}
                            onClick={clickType}
                        />
                        <SearchInput
                            placeholder='搜索合并请求'
                            onChange={onChangeSearch}
                            onPressEnter={onSearch}
                        />
                    </div>
                    <div className='merge-tables'>
                        {
                            mergeRequestList?.length>0?mergeRequestList.map((merge,index)=>{
                                return(
                                    <div key={index} className='tables-nav' onClick={()=>goDetails(merge)}>
                                        <div className='tables-nav-style'>
                                            <div className='tables-nav-left' >
                                              <span className='tables-nav-icon'>
                                                  <PullRequestOutlined className='tables-nav-icon-merge'/>
                                              </span>
                                                <div>
                                                    <div className='tables-nav-title'>{merge.title}</div>
                                                    <div className='tables-nav-desc'>

                                                        <div>
                                                            <span>{merge.user.name}</span>
                                                            <span>  发起于{merge.createTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='tables-nav-right'>
                                                <div>
                                                    <div className='tables-nav-right-style'>
                                                        {
                                                            ( merge.mergeState===1&&merge.isClash===0)&&
                                                            <div className='tables-nav-state'>
                                                                可合并
                                                            </div>||
                                                            merge.mergeState===1&&merge.isClash===1&&
                                                            <div className='tables-nav-state-clash'>
                                                                文件冲突
                                                            </div>||
                                                            merge.mergeState===2&&
                                                            <div className='tables-nav-state-merge'>
                                                                已合并
                                                            </div>||
                                                            merge.mergeState===3&&<div className='tables-nav-state-close'>
                                                                已关闭
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className='tables-nav-right-desc'>
                                                        <span>{merge.mergeOrigin}</span>
                                                        <span>-></span>
                                                        <span>{merge.mergeTarget}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }):
                                <EmptyText title={'暂无合并请求'} />
                        }
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(Merge))
