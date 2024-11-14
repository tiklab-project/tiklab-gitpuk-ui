/**
 * 提交解决后的合并冲突
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React,{useState,useEffect} from 'react';
import Modals from "../../common/modal/Modal";
import {Form} from "antd";
import Btn from "../../common/btn/Btn";
const MergeClashPushPop = (props) => {
    const {pushMergeVisible,setPushMergeVisible,mergeTarget,pushMergeData}=props

    const onOk = () => {
        pushMergeData()
    }

    const modalFooter = (
        <>
            <Btn onClick={()=>setPushMergeVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )
    return (
        <Modals
            visible={pushMergeVisible}
            onCancel={()=>setPushMergeVisible(false)}
            closable={false}
            style={{top:60}}
            footer={modalFooter}
            destroyOnClose={true}
            title={"确认提交"}
        >
            <div>
                {`解决冲突产生的代码改动将会从目标分支合并到源分支，在${mergeTarget}分支上产生一个新的合并提交（Merge Commit)`}
            </div>
        </Modals>
    )

}
export default MergeClashPushPop
