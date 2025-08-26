/**
 * @name: ScanSchemeFree
 * @author: limingliang
 * @date: 2025-04-18 16:51
 * @description：付费功能提示
 * @update: 2025-04-18 16:51
 */
import React, { useState } from "react";
import { Modal, Button } from 'antd';
import "./ScanCodeFree.scss";
import scanEnv from "../../assets/images/img/scan-env.png";
import scanScheme from "../../assets/images/img/scan-scheme.png";
import {applySubscription} from "tiklab-core-ui";

const ScanSchemeFree = (props) => {
    const {visible, setVisible} = props;



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
                <div className="statistics-title">扫描方案</div>
                <div>
                    付费版本专属功能
                </div>
                <div className="statistics-desc">
                    功能列表
                </div>

                <div className="statistics-desc-box">
                   <div>自定义扫描方案</div>
                   <div>配置扫描环境</div>
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
                    <img src={scanScheme} alt="" width={"100%"} />
                </div>
            </div>
        </div>
    </Modal>
}

export default ScanSchemeFree;
