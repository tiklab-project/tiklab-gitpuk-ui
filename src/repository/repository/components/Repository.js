import React,{useState,useEffect} from 'react';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Input, Spin} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import RepositoryTable from "./RepositoryTable";
import './Repository.scss';
import {getUser} from "tiklab-core-ui";


const Repository = props => {

    const {repositoryStore} = props

    const {findRepositoryPage,repositoryType,setRepositoryType,findRepositoryList,findNameRpy,createOpenRecord} = repositoryStore
    //查询仓库的名称
    const [repositoryName,setRepositoryName]=useState()
    const [repositoryList,setRepositoryList]=useState([])

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()

    const [openState,setOpenState]=useState(false)


    useEffect(async ()=>{
        // 初始化仓库
        const parma={
            userId:getUser().userId,
        }
        findRepositoryList(parma)

       await findRpyPage(1)
    },[])

    const lis = [
        {
            id:1,
            title:'所有仓库',
        },
        {
            id:2,
            title:'我的仓库',
        },
        {
            id:3,
            title:'我收藏的',
        }
    ]

    const findRpyPage =async (currentPage) => {
        const param={
            pageParam:{
                currentPage:currentPage,
                pageSize:10
            },
            userId:getUser().userId,
            name:repositoryName
        }
        
        setOpenState(true)
        
       const res=await findRepositoryPage(param)
        setOpenState(false)
        if (res.code===0){
            setRepositoryList(res.data.dataList)
            setTotalPage(res.data.totalPage)
        }
    }

    /**
     * 切换仓库类型
     * @param item
     */
    const clickType =async item => {
        setRepositoryType(item.id)

    }

    /**
     * 输入搜索的仓库名称
     * @param item
     */
    const onChangeSearch = (e) => {
        const value=e.target.value
        setRepositoryName(value)
    }
    /**
     * 搜索仓库
     * @param item
     */
    const onSearch =async () => {
        findNameRpy(repositoryName)
        await findRpyPage(currentPage)
    }

    return(
        <div className='repository'>
            <div className='repository-content xcode-home-limited xcode'>
                <Spin  spinning={openState}>
                    <div className='repository-top'>
                        <BreadcrumbContent firstItem={'Repository'}/>
                        <Btn
                            type={'primary'}
                            title={'新建仓库'}
                            icon={<PlusOutlined/>}
                            onClick={()=>props.history.push('/index/repository/new')}
                        />
                    </div>
                    <div className='repository-type'>
                        <Tabs
                            type={repositoryType}
                            tabLis={lis}
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
                        repositoryList={repositoryList}
                        createOpenRecord={createOpenRecord}
                    />
                </Spin>

            </div>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
