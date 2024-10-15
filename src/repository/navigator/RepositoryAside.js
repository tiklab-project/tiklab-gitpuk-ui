import React,{useState,useEffect} from 'react';
import {
    ApartmentOutlined,
    BarChartOutlined,
    BranchesOutlined, PullRequestOutlined,
    PushpinOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {inject,observer} from 'mobx-react';
import "./RepositoryAside.scss"
import Aside from "../../common/aside/Aside";
import {Loading} from '../../common/loading/Loading';
import {getUser,getVersionInfo} from "tiklab-core-ui";
import member from "../../assets/images/img/member.png";
import code from "../../assets/images/img/code.png";
import NavigationImage from "../../common/image/NavigationImage";


const RepositoryAside= props=>{

    const {match,repositoryStore,systemRoleStore}=props

    const {findRepositoryPage,repositoryInfo,setRepositoryInfo,findRepositoryByAddress,findRepositoryAuth,setNavLevel} = repositoryStore

    const {getInitProjectPermissions} = systemRoleStore

    const namespace = match.params.namespace
    const name = match.params.name

    const [theme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "gray");


    const webUrl = `${match.params.namespace}/${match.params.name}`
    // 页面初始加载状态
    const [isLoading,setIsLoading] = useState(true);

    const [repositoryList,setRepositoryList]=useState([])

    const [foldState,setFoldState]=useState()


    // 侧边第一栏导航
    const firstRouters=[
        {
            id:`/repository/${namespace}/${name}/overview`,
            title:`概览`,
            icon:<ApartmentOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },
        {
            id:`/repository/${namespace}/${name}/code`,
            title:`Code`,
           /* icon: <img  src={code}  style={{width:20,height:20}}/>,*/

            icon: <NavigationImage theme={theme} icon={"code"} type={`${foldState?'close':'open'}`}/>
        },
        {
            id:`/repository/${webUrl}/commits`,
            title: `Commits`,
            icon: <PushpinOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },
        {
            id:`/repository/${webUrl}/branch`,
            title: `Branch`,
            icon: <BranchesOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },
        {
            id:`/repository/${webUrl}/tag`,
            title: `标签`,
            icon: <TagsOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },
        {
            id:`/repository/${webUrl}/mergeRequest`,
            title: `合并请求`,
            icon: <PullRequestOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },
        {
            id:`/repository/${webUrl}/codeScan`,
            title: `代码扫描`,
            icon: !getVersionInfo().expired||getVersionInfo().release===3?<BarChartOutlined />:
                <img  src={member}  style={{width:18,height:18}}/>,
        },

        {
            id:`/repository/${webUrl}/statistics/commit`,
            title: `统计`,
            icon: <PullRequestOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
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
                setFoldState={setFoldState}
            />
}

export default inject('systemRoleStore','repositoryStore')(observer(RepositoryAside))


