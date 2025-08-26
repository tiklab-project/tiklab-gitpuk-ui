
import React,{useState,useEffect} from 'react';
import RepositoryAside from "./RepositoryAside";
import NavigationImage from "../../common/image/NavigationImage";
import {
    BarChartOutlined,
    BranchesOutlined, LineChartOutlined,
    PullRequestOutlined,
    PushpinOutlined,
    TagsOutlined
} from "@ant-design/icons";
import {observer} from "mobx-react";
const RepositoryNav = (props) => {
    const {match}=props

    const webUrl = `${match.params.namespace}/${match.params.name}`
    const [foldState,setFoldState]=useState()
    const [theme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "gray");

    // 侧边第一栏导航
    const firstRouters=[
        /*{
            id:`/repository/${namespace}/${name}/overview`,
            title:`概览`,
            icon:<ApartmentOutlined className={`${foldState?'close-iconfont':'open-iconfont'}`}/>,
        },*/
        {
            id:`/repository/${webUrl}/code`,
            title:`Code`,
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
            id:`/repository/${webUrl}/codePlay`,
            title: `代码扫描`,
            icon: <BarChartOutlined />
        },
        {
            id:`/repository/${webUrl}/pipeline`,
            title: `CI/CD`,
            icon: <LineChartOutlined  className={`${foldState?'close-iconfont':'open-iconfont'}`}/>

        },
    ]

    return(
        <RepositoryAside
            {...props}
            firstRouters={firstRouters}
            setFoldState={setFoldState}
        />
    )
}
export default observer(RepositoryNav)
