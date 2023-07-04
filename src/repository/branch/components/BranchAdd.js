import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import Modals from '../../../common/modal/Modal';

const BranchAdd = props =>{

    const {addVisible,setAddVisible,createBranch,branchList,repositoryInfo} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    /**
     * 添加分支确定
     * @param values
     */
    const onOk = values =>{
        createBranch({
            ...values,
            rpyId:repositoryInfo.rpyId
        })
        setAddVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddVisible(false)}
                title={'取消'}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields()
                            onOk(values)
                        })
                }}
                title={'确定'}
                type={'primary'}
            />
        </>
    )

    return (
        <Modals
            visible={addVisible}
            onCancel={()=>setAddVisible(false)}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"新建分支"}
        >
            <div className='branch-add-modal'>
                <Form
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    initialValues={{point:repositoryInfo.defaultBranch}}
                >
                    <Form.Item
                        label={'分支名称'}
                        name={'branchName'}
                        rules={[
                               {required:true,message:''},
                               ({ getFieldValue }) => ({
                                   validator(rule,value) {
                                       if(!value || value.trim() === ''){
                                           return Promise.reject('名称不能为空');
                                       }
                                       let nameArray = []
                                       if(branchList){
                                           nameArray = branchList && branchList.map(item=>item.branchName)
                                       }
                                       if (nameArray.includes(value)) {
                                           return Promise.reject('名称已经存在');
                                       }
                                       return Promise.resolve()
                                   },
                               }),
                           ]}
                    ><Input/>
                    </Form.Item>
                    <Form.Item
                        label={'分支来源'}
                        name={'point'}
                        rules={[{required:true,message:`分支来源不能为空`}]}
                    >
                        <Select>
                            {
                                branchList && branchList.map(item=>{
                                    return <Select.Option value={item.branchName} key={item.branchName}>{item.branchName}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modals>
    )
}

export default BranchAdd
