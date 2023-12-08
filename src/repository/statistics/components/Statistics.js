import React,{useEffect,useState} from 'react';
import {Avatar} from 'antd';
import BreadcrumbContent from '../../../common/breadcrumb/Breadcrumb';
import echarts from '../../../common/echarts/Echarts';
import './Statistics.scss';

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
            {   myChart=chartDom && echarts.init(chartDom)  }
            const option={
                color:"#77b3eb",
                xAxis: {data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
                yAxis: {type: 'value'},
                series:{
                    type: "line",
                    data:[0,3,5,23,5,2,1]
                }
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
            <div className='statistics-content xcode-repository-width xcode'>
                <BreadcrumbContent firstItem={'Statistics'} />
                <div className='statistics-head'>
                    {
                        sta.map(item=> renderSta(item) )
                    }
                </div>
                <div className="statistics-census">
                    <div className='statistics-census-head'>
                        <div className='title-user'>
                            <div className='title-user-avatar'>
                                <Avatar
                                    style={{
                                        color: '#f9c6a0',
                                        backgroundColor: '#f9c6a0',
                                    }}
                                />
                            </div>
                            <div className='title-user-name'>
                                <div className='name'>莫凶凶</div>
                                <div className='num'>提交次数12</div>
                            </div>
                        </div>
                        <div className='title-branch'>
                            #1
                        </div>
                    </div>
                    <div className="chart-box" id="burn-down" style={{width:'100%',height:400}}/>
                </div>
            </div>
        </div>
    )
}

export default Statistics
