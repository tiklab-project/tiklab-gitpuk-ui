import React,{useState,useEffect} from 'react';

import {inject,observer} from 'mobx-react';
import "./RepositoryAside.scss"
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';
import {getUser,getVersionInfo} from "tiklab-core-ui";



const RepositoryAside= props=>{

    const {match,repositoryStore,systemRoleStore,location,firstRouters,setFoldState}=props

    const {findRepositoryPage,repositoryInfo,setRepositoryInfo,findRepositoryByAddress,findRepositoryAuth,setNavLevel} = repositoryStore

    const {getInitProjectPermissions} = systemRoleStore

    const namespace = match.params.namespace
    const name = match.params.name


    const webUrl = `${match.params.namespace}/${match.params.name}`
    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true);

    const [repositoryList,setRepositoryList]=useState([])


    useEffect( ()=>{
        setNavLevel(2)
        findRepositoryByAddress(webUrl).then(res=>{
            if (res.code===0){
                if (res.data){
                    findRepositoryAuth(res.data.rpyId).then(data=>{
                        if (data.code===0){
                            if (data.data==='false'){
                                props.history.push(`/repository`)
                            }
                        }
                    })
                    // 所有仓库
                    findRepositoryPage({ pageParam:{currentPage:1, pageSize:15},
                        userId:getUser().userId}).then(rpyData=>{
                        if (rpyData.code===0){
                            const a=rpyData.data.dataList.filter(a=>a.rpyId!==res.data.rpyId)
                            a.unshift(res.data)
                            setRepositoryList(a)
                        }
                    })
                }else {
                    //仓库不存在
                    props.history.push(`/repository`)
                }
            }
        })

        return ()=>{
            setRepositoryInfo('')
        }
    },[])

    useEffect(()=>{
        // 仓库信息
        findRepositoryByAddress(namespace+"/"+name).then(res=>{
            if(res.code===0){
                // 获取项目权限
                getInitProjectPermissions(getUser().userId,res.data.rpyId,res.data?.rules==='public')
                setIsLoading(false)
            }else {
                //仓库不存
                if (res.code===56404&&!location.pathname.endsWith("/forkWait")) {
                    props.history.push(`/${namespace + "/" + name}/404`)
                }
            }
        })
    },[webUrl])


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
                setNavLevel={setNavLevel}
                setFoldState={setFoldState}
            />
}

export default inject('systemRoleStore','repositoryStore')(observer(RepositoryAside))


