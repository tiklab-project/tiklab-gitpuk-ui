/**
 * @name: CleanOrderDrawer
 * @date: 2023-12-21 14:30
 * @description：清理命令
 * @update: 2023-12-21 14:30
 */
import React, {useState, useEffect, useRef} from 'react';
import {Drawer, message, Space, Tooltip} from 'antd'
import "./CleanOrderDrawer.scss"
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../../../../common/btn/Btn";
const CleanOrderDrawer = (props) => {
    const {visible,setVisible,repository,choiceFileList,execCleanFile}=props

    const [choiceFile,setChoiceFile]=useState(null)
    const [cleanState,setCleanState]=useState(false)

    useEffect(async () => {
        if (choiceFileList){
            const choice = choiceFileList.join(" ");
            setChoiceFile(choice)
        }
    }, [choiceFileList]);


    const cleanFile = () => {
        setCleanState(true)
        execCleanFile(repository.rpyId).then(res=>{
            setCleanState(false)
            if (res.code==0){
                setVisible(false)
                message.success('清理成功')
            }else {
                message.error('清理失败',res.msg)
            }
        })
    }
    return(
        <Drawer
            title={"清理命令"}
            placement='right'
            closable={false}
            width={"60%"}
            className='library-drawer'
            onClose={()=>setVisible(false)}
            visible={visible}
            extra={
                <CloseOutlined style={{cursor:'pointer'}} onClick={()=>setVisible(false)} />
            }
        >
            <div className='clean-order'>
                <div className='clean-data-desc'>
                    执行前必读：仓库清理大文件是一个非常危险的操作,会重写commit历史，重新生成提交的objectId,请确保操作的代码为最新的代码。操作完成后，开发成员需重新拉取最代码仓库（不是在之前的代码里面拉取，是拉取一个全新的）
                </div>
                <div className='clean-data-bottom'>
                    <div className='clean-data-title'>客户端操作</div>
                    <div className='data-nav'>
                        <div>
                            第一步：拉取需要清理的仓库
                        </div>
                        <div className='clean-detail-log'>
                            git clone {repository?.fullPath}
                        </div>
                    </div>
                    <div className='data-nav'>
                        <div>
                            第二步：执行删除文件命令
                        </div>
                        <div className=' clean-detail-log'>
                            {
                                `git stash & git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch ${choiceFile}' --prune-empty --tag-name-filter cat -- --all`

                            }
                        </div>
                    </div>
                    <div className='data-nav'>
                        <div>
                            第三步：回收空间
                        </div>
                        <div className='clean-detail-log'>
                            git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin & rm -rf .git/refs/original & git reflog expire --expire=now --all &git gc --prune=now
                        </div>
                    </div>
                    <div className='data-nav'>
                        <div>
                            第四步：推送清理后的仓库到服务器
                        </div>
                        <div className='clean-detail-log clean-detail-last'>
                            git push origin --force --all
                        </div>
                    </div>

                    <div className='clean-data-title'>服务端操作</div>
                    <div className='data-nav'>
                        <div>
                            第五步：清理服务端的无效文件 (该操作删除服务端仓库的无效文件、并释放空间)
                        </div>
                        <div>
                            {
                                cleanState?
                                    <Btn   type={'primary'} title={'加载中'} />:
                                    <Btn onClick={cleanFile} type={'primary'} title={'清理无效文件'}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )

}

export default CleanOrderDrawer
