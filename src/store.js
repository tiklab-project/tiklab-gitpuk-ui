import {EAM_STORE,EamStore} from 'tiklab-eam-ui/es/store';
import {SLATE_STORE,SlateStore} from 'tiklab-slate-ui/es/dist';
import {REPOSITORY_STORE,RepositoryStore} from './repository/repository/store/RepositoryStore';
import {FILE_STORE,FileStore} from './repository/file/store/FileStore';
import {GROUP_STORE,GroupStore} from './repositoryGroup/repositoryGroup/store/RepositoryGroupStore';
import {BRANCH_STORE,BranchStore} from './repository/branch/store/BranchStore';
import {COMMITS_STORE,CommitsStore} from './repository/commits/store/CommitsStore';
import {AUTH_STORE,AuthStore} from './setting/auth/store/AuthStore';
import {orgStores} from "tiklab-user-ui/es/store"
import {privilegeStores} from "tiklab-privilege-ui/es/store"
import {createContext} from 'react'
import {DEPLOY_STORE,DeployStore} from "./setting/deploy/store/DeployStore"
import {CODE_SCAN_STORE, CodeScanStore} from "./repository/detection/store/CodeScanStore";
import {BACKUPS_STORE, BackupsStore} from "./setting/backups/store/BackupsStore";
function createStores() {
    return{
        ...orgStores,
        ...privilegeStores,
        [REPOSITORY_STORE]:new RepositoryStore(),
        [FILE_STORE]:new FileStore(),
        [GROUP_STORE]:new GroupStore(),
        [BRANCH_STORE]:new BranchStore(),
        [COMMITS_STORE]:new CommitsStore(),
        [AUTH_STORE]:new AuthStore(),
        [EAM_STORE]:new EamStore(),
        [SLATE_STORE]:new SlateStore(),
        [DEPLOY_STORE]:new DeployStore(),
        [CODE_SCAN_STORE]:new CodeScanStore(),
        [BACKUPS_STORE]:new BackupsStore(),
    }
}

const store = createStores();
const storeContext = createContext(store)

export {
    store,
    storeContext
}
