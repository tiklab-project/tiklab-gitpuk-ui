import React,{useState,useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryTable from '../../../repository/repository/components/RepositoryTable';
import './Repository.scss';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
import {getUser} from "thoughtware-core-ui";
import {Col, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {PrivilegeProjectButton} from 'thoughtware-privilege-ui';
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

    const [repositoryList,setRepositoryList]=useState([])

    //查询仓库的名称
    const [repositoryName,setRepositoryName]=useState()
    const [sort,setSort]=useState(null)

    useEffect( ()=>{
        findRpyPage()
    },[])


    //分页查询仓库
    const findRpyPage = (currentPage,sort,repositoryName) => {
        setIsLoading(true)
        findGroupRepository({pageParam:{currentPage:currentPage, pageSize:pageSize},
            userId:getUser().userId,
            groupName:groupName,
            name:repositoryName,
            sort:sort
        }).then(res=>{
            if (res.code===0){
                setIsLoading(false)
                setRepositoryList(res.data?.dataList)
                setTotalPage(res.data.totalPage)
                setCurrentPage(res.data.currentPage)
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

    return (
        <div className='xcode page-width group-repository'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='group-repository-head'>
                    <BreadcrumbContent firstItem={'Repository'} />
                    <PrivilegeProjectButton code={"rpy_group_rpy_add"} domainId={groupInfo && groupInfo.groupId}>
                        <div className='head-right'>
                            <Btn
                                type={'primary'}
                                title={'新建仓库'}
                                /* icon={<PlusOutlined/>}*/
                                onClick={()=>props.history.push(`/repository/new?group=${groupName}`)}
                            />
                        </div>
                    </PrivilegeProjectButton>
                </div>
                <div>
                    <Input
                        allowClear
                        placeholder='搜索仓库名称'
                        onChange={onChangeSearch}
                        onPressEnter={onSearch}
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                    />

                    <RepositoryTable
                        {...props}
                        isLoading={isLoading}
                        repositoryList={repositoryList}
                        createOpenRecord={createOpenRecord}
                        changPage={changPage}
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onChange={onChange}
                        type={'group'}
                    />
                </div>
            </Col>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
