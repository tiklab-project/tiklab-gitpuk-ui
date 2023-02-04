import React,{useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {PrivilegeProjectButton} from 'tiklab-privilege-ui'
import {SettingOutlined} from '@ant-design/icons'
import './houseSetAside.scss'

const HouseSetAside = props =>{

    const {match} = props

    let path = props.location.pathname
    const webUrl = `${match.params.namespace}/${match.params.name}`

    const {t} = useTranslation()

    const [nav,setNav] = useState('')


    // 侧边流水线设置的第二级导航
    const secondRouter = [
        {
            key:`/index/house/${webUrl}/sys/set`,
            label:`${t('setting')}`,
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${webUrl}/sys/member`,
            label:`${t('member')}`,
            enCode:"pipeline_user",
        },
        {
            key:`/index/house/${webUrl}/sys/role`,
            label:`${t('privilege')}`,
            enCode:"pipeline_auth",
        },
        {
            key:`/index/house/${webUrl}/sys/pushRule`,
            label:`${t('push_rules')}`,
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${webUrl}/sys/keys`,
            label:`${t('access_keys')}`,
            enCode:'pipeline_seting',
        },
        {
            key:`/index/house/${webUrl}/sys/hooks`,
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
