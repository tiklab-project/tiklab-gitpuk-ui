import React,{useState,useEffect} from 'react';
import {ApartmentOutlined,BranchesOutlined,PushpinOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Aside from '../../common/aside/aside';
import {Loading} from '../../common/loading/loading';

const RepositoryDetails= props=>{

    const {match,repositoryStore}=props

    const {findNameRpy,findUserRpy,repositoryInfo,setRepositoryInfo,setWebUrl,repositoryList} = repositoryStore

    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        // 所有仓库
        findUserRpy()
        return ()=>{
            setRepositoryInfo('')
        }
    },[])

    useEffect(()=>{
        // 仓库信息
        findNameRpy(webUrl).then(res=>{
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
            to:`/index/repository/${webUrl}`,
            title:`Code`,
            icon:<ApartmentOutlined />,
        },
        {
            to:`/index/repository/${webUrl}/commits/${repositoryInfo && repositoryInfo.defaultBranch}`,
            title: `Commits`,
            icon: <PushpinOutlined />,
        },
        {
            to:`/index/repository/${webUrl}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined />,
        },
        // {
        //     to:`/index/repository/${webUrl}/tag`,
        //     title: `Tag`,
        //     icon: <TagOutlined />,
        // },
        // {
        //     to:`/index/repository/${webUrl}/merge_requests`,
        //     title: `Merge Requests`,
        //     icon: <PullRequestOutlined />,
        // },
        // {
        //     to:`/index/repository/${webUrl}/issue`,
        //     title: `Issue`,
        //     icon: <QuestionCircleOutlined />,
        // },
        // {
        //     to:`/index/repository/${webUrl}/pipeline`,
        //     title: `Pipeline`,
        //     icon: <ContainerOutlined />,
        // },
        // {
        //     to:`/index/repository/${webUrl}/statistics`,
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
                list={repositoryList}
                info={repositoryInfo}
                webUrl={webUrl}
                asideType={'repository'}
            />
}

export default inject('repositoryStore')(observer(RepositoryDetails))


