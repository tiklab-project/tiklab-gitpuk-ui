import React,{useState,useEffect} from 'react';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryTable from '../../../repository/repository/components/RepositoryTable';
import Listicon from '../../../common/list/Listicon';
import './Repository.scss';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
import {getUser} from "thoughtware-core-ui";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

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


    useEffect( ()=>{
        findRpyPage()
    },[])


    //分页查询仓库
    const findRpyPage = (currentPage,sort) => {
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
        //降序
        if (sorter.order==='descend'){
            findRpyPage (currentPage,"desc")
        }
        //升序
        if (sorter.order==='ascend'){
            findRpyPage (currentPage,"asc")
        }
        if (!sorter.order){
            findRpyPage (currentPage)
        }
    }

    /**
     * 输入搜索的仓库名称
     * @param e
     */
    const onChangeSearch = (e) => {
        const value=e.target.value
        setRepositoryName(value)
    }
    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {

        await findRpyPage(1)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        await findRpyPage(value)
    }

    return (
        <div className='group-repository'>
            <div className=' xcode-repository-width xcode'>
                <div className='group-repository-head'>
                    <BreadcrumbContent firstItem={'Repository'} />
                    <div className='head-right'>
                        <Btn
                            type={'primary'}
                            title={'新建仓库'}
                           /* icon={<PlusOutlined/>}*/
                            onClick={()=>props.history.push(`/repository/new?type=${groupName}`)}
                        />
                    </div>
                </div>

                <div>
                    <Input
                        allowClear
                        placeholder='仓库名称'
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
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
