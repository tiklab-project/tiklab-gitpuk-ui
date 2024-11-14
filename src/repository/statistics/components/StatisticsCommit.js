import React,{useEffect,useState,useRef} from 'react';
import {Avatar, Col, Empty, Form, Select} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import echarts from '../../../common/echarts/Echarts';
import './Statistics.scss';
import {inject, observer} from "mobx-react";
import branchStore from "../../branch/store/BranchStore";
import {setBranch} from "../../file/components/Common";
import commitsStore from "../../commits/store/CommitsStore";
import StatisticsStore from "../store/StatisticsStore";
import {SpinLoading} from "../../../common/loading/Loading";

const StatisticsCommit = props =>{
    const {repositoryStore,match} = props
    const [form] = Form.useForm();
    const urlInfo = match.params.branch
    const workBar = useRef();


    const {repositoryInfo} = repositoryStore
    const {branchList,fresh,findAllBranch} = branchStore
    const {findCommitUserList} = commitsStore
    const {commitStatistics,commitNumState}=StatisticsStore


    //默认分支
    const branch = setBranch(urlInfo,repositoryInfo && repositoryInfo)
    const [branchData,setBranchData]=useState(branch)
    const [commitUser,setCommitUser]=useState("all")
    const [findData,setFindData]=useState("7")

    //提交用户list
    const [commitUserList,setCommitUserList]=useState([])

    const [commitCount, setCommitCount] = useState()

    useEffect(() => {
        form.setFieldsValue({
            cellTime: 7,
            branch:branch,
            commitUser:"所有用户",
        })
    }, [])

    useEffect(()=>{
        // 获取全部分支
        findAllBranch(repositoryInfo.rpyId)

        findCommitUserList(repositoryInfo.rpyId).then(res=>{
           if (res.code===0){
               const  all=["所有用户"]
               setCommitUserList(all.concat(res.data))
           }
        })
    },[])


    useEffect(() => {
        if (workBar.current) {
            const dom = workBar.current;
            const params = {
                cellTime: findData,
                branch:branch,
                commitUser:"all",
                repositoryId: repositoryInfo.rpyId,
                commitType:"commit"
            }
            setStatisticsData(params, dom)
        }
        return
    }, [workBar.current])

    /**
     * 处理统计数据
     */
    const setStatisticsData = (params, dom) => {
        echarts.dispose(dom)
        commitStatistics(params).then(res => {
            if (res.code === 0) {
                const data = res.data;
                let seriesValue = []
                seriesValue.push({
                    name: "commit",
                    type: 'line',
                    stack: 'Total',
                    data: data.commitNumList
                })
                setCommitCount(data)
                const dateList = data.dateList;
                console.info("data",dateList)
                let myChart = echarts.init(dom);
                let option = {
                   /* title: {
                        text: '提交统计'
                    },*/
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ["commit"]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:dateList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: seriesValue
                };
                myChart.setOption(option);
            }
        })
    }

    const dateList = [

        {
            value: 7,
            title: "最近7天"
        },
        {
            value: 14,
            title: "最近14天"
        },
        {
            value: 30,
            title: "最近30天"
        },
        {
            value: 90,
            title: "最近90天"
        },
        {
            value: 0,
            title: "所有时间段"
        },
    ]


    const changField = (changedValues, allValues) => {
        const params = {
            ...allValues,
            commitUser:allValues.commitUser==='所有用户'?"all":allValues.commitUser,
            repositoryId: repositoryInfo.rpyId,

        }
        setStatisticsData(params, workBar.current)
    }


    const onFinishFailed = (values) => {
        console.log(values);
    };

    //修改
    const alterNav = (type,data) => {
        if (type==='branch'){
            setBranchData(data.value)
        }
        if (type==='commitUser'){
            setCommitUser(data.value)
        }
        if (type==='cellTime'){
            setFindData(data.value)
        }

    }
    return (
        <div className='drop-down  statistics'>
            <Col sm={{ span: "24" }}
                 md={{ span: "24" }}
                 lg={{ span: "24" }}
                 xl={{ span: "20", offset: "2" }}
                 xxl={{ span: "18", offset: "3" }}
            >
                <div className='statistics-content'>
                    <BreadcrumbContent firstItem={'提交统计'} />
                    <Form
                        name="form"
                        form={form}
                        initialValues={{ remember: true }}
                        onFinishFailed={onFinishFailed}
                        layout="inline"
                        onValuesChange={(changedValues, allValues) => changField(changedValues, allValues)}
                    >
                        <Form.Item name="branch" label="分支">
                            <Select
                                placeholder="请选择分支"
                                style={{width:150}}
                                onChange={(type,value)=>alterNav("branch",value)}
                            >
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
                        <Form.Item name="cellTime" label="期间">
                            <Select
                                placeholder="请选择期间"
                                style={{width:150}}
                                onChange={(type,value)=>alterNav("cellTime",value)}
                            >
                                {
                                    dateList && dateList.map(item => {
                                        return <Select.Option value={item.value} key={item.value}>{item.title}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item name="commitUser" label="用户">
                            <Select
                                placeholder="请选择用户"
                                style={{width:150}}
                                onChange={(type,value)=>alterNav("commitUser",value)}
                            >
                                {
                                    commitUserList && commitUserList.map(item => {
                                        return <Select.Option value={item} key={item}>{item}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
                <div className="statistics-work-content" >
                    {
                        commitCount?
                            <div className='statistics-work-text-nav'>{`提交数 ${commitCount?.count} `} </div>:
                            <Empty />
                    }
                    <div id="workBar" ref={workBar} style={{ height: "500px", marginTop: "20px" }} >
                        {
                            commitNumState&&<SpinLoading type="table"/>
                        }
                    </div>
                </div>
            </Col>
        </div>
    )
}
export default inject('repositoryStore')(observer(StatisticsCommit))
