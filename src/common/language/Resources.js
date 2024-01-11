import {eam_cn} from 'thoughtware-eam-ui/es/utils'
import {user_cn} from "thoughtware-user-ui/es/utils";
import {message_cn} from 'thoughtware-message-ui/es/utils'
import todoTask_cn from 'thoughtware-todotask-ui/es/utils/language'
import oplog_cn from 'thoughtware-security-ui/es/utils/language'
import {privilege_cn} from "thoughtware-privilege-ui/es/utils"
import pluginManage_cn from "thoughtware-plugin-manager-ui/es/utils/language"
import zhCnTrans from './zh.json'
import enCnTrans from './en.json'

const resources= {
    zh:{
        translation:{
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...todoTask_cn,
            ...oplog_cn,
            ...zhCnTrans,
            ...privilege_cn,
            ...pluginManage_cn,
        },
    },
    en:{
        translation:{
            ...enCnTrans
        }
    },
}

export default resources

