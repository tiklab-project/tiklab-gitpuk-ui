
/**
 * @Description: 流水线弹窗
 * @Author: limingliang
 * @Date: 2025/4/2
 * @LastEditors: limingliang
 * @LastEditTime: 2025/4/2
 */

import React,{useEffect,useState} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Space, Table, message, Spin} from "antd";
import Listicon from "../../../common/list/Listicon";
import SearchInput from "../../../common/input/SearchInput";
import PipelineStore from "../store/PipelineStore";
import {findArbessUrl, findIntPath, renIcon} from "./Commonet";
import Page from "../../../common/page/Page";
import "./PipelinePop.scss"
const PipelinePop = (props) => {
    const {visible,setVisible,integrationAddress,repositoryId}=props

    const {createIntRelevancy,findUser,findPipelinePage}=PipelineStore
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


   useEffect(()=>{
        if (visible&&integrationAddress){
            setPipelineList([])

            setFindState(true)
            findPipelineList();
        }
    },[visible])


    //查询流水线的列表
    const findPipelineList =  (currentPage,pipelineName) => {
        const intPath=findIntPath(integrationAddress.integrationAddress)
        const userPath= findArbessUrl(intPath,"user");
         findUser(userPath,integrationAddress.account).then(res=>{
            if (res.code===0){
                const pipelinePath= findArbessUrl(intPath,"pipeline");
                const param={pageParam:{currentPage:currentPage,pageSize:pageSize},
                    userId:res.data.id,
                    pipelineName:pipelineName
                }
                findPipelinePage(pipelinePath,param).then(res=>{
                    setFindState(false)
                    setPipelineList(res.data.dataList)
                    setTotalPage(res.data.totalPage)
                    setCurrentPage(res.data.currentPage)
                    setTotalRecord(res.data.totalRecord)
                })
            }else {
                setFindState(false)
            }
        })
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
        createIntRelevancy({repositoryId:repositoryId,relevancyIdList:pipelineIdList}).then(res=>{
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
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
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
            title={"关联流水线"}
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
