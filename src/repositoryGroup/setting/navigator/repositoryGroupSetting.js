import React,{useEffect} from 'react';
import RpySetting from '../../../common/aside/RpySetting';
import groupStore from "../../repositoryGroup/store/RepositoryGroupStore"
import {observer} from "mobx-react";
const RepositoryGroupSetting = props =>{

    const {match} = props
    const {groupInfo} = groupStore

    const groupName = match.params.name

    const secondRouter = [
        {
            to:`/index/group/${groupName}/sys/info`,
            title:`Setting`,
        },
        {
            to:`/index/group/${groupName}/sys/member`,
            title:`Member`,
        },
        {
            to:`/index/group/${groupName}/sys/role`,
            title:`Privilege`,
        }
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={groupInfo.groupId}
            />

}

export default observer(RepositoryGroupSetting)
