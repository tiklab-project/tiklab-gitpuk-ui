import {EAM_STORE,EamStore} from 'tiklab-eam-ui/es/store'
import {SLATE_STORE,SlateStore} from 'tiklab-slate-ui/es/dist'
import {HOUSE_STORE,HouseStore} from './modules/house/store/houseStore'
import {CODE_STORE,CodeStore} from './modules/houseDetails/code/store/codeStore'
import {HOUSEGRROUP_STORE,HouseGroupStore} from './modules/houseGroup/store/houseGroupStore'
import {BRANCH_STORE,BranchStore} from './modules/houseDetails/branch/store/branchStore'
import {COMMITS_STORE,CommitsStore} from './modules/houseDetails/commits/store/commitsStore'

import {createContext} from 'react'

function createStores() {
    return{
        [HOUSE_STORE]:new HouseStore(),
        [CODE_STORE]:new CodeStore(),
        [HOUSEGRROUP_STORE]:new HouseGroupStore(),
        [BRANCH_STORE]:new BranchStore(),
        [COMMITS_STORE]:new CommitsStore(),
        [EAM_STORE]:new EamStore(),
        [SLATE_STORE]:new SlateStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
