import React,{useState,useEffect} from 'react';
import {ApartmentOutlined, BarChartOutlined, BranchesOutlined, PushpinOutlined} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';

const RepositoryAside= props=>{

    const {match,repositoryStore}=props

    const {findUserRpy,repositoryInfo,setRepositoryInfo,repositoryList,findRepositoryByAddress} = repositoryStore

    const namespace = match.params.namespace
    const name = match.params.name

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
        findRepositoryByAddress(namespace+"/"+name).then(res=>{
            if(res.code===0){
                setIsLoading(false)
            }else {
                debugger
                //仓库不存
                if (res.code===9000){
                    props.history.push(`/index/${namespace+"/"+name}/404`)
                }else {
                    props.history.push('/index/error')
                }
            }
        })
    },[])

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/repository/${namespace}/${name}`,
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
        {
            to:`/index/repository/${webUrl}/sonarQube`,
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
                repositoryAddress={webUrl}
                asideType={'repository'}
            />
}

export default inject('repositoryStore')(observer(RepositoryAside))


