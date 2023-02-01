import {observable,action} from 'mobx'
import {
    CreateCode,
    DeleteCode,
    UpdateCode,
    FindUserCode,
    FindNameCode,
} from '../api/house'

import {message} from 'antd'
import {getUser} from 'tiklab-core-ui'

export class HouseStore {

    @observable houseType = 1
    @observable houseInfo = ''
    @observable houseList = []

    @action
    setHouseInfo = value =>{
        this.houseInfo = value
    }

    @action
    setHouseType = value =>{
        this.houseType = value
    }

    @action
    createCode = async values =>{
        const data = await CreateCode({
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
    deleteCode = async value =>{
        const param = new FormData()
        param.append('codeId',value)
        const data = await DeleteCode(param)
        if(data.code===0){
            message.info('删除成功',0.5)
        }
        return data
    }

    @action
    updateCode = async values =>{
        const data = await UpdateCode(values)
        if(data){

        }
        return data
    }

    @action
    findUserCode = async values =>{
        const param = new FormData()
        param.append('userId',getUser().userId)
        const data = await FindUserCode(param)
        if(data.code===0){
            this.houseList = data.data && data.data
        }
        return data
    }

    @action
    findNameCode = async values =>{
        const param = new FormData()
        param.append('codeName',values)
        const data = await FindNameCode(param)
        if(data.code===0){
            this.houseInfo = data.data && data.data
        }
        return data
    }



}


export const HOUSE_STORE='houseStore'
