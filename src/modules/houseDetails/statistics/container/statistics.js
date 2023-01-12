import React,{useEffect,useState} from 'react'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import echarts from '../../../common/echarts/echarts'
import '../components/statistics.scss'

const Statistics = props =>{

    useEffect(()=>{
        chart()
    },[])

    const chart = () => {
        try {
            const chartDom=document.getElementById("burn-down")
            // 获取实例
            let myChart=chartDom && echarts.getInstanceByDom(chartDom)

            if (!myChart) // 如果不存在则创建
            {
                myChart=chartDom && echarts.init(chartDom)
            }
            const option={
                color:["#77b3eb","#f06f6f","#f6c659"],
                type: "bar",
                series: [{
                    type: "bar",
                    data: [
                        { value: 1, name: "成功" },
                        { value: 2, name: "失败" },
                        { value: 3, name: "其他" },
                    ],
                }]
            }
            myChart && myChart.setOption(option)
        }catch {}
    }

    const sta = [
        {
            id:1,
            title:'提交',
            num:30
        },
        {
            id:2,
            title:'问题',
            num:6
        },
        {
            id:3,
            title:'文件',
            num:6
        },
        {
            id:4,
            title:'成员',
            num:6
        },
        {
            id:5,
            title:'仓库大小',
            num:6
        },
    ]

    const renderSta = (item) => {
        return (
            <div className='head-item' key={item.id}>
                <div className='head-item-content'>
                    <div className='head-item-title'>{item.title}</div>
                    <div className='head-item-num'>{item.num}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='statistics'>
            <div className='statistics-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'统计'} />
                <div className='statistics-head'>
                    {
                        sta.map(item=>{
                            return renderSta(item)
                        })
                    }
                </div>
                <div className="survey-census">
                    <div className="chart-box" id="burn-down" style={{width:'100%',height:400}}/>
                </div>
            </div>
        </div>
    )
}

export default Statistics
