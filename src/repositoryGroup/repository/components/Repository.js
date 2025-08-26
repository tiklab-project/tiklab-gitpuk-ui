import React,{useState,useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryTable from '../../../repository/repository/components/RepositoryTable';
import './Repository.scss';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
import {getUser} from "tiklab-core-ui";
import {Col, Input, Select} from "antd";
import SearchInput from "../../../common/input/SearchInput";
import Page from "../../../common/page/Page";
const Repository = props =>{
    const {match}=props
    const groupName = match.params.name

    const {repositoryStore}=props
    const {findGroupRepository,createOpenRecord}=repositoryStore
    const {groupInfo}=groupStore
    const [isLoading,setIsLoading]=useState(false)


    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)
    const [totalRecord,setTotalRecord]=useState()

    const [repositoryList,setRepositoryList]=useState([])

    //查询仓库的名称
    const [repositoryName,setRepositoryName]=useState()
    const [sort,setSort]=useState(null)

    const [rules,setRules]=useState()

    useEffect( ()=>{
        findRpyPage()
    },[rules])


    //分页查询仓库
    const findRpyPage = (currentPage,sort,repositoryName) => {
        setIsLoading(true)
        findGroupRepository({pageParam:{currentPage:currentPage, pageSize:pageSize},
            userId:getUser().userId,
            groupName:groupName,
            name:repositoryName,
            sort:sort,
            rules:rules
        }).then(res=>{
            if (res.code===0){
                setIsLoading(false)
                setRepositoryList(res.data?.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
                setTotalRecord(res.data.totalRecord)
            }

        })
    }


    const onChange = (pagination, filters, sorter, extra) => {
        setSort(sorter.order)
        //降序
        if (sorter.order==='descend'){
            findRpyPage (currentPage,"desc",repositoryName)
        }
        //升序
        if (sorter.order==='ascend'){
            findRpyPage (currentPage,"asc",repositoryName)
        }
        if (!sorter.order){
            findRpyPage (currentPage,null,repositoryName)
        }
    }

    /**
     * 输入搜索的仓库名称
     * @param e
     */
    const onChangeSearch = (e) => {
        const value=e.target.value
        setRepositoryName(value)
        if (value===''){
             setCurrentPage(1)
            findRpyPage(1,sort)
        }
    }
    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {

        await findRpyPage(1,sort,repositoryName)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        await findRpyPage(value,sort,repositoryName)
    }


    //切换权限
    const changAuth = (value) => {
        setRules(value)
    }

    return (
        <div className='xcode page-width group-repository drop-down'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='group-repository-head'>
                    <BreadcrumbContent firstItem={'Repository'} />
                 {/*   <PrivilegeProjectButton code={"rpy_group_rpy_add"} domainId={groupInfo && groupInfo.groupId}>

                    </PrivilegeProjectButton>*/}
                    <div className='head-right'>
                        <Btn
                            type={'primary'}
                            title={'新建仓库'}
                            /* icon={<PlusOutlined/>}*/
                            onClick={()=>props.history.push(`/repository/add?group=${groupName}`)}
                        />
                    </div>
                </div>

                <div className='group-repository-filter'>
                    <SearchInput
                        placeholder='搜索仓库组名称'
                        onChange={onChangeSearch}
                        onPressEnter={onSearch}
                    />

                    <Select  allowClear onChange={value=>changAuth(value)} style={{minWidth:140}} placeholder='可见范围'>
                        <Select.Option value={"private"}>{"私有"}</Select.Option>
                        <Select.Option value={"public"}>{"公开"}</Select.Option>
                    </Select>
                </div>


                    <RepositoryTable
                        {...props}
                        isLoading={isLoading}
                        repositoryList={repositoryList}
                        createOpenRecord={createOpenRecord}
                        onChange={onChange}
                        type={'group'}
                    />

                <Page pageCurrent={currentPage}
                      changPage={changPage}
                      totalPage={totalPage}
                      totalRecord={totalRecord}
                    /*  refresh={refreshFind}*/
                />
            </Col>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
