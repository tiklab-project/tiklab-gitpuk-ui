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
    @observable webUrl = ''
    @observable houseList = []
    @observable isLoading = false

    @action
    setHouseInfo = value =>{
        this.houseInfo = value
    }

    @action
    setWebUrl = value =>{
        this.webUrl = value
    }

    @action
    setHouseType = value =>{
        this.houseType = value
    }

    @action
    createCode = values =>{
        this.isLoading = true
        return new Promise(((resolve, reject) => {
            CreateCode({
                ...values,
                user:{id:getUser().userId}
            }).then(res=>{
                if(res.code===0){
                    message.info('创建成功',0.5)
                }
                this.isLoading = false
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        }))
    }

    @action
    deleteCode = value =>{
        this.isLoading = true
        const param = new FormData()
        param.append('codeId',value)
        return new Promise((resolve, reject) => {
            DeleteCode(param).then(res=>{
                if(res.code===0){
                    message.info('删除成功')
                }
                this.isLoading = false
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
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
