import {observer} from "mobx-react";
import React,{useEffect,useState,Fragment} from 'react';
import {Tooltip, Col, Select} from 'antd';
import homePageStore from "../store/homePageStore";
import "./TodoPageList.scss"
import Page from "../../common/page/Page";
import HomePageTodo from "./HomePageTodo";
import EmptyText from "../../common/emptyText/EmptyText";
import Tabs from "../../common/tabs/Tabs";
const TodoPageList = (props) => {

    const {findTodoPage} = homePageStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    //待办
    const [todoTaskList,setTodoTaskList]=useState([])
    //待办状态
    const [todoTaskStatus,setTodoTaskStatus]=useState(1)


    useEffect(async ()=>{
        getTodoPage()
    },[])


    //分页查询待办
    const getTodoPage = (todoTaskStatus,currentPage) => {
        findTodoPage(currentPage,todoTaskStatus).then(res=>{
            setTodoTaskList(res.data.dataList)
            setTotalPage(res.data.totalPage)
            setTotalRecord(res.data.totalRecord)
            setCurrentPage(res.data.currentPage)
        })
    }

    //切换待办类型
    const clickType = (value) => {
        setTodoTaskStatus(value.id)
        getTodoPage(value.id,1)
    }

    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        getTodoPage(todoTaskStatus,value)
    }

    const refreshFind = () => {
        getTodoPage(todoTaskStatus,currentPage)
    }

    return(
        <div className='todo-page page-width'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='todo-page-data'>
                    <div className='todo-page-title'>
                        <Tabs
                            type={todoTaskStatus}
                            tabLis={[
                                {id:1, title:'进行中'},
                                {id:2, title:'已完成'},
                            ]}
                            onClick={clickType}
                        />
                      {/*  <div>
                            <Select
                                placeholder="项目"
                                allowClear
                                className="todo-select"
                                key="project"
                                onChange={(value) => changeRepository(value)}
                                width={200}
                            >
                                {
                                    projectList && projectList.map((item) => {
                                        return <Select.Option value={item.id} key={item.id}>{item.projectName}</Select.Option>
                                    })
                                }
                            </Select>
                        </div>*/}
                    </div>

                    <div className='todo-page-border'>
                        {
                            todoTaskList&& todoTaskList.length>0?todoTaskList.map((item,index)=>{
                                return <HomePageTodo {...props} todoTask={item} index={index}/>
                            }):<EmptyText title={'暂无待办事项'}/>
                        }
                    </div>
                    {
                        totalPage>1&&
                        <Page pageCurrent={currentPage}
                              changPage={changPage}
                              totalPage={totalPage}
                              totalRecord={totalRecord}
                              refresh={refreshFind}
                        />
                    }

                </div>
            </Col>
        </div>
    )
}
export default observer(TodoPageList)
