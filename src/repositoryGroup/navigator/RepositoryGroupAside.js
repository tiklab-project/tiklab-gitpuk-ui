import React,{useState,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    PullRequestOutlined,
    BankOutlined,
} from '@ant-design/icons';
import Aside from '../../common/aside/Aside';
import groupStore from "../repositoryGroup/store/RepositoryGroupStore"
import {observer} from "mobx-react";
const RepositoryGroupAside= props =>{

    const {match}=props

    const {findGroupByName,groupList,groupInfo,setGroupInfo} = groupStore

    const groupName = match.params.name

    const {t} = useTranslation()

    useEffect(()=>{
        // 初始化仓库组
        findGroupByName(groupName).then(res=>{
            setGroupInfo(res.data)
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
            title:`${t('Repository_group')}`,
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
                repositoryAddress={groupName}
                asideType={'group'}

            />

}

export default observer(RepositoryGroupAside)


