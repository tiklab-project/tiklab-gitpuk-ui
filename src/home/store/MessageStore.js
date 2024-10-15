import {action} from "mobx";
import {Axios, getUser} from "tiklab-core-ui";

class MessageStore {

    /**
     * 条件分页查询发送的消息
     * @returns {Promise<unknown>}
     */
    @action
    findMessageItemPage = async (param) =>{
        const data = await Axios.post('/message/messageItem/findMessageItemPage',param)
        return data
    }

    /**
     * 修改发送的消息
     * @returns {Promise<unknown>}
     */
    @action
    updateMessageItem = async (param) =>{
        const data = await Axios.post('/message/messageItem/updateMessageItem',param)
        return data
    }

    /**
     * 修改发送的消息
     * @returns {Promise<unknown>}
     */
    @action
    deleteMessageItem = async (id) =>{
        const param=new FormData()
        param.append('id',id)
        const data = await Axios.post('/message/messageItem/deleteMessageItem',param)
        return data
    }

}

const messageStore = new MessageStore();
export default messageStore
