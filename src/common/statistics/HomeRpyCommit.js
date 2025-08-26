/**
 * 首页仓库提交统计
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState,useRef} from 'react';
import {SpinLoading} from "../loading/Loading";
import echarts from "../echarts/Echarts";
import StatisticsStore from "../../home/store/StatisticsStore";
const HomeRpyCommit = (props) => {
    const {findTime}=props
    const {commitRpyStatistics}=StatisticsStore

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
        setState(true)
        echarts.dispose(dom)
        commitRpyStatistics(params).then(res => {
            setState(false)
            if (res.code === 0) {
                const data = res.data;
                setCommitCount(data)
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
            <div>仓库提交</div>
            <div id="commitBar" ref={commitBar} style={{ height: "400px", marginTop: "15px" }} >
                {
                    state&&<SpinLoading type="table"/>
                }
            </div>
        </div>

    )

}
export default HomeRpyCommit
