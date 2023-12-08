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
            to:`/group/${groupName}/setting/info`,
            title:`Setting`,
        },
        {
            to:`/group/${groupName}/setting/member`,
            title:`Member`,
        },
        {
            to:`/group/${groupName}/setting/role`,
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
