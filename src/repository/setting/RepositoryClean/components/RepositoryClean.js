/**
 * @name: WarehouseClean
 * @date: 2023-12-21 14:30
 * @description：仓库清理
 * @update: 2023-12-21 14:30
 */
import React ,{useEffect,useState}from 'react';
import "./RepositoryClean.scss"
import BreadcrumbContent from "../../../../common/breadcrumb/Breadcrumb";
import {Col, InputNumber, message, Popconfirm, Space, Table, Tooltip} from "antd";
import {SpinLoading} from "../../../../common/loading/Loading";
import EmptyText from "../../../../common/emptyText/EmptyText";
import RepositoryCleanStore from "../store/RepositoryCleanStore";
import {inject, observer} from "mobx-react";
import Btn from "../../../../common/btn/Btn";
import {DeleteOutlined, SettingOutlined} from "@ant-design/icons";
import CleanLogDrawer from "./CleanLogDrawer";
import CleanOrderDrawer from "./CleanOrderDrawer";


const RepositoryClean = (props) => {
    const {repositoryStore,match} = props

    const {findRepositoryByAddress} = repositoryStore
    const {findLargeFile,findLargeFileResult,largeFileList,sortLargeFile,clearLargeFile,execState,setExecState,execCleanFile,refresh}=RepositoryCleanStore

    const [repository,setRepository]=useState(null)
    const [fileList,setFileList]=useState([])  //文件list
    const [isLoading,setIsLoading]=useState(false)
    const [fileSize,setFileSize]=useState(1)


    const [visible,setVisible]=useState(false)
    const [resultData,setResultData]=useState(null)  //获取清除结果
    const [choiceFileList,setChoiceFileList]=useState([])  //选中的文件list

    const webUrl = `${match.params.namespace}/${match.params.name}`


    useEffect(async () => {
        findRepository()

    }, [refresh]);

    const columns = [
        {
            title: '文件名称',
            dataIndex: 'fileName',
            key: 'fileName',
            width:'80%',
        },
        {
            title: '文件大小',
            dataIndex: 'size',
            key:'size',
            width:'20%',
            sorter: (a, b) => a.size - b.size,
        },
    ]


    const findRepository = () => {
        findRepositoryByAddress(webUrl).then(res=>{
            if (res.code===0){
                setRepository(res.data)
                findLargeFileList(res.data)
            }
        })
    }



    //条件查询文件
    const findLargeFileList = (repository) => {
        if (Number.isInteger(fileSize)&&fileSize>0){
            findLargeFile({repositoryId:repository.rpyId,fileSize:fileSize}).then(res=>{
                if (res.code===0&&res.data==='OK'){
                    if (!execState){
                        setExecState(true)
                        findFileTime(repository)
                    }

                }
            })
        }else {
            message.error('只能为整数')
        }
    }


    //扫描定时任务
    const findFileTime =async(repository)=>{
        let timer=setInterval(()=>{
            findLargeFileResult({repositoryId:repository.rpyId}).then(res=>{
                if (res.code===0){
                    clearInterval(timer)
                    setExecState(false)
                }else {
                    message.success('查询失败',1)
                    setExecState(false)
                    clearInterval(timer)
                }
            })
        },1000)
    }


    //排序
    const onChange = (pagination, filters, sorter, extra) => {
        //降序
        if (sorter.order==='descend'){
            sortLargeFile("desc")
        }
        //升序
        if (sorter.order==='ascend'){
            sortLargeFile("asc")

        }
        if (!sorter.order){
            sortLargeFile()
        }
    }

    //修改文件大小
    const cutChangeSize = (value) => {
        if (Number.isInteger(value)&&value>0){
            setFileSize(value)
        }else {
            message.error('只能为整数')
        }
    }

    //清除大文件
    const cleanLarge = (value) => {
       // clearData()
        setResultData(null)
        setVisible(true)
      /*  clearLargeFile({repositoryId:repository?.rpyId,fileNameList:choiceFileList}).then(res=>{
            if (res.code===0){
                if (res.data==="OK"){

                    findCleanResult()
                }
            }
        })*/
    }


    return(
        /*<div className='xcode-setting-with repository-setting-width xcode'>*/
         <div className='xcode  clean'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={'仓库清理'}/>
                <div className='clean-table-style'>
                    <div className='clean-condition-style'>
                        <div className='clean-condition-title'>仓库名称:</div>
                        <div className='clean-condition-data'>{repository?.name}</div>
                    </div>
                    <div className='clean-condition-style clean-condition-height'>
                        <div className='clean-condition-title'>仓库大小:</div>
                        <div className='clean-condition-data'>
                            {repository?.rpySize}
                        </div>
                    </div>
                    <div className='clean-condition-style'>

                        <div className='clean-condition-title'>筛选条件:</div>
                        <div className='clean-condition-data'>
                            <span>大于</span>
                            <span className='clean-condition-desc'>
                              <InputNumber min={1}  value={fileSize} onChange={cutChangeSize} />
                        </span>
                            <span>M</span>
                        </div>
                        {
                            execState?
                                <Btn   type={'primary'} title={'加载中'} />:
                                <Btn onClick={()=>findLargeFileList(repository)} type={'primary'} title={'查询'}/>
                        }
                    </div>
                    {
                        choiceFileList.length>0&&
                        <div className='clean-style'>
                            <div className='clean-num'>清除数：{choiceFileList.length}</div>
                            <div onClick={cleanLarge}>
                                <Btn  type={'common'} title={'生成清理命令'}/>
                            </div>
                        </div>
                    }
                    <div className={`${choiceFileList.length>0?'clean-table-5':"clean-table-20"}`}>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                selectedRowKeys:choiceFileList,
                                onChange: (selectedRowKeys) => {
                                    setChoiceFileList(selectedRowKeys);
                                },
                            }}
                            bordered={false}
                            columns={columns}
                            dataSource={largeFileList}
                            rowKey={record=>record.fileName}
                            pagination={false}
                            onChange={onChange}
                            locale={{emptyText: isLoading ?
                                    <SpinLoading type="table"/>: <EmptyText title={"没有文件"}/>}}
                        />
                    </div>
                </div>
            </Col>
            <CleanOrderDrawer visible={visible} setVisible={setVisible} repository={repository}
                              choiceFileList={choiceFileList} execCleanFile={execCleanFile}/>
        </div>
    )

}
export default inject('repositoryStore')(observer(RepositoryClean))

