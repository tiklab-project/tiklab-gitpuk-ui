/**
 * @name: RepositoryDeletePop
 * @author: Deploy
 * @date: 2024-03-11 10:30
 * @description：仓库删除
 * @update: 2024-03-11 10:30
 */
import React, {useState, useEffect} from "react";
import { Form, Input,message} from 'antd';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import "./RepositoryDeletePop.scss"
const RepositoryDeletePop  = (props) => {
    const [form] = Form.useForm();
    const {deleteVisible, setDeleteVisible, repository, deleteRepository} = props;

    const [deleteState,setDeleteState]=useState(false)  //删除的状态

    //确认删除
    const onOk = () => {
        form.validateFields().then(async values => {
            setDeleteState(true)
            deleteRepository(repository.rpyId).then(res=>{
                setDeleteState(false)
                if (res.code===0){
                    props.history.push('/repository')
                    cancel()
                }
            })
        })
    }


    //取消
    const cancel = () => {
        setDeleteVisible(false)
    }


    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            {
                deleteState?
                    <Btn  title={'加载中'} type={'dangerous'}/>:
                    <Btn onClick={onOk} title={'确定'} type={'dangerous'}/>
            }
        </>
    )

    return(
        <Modals
            visible={deleteVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"删除仓库"}
        >
            <div className='repository-delete'>
                <div className='desc-border'>
                    <div>
                        您正在删除仓库
                        <span class='desc-text'>{repository.name}</span>
                    </div>
                    删除后是不可恢复,请确认后操作
                </div>

                <div className='data-table'>
                    <Form form={form}
                          layout='vertical'
                          autoComplete='off'>
                        <Form.Item
                            label={'仓库名称'}
                            name={'repositoryName'}
                            rules={
                                [{required: true, message: '请输入仓库库名称'},
                                    ({ getFieldValue }) => ({
                                        validator(rule, value,callback) {

                                            if(value) {
                                                const vaild = value === repository.name
                                                if (vaild) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(`请输入${repository.name}`);
                                            }
                                            callback()
                                        },
                                    }),
                                ]
                            }
                        >
                            <Input  placeholder={"仓库名称"}/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modals>
    )

}
export default RepositoryDeletePop