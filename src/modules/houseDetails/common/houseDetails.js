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

const HouseDetails= props=>{

    const {match,houseStore}=props

    const {findUserCode,houseInfo,setHouseInfo,houseList} = houseStore

    let path = props.location.pathname
    const houseName = match.params.name

    const [nav,setNav] = useState('')

    useEffect(()=>{
        if(path.indexOf(`/index/house/${houseName}/tree`)===0){
            path=`/index/house/${houseName}/tree`
        }
        if(path.indexOf(`/index/house/${houseName}/blob`)===0){
            path=`/index/house/${houseName}/tree`
        }
        if(path.indexOf(`/index/house/${houseName}/edit`)===0){
            path=`/index/house/${houseName}/tree`
        }
        setNav(path)
    },[path])

    useEffect(()=>{
        houseName && findUserCode().then(res=>{
            const data = res.data
            if(res.code===0){
                if(!isHouse(data)){
                    props.history.push('/404')
                }else {
                    data && data.map(item=>{
                        if(item.name===houseName){
                            setHouseInfo(item)
                        }
                    })
                }
            }
        })
    },[houseName])


    const isHouse = data => data && data.some(item=>item.name === houseName)


    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${houseName}/tree`,
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
                houseList={houseList}
                houseInfo={houseInfo}
            />

}

export default inject('houseStore')(observer(HouseDetails))


