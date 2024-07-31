/**
 * 仓库概览提交统计
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState,useRef} from 'react';
import {SpinLoading} from "../loading/Loading";
import echarts from "../echarts/Echarts";
import StatisticsStore from "../../repository/statistics/store/StatisticsStore";
const SurveyCommit = (props) => {
    const {repositoryId}=props
    const {commitStatistics}=StatisticsStore

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
                    series: [
                        {
                            data:data.commitNumList,
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
            <div>提交统计</div>
            <div id="commitBar" ref={commitBar} style={{ height: "400px", marginTop: "15px" }} >
                <SpinLoading type="table"/>
            </div>
        </div>

    )

}
export default SurveyCommit
