import {observable,action} from 'mobx';
import {Axios, getUser} from 'tiklab-core-ui';
import {message} from "antd";

export class SurveyStore{
    @observable logList = [];

    /**
     * 查询仓库最近提交
     */
    @action
    findLatelyCommit = async (repositoryId,number) =>{
       const param=new FormData();
       param.append("repositoryId",repositoryId)
        param.append("number",number)
        const data = await Axios.post('/commit/findLatelyCommit',param)
        if (data.code!==0){
            message.error(data.msg)
        }
        return data
    }

    /**
     * 获取日志列表
     */
    @action
    findLogPage = async (value) =>{
        const params = {
            pageParam: {
                pageSize: 10,
                currentPage: value.currentPage
            },
            bgroup: "gitpuk",
            data: {
                repositoryId: value.repositoryId
            }
        }
        const data = await Axios.post('/oplog/findlogpage',params)
        if(data.code === 0){
            const dataList = data.data.dataList;
            let list = []
            if(value.currentPage === 1) {
                this.logList = []
            }
            if(dataList.length > 0){
                dataList.map(item => {
                    const date = item.createTime.slice(0, 10);
                    const time = item.createTime.slice(11, 15);
                    const list1 = this.logList.filter(dateItem => dateItem.date === date)
                    if(list1.length > 0){
                        this.logList.map(dateItem => {
                            if(dateItem.date === date){
                                dateItem.children.push(item)
                            }
                            return dateItem;
                        })
                    }else {
                        this.logList.push({
                            date: date,
                            children: [item]
                        })
                    }
                })
            }
            console.log(this.logList)
        }

        return data;
    }

}

const surveyStore=new SurveyStore()
export default surveyStore
