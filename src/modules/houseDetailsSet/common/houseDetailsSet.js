import React from 'react'
import Setting from '../../common/aside/setting'

const HouseDetailsSet = props =>{

    const {match} = props

    const webUrl = `${match.params.namespace}/${match.params.name}`

    // 设置
    const secondRouter = [
        {
            to:`/index/house/${webUrl}/sys/set`,
            title:`Setting`,
        },
        {
            to:`/index/house/${webUrl}/sys/member`,
            title:`Member`,
        },
        {
            to:`/index/house/${webUrl}/sys/role`,
            title:`Privilege`,
        },
        {
            to:`/index/house/${webUrl}/sys/pushRule`,
            title:`Push_rules`,
        },
        {
            to:`/index/house/${webUrl}/sys/keys`,
            title:`Access_keys`,
        },
        {
            to:`/index/house/${webUrl}/sys/hooks`,
            title:'WebHooks',
        },
    ]

    return  <Setting
                {...props}
                secondRouter={secondRouter}
            />
}

export default HouseDetailsSet
