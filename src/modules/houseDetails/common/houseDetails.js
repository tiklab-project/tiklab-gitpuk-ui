import React,{useState,useEffect} from 'react'
import {
    ApartmentOutlined,
    BranchesOutlined,
    ContainerOutlined,
    PullRequestOutlined,
    PushpinOutlined,
    QuestionCircleOutlined,
    RadarChartOutlined,
    TagOutlined
} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import {interceptUrl} from '../../common/client/client'
import Aside from '../../common/aside/aside'

const HouseDetails= props=>{

    const {location,match,houseStore}=props

    const {findNameCode,findUserCode,houseInfo,setHouseInfo,houseList} = houseStore

    let path = location.pathname
    const houseName = match.params.name
    const branch = match.params.branch ? match.params.branch:'master'

    const [nav,setNav] = useState('')

    useEffect(()=>{
        // 所有仓库
        findUserCode()
        return setHouseInfo('')
    },[])

    useEffect(()=>{
        // 仓库信息
        findNameCode(houseName).then(res=>{
            !res.data && props.history.push('/index/404')
        })
    },[houseName])

    useEffect(()=>{
        const indexPath = `/index/house/${houseName}/${renderType(interceptUrl(path)[4])}`
        setNav(indexPath)
    },[path,houseName])

    const renderType = pathType =>{
        switch (pathType) {
            case 'tree':
            case 'blob':
            case 'edit':
                return 'tree'
            case 'commit':
            case 'commits':
                return `commits/${branch}`
            default:
                return pathType
        }
    }

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${houseName}/tree`,
            title:'代码',
            icon:<ApartmentOutlined />,
            key:'2',
        },
        {
            to:`/index/house/${houseName}/commits/${branch}`,
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

    const secondRouter = [
        {
            to:`/index/house/${houseName}/tree`,
            title:'代码',
            icon:<ApartmentOutlined />,
            key:'2',
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
                firstRouters={houseInfo && houseInfo.notNull?firstRouters:secondRouter}
                nav={nav}
                houseName={houseName}
                houseList={houseList}
                houseInfo={houseInfo}
            />

}

export default inject('houseStore')(observer(HouseDetails))


