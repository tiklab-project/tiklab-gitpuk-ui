/**
 * fast合并分支弹窗
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./mergePop.scss"
import Modals from "../../common/modal/Modal";
import Btn from "../../common/btn/Btn";
import {Checkbox, Form, Input} from "antd";
import {getUser} from "tiklab-core-ui";
const MergePop = (props) => {
    const [form] = Form.useForm()

    const {visible,setVisible,mergeWay,setDeleteOrigin,starMerger,mergeData,mergeExecState}=props


    const onOk = () => {
        //当合并方式为创建节点和squash 会创建一个新的提交信息
        if (mergeWay==='createNode'||mergeWay==='squash'){
            form.validateFields().then((values) => {
                starMerger(values.message)
            })
        }else {
            starMerger()
        }
    }

    //取消弹窗
    const  cancel= () => {
        setVisible(false)

    }

    //是否删除源分支
    const onChangeFast = (e) => {
        const a=e.target.checked
        setDeleteOrigin(a)
    }


    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            {
                mergeExecState?
                    <Btn onClick={onOk} title={'加载中'} type={'primary'}/>:
                <Btn onClick={onOk} title={'提交'} type={'primary'}/>
            }

        </>
    )
    return(
        <Modals
            visible={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={'确认合并'}
        >
            {
                (mergeWay==='fast'||mergeWay==='rebase')&&
             <div className='merge-pop-style'>
                 <div>
                     <div>合并方式</div>
                     <div>
                         {mergeWay==='fast'&&"Fast-forward-only 合并"||
                             mergeWay==='rebase'&&"Rebase 合并"}
                     </div>
                 </div>
                 <Checkbox onChange={onChangeFast}>合并后自动删除源分支</Checkbox>
             </div>||
                (mergeWay==='createNode'||mergeWay==='squash') &&
                <div className='merge-pop-style'>
                    <div>
                        <div>合并方式</div>
                        <div>
                            {mergeWay==='createNode'&&"创建一个合并节点"||
                                mergeWay==='squash'&&"squash合并"}
                        </div>
                    </div>

                    <Form form={form}
                          layout='vertical'
                          autoComplete='off'
                          initialValues={{message:`Create merge request ${mergeData?.mergeOrigin} from ${mergeData?.mergeTarget}`}}
                    >
                        <Form.Item
                            label={'提交信息'}
                            name={'message'}
                            rules={[{required:true,message:'提交信息'}]}
                        >
                            <Input.TextArea rows={2} placeholder={'请输入提交信息'}/>
                        </Form.Item>
                    </Form>
                    <Checkbox onChange={onChangeFast}>合并后自动删除源分支</Checkbox>
                </div>
            }
        </Modals>
    )

}
export default MergePop
