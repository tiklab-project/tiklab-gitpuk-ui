/**
 * 基础信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import {Form, Input, Select} from "antd";
import "./MergeAdd.scss"
import Btn from "../../common/btn/Btn";
import {Option} from "antd/es/mentions";
import mergeAuditorStore from "../store/MergeAuditor";
import {getUser} from "tiklab-core-ui";
const MergeAddBasic = (props) => {
    const [form] = Form.useForm()
    const {repositoryInfo,createMerge,findDmUserList,setAuditorUser}=props
    const [userList,setUserList]=useState([])
    const userId=getUser().userId

    useEffect(()=>{
        if (repositoryInfo){
            getDmUserList()
        }
    },[repositoryInfo])


    //获取仓库用户
    const getDmUserList = () => {
        findDmUserList({"domainId":repositoryInfo.rpyId}).then(res=>{
            setUserList(res.data)
        })
    }

    //添加审核人
    const handleChange = (value) => {
        setAuditorUser(value)
    };


    //提交
    const onOk = () => {
        form.validateFields().then((values) => {
            createMerge(values)
        })
    }

    return(
        <div className='merge-add-table'>
            <Form
                form={form}
                autoComplete='off'
                layout='vertical'
            >
                <Form.Item
                    label='标题'
                    name='title'
                    rules={[
                        {required:true,message:'请输入标题'},
                        {max:30,message:'请输入1~31位以内的名称'},
                    ]}
                >
                    <Input style={{background:'#fff'}}  placeholder={"请输入标题"}/>
                </Form.Item>
                <Form.Item
                    label='评审人'
                    name='auditor'
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                       /* ticketSeparators={[',']}*/
                        placeholder='请选择评审人'
                        defaultValue={[userId]}
                        onChange={handleChange}
                    >
                        {
                            userList.length>0&&userList.map(item=>{
                                return(
                                    <Option  key={item.user.id} value={item.user.id}>
                                        {item.user.name}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label='描述'
                    name='value'
                >
                    <Input.TextArea rows={4} placeholder={'请输入描述内容'}/>
                </Form.Item>
            </Form>
            <div className='repository-add-button'>
                <Btn onClick={onOk} type={'primary'} title={'创建合并请求'}/>
            </div>
        </div>
    )
}
export default MergeAddBasic
