/**
 * 分支合并冲突线下解决弹窗
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from 'react';
import Modals from "../../common/modal/Modal";
import "./MergeClashPop.scss"
const MergeClashPop = (props) => {
    const {mergeData,visible,setVisible}=props


    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            destroyOnClose={true}
            footer={null}
            width={500}
            title={'本地解决方法'}
        >
            <div className='merge-clash'>
                <div className='merge-clash-nav'>
                    <div className='merge-clash-title'>
                        <div className='merge-clash-text'>步骤1.</div>
                        <div>fetch并切换到源分支</div>
                    </div>
                    <div className='merge-clash-border'>
                        <div>git fetch origin</div>
                        <div>{`git checkout ${mergeData?.mergeOrigin}`}</div>
                    </div>
                </div>
                <div className='merge-clash-nav'>
                    <div className='merge-clash-title'>
                        <div className='merge-clash-text'>步骤2.</div>
                        <div>合并源分支到目标分支, 并解决冲突</div>
                    </div>
                    <div className='merge-clash-border'>
                        <div>{`git merge origin/${mergeData?.mergeTarget}`}</div>
                    </div>
                </div>
                <div className='merge-clash-nav'>
                    <div className='merge-clash-title'>
                        <div className='merge-clash-text'>步骤3.</div>
                        <div>解决冲突，推送改动到远端仓库</div>
                    </div>
                    <div className='merge-clash-border'>
                        <div>{`git push origin ${mergeData?.mergeOrigin}`}</div>
                    </div>
                </div>
            </div>
        </Modals>
    )
}
export default MergeClashPop
