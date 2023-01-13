import React,{useState,useEffect} from 'react'
import {PrivilegeProjectButton} from 'tiklab-privilege-ui'
import {SettingOutlined} from '@ant-design/icons'
import './houseSetAside.scss'

const HouseSetAside = props =>{

    const {match} = props
    let path = props.location.pathname
    const [nav,setNav] = useState('')


    // 侧边流水线设置的第二级导航
    const secondRouter = [
        {
            key:`/index/house/${match.params.name}/sys/set`,
            label:'设置',
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${match.params.name}/sys/user`,
            label:"成员",
            enCode:"pipeline_user",
        },
        {
            key:`/index/house/${match.params.name}/sys/role`,
            label:"权限",
            enCode:"pipeline_auth",
        },
        {
            key:`/index/house/${match.params.name}/sys/pushRule`,
            label:'推送规则',
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${match.params.name}/sys/keys`,
            label:'访问秘钥',
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${match.params.name}/sys/hooks`,
            label:'WebHooks',
            enCode:'pipeline_seting',
        },
    ]

    useEffect(()=>{
        setNav(path)
    },[path])

    const navContent = item =>{
        return <div
                    key={item.key}
                    className={`houseSet-item ${nav===item.key?'houseSet-select':''} `}
                    onClick={()=>props.history.push(item.key)}
                >
                    <span className='houseSet-item-icon'>
                        <SettingOutlined/>
                    </span>
                    <span className='houseSet-item-label'>
                        {item.label}
                    </span>
             </div>
    }

    const renderRouter = item => {
        return  <PrivilegeProjectButton key={item.key} code={item.enCode} domainId={pipelineId}>
                    {navContent(item)}
                </PrivilegeProjectButton>
    }



    return(
        <div className='houseSet-aside'>
            {secondRouter.map(item=>{
                    return navContent(item)
            })}
        </div>
    )
}

export default HouseSetAside
