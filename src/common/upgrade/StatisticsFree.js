/**
 * @name: StatisticsFree
 * @author: limingliang
 * @date: 2025-05-08 16:51
 * @description：付费功能提示
 * @update: 2025-05-08 16:51
 */
import React, { useState } from "react";
import { Modal, Button } from 'antd';
import "./ScanCodeFree.scss";
import codeStatistics from "../../assets/images/img/code-statistics.png";
import commitStatistics from "../../assets/images/img/commit-statistics.png";
import {applySubscription, getVersionInfo} from "tiklab-core-ui";

const StatisticsFree = (props) => {
    const {visible, setVisible} = props;
    const [navType,setNavType]=useState("commit")


    const changeNave = (type) => {
        setNavType(type)
    }


    const goConsultBuy = () => {
        window.open(`https://tiklab.net/contactus`)
    }

    const goBuy = () => {
        applySubscription("gitpuk")
    }
    return <Modal
        width={900}
        height={500}
        footer={null}
        visible={visible}
        className="statistics-free-modal"
        onCancel={() => setVisible(false)}
    >
        <div className="statistics-free">
            <div className="statistics-free-introduce">
                <div className="statistics-title">统计功能</div>
                <div>
                    付费版本专属功能
                </div>
                <div className="statistics-desc">
                    功能列表
                </div>

                <div className={`statistics-desc-box`}>
                   <div className={`statistics-desc-item ${navType==='commit'?"statistics-desc-active-item":''}`}
                        onClick={() => changeNave("commit")}
                        onMouseEnter={() => changeNave("commit")}
                   >
                       提交统计
                   </div>
                   <div className={`statistics-desc-item ${navType==='code'?"statistics-desc-active-item":''}`}
                        onClick={() => changeNave("code")}
                        onMouseEnter={() => changeNave("code")}
                   >
                       代码频率统计
                   </div>
                </div>

                <Button type="primary" size={"middle"} block onClick={() => goConsultBuy()}>
                    咨询购买
                </Button>
                <div className='buy-text' onClick={() => goBuy()}>
                    立即购买
                </div>
            </div>
            <div className="statistics-free-image">
                <div>
                    {
                        navType==='commit'&& <img src={commitStatistics} alt="" width={"100%"} />||
                        navType==='code'&& <img src={codeStatistics} alt="" width={"100%"} />
                    }
                </div>
            </div>
        </div>
    </Modal>
}

export default StatisticsFree;
