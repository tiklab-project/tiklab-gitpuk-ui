import React,{useState,useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {PullRequestOutlined, BankOutlined} from '@ant-design/icons';
import Aside from '../../common/aside/Aside';
import groupStore from "../repositoryGroup/store/RepositoryGroupStore"
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
const RepositoryGroupAside= props =>{

    const {match,systemRoleStore,repositoryStore}=props
    const groupName = match.params.name
    const {getInitProjectPermissions} = systemRoleStore
    const {setNavLevel} = repositoryStore
    const {findGroupByName,groupInfo,setGroupInfo,findRepositoryGroupPage} = groupStore


    const [groupList,setGroupList]=useState([])

    const {t} = useTranslation()

    useEffect(()=>{
        setNavLevel(2)
        // 初始化仓库组
        findGroupByName(groupName).then(res=>{
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
                    // 获取项目权限
                    getInitProjectPermissions(getUser().userId,res.data.groupId,res.data?.rules==='public')
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
            id:`/group/${groupName}/repository`,
            title:`${t('Repository')}`,
            icon: <BankOutlined />,
        },
      /*  {
            id:`/group/${groupName}/merge_requests`,
            title: `${t('Merge Requests')}`,
            icon: <PullRequestOutlined />,
        },*/
    ]

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                list={groupList}
                info={groupInfo}
                repositoryAddress={groupName}
                asideType={'group'}
                setNavLevel={setNavLevel}
            />

}

export default inject('systemRoleStore','repositoryStore')(observer(RepositoryGroupAside))
