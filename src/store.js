import {EAM_STORE,EamStore} from 'tiklab-eam-ui/es/store';
import {SLATE_STORE,SlateStore} from 'tiklab-slate-ui/es/dist';
import {REPOSITORY_STORE,RepositoryStore} from './modules/repository/repository/store/repositoryStore';
import {CODE_STORE,CodeStore} from './modules/repository/code/store/codeStore';
import {GROUP_STORE,GroupStore} from './modules/repositoryGroup/repositoryGroup/store/repositoryGroupStore';
import {BRANCH_STORE,BranchStore} from './modules/repository/branch/store/branchStore';
import {COMMITS_STORE,CommitsStore} from './modules/repository/commits/store/commitsStore';
import {KEY_STORE,KeyStore} from './modules/sysmgr/keys/store/keyStore';

import {createContext} from 'react'

function createStores() {
    return{
        [REPOSITORY_STORE]:new RepositoryStore(),
        [CODE_STORE]:new CodeStore(),
        [GROUP_STORE]:new GroupStore(),
        [BRANCH_STORE]:new BranchStore(),
        [COMMITS_STORE]:new CommitsStore(),
        [KEY_STORE]:new KeyStore(),
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
