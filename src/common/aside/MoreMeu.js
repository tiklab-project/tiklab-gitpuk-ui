/*
 * @Descripttion: 项目的更多菜单弹窗
 * @version: 1.0.0
 * @Author: limingliang
 * @Date: 2024-07-24 16:05:16
 * @LastEditors: limingliang
 * @LastEditTime: 2024-07-24 16:05:16
 */
import React, { useEffect, useRef, useState } from "react";
import "./MoreMeu.scss";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import {EllipsisOutlined} from "@ant-design/icons";
import {getVersionInfo} from "thoughtware-core-ui";

const MoreMeu = (props) => {
    const {moreMenu, morePath,nav ,setUpgradeVisible} = props;


    // 获取当前被激活的菜单
    const path = props.location.pathname.split("/")[3];
    // 菜单的形式，宽菜单，窄菜单
    const [showMenu, setShowMenu] = useState(false);

    // 更多点击按钮的的ref
    const setButton = useRef()
    // 菜单弹窗ref
    const modelRef = useRef()

    /**
     * 监听菜单的弹窗的显示与不显示
     */
    useEffect(() => {
        window.addEventListener("mousedown", closeModal, false);
        return () => {
            window.removeEventListener("mousedown", closeModal, false);
        }
    }, [showMenu])


    /**
     * 点击菜单
     * @param {菜单key} key
     */
    const selectMenu = (item) => {
        if (item.id.endsWith("scanPlay")&&(getVersionInfo().expired&&getVersionInfo().release!==3)){
            setUpgradeVisible(true)
        }else {
            props.history.push(item.id)
        }
        setShowMenu(false)
    }

    /**
     * 显示菜单弹窗
     */
    const showMoreMenu = () => {
        setShowMenu(!showMenu)
        // 设置弹窗的位置在按钮旁边
        modelRef.current.style.left = setButton.current.clientWidth
    }

    /**
     * 关闭弹窗
     * @param {点击的位置} e
     * @returns
     */
    const closeModal = (e) => {
        if (!modelRef.current) {
            return;
        }
        if (!modelRef.current.contains(e.target) && modelRef.current !== e.target) {
            setShowMenu(false)
        }
    }

    return (
        <div className='more-menu'>
            <div ref={setButton} className={`more-menu-aside-item`} onClick={() => showMoreMenu()}>
                <EllipsisOutlined style={{fontSize:32}} />
            </div>

            <div    className={`more-menu-box ${showMenu ? "menu-show" : "menu-hidden"}`}
                    ref={modelRef}
                    style={{}}>
                {
                    moreMenu && moreMenu.map((item,index) => {
                        return <div className={`more-menu-nav ${nav === item.id ? "more-menu-select" : ""}`}
                                    key={index}
                                    onClick={() => selectMenu(item)}
                        >
                            <span>{item.icon}</span>
                            <span>
                                {item.title}
                            </span>
                        </div>
                    })}
                </div>

        </div>
    )
}
export default MoreMeu
