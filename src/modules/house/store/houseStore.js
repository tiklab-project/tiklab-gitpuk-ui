import {observable,action} from 'mobx'

export class HouseStore {

    @observable houseType = 1
    @observable houseId = ''

    @action
    setHouseType = value =>{
        this.houseType = value
    }

    @observable
    setHouseId = value =>{
        this.houseId = value
    }

}


export const HOUSE_STORE='houseStore'
