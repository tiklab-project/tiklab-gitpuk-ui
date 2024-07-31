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
const HomeRpyCommit = (props) => {
    const {findTime}=props
    const {mergeReqRpyStatistics}=StatisticsStore

    const commitBar = useRef();
    const [commitCount, setCommitCount] = useState()
    const [state,setState]=useState(true)


    useEffect(() => {
        const dom = commitBar.current;
        setStatisticsData({findTime: findTime},dom)
    }, [findTime])

    /**
     * 处理统计数据
     */
    const setStatisticsData = (params, dom) => {
        echarts.dispose(dom)
        setState(true)
        mergeReqRpyStatistics(params).then(res => {
            setState(false)
            if (res.code === 0) {
                const data = res.data;
                setCommitCount(data)
                const mergeRequestList = data.mergeRequestList;
                const rpyNameList = data.repositoryList;
                let seriesValue = []
                seriesValue.push({
                    name: "commit",
                    type: 'line',
                    stack: 'Total',
                    data: data.commitNumList
                })
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

                    xAxis: {
                        type: 'category',
                        data:rpyNameList,
                        axisLabel: {
                            interval: 0, // 强制显示所有标签
                            rotate: 30 // 旋转标签 30 度,以防止重叠
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series:[
                        {
                            data:mergeRequestList,
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
                {
                    state&&<SpinLoading type="table"/>
                }
            </div>
        </div>

    )

}
export default HomeRpyCommit
