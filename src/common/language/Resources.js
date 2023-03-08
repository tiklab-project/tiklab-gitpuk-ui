import {eam_cn} from 'tiklab-eam-ui/es/utils'
import {privilege_cn} from 'tiklab-privilege-ui/es/utils'
import {orga_cn} from 'tiklab-user-ui/es/utils'
import {message_cn} from 'tiklab-message-ui/es/utils'
import todoTask_cn from 'tiklab-todotask-ui/es/utils/language'
import oplog_cn from 'tiklab-security-ui/es/utils/language'
import zhCnTrans from './zh.json'
import enCnTrans from './en.json'

const resources= {
    zh:{
        translation:{
            ...orga_cn,
            ...eam_cn,
            ...privilege_cn,
            ...message_cn,
            ...todoTask_cn,
            ...oplog_cn,
            ...zhCnTrans,
        },
    },
    en:{
        translation:{
            ...enCnTrans
        }
    },

}

export default resources
