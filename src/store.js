import {HOUSE_STORE,HouseStore} from "./modules/house/store/houseStore";
import {HOUSEGRROUP_STORE,HouseGroupStore} from "./modules/houseGroup/store/houseGroupStore";

import {createContext} from "react";

function createStores() {
    return{
        [HOUSE_STORE]:new HouseStore(),
        [HOUSEGRROUP_STORE]:new HouseGroupStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
