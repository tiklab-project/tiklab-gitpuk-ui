import React,{useState,useEffect} from 'react';
import {LockOutlined,PlusOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Btn from '../../../common/btn/Btn';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import RepositoryTable from '../../../repository/repository/components/RepositoryTable';
import Listicon from '../../../common/list/Listicon';
import './Repository.scss';


const Repository = props =>{
    const {match}=props
    const groupName = match.params.name

    const {repositoryStore}=props
    const {findRepositoryByGroupName,repositoryList,createOpenRecord}=repositoryStore

    const [isLoading,setIsLoading]=useState(false)

    useEffect( ()=>{
        findRepositoryByGroupName(groupName)
    },[])

    const changPage =async () => {

    }
    return (
        <div className='group-repository'>
            <div className='group-repository-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'Repository_group'} />
                <div className='group-repository-head'>
                    <div className='head-left'>
                        <div className='head-left-icon'>
                            <Listicon text={groupName}/>
                        </div>
                        <div className='head-left-desc'>
                            <span className='desc-name'>{groupName}</span>
                            <span className='desc-lock'><LockOutlined/></span>
                        {/*    <span className='desc-type'>管理员</span>*/}
                        </div>
                    </div>
                    <div className='head-right'>
                        <Btn
                            type={'primary'}
                            title={'新建仓库'}
                            icon={<PlusOutlined/>}
                            onClick={()=>props.history.push(`/index/repository/new?type=${groupName}`)}
                        />
                    </div>
                </div>
                <RepositoryTable
                    {...props}
                    isLoading={isLoading}
                    repositoryList={repositoryList}
                    createOpenRecord={createOpenRecord}
                    changPage={changPage}
                    type={"group"}
                />
            </div>
        </div>
    )
}

export default inject('repositoryStore')(observer(Repository))
