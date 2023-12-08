import {REPOSITORY_STORE,RepositoryStore} from './repository/repository/store/RepositoryStore';
import {orgStores} from "thoughtware-user-ui/es/store"
import {privilegeStores} from "thoughtware-privilege-ui/es/store"
import {createContext} from 'react'
function createStores() {
    return{
        ...orgStores,
        ...privilegeStores,
        [REPOSITORY_STORE]:new RepositoryStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
