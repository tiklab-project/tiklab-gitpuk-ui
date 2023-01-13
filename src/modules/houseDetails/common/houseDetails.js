import React,{useState,useEffect} from 'react'
import Aside from '../../common/aside/aside'
import {
    ApartmentOutlined,
    BranchesOutlined,
    ContainerOutlined,
    PullRequestOutlined,
    PushpinOutlined,
    QuestionCircleOutlined,
    RadarChartOutlined,
    TagOutlined
} from '@ant-design/icons';

const HouseDetails= props=>{

    const {match}=props

    let path = props.location.pathname
    const houseName = match.params.name

    const [nav,setNav] = useState('')

    useEffect(()=>{
        if(path.indexOf(`/index/house/${houseName}/tree`)===0){
            path=`/index/house/${houseName}/tree/master`
        }
        if(path.indexOf(`/index/house/${houseName}/blob`)===0){
            path=`/index/house/${houseName}/tree/master`
        }
        if(path.indexOf(`/index/house/${houseName}/edit`)===0){
            path=`/index/house/${houseName}/tree/master`
        }
        setNav(path)
    },[path])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${houseName}/tree/master`,
            title:'代码',
            icon:<ApartmentOutlined />,
            key:'2',
        },
        {
            to:`/index/house/${houseName}/commits`,
            title: '提交',
            icon: <PushpinOutlined />,
            key:'3',
        },
        {
            to:`/index/house/${houseName}/branch`,
            title: '分支',
            icon: <BranchesOutlined />,
            key:'4',
        },
        {
            to:`/index/house/${houseName}/tag`,
            title: '标签',
            icon: <TagOutlined />,
            key:'5',
        },
        {
            to:`/index/house/${houseName}/merge`,
            title: '合并请求',
            icon: <PullRequestOutlined />,
            key:'6',
        },
        {
            to:`/index/house/${houseName}/question`,
            title: '问题',
            icon: <QuestionCircleOutlined />,
            key:'7',
        },
        {
            to:`/index/house/${houseName}/pipeline`,
            title: '流水线',
            icon: <ContainerOutlined />,
            key:'8',
        },
        {
            to:`/index/house/${houseName}/statistics`,
            title: '统计',
            icon: <RadarChartOutlined />,
            key:'9',
        },
    ]

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                nav={nav}
                houseName={houseName}
            />

}

export default HouseDetails


