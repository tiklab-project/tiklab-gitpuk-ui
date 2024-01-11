import React,{useState,useEffect} from 'react';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Dropdown, Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import RepositoryTable from "./RepositoryTable";
import './Repository.scss';
import {getUser} from "thoughtware-core-ui";

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
    const [pageSize]=useState(15)

    const [isLoading,setIsLoading]=useState(false)
    const [sort,setSort]=useState(null)


    useEffect(async ()=>{
       await findRpyPage(1,repositoryType)
    },[])

    const findRpyPage =async (currentPage,repositoryType,sort) => {
         setIsLoading(true)
       findRepositoryPage({ pageParam:{currentPage:currentPage,pageSize:pageSize},
               userId:getUser().userId,
               name:repositoryName,
               findType:repositoryType,
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
        <div className='repository'>
            <div className=' xcode-repository-width xcode'>
                <div className='repository-top'>
                    <BreadcrumbContent firstItem={'Repository'}/>
                    <Dropdown  menu={{items}} >
                        <div className='add-button' >
                            <Btn
                                type={'primary'}
                                title={'创建仓库'}
                               /* icon={<PlusOutlined/>}*/
                            />
                        </div>
                    </Dropdown>
                </div>
                <div className='repository-type'>
                    <Tabs
                        type={repositoryType}
                        tabLis={[
                            {id:"viewable", title:'所有仓库'},
                            {id:"oneself", title:'我的仓库'},
                         /*   {id:3, title:'我收藏的'}*/
                        ]}
                        onClick={clickType}
                    />
                    <div className='repository-type-input'>
                        <Input
                            allowClear
                            placeholder='仓库名称'
                            onChange={onChangeSearch}
                            onPressEnter={onSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                        />
                    </div>
                </div>
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
    )
}

export default inject('repositoryStore')(observer(Repository))
