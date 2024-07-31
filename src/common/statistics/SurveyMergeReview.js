/**
 * 仓库概览合并请求审核统计
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useEffect,useState,useRef} from 'react';
import {SpinLoading} from "../loading/Loading";
import echarts from "../echarts/Echarts";
import StatisticsStore from "../../repository/statistics/store/StatisticsStore";

const SurveyMergeReview = (props) => {
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
                let seriesValue = []
                seriesValue.push({
                    name: "merge",
                    type: 'line',
                    stack: 'Total',
                    data: data.mergeRequestList
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
                        data: ["merge"]
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

    return(
        <div className='statistics-work-trend'>
            <div>合并审核统计</div>
            <div id="commitBar" ref={commitBar} style={{ height: "400px", marginTop: "15px" }} >
                <SpinLoading type="table"/>
            </div>
        </div>

    )
}
export default SurveyMergeReview
