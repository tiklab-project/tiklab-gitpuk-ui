/**
 * @name: ScanPlayEditPop
 * @author: limingliang
 * @date: 2023-11-1 10:13
 * @description：编辑扫描计划弹窗
 * @update: 2023-11-1 10:13
 */
import React,{useState,useEffect} from 'react';
import Modals from "../../../common/modal/Modal";
import Btn from "../../../common/btn/Btn";
import {Form, Input, message, Select,} from 'antd';
import branchStore from "../../branch/store/BranchStore";
import scanSchemeStore from "../../../setting/scan/store/scanSchemeStore";
import { observer} from "mobx-react";
import codeScanStore from "../store/CodeScanStore";
import scanPlayStore from "../store/ScanPlayStore";
const ScanPlayEditPop = (props) => {

    const [form] = Form.useForm()
    const {editVisible,setEditVisible,repositoryId,scanPlay,setScanPlay,editType,setLogVisible,setLogScanRecord,
        setMultiState}=props
    const {codeScanExec,findScanState}=codeScanStore
    const {createScanPlay,updateScanPlay}=scanPlayStore

    const {findAllBranch,branchList} = branchStore
    const {findAllScanScheme,scanSchemeList} = scanSchemeStore

    const [branch,setBranch]=useState('')  //选择的分支
    const [scheme,setScheme]=useState('')  //选择的方案id
    const [schemeData,setSchemeData]=useState(null)

    useEffect(()=>{
        if (scanPlay){
            form.setFieldsValue({
                playName:scanPlay?.playName,
                branch:scanPlay?.branch,
                scanSchemeId:scanPlay?.scanScheme.id
            })
            setBranch(scanPlay?.branch)
            setScheme(scanPlay?.scanSchemeId)
        }
        findAllBranch(repositoryId)
        findAllScanScheme()
    },[editVisible])

    //取消编辑弹窗
    const  cancel= () => {
        form.resetFields()
        setScanPlay('')
        setEditVisible(false)

    }

    //添加
    const onOk = (value) => {
        form.validateFields().then(async values => {
            if (editType==='add'){
                createScanPlay({playName:values.playName,repository:{rpyId:repositoryId},branch:branch,scanScheme:{id:scheme}}).then(res=>{
                    if (res.code===0){
                        cancel()
                        //setLogVisible(true)
                      /*  codeScanExec(res.data).then(scanCode=>{
                            if (scanCode.code===0&&scanCode.data==='ok'){
                                setMultiState(true)
                                scanLibraryTime(res.data)
                            }
                        })*/
                    }
                })
            }else {
                updateScanPlay({...scanPlay,playName:values.playName,branch:branch,scanScheme:{id:scheme}}).then(res=>{
                    res.code===0&&cancel()
                })
            }
        })
    }

    //扫描定时任务
    const scanLibraryTime =async(playId)=>{
        let timer=setInterval(()=>{
            findScanState(playId,schemeData?.scanWay).then(res=>{
                if (res.code===0){
                    setLogScanRecord(res.data)
                    if (res.data.scanResult==='success'){
                        message.success('扫描成功',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }
                    if (res.data.scanResult==='fail'){
                        message.error('扫描失败',1)
                        clearInterval(timer)
                        setMultiState(false)
                    }
                }else {
                    clearInterval(timer)
                    setMultiState(false)
                }
            })
        },1000)
    }

    //选择分支
    const choiceBranch = (value) => {
        setBranch(value)
    }

    //选择方案
    const choiceScheme = (value) => {
        setSchemeData(scanSchemeList.filter(a=>a.id===value)[0])
        setScheme(value)
    }


    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={editType==='add'?'保存':'修改'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={editVisible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={editType==='add'?"添加扫描计划":'修改扫描计划'}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'计划名称'}
                    name={'playName'}
                    rules={[{required:true,message:'扫描计划名称不能为空'}]}
                >
                    <Input  placeholder={"计划名称"}/>
                </Form.Item>
                <Form.Item
                    label={'分支名称'}
                    name={'branch'}
                    rules={[{required:true,message:'分支名称'}]}
                >
                    <Select     allowClear onChange={choiceBranch} placeholder={"请选择"}>
                        {
                            branchList.length&&branchList.map(item=>{
                                    return(
                                        <Select.Option key={item.branchName} value={item.branchName}>{item.branchName}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'扫描方案'}
                    name={'scanSchemeId'}
                    rules={[{required:true,message:'扫描方案'}]}
                >
                    <Select     allowClear onChange={choiceScheme} placeholder={"请选择"}>
                        {
                            scanSchemeList.length&&scanSchemeList.map(item=>{
                                    return(
                                        <Select.Option key={item.schemeName} value={item.id}>{item.schemeName}</Select.Option>
                                    )
                                }
                            )
                        }
                    </Select>
                </Form.Item>


            </Form>
        </Modals>
    )
}
export default observer(ScanPlayEditPop)
