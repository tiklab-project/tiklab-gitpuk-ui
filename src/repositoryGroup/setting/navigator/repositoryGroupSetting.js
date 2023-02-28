import React from 'react';
import Setting from '../../../common/aside/Setting';

const RepositoryGroupSetting = props =>{

    const {match} = props

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

    return  <Setting
                {...props}
                secondRouter={secondRouter}
            />

}

export default RepositoryGroupSetting
