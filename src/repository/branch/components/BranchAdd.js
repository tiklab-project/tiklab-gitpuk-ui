import React,{useState,useEffect} from 'react';
import {Modal,Form,Input,Select} from 'antd';
import {autoHeight} from '../../../common/client/Client';
import Btn from '../../../common/btn/Btn';
import Modals from '../../../common/modal/Modal';

const BranchAdd = props =>{

    const {addVisible,setAddVisible,createBranch,branchList,repositoryInfo} = props

    const [form] = Form.useForm()
    const [height,setHeight] = useState(0)
    const [branchName,setBranchName]=useState()
    const [errorMsg,setErrorMsg]=useState(null)

    useEffect(()=>{
        if (addVisible){
            form.resetFields();
        }
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height,addVisible])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        if (addVisible){
            form.resetFields();
        }
    },[addVisible])

    /**
     * 添加分支确定
     * @param values
     */
    const onOk = () =>{
        form.validateFields().then((values) => {
            createBranch({
                ...values,
                rpyId:repositoryInfo.rpyId
            }).then(res=>{
                if (res.code===0){
                    setAddVisible(false)
                }else{
                    form.validateFields()
                    setErrorMsg(res.msg)
                }
            })
        })
    }
    const inputBranchName = (e) => {
        setBranchName(e.target.value)
        setErrorMsg(null)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddVisible(false)}
                title={'取消'}
                isMar={true}
            />
            <Btn
                onClick={onOk}
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
            initialValues={{branchName:branchName}}
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
                               {required:true,message:'名称不能为空'},
                               ({ getFieldValue }) => ({
                                   validator(rule,value) {
                                     /*  if(!value || value.trim() === ''){
                                           return Promise.reject('名称不能为空');
                                       }*/
                                       let nameArray = []
                                       if(branchList){
                                           nameArray = branchList && branchList.map(item=>item.branchName)
                                       }
                                       if (nameArray.includes(value)) {
                                           return Promise.reject('名称已经存在');
                                       }
                                       if (errorMsg){
                                           return Promise.reject(errorMsg);
                                       }
                                       return Promise.resolve()
                                   },
                               }),
                           ]}
                    ><Input onChange={inputBranchName} value={branchName}  placeholder={"输入分支名称"}/>
                    </Form.Item>
                    <Form.Item
                        label={'分支来源'}
                        name={'point'}
                        rules={[{required:true,message:`分支来源不能为空`}]}
                    >
                        <Select>
                            {
                                branchList && branchList.map((item,index)=>{
                                    return <Select.Option value={item.branchName} key={index}>{item.branchName}</Select.Option>
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
