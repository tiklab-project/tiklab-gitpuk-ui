import React,{useState,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    PullRequestOutlined,
    BankOutlined,
} from '@ant-design/icons';
import Aside from '../../common/aside/Aside';
import groupStore from "../repositoryGroup/store/RepositoryGroupStore"
const RepositoryGroupAside= props =>{

    const {match}=props

    const {findUserGroup,groupList,groupInfo,setGroupInfo} = groupStore

    const groupName = match.params.name

    const {t} = useTranslation()

    useEffect(()=>{
        // 初始化仓库组
        findUserGroup().then(res=>{
            const data = res.data
            data && data.map(item=>{
                if(item.name === groupName){
                    setGroupInfo(item)
                }
            })
        })
    },[])

    // 侧边第一栏导航
    const firstRouters=[
       /* {
            to:`/index/group/${groupName}/survey`,
            title:`${t('Survey')}`,
            icon:<CreditCardOutlined />,
        },*/
        {
            to:`/index/group/${groupName}/repository`,
            title:`${t('Repository')}`,
            icon: <BankOutlined />,
        },
        {
            to:`/index/group/${groupName}/merge_requests`,
            title: `${t('Merge Requests')}`,
            icon: <PullRequestOutlined />,
        },
    ]

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                list={groupList}
                info={groupInfo}
                webUrl={groupName}
                asideType={'group'}
            />

}

export default RepositoryGroupAside


