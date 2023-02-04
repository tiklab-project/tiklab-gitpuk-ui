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

    let path = props.location.pathname
    const groupName = match.params.name

    const {t} = useTranslation()

    const [nav,setNav] = useState('')

    useEffect(()=>{
        setNav(path)
    },[path])

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
            title:`${t('survey')}`,
            icon:<CreditCardOutlined />,
            key:'2',
        },
        {
            to:`/index/group/${groupName}/house`,
            title:`${t('storehouse')}`,
            icon: <BankOutlined />,
            key:'3',
        },
        {
            to:`/index/group/${groupName}/merge`,
            title: `${t('merge')}`,
            icon: <PullRequestOutlined />,
            key:'4',
        },
    ]

    return  <Aside
                {...props}
                routers={firstRouters}
                nav={nav}
                list={groupList}
                info={groupInfo}
                webUrl={groupName}
                asideType={'group'}
            />

}

export default inject('houseGroupStore')(observer(GroupDetails))


