import React,{useEffect,useState} from "react";
import {Dropdown} from "antd";
import {
    SettingOutlined,
    ApartmentOutlined,
    PushpinOutlined,
    ContainerOutlined,
    CaretDownOutlined,
    BranchesOutlined,
    PullRequestOutlined,
    TagOutlined,
    RadarChartOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";
import {observer} from "mobx-react";
import "./houseDetailsAside.scss";

const HouseDetailsAside = props =>{

    const {houseName} = props

    let path = props.location.pathname
    const [nav,setNav] = useState("")


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

    // 侧边第一栏导航
    const firstRouters=[
        {
            to:`/index/house/${houseName}/tree`,
            title:"代码",
            icon:<ApartmentOutlined />,
            key:"2",
        },
        {
            to:`/index/house/${houseName}/commits`,
            title: "提交",
            icon: <PushpinOutlined />,
            key:"3",
        },
        {
            to:`/index/house/${houseName}/branch`,
            title: "分支",
            icon: <BranchesOutlined />,
            key:"4",
        },
        {
            to:`/index/house/${houseName}/tag`,
            title: "标签",
            icon: <TagOutlined />,
            key:"5",
        },
        {
            to:`/index/house/${houseName}/merge`,
            title: "合并请求",
            icon: <PullRequestOutlined />,
            key:"6",
        },
        {
            to:`/index/house/${houseName}/question`,
            title: "问题",
            icon: <QuestionCircleOutlined />,
            key:"7",
        },
        {
            to:`/index/house/${houseName}/pipeline`,
            title: "流水线",
            icon: <ContainerOutlined />,
            key:"8",
        },
        {
            to:`/index/house/${houseName}/statistics`,
            title: "统计",
            icon: <RadarChartOutlined />,
            key:"9",
        },

    ]

    const changeNav = item=>{
        props.history.push(item)
    }

    // 切换流水线的路由跳转
    const changeHouseDetails = item => {
    }

    // 切换项目菜单列表
    const houseMenu = item =>{
        return  <div onClick={()=>{changeHouseDetails(item)}} key={item.id} className={`houseDetails-opt-item ${item.houseName===houseName ?"houseDetails-opt-active":""}`}>
                    <span className={`houseDetails-opt-icon mf-icon-${item.color}`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className="houseDetails-opt-name">
                        {item.name}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changHouseDetailsMenu = (
        <div className="houseDetails-opt">
            <div className="houseDetails-opt-title">切换仓库</div>
            <div className="houseDetails-opt-group">
                {/*{*/}
                {/*    houseList && houseList.map(item=>{*/}
                {/*        return houseMenu(item)*/}
                {/*    })*/}
                {/*}*/}
            </div>
        </div>
    )

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return   <div key={item.key}
                      className={`aside_content ${nav===item.to ? "aside_active":""}`}
                      onClick={()=>changeNav(item.to)}
                >
                    <div className="aside_content_icon">
                        {item.icon}
                    </div>
                    <div className="aside_content_title">{item.title}</div>
                </div>
    }

    return(
         <div className="aside">
             <div  className="content">
                 <Dropdown
                     overlayStyle={{top:"48px",left:"80px"}}
                     overlay={changHouseDetailsMenu}
                     trigger={["click"]}
                     overlayClassName="aside-dropdown"
                 >
                     <div className="aside_chang"
                         onClick={(e)=>e.preventDefault()}
                     >
                          <span className={`dropdowns_icon xcode-icon-1`}>
                              T
                             {/*{houseDetails && houseDetails.name.substring(0,1).toUpperCase()}*/}
                         </span>
                         <span>
                             <CaretDownOutlined />
                         </span>
                     </div>
                </Dropdown>
                {
                    firstRouters.map(item=>{
                        return renderTaskRouter(item)
                    })
                }
            </div>

             <div className="houseDetails-sys"
                  onClick={()=>props.history.push(`/index/task/${houseName}/assembly/set`)}
             >
                 <div className="aside_content_icon">
                     <SettingOutlined/>
                 </div>
                 <div>设置</div>
             </div>

         </div>
    )
}

export default observer(HouseDetailsAside)
