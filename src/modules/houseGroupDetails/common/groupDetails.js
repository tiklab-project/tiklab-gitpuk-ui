import React,{useState,useEffect} from 'react'
import {
    CreditCardOutlined,
    PullRequestOutlined,
    BankOutlined,
} from '@ant-design/icons'
import Aside from '../../common/aside/aside'

const GroupDetails= props =>{

    const {match}=props

    let path = props.location.pathname
    const houseName = match.params.name

    const [nav,setNav] = useState('')

    useEffect(()=>{
        setNav(path)
    },[path])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/group/${houseName}/survey`,
            title:'概况',
            icon:<CreditCardOutlined />,
            key:'2',
        },
        {
            to:`/index/group/${houseName}/house`,
            title: '仓库',
            icon: <BankOutlined />,
            key:'3',
        },
        {
            to:`/index/group/${houseName}/merge`,
            title: '合并请求',
            icon: <PullRequestOutlined />,
            key:'4',
        },
    ]

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                nav={nav}
                houseName={houseName}
                houseList={[]}
                houseInfo={null}
            />

}

export default GroupDetails


