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
import Aside from '../../common/aside/aside'
import Loading from '../../common/loading/loading'

const HouseDetails= props=>{

    const {match,houseStore}=props

    const {findNameCode,findUserCode,houseInfo,setHouseInfo,setWebUrl,houseList} = houseStore

    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 所有仓库
        findUserCode()
        return ()=>{
            setHouseInfo('')
        }
    },[])

    useEffect(()=>{
        // 仓库信息
        findNameCode(webUrl).then(res=>{
            if(!res.data){
                props.history.push('/index/404')
            }else {
                setIsLoading(false)
            }
        })
        // webUrl
        setWebUrl(webUrl)
    },[webUrl])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${webUrl}/tree`,
            title:`Code`,
            icon:<ApartmentOutlined />,
        },
        {
            to:`/index/house/${webUrl}/commits/${houseInfo && houseInfo.defaultBranch}`,
            title: `Commits`,
            icon: <PushpinOutlined />,
        },
        {
            to:`/index/house/${webUrl}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined />,
        },
        // {
        //     to:`/index/house/${webUrl}/tag`,
        //     title: `Tag`,
        //     icon: <TagOutlined />,
        // },
        // {
        //     to:`/index/house/${webUrl}/merge_requests`,
        //     title: `Merge Requests`,
        //     icon: <PullRequestOutlined />,
        // },
        // {
        //     to:`/index/house/${webUrl}/issue`,
        //     title: `Issue`,
        //     icon: <QuestionCircleOutlined />,
        // },
        // {
        //     to:`/index/house/${webUrl}/pipeline`,
        //     title: `Pipeline`,
        //     icon: <ContainerOutlined />,
        // },
        // {
        //     to:`/index/house/${webUrl}/statistics`,
        //     title: `Statistics`,
        //     icon: <RadarChartOutlined />,
        // },
    ]

    if(isLoading){
        return <Loading/>
    }

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                list={houseList}
                info={houseInfo}
                webUrl={webUrl}
                asideType={'house'}
            />
}

export default inject('houseStore')(observer(HouseDetails))


