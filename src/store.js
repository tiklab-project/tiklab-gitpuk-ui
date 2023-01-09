import {STOREHOUSE_STORE,StorehouseStore} from "./modules/storehouse/store/storehouseStore";

import {createContext} from "react";

function createStores() {
    return{
        [STOREHOUSE_STORE]:new StorehouseStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
