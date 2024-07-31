/**
 * 首页仓库提交统计
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState,useRef} from 'react';
import {SpinLoading} from "../loading/Loading";
import echarts from "../echarts/Echarts";
import StatisticsStore from "../../repository/statistics/store/StatisticsStore";
const SurveyMergeReq = (props) => {
    const {repositoryId}=props
    const {mergeReqStatistics}=StatisticsStore

    const commitBar = useRef();
    const [commitCount, setCommitCount] = useState()


    useEffect(() => {
        const dom = commitBar.current;
        setStatisticsData({cellTime: "7",
            commitUser:"all",
            branchType:'all',
            repositoryId: repositoryId,
        },dom)
    }, [])

    /**
     * 处理统计数据
     */
    const setStatisticsData = (params, dom) => {
        echarts.dispose(dom)
        mergeReqStatistics(params).then(res => {
            if (res.code === 0) {
                const data = res.data;
                setCommitCount(data)
                const dateList = data.dateList;
                let myChart = echarts.init(dom);
                let option = {
                    /* title: {
                         text: '提交统计'
                     },*/
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ["merge"]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data:dateList,

                    },
                    yAxis: {
                        type: 'value'
                    },
                    series:[
                        {
                            data:data.mergeRequestList,
                            type:"bar"
                        }
                    ]
                };
                myChart.setOption(option);
            }
        })
    }

    return(
        <div className='statistics-work-trend'>
            <div>合并请求</div>
            <div id="commitBar" ref={commitBar} style={{ height: "400px", marginTop: "15px" }} >
                <SpinLoading type="table"/>
            </div>
        </div>

    )

}
export default SurveyMergeReq
