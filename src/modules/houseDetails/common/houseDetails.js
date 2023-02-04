import React,{useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
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
import Loading from '../../common/loading/loading'

const HouseDetails= props=>{

    const {location,match,houseStore}=props

    const {findNameCode,findUserCode,houseInfo,setHouseInfo,setWebUrl,houseList} = houseStore

    let path = location.pathname

    const webUrl = `${match.params.namespace}/${match.params.name}`

    const {t} = useTranslation()
    const [nav,setNav] = useState('')
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 所有仓库
        findUserCode()
        return ()=>{
            setHouseInfo('')
            setWebUrl('')
        }
    },[])

    useEffect(()=>{
        // 仓库信息
        findNameCode(webUrl).then(res=>{
            if(res.data){
                setIsLoading(false)
            }else {
                props.history.push('/index/404')
            }
        })
        // webUrl
        setWebUrl(webUrl)

    },[webUrl])

    useEffect(()=>{
        const indexPath = `/index/house/${webUrl}/${renderType(interceptUrl(path)[5])}`
        setNav(indexPath)
    },[path,houseInfo])

    const renderType = pathType =>{
        switch (pathType) {
            case 'tree':
            case 'blob':
            case 'edit':
                return 'tree'
            case 'commit':
            case 'commits':
                return `commits/${houseInfo && houseInfo.defaultBranch}`
            default:
                return pathType
        }
    }

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${webUrl}/tree`,
            title:`${t('code')}`,
            icon:<ApartmentOutlined />,
            key:'2',
        },
        {
            to:`/index/house/${webUrl}/commits/${houseInfo && houseInfo.defaultBranch}`,
            title: `${t('commits')}`,
            icon: <PushpinOutlined />,
            key:'3',
        },
        {
            to:`/index/house/${webUrl}/branch`,
            title: `${t('branch')}`,
            icon: <BranchesOutlined />,
            key:'4',
        },
        {
            to:`/index/house/${webUrl}/tag`,
            title: `${t('tag')}`,
            icon: <TagOutlined />,
            key:'5',
        },
        {
            to:`/index/house/${webUrl}/merge`,
            title: `${t('merge')}`,
            icon: <PullRequestOutlined />,
            key:'6',
        },
        {
            to:`/index/house/${webUrl}/issue`,
            title: `${t('issue')}`,
            icon: <QuestionCircleOutlined />,
            key:'7',
        },
        {
            to:`/index/house/${webUrl}/pipeline`,
            title: `${t('pipeline')}`,
            icon: <ContainerOutlined />,
            key:'8',
        },
        {
            to:`/index/house/${webUrl}/statistics`,
            title: `${t('statistics')}`,
            icon: <RadarChartOutlined />,
            key:'9',
        },
    ]

    const secondRouter = [
        {
            to:`/index/house/${webUrl}/tree`,
            title:`${t('code')}`,
            icon:<ApartmentOutlined />,
            key:'2',
        },
        {
            to:`/index/house/${webUrl}/merge`,
            title: `${t('merge')}`,
            icon: <PullRequestOutlined />,
            key:'6',
        },
        {
            to:`/index/house/${webUrl}/issue`,
            title: `${t('issue')}`,
            icon: <QuestionCircleOutlined />,
            key:'7',
        },
        {
            to:`/index/house/${webUrl}/pipeline`,
            title: `${t('pipeline')}`,
            icon: <ContainerOutlined />,
            key:'8',
        },
        {
            to:`/index/house/${webUrl}/statistics`,
            title: `${t('statistics')}`,
            icon: <RadarChartOutlined />,
            key:'9',
        },
    ]

    if(isLoading){
        return <Loading/>
    }

    return  <Aside
                {...props}
                routers={houseInfo && houseInfo.notNull?firstRouters:secondRouter}
                nav={nav}
                list={houseList}
                info={houseInfo}
                webUrl={webUrl}
                asideType={'house'}
            />
}

export default inject('houseStore')(observer(HouseDetails))


