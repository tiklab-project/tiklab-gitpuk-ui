import React,{useState,useEffect} from 'react';
import {ApartmentOutlined, BarChartOutlined, BranchesOutlined, PushpinOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';

const RepositoryAside= props=>{

    const {match,repositoryStore}=props

    const {findNameRpy,findUserRpy,repositoryInfo,setRepositoryInfo,repositoryList,findRepository} = repositoryStore

    const rpyId=match.params.rpyId

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
        findRepository(rpyId).then(res=>{
            if(!res.data){
                props.history.push('/index/404')
            }else {
                setIsLoading(false)
            }
        })
    },[])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/repository/${rpyId}`,
            title:`Code`,
            icon:<ApartmentOutlined />,
        },
        {
            to:`/index/repository/${rpyId}/commits/${repositoryInfo && repositoryInfo.defaultBranch}`,
            title: `Commits`,
            icon: <PushpinOutlined />,
        },
        {
            to:`/index/repository/${rpyId}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined />,
        },
        {
            to:`/index/repository/${rpyId}/sonarQube`,
            title: `代码检测`,
            icon: <BarChartOutlined />,
        },

    ]

    if(isLoading){
        return <Loading/>
    }

    return  <Aside
                {...props}
                firstRouters={firstRouters}
                list={repositoryList}
                info={repositoryInfo}
                asideType={'repository'}
            />
}

export default inject('repositoryStore')(observer(RepositoryAside))


