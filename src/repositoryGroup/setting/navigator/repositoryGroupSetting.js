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
            id:`/group/${groupName}/setting/info`,
            title:`仓库组信息`,
        },
        {
            id:`/group/${groupName}/setting/member`,
            title:`Member`,
            purviewCode: "rpy_group_user",
        },
        {
            id:`/group/${groupName}/setting/role`,
            title:`Privilege`,
            purviewCode: "rpy_group_authority",
        }
    ]

    return  <RpySetting
                {...props}
                secondRouter={secondRouter}
                domainId={groupInfo?.groupId}
            />

}

export default observer(RepositoryGroupSetting)
