import React, {useState, useEffect, Fragment} from 'react';
import {inject,observer} from 'mobx-react';
import {Col, Dropdown, Input, Menu, Select} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import RepositoryTable from "./RepositoryTable";
import './Repository.scss';
import {getUser} from "tiklab-core-ui";
import SearchInput from "../../../common/input/SearchInput";
import RepositoryAddPop from "./RepositoryAddPop";
import Page from "../../../common/page/Page";
import RepositoryCollectStore from "../store/RepositoryCollectStore";
import {SpinLoading} from "../../../common/loading/Loading";
import EmptyText from "../../../common/emptyText/EmptyText";
import Listicon from "../../../common/list/Listicon";
import {PrivilegeButton} from 'tiklab-privilege-ui';
const Repository = props => {

    const {repositoryStore} = props

    const {refresh,findRepositoryPage,createOpenRecord,deleteRpy,updateRpy,findRecordOpenList,recordOpenList,findRepositoryNum} = repositoryStore
    const {coRefresh}=RepositoryCollectStore

    // 最近打开的加载状态
    const [newlyLoading,setNewlyLoading] = useState(true)

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

    const [rules,setRules]=useState()

    //编辑弹窗状态
    const [addVisible,setAddVisible]=useState(false)

    //仓库数量
    const [repositoryNum,setRepositoryNum]=useState(null)

    useEffect(async ()=>{
        findRepositoryNum().then(res=>{
            res.code===0&&setRepositoryNum(res.data)
        })
    },[refresh,coRefresh])


    useEffect(async ()=>{
        // 获取最近打开的仓库
        findRecordOpenList().then(()=>setNewlyLoading(false))
    },[])


    useEffect(async ()=>{
        await findRpyPage(currentPage,repositoryType,sort)
    },[rules,refresh,coRefresh])


    //分页查询仓库列表
    const findRpyPage =async (currentPage,repositoryType,sort) => {
         setIsLoading(true)
       findRepositoryPage({ pageParam:{currentPage:currentPage,pageSize:pageSize},
               userId:getUser().userId,
               name: repositoryName,
               findType:repositoryType,
               sort:sort,
               rules:rules
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

    //切换权限
    const changAuth = (value) => {
        setRules(value)
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

    //打开编辑的弹窗
    const openEditPop=()=>{
        setAddVisible(true)
    }

    /**
     * 跳转代码文件
     * @param repository
     */
    const goDetails = repository => {
        props.history.push(`/repository/${repository.address}/code`)
    }

    const openBorder = (item) => {
        return(
            <Fragment>
                <div className='houseRecent-border-flex'>
                    <Listicon text={item?.repository?.name}
                              colors={item?.repository.color}
                              type={"common"}
                    />
                    <div className='houseRecent-border-text' >
                        {/*{filedState(item?.repository?.name)}*/}
                        {item?.repository?.name}
                    </div>
                </div>
                <div className='houseRecent-border-flex houseRecent-border-text-top'>
                    <div className='houseRecent-border-desc'>
                        <span className='title-color'>分支</span>
                        <span className='desc-text'>{item?.branchNum}</span>
                    </div>
                    <div className='houseRecent-border-desc'>
                        <span className='title-color'>成员</span>
                        <span className='desc-text'>{item?.memberNum}</span>
                    </div>
                </div>
            </Fragment>
        )
    }

    const items = (
            <Menu>
                <Menu.Item>
                    <div  onClick={openEditPop}>
                        新建仓库
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div  onClick={()=>props.history.push('/repository/lead')}>
                        导入仓库
                    </div>
                </Menu.Item>
            </Menu>
            );

    return(
        <div className='repository page-width xcode drop-down '>
            <Col sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className='repository-top'>

                    <BreadcrumbContent firstItem={'Repository'}/>
                    <PrivilegeButton  code={"repository_add"} key={'repository_add'} >
                        <Dropdown
                            overlay={items}
                            trigger={['click']}
                            getPopupContainer={triggerNode => triggerNode.parentElement}
                        >
                            <Btn type={'primary'} title={'创建仓库'}/>
                        </Dropdown>
                    </PrivilegeButton>
                </div>
                <div>
                    常用项目
                    <div className='repository-use-top'>
                        {
                            newlyLoading ?
                                <SpinLoading type='table'/>:
                                recordOpenList && recordOpenList.length >0 ?
                                    <div className="repository-open-record">
                                        {
                                            recordOpenList.map((item,key)=>{
                                                return(
                                                    (innerWidth>=1700&&key < 5) &&
                                                    <div key={key} className='houseRecent-border houseRecent-border-width-20' onClick={()=>goDetails(item.repository)}>
                                                        {openBorder(item)}
                                                    </div> ||
                                                    (innerWidth<1700&&key < 4) &&
                                                    <div key={key} className='houseRecent-border houseRecent-border-width-25' onClick={()=>goDetails(item.repository)}>
                                                        {openBorder(item)}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='no-data'>
                                        <EmptyText/>
                                    </div>
                        }
                    </div>
                </div>
                <div className='repository-filter'>
                    <Tabs
                        type={repositoryType}
                        tabLis={[
                            {id:"viewable", title:'所有'},
                            {id:"oneself", title:'我创建的'},
                            {id:"collect", title:'我收藏的'}
                        ]}
                        onClick={clickType}
                        findType={'repository'}
                        dataNum={repositoryNum}
                    />
                    <div className='select-right-style'>
                        <SearchInput {...props}
                                     placeholder={"搜索仓库名称"}
                                     onChange={onChangeSearch}
                                     onPressEnter={onSearch}
                        />
                        <Select  allowClear onChange={value=>changAuth(value)} style={{minWidth:140}} placeholder='可见范围'>
                            <Select.Option value={"private"}>{"私有"}</Select.Option>
                            <Select.Option value={"public"}>{"公开"}</Select.Option>
                        </Select>
                    </div>
                </div>
                <RepositoryTable
                    {...props}
                    isLoading={isLoading}
                    repositoryList={repositoryList}
                    getRpyData={getRpyData}
                    createOpenRecord={createOpenRecord}
                    tab={repositoryType}
                    type={"repository"}
                    deleteRpy={deleteRpy}
                    updateRpy={updateRpy}
                    onChange={onChange}
                />

                <Page pageCurrent={currentPage}
                      changPage={changPage}
                      totalPage={totalPage}
                      totalRecord={totalRecord}
                      refresh={refreshFind}
                />

                <RepositoryAddPop {...props}
                                   visible={addVisible}
                                   setVisible={setAddVisible}
                />
            </Col>

        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
