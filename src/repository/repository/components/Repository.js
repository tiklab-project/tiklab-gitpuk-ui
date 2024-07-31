import React,{useState,useEffect} from 'react';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Col, Dropdown, Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import RepositoryTable from "./RepositoryTable";
import './Repository.scss';
import {getUser} from "thoughtware-core-ui";
import {PrivilegeButton} from 'thoughtware-privilege-ui';
const Repository = props => {

    const {repositoryStore} = props

    const {findRepositoryPage,createOpenRecord} = repositoryStore

    // 仓库分类
    const [repositoryType,setRepositoryType] = useState("viewable")

    //查询仓库的名称
    const [repositoryName,setRepositoryName]=useState()
    const [repositoryList,setRepositoryList]=useState([])

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [totalRecord,setTotalRecord]=useState()
    const [pageSize]=useState(15)

    const [isLoading,setIsLoading]=useState(false)
    const [sort,setSort]=useState(null)


    useEffect(async ()=>{
       await findRpyPage(1,repositoryType)
    },[])

    //分页查询仓库列表
    const findRpyPage =async (currentPage,repositoryType,sort) => {
         setIsLoading(true)
       findRepositoryPage({ pageParam:{currentPage:currentPage,pageSize:pageSize},
               userId:getUser().userId,
               name: repositoryName,
               findType:repositoryType,
               sort:sort
           }).then(res=>{
           setIsLoading(false)
               if (res.code===0){
                   setRepositoryList(res.data?.dataList)
                   setTotalPage(res.data.totalPage)
                   setCurrentPage(res.data.currentPage)
                   setTotalRecord(res.data.totalRecord)
               }
       })
    }

    /**
     * l
     * 切换仓库类型
     * @param item
     */
    const clickType =async item => {
        setRepositoryType(item.id)
        await  findRpyPage(1,item.id)
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
            setIsLoading(true)
            findRepositoryPage({
                pageParam: {currentPage: 1, pageSize: pageSize},
                userId: getUser().userId,
                findType: repositoryType,
                sort: sort
            }).then(res=>{
                setIsLoading(false)
                if (res.code===0){
                    setRepositoryList(res.data?.dataList)

                    setTotalPage(res.data.totalPage)
                    setCurrentPage(res.data.currentPage)
                    setTotalRecord(res.data.totalRecord)
                }})
        }
    }

    /**
     * 搜索仓库
     * @returns {Promise<void>}
     */
    const onSearch =async () => {
        await findRpyPage(1,repositoryType,sort)
    }

    /**
     * 分页
     */
    const changPage =async (value) => {
        setCurrentPage(value)
        await findRpyPage(value,repositoryType,sort)
    }

    //刷新查询
    const refreshFind = () => {
        findRpyPage(currentPage,repositoryType,sort)
    }


    const getRpyData = () => {
        findRpyPage(currentPage,repositoryType,sort)
    }

    //排序
    const onChange = (pagination, filters, sorter, extra) => {
        //降序
        if (sorter.order==='descend'){
            setSort("desc")
            findRpyPage (currentPage,repositoryType,"desc")
        }
        //升序
        if (sorter.order==='ascend'){
            setSort("asc")
            findRpyPage (currentPage,repositoryType,"asc")
        }
        if (!sorter.order){
            setSort()
            findRpyPage (currentPage,repositoryType)
        }
    }

    const items=[
        {
            key: '1',
            label: (
                <div  onClick={()=>props.history.push('/repository/new')}>
                   新建仓库
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div  onClick={()=>props.history.push('/repository/lead')}>
                    导入仓库
                </div>
            ),
        },
    ]

    return(
        <div className='repository gittok-width xcode'>
            <Col sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='repository-top'>
                    <BreadcrumbContent firstItem={'Repository'}/>

                    <PrivilegeButton  code={"gittok_rpy_add"} key={'gittok_rpy_add'} >
                        <Dropdown  menu={{items}}  trigger={['click']} getPopupContainer={e => e.parentElement}>
                            <Btn
                                type={'primary'}
                                title={'创建仓库'}
                                /* icon={<PlusOutlined/>}*/
                            />
                        </Dropdown>
                    </PrivilegeButton>
                </div>
                <div className='repository-filter'>
                    <Tabs
                        type={repositoryType}
                        tabLis={[
                            {id:"viewable", title:'所有仓库'},
                            {id:"oneself", title:'我的仓库'},
                            {id:"collect", title:'我的收藏'}
                        ]}
                        onClick={clickType}
                    />
                    <Input
                        allowClear
                        placeholder='搜索仓库名称'
                        onChange={onChangeSearch}
                        onPressEnter={onSearch}
                        prefix={<SearchOutlined className='input-icon'/>}
                        style={{ width: 200 }}
                    />
                </div>
                <RepositoryTable
                    {...props}
                    isLoading={isLoading}
                    repositoryList={repositoryList}
                    getRpyData={getRpyData}
                    createOpenRecord={createOpenRecord}
                    changPage={changPage}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    totalRecord={totalRecord}
                    tab={repositoryType}
                    onChange={onChange}
                    type={"repository"}
                    refreshFind={refreshFind}
                />
            </Col>

        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
