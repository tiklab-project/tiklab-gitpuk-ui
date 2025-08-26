
/**
 * @Description: 流水线弹窗
 * @Author: limingliang
 * @Date: 2025/4/2
 * @LastEditors: limingliang
 * @LastEditTime: 2025/4/2
 */

import React,{useEffect,useState} from 'react';
import Modals from "../../../../common/modal/Modal";
import Btn from "../../../../common/btn/Btn";
import {Space, Table, message, Spin} from "antd";
import Listicon from "../../../../common/list/Listicon";
import SearchInput from "../../../../common/input/SearchInput";
import {findArbessUrl, findIntPath, renIcon} from "./Commonet";
import Page from "../../../../common/page/Page";
import "./PipelinePop.scss"
import IntegrateInStore from "../../store/IntegrateInStore";
const PipelinePop = (props) => {
    const {visible,setVisible,integrationAddress,repositoryId,relevancyPipelineList}=props

    const {findPipelinePage,createIntRelevancy}=IntegrateInStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)
    //条件查询所有的流水线list
    const [pipelineList,setPipelineList]=useState([])

    //选中的流水线id的list
    const [pipelineIdList,setPipelineIdList]=useState([])
    const [findState,setFindState]=useState(false)

    //搜索名字
    const [searchName,setSearchName]=useState()
    const [sameIdList,setSameIdList]=useState([])


   useEffect(()=>{
        if (visible&&integrationAddress){
            setPipelineList([])

            setFindState(true)
            findPipelineList();
        }
    },[visible])


    //查询流水线的列表
    const findPipelineList =  (currentPage,pipelineName) => {
        findPipelinePage({
            address:integrationAddress.integrationAddress,
            pipelineName:pipelineName,
            userName:integrationAddress.account,
            password:integrationAddress.password,
            pageParam:{currentPage:currentPage, pageSize:pageSize}
        }).then(res=>{
            setFindState(false)
            setPipelineList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setCurrentPage(res.data.currentPage)
            setTotalRecord(res.data.totalRecord)

            getSameId(res.data.dataList)
        })
    }

    //获取相同的
    const getSameId = (data) => {
        // 创建一个包含 list2 中 id 的 Set
        const relevancyIdSet = new Set(relevancyPipelineList.map(item => item.relevancyId));

        // 获取 list1 中 id 在 idsSet 中的对象
        const commonElements = data.filter(item => relevancyIdSet.has(item.id));

        setSameIdList(commonElements)
    }


    //分页
    const changPage = (value) => {
        setFindState(true)
        setCurrentPage(value)
        findPipelineList(value,searchName)
    }

    const refreshFind = () => {
        setFindState(true)
        findPipelineList(currentPage,searchName)
    }


    const onOk = () => {
        createIntRelevancy({repositoryId:repositoryId,
            relevancyIdList:pipelineIdList,
            type:"pipeline"
        }).then(res=>{
            if (res.code===0){
                setVisible(false)
            }
        })
    }

    /**
     * 输入搜索的仓库名称
     * @param e
     */
    const onChangeSearch = (e) => {
        setFindState(true)
        const value=e.target.value
        setSearchName(value)
        if (value===''){
            findPipelineList(1)
        }else {
            findPipelineList(1,value)
        }
    }



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setPipelineIdList(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: sameIdList.includes(record.id),
            id: record.id,
        }),
    };

    //跳转添加集成地址
    const goSystemInt = () => {
        props.history.push(`/setting/systemInt`)
    }



    const columns = [
        {
            title: "流水线名称",
            dataIndex: "name",
            key: "name",
            width:"60%",
            ellipsis:true,
            render:(text,record)=>{
                return  <span>
                             <Listicon text={text} colors={record.color} type={"common"}/>
                            <span>{text}</span>
                        </span>
            }
        },
        {
            title: "最近构建信息",
            dataIndex: "lastBuildTime",
            key: "lastBuildTime",
            width:"40%",
            ellipsis:true,
            render:(text,record) =>{
                const {buildStatus,number} = record
                return (
                    <span>
                        { text || '无构建' }
                        { number &&
                            <span className='pipeline-number'># {number}
                                <span className='pipeline-number-desc'>{renIcon(buildStatus)}</span>
                            </span>
                        }
                    </span>
                )
            }
        },

    ]



    const modalFooter = (
        <>
            <Btn onClick={()=>setVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={integrationAddress?modalFooter:null}
            destroyOnClose={true}
            width={integrationAddress?750:450}
            title={"关联CI/CD"}
        >
            {
                integrationAddress?
                    <div className='pipeline-pop'>
                        <div style={{paddingTop:10,paddingBottom:10}}>
                            <SearchInput {...props}
                                         placeholder={"搜索流水线名称"}
                                         onChange={onChangeSearch}

                            />
                        </div>
                        <Spin spinning={findState}>
                            <Table
                                rowSelection={{
                                    type: "checkbox",
                                    ...rowSelection,
                                }}
                                bordered={false}
                                columns={columns}
                                dataSource={pipelineList}
                                rowKey={record=>record.id}
                                pagination={false}
                            />
                            <Page pageCurrent={currentPage}
                                  changPage={changPage}
                                  totalPage={totalPage}
                                  totalRecord={totalRecord}
                                  refresh={refreshFind}
                            />
                        </Spin>

                    </div>:
                    <div className={"pipeline-pop-hint"}>
                        需要先添加集成地址,
                        <span className='pop-hint-exec' onClick={goSystemInt}>现在添加</span>
                    </div>
            }
        </Modals>
    )

}
export default PipelinePop
