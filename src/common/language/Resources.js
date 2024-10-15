import {eam_cn} from 'tiklab-eam-ui/es/utils'
import {user_cn} from "tiklab-user-ui/es/utils";
import {message_cn} from 'tiklab-message-ui/es/utils'
import oplog_cn from 'tiklab-security-ui/es/utils/language'
import {privilege_cn} from "tiklab-privilege-ui/es/utils"
import zhCnTrans from './zh.json'
import enCnTrans from './en.json'

const resources= {
    zh:{
        translation:{
            ...user_cn,
            ...eam_cn,
            ...message_cn,
            ...oplog_cn,
            ...zhCnTrans,
            ...privilege_cn,
        },
    },
    en:{
        translation:{
            ...enCnTrans
        }
    },
}

export default resources

