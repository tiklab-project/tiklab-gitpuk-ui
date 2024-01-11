/**
 * @name: TimeTaskPop
 * @author: limingliang
 * @date: 2024-01-03 10:13
 * @description：定时任务弹窗
 * @update: 2024-01-03 10:13
 */
import React,{useState,useEffect,Fragment} from 'react';
import Modals from "../../common/modal/Modal";
import Btn from "../../common/btn/Btn";
import {Form, Checkbox, Col, Row , Radio,TimePicker} from 'antd';

const TimeTaskPop = (props) => {
    const {visible,setVisible,createTimeTask,scanPlayId,taskType}=props
    const [form] = Form.useForm()

    const [taskWay,setTaskWay]=useState(1)  //任务方式
    const [taskDataList,setTaskDataList]=useState([])  //任务日期

    const  cancel= () => {
        setVisible(false)
    }

    //添加扫描制品
    const onOk = () => {
        form.validateFields().then(async values => {

            debugger
            createTimeTask({scanPlayId:scanPlayId,taskType:taskType,taskWay:taskWay,
                instanceData:{execTime:values.execTime && values.execTime.format("HH:mm"),dataList:taskDataList}}).then(res=>{
                    res.code===0&&cancel()
            })
        })

    }


    //切换任务方式
    const onChangeTaskWay = (e) => {
      setTaskWay(e.target.value)
    }

    //选择data
    const onChangeData = (value) => {
        setTaskDataList(value)
    }

    //选择时间
    const onChangeTime = (value) => {
        setTaskDataList(value)
    }

    const modalFooter = (
        <>
            <Btn onClick={cancel} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )


    return(
        <Modals
            open={visible}
            onCancel={cancel}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            width={500}
            title={"添加定时任务"}
        >
            <Form form={form}
                  layout='vertical'
                  autoComplete='off'>
                <Form.Item
                    label={'触发方式'}
                    name={'taskWay'}
                >
                    <Radio.Group onChange={onChangeTaskWay} defaultValue={taskWay}>
                        <Radio value={1}>单次触发</Radio>
                        <Radio value={2}>循环触发</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={'日期选择'}
                    name={'data'}
                >
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={onChangeData}
                    >
                        <Row>
                            <Col span={8}>
                                <Checkbox value={1}>星期一</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={2}>星期二</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={3}>星期三</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={4}>星期四</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={5}>星期五</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={6}>星期六</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value={7}>星期天</Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>

                </Form.Item>
                <Form.Item label="触发时间" name={"execTime"} rules={[{required:true,message:"触发时间不能为空"},]}>
                    <TimePicker placeholder="触发时间" format={"HH:mm"}/>
                </Form.Item>
            </Form>
        </Modals>
    )


}
export default TimeTaskPop
