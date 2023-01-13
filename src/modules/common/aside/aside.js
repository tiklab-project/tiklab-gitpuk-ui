import React,{useState} from 'react'
import {Dropdown} from 'antd'
import {CaretDownOutlined, SettingOutlined} from '@ant-design/icons'
import Loading from '../loading/loading'
import {renderRoutes} from 'react-router-config'
import './aside.scss'

const Aside = props =>{

    const {route,firstRouters,nav,houseName} = props

    const [isLoading,setIsLoading] = useState(false)

    const changeNav = item=>{
        props.history.push(item)
    }

    // 切换路由跳转
    const changeHouseDetails = item => {
    }

    // 切换项目菜单列表
    const houseMenu = item =>{
        return  <div onClick={()=>{changeHouseDetails(item)}} key={item.id} className={`houseDetails-opt-item ${item.houseName===houseName ?'houseDetails-opt-active':''}`}>
                    <span className={`houseDetails-opt-icon mf-icon-${item.color}`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className='houseDetails-opt-name'>
                        {item.name}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changHouseDetailsMenu = (
        <div className='houseDetails-opt'>
            <div className='houseDetails-opt-title'>切换仓库</div>
            <div className='houseDetails-opt-group'>
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
        return      <div  key={item.key}
                          className={`aside_content ${nav===item.to ? 'aside_active':''}`}
                          onClick={()=>changeNav(item.to)}
                    >
                        <div className='aside_content_icon'>
                            {item.icon}
                        </div>
                        <div className='aside_content_title'>{item.title}</div>
                    </div>
    }

    return (
       <div className='houseDetails'>
           <div className='aside'>
               <div  className='content'>
                   <Dropdown
                       overlayStyle={{top:'48px',left:'80px'}}
                       overlay={changHouseDetailsMenu}
                       trigger={['click']}
                       overlayClassName='aside-dropdown'
                   >
                       <div className='aside_chang'
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
                       firstRouters && firstRouters.map(item=>{
                           return renderTaskRouter(item)
                       })
                   }
               </div>

               <div className='houseDetails-sys'
                    onClick={()=>props.history.push(`/index/house/${houseName}/sys`)}
               >
                   <div className='aside_content_icon'>
                       <SettingOutlined/>
                   </div>
                   <div>设置</div>
               </div>
           </div>
           {
               isLoading ?
                   <Loading/> :
                   <div className='houseDetails-content'>
                       {renderRoutes(route.routes)}
                   </div>
           }
       </div>
    )
}

export default Aside
