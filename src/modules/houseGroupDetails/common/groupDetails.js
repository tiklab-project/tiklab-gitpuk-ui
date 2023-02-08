import React,{useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {
    CreditCardOutlined,
    PullRequestOutlined,
    BankOutlined,
} from '@ant-design/icons'
import Aside from '../../common/aside/aside'
import {inject, observer} from "mobx-react";

const GroupDetails= props =>{

    const {match,houseGroupStore}=props

    const {findUserGroup,groupList,groupInfo,setGroupInfo} = houseGroupStore

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
        {
            to:`/index/group/${groupName}/survey`,
            title:`${t('Survey')}`,
            icon:<CreditCardOutlined />,
        },
        {
            to:`/index/group/${groupName}/house`,
            title:`${t('Storehouse')}`,
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

export default inject('houseGroupStore')(observer(GroupDetails))


