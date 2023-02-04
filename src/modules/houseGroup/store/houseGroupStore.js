import {observable,action} from 'mobx'
import {
    CreateGroup,
    DeleteGroup,
    UpdateGroup,
    FindUserGroup
} from '../api/houseGroup'

import {getUser} from 'tiklab-core-ui'
import {message} from 'antd'

export class HouseGroupStore {

    @observable houseGroupType = 1
    @observable groupList = []
    @observable groupInfo = ''

    @action
    setGroupInfo = value =>{
        this.groupInfo = value
    }

    @action
    setHouseGroupType = value =>{
        this.houseGroupType = value
    }

    @action
    createGroup = async values =>{
        const data = await CreateGroup({
            ...values,
            user:{id:getUser().userId}
        })
        if(data.code===0){
            message.info('创建成功',0.5)
        }
        else {
            message.info(data.msg)
        }
        return data
    }

    @action
    deleteGroup = async values =>{
        const data = await DeleteGroup(values)
        if(data){

        }
        return data
    }

    @action
    updateGroup = async values =>{
        const data = await UpdateGroup(values)
        if(data){

        }
        return data
    }

    @action
    findUserGroup = async values =>{
        const param = new FormData()
        param.append('userId',getUser().userId)
        const data = await FindUserGroup(param)
        if(data.code===0){
            this.groupList = data.data && data.data
        }
        return data
    }

}


export const HOUSEGRROUP_STORE='houseGroupStore'
