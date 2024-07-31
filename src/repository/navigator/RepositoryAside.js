import React,{useState,useEffect} from 'react';
import {
    ApartmentOutlined,
    BarChartOutlined,
    BranchesOutlined, PullRequestOutlined,
    PushpinOutlined,
    TagOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';
import {getUser,getVersionInfo} from "thoughtware-core-ui";
import member from "../../assets/images/img/member.png";
import code from "../../assets/images/img/code.png";

const RepositoryAside= props=>{

    const {match,repositoryStore,systemRoleStore}=props

    const {findRepositoryPage,repositoryInfo,setRepositoryInfo,findRepositoryByAddress,findRepositoryAuth,setNavLevel} = repositoryStore

    const {getInitProjectPermissions} = systemRoleStore

    const namespace = match.params.namespace
    const name = match.params.name

    const webUrl = `${match.params.namespace}/${match.params.name}`
    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true);

    const [repositoryList,setRepositoryList]=useState([])


    // 侧边第一栏导航
    const firstRouters=[
        {
            id:`/repository/${namespace}/${name}/survey`,
            title:`概览`,
            icon:<ApartmentOutlined />,
        },
        {
            id:`/repository/${namespace}/${name}`,
            title:`Code`,
            icon: <img  src={code}  style={{width:20,height:20}}/>,
        },
        {
            id:`/repository/${webUrl}/commits/${repositoryInfo && repositoryInfo.defaultBranch?repositoryInfo.defaultBranch:0}`,
            title: `Commits`,
            icon: <PushpinOutlined />,
        },
        {
            id:`/repository/${webUrl}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined />,
        },
        {
            id:`/repository/${webUrl}/tag`,
            title: `标签`,
            icon: <TagsOutlined />,
        },
        {
            id:`/repository/${webUrl}/merge_requests`,
            title: `合并请求`,
            icon: <PullRequestOutlined />,
        },
        {
            id:`/repository/${webUrl}/scanPlay`,
            title: `代码扫描`,
            icon: !getVersionInfo().expired||getVersionInfo().release===3?<BarChartOutlined />:
                <img  src={member}  style={{width:18,height:18}}/>,
        },

        {
            id:`/repository/${webUrl}/statistics/commit`,
            title: `统计`,
            icon: <PullRequestOutlined />,
        },
    ]

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
                if (res.code===9000) {
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
            />
}

export default inject('systemRoleStore','repositoryStore')(observer(RepositoryAside))


