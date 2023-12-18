import React,{useState,useEffect} from 'react';
import {
    ApartmentOutlined,
    BarChartOutlined,
    BranchesOutlined,
    PushpinOutlined,
    TagOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';
import {getUser} from "thoughtware-core-ui";

const RepositoryAside= props=>{

    const {match,repositoryStore,systemRoleStore}=props

    const {findRepositoryPage,repositoryInfo,setRepositoryInfo,findRepositoryByAddress,findRepositoryAuth} = repositoryStore

    const {getInitProjectPermissions} = systemRoleStore

    const namespace = match.params.namespace
    const name = match.params.name

    const webUrl = `${match.params.namespace}/${match.params.name}`
    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true)

    const [repositoryList,setRepositoryList]=useState([])
    useEffect(async ()=>{
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
                if (res.code===9000){
                    props.history.push(`/${namespace+"/"+name}/404`)
                }/*else {
                    props.history.push('/error')
                }*/
            }
        })
    },[webUrl])


    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/repository/${namespace}/${name}`,
            title:`Code`,
            icon:<ApartmentOutlined />,
        },
        {
            to:`/repository/${webUrl}/commits/${repositoryInfo && repositoryInfo.defaultBranch}`,
            title: `Commits`,
            icon: <PushpinOutlined />,
        },
        {
            to:`/repository/${webUrl}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined />,
        },
        {
            to:`/repository/${webUrl}/tag`,
            title: `标签`,
            icon: <TagsOutlined />,
        },
        {
            to:`/repository/${webUrl}/scanPlay`,
            title: `代码扫描`,
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

export default inject('systemRoleStore','repositoryStore')(observer(RepositoryAside))


