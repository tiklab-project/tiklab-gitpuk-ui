import React,{useState,useEffect} from 'react';
import {PlusOutlined,SearchOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import {Input} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import Btn from '../../../common/btn/Btn';
import Tabs from '../../../common/tabs/Tabs';
import RepositoryTable from "./RepositoryTable";
import './Repository.scss';


const Repository = props => {

    const {repositoryStore} = props

    const {repositoryType,setRepositoryType,findUserRpy,repositoryList,findNameRpy} = repositoryStore
    //查询仓库的名称
    const {repositoryName,setRepositoryName}=useState()

    useEffect(()=>{
        // 初始化仓库
        findUserRpy()
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

    /**
     * 切换仓库类型
     * @param item
     */
    const clickType = item => {
        setRepositoryType(item.id)
    }

    /**
     * 输入搜索的仓库名称
     * @param item
     */
    const onChangeSearch = (e) => {
        setRepositoryName(e.track.valueOf())
    }
    /**
     * 搜索仓库
     * @param item
     */
    const onSearch =async () => {
        findNameRpy(repositoryName)
    }

    return(
        <div className='repository'>
            <div className='repository-content xcode-home-limited xcode'>
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
                />
            </div>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
