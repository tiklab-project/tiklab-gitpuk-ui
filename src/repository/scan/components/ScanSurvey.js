/**
 * @name: ScanSurvey
 * @author: limingliang
 * @date: 2023-11-03 14:30
 * @description：扫描概览
 * @update: 2023-11-03 14:30
 */
import React,{useState,useEffect} from 'react';
import "./ScanSurvey.scss"
const ScanSurvey = (props) => {
    const {scanRecord}=props
    return(
        <div className='scanSurvey'>
            <div className='scan-border-1'>
                <div className={"scan-result-border"}>
                    <div className='scan-result-text-style'>
                        <div className='scan-result-success '>
                            <div>检测结果</div>
                            <div className='scan-result-text-desc'>通过</div>
                        </div>
                    </div>
                    <div className='scan-result-access'>
                        <div className='access-desc-nav'>
                            <div>门禁阈值</div>
                            <div className='scan-result-access-num'>{scanRecord?.severityTrouble}</div>
                            <div>严重问题</div>
                        </div>
                        <div className='access-desc-nav'>
                            <div>门禁阈值</div>
                            <div className='scan-result-access-num'>{scanRecord?.noticeTrouble}</div>
                            <div>警告问题</div>
                        </div>
                        <div className='access-desc-nav'>
                            <div>门禁阈值</div>
                            <div className='scan-result-access-num'>{scanRecord?.suggestTrouble}</div>
                            <div>提示问题</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ScanSurvey
