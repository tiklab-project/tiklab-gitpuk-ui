import {observable,action} from 'mobx'

export class HouseGroupStore {

    @observable houseGroupType = 1

    @action
    setHouseGroupType = value =>{
        this.houseGroupType = value
    }

}


export const HOUSEGRROUP_STORE='houseGroupStore'
