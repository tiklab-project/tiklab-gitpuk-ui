/**
 * @name: UserList
 * @author: limingliang
 * @date: 2023-08-30 14:30
 * @description：用户列表
 * @update: 2023-8-30 14:30
 */
import React, {useState,useEffect} from "react";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import {Col, Table} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import XcodeUserStore from "../store/XcodeUserStore";
import {observer} from "mobx-react";
import "./UserList.scss"
import UserIcon from "../../../common/list/UserIcon";
import SearchInput from "../../../common/input/SearchInput";
import Page from "../../../common/page/Page";
const UserList = (props) => {

    const {findUserAndRpy}=XcodeUserStore

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(10)
    const [gitPukUserList,setGitPukUserList]=useState([])
    const [userName,setUserName]=useState('')


    useEffect( ()=>{
        getUserAndRpy(1)
    },[])

    const columns = [
        {
            title: '用户名',
            dataIndex: 'nickName',
            key: 'nickName',
            width:'40%',
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className='user-list-tables-name'  onClick={()=>goRpyList(record.userId,'repository')}>
                        <UserIcon text={text} size={"middle"}/>
                        <div className='name-text-title'>
                            {text}
                        </div>
                    </div>
                )
            }
        },
        {
            title: '用户',
            dataIndex: 'userName',
            key: 'userName',
            width:'40%',
            ellipsis:true,
        },
        {
            title: '仓库组数',
            dataIndex: 'groupNum',
            key: 'groupNum',
            width:'20%',
            ellipsis:true,
            render:(text,record)=><div className='user-list-tables-rpy' >{text}</div>
        },
        {
            title: '仓库数',
            dataIndex: 'repositoryNum',
            key: 'repositoryNum',
            width:'20%',
            ellipsis:true,
            render:(text,record)=><div className='user-list-tables-rpy' onClick={()=>goRpyList(record.userId,'repository')}>{text}</div>
        },
    ]

    //查询
    const getUserAndRpy = (currentPage,userName) => {
        findUserAndRpy({ pageParam:{currentPage:currentPage,pageSize:pageSize},
            userName:userName
        }).then(res=>{
            if (res.code===0){
                setGitPukUserList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }
        })
    }




    const goRpyList = (userId,type) => {
        if (type==='repository'){
            props.history.push(`/setting/power/repository/${userId}`)
        }else {
            props.history.push(`/setting/power/group/${userId}`)
        }
    }

    /**
     * 搜索用户
     * @returns {Promise<void>}
     */
    const onSearch =async () => {
        getUserAndRpy(1,userName)
    }

    const onChangeSearch = (e) => {
        const value=e.target.value
        setUserName(value)
        if (value===''){
            getUserAndRpy(1)
        }
    }

    //分页
    const changPage = (value) => {
        setCurrentPage(value)
        getUserAndRpy(value,userName)
    }
    //刷新查询
    const refreshFind = () => {
        getUserAndRpy(currentPage,userName)
    }

    return(
        <div className='xcode page-width user-list'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "22", offset: "1" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <BreadcrumbContent firstItem={'成员权限'}/>

                <div className='user-list-search'>
                    <SearchInput {...props}
                                 placeholder={"搜索用户名"}
                                 onChange={onChangeSearch}
                                 onPressEnter={onSearch}
                    />
                </div>
                <Table
                    bordered={false}
                    columns={columns}
                    dataSource={gitPukUserList}
                    rowKey={record=>record.id}
                    pagination={false}
                    locale={{emptyText: <EmptyText title={'暂无数据'}/>}}
                />

                <Page pageCurrent={currentPage}
                      changPage={changPage}
                      totalPage={totalPage}
                      totalRecord={totalRecord}
                      refresh={refreshFind}
                />
            </Col>

        </div>
    )
}
export default observer(UserList)
