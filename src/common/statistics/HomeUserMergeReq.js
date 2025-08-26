/**
 * 首页用户合并请求 统计
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React,{useEffect,useState,useRef} from 'react';
import {SpinLoading} from "../loading/Loading";
import echarts from "../echarts/Echarts";
import StatisticsStore from "../../home/store/StatisticsStore";
const HomeUserMergeReq = (props) => {
    const {findTime}=props
    const {mergeReqRpyUserStatistics}=StatisticsStore

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
        mergeReqRpyUserStatistics(params).then(res => {
            setState(false)
            if (res.code === 0) {
                const data = res.data;
                let seriesValue = []
                seriesValue.push({
                    name: "commit",
                    type: 'line',
                    stack: 'Total',
                    data: data.mergeRequestList
                })
                setCommitCount(data)
                const userList = data.userList;
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
                        boundaryGap: false,
                        data:userList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series:seriesValue
                };
                myChart.setOption(option);
            }
        })
    }

    return(
        <div className='statistics-work-trend'>
            <div>用户提交统计</div>
            <div id="commitBar" ref={commitBar} style={{ height: "400px", marginTop: "15px" }} >
                {
                    state&&<SpinLoading type="table"/>
                }
            </div>
        </div>

    )

}
export default HomeUserMergeReq
