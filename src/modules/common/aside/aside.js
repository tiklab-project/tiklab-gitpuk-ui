import React,{useState,useEffect} from 'react'
import {Dropdown} from 'antd'
import {CaretDownOutlined, SettingOutlined} from '@ant-design/icons'
import Loading from '../loading/loading'
import {renderRoutes} from 'react-router-config'
import './aside.scss'

const Aside = props =>{

    const {route,routers,nav,info,list,webUrl,asideType} = props

    const [isLoading,setIsLoading] = useState(false)

    let timeout
    useEffect(()=>{
        return clearTimeout(timeout)
    },[webUrl])

    const changeNav = item=>{
        props.history.push(item.to)
    }

    // 切换路由跳转
    const changeHouseDetails = item => {
        if(item.name!==info.name){
            switch (asideType) {
                case 'group':
                    props.history.push(`/index/group/${item.name}/survey`)
                    break
                case 'house':
                    item.codeGroup ?
                        props.history.push(`/index/house/${item.codeGroup.name}/${item.name}/tree`)
                        :
                        props.history.push(`/index/house/${item.user.name}/${item.name}/tree`)
            }
            setIsLoading(true)
            timeout = setTimeout(()=>setIsLoading(false),150)
        }
    }

    // 切换项目菜单列表
    const houseMenu = (item,index) =>{
        return  <div onClick={()=>{changeHouseDetails(item)}} key={index}
                     className={`houseDetails-opt-item ${info && info.name===item.name?'houseDetails-opt-active':''}`}
                >
                    <span className={`houseDetails-opt-icon xcode-icon-1`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className='houseDetails-opt-name'>
                        {
                            item.codeGroup && item.codeGroup.name + '/'
                        }
                        {item.name}
                    </span>
                </div>
    }

    // 切换项目菜单
    const changHouseDetailsMenu = (
        <div className='houseDetails-opt'>
            <div className='houseDetails-opt-title'>切换仓库</div>
            <div className='houseDetails-opt-group'>
                {
                    list && list.map((item,index)=>{
                        return houseMenu(item,index)
                    })
                }
            </div>
        </div>
    )

    // 渲染左侧一级菜单
    const renderTaskRouter = item => {
        return      <div  key={item.key}
                          className={`aside_content ${nav===item.to ? 'aside_active':''}`}
                          onClick={()=>changeNav(item)}
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
                       routers && routers.map(item=>{
                           return renderTaskRouter(item)
                       })
                   }
               </div>

               <div className='houseDetails-sys'
                    onClick={()=>props.history.push(`/index/${asideType}/${webUrl}/sys`)}
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
