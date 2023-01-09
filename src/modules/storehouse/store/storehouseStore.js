import {observable,action} from 'mobx'

export class StorehouseStore {

    @observable storehouseType = 1

    @action
    setStorehouseType = value =>{
        this.storehouseType = value
    }

}


export const STOREHOUSE_STORE='storehouseStore'
