import React,{useState,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {PullRequestOutlined, BankOutlined} from '@ant-design/icons';
import Aside from '../../common/aside/Aside';
import groupStore from "../repositoryGroup/store/RepositoryGroupStore"
import {observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
const RepositoryGroupAside= props =>{

    const {match}=props
    const groupName = match.params.name

    const {findGroupByName,groupInfo,setGroupInfo,findRepositoryGroupPage} = groupStore

    const [groupList,setGroupList]=useState([])

    const {t} = useTranslation()

    useEffect(()=>{
        // 初始化仓库组
        findGroupByName(groupName).then(res=>{
            debugger
            if (res.code===0){
                if (res.data){
                    setGroupInfo(res.data)
                    findRepositoryGroupPage({pageParam:{currentPage:1,pageSize:15},
                        userId:getUser().userId}).then(groupData=>{
                        if (groupData.code===0){
                            const a=groupData.data.dataList.filter(a=>a.groupId!==res.data.groupId)
                            a.unshift(res.data)
                            setGroupList(a)
                        }
                    })
                }else {
                    //仓库组不存在
                    props.history.push(`/group`)
                }

            }
        })

    },[groupName])

    // 侧边第一栏导航
    const firstRouters=[
       /* {
            to:`/group/${groupName}/survey`,
            title:`${t('Survey')}`,
            icon:<CreditCardOutlined />,
        },*/
        {
            to:`/group/${groupName}/repository`,
            title:`${t('Repository')}`,
            icon: <BankOutlined />,
        },
        {
            to:`/group/${groupName}/merge_requests`,
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


