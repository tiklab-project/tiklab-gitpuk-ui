
/**
 * 选择fork仓库组弹窗
 * @param props
 */
import React,{useState,useEffect} from 'react';
import Modals from '../../../common/modal/Modal';
import Btn from "../../../common/btn/Btn";
import forkStore from "../store/ForkStore";
import './ForkChoice.scss';
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Listicon from "../../../common/list/Listicon";
import {SpinLoading} from "../../../common/loading/Loading";
const ForkChoicePop = (props) => {
    const {visible,setVisible,repository}=props

    const {findCanForkGroup,execRepositoryFork,setForkState,spin}=forkStore

    //仓库组list
    const [groupList,setGroupList]=useState([])
    const [group,setGroup]=useState()

    useEffect(()=>{
        if (visible){
            findCanForkGroup({
                repositoryId:repository.rpyId,
                repositoryAddress:repository.address,
                repositoryName:repository.name,
                groupId:repository.group?.groupId,
                userName:getUser().name
            }).then(res=>{
                if (res.code===0){
                    setGroupList(res.data)
                }
            })
            setGroup(null)
        }
    },[visible])


    //选择fork的仓库组
    const choiceGroup = (data) => {
        if (!data.desc){
            setGroup(data)
        }

    }

    const onOk = () => {
        if (group){
            setForkState(true)
            execRepositoryFork({repositoryId:repository.rpyId,
                groupId:group.groupId,
                repAddress:group.name+"/"+repository.name,
                user:{
                    id:getUser().userId
                }
            }).then(res=>{
                if (res.code===0){
                    props.history.push(`/repository/${group.name+"/"+repository.name}/forkWait`)
                    setVisible(false)
                }
            })
        }

    }

    const modalFooter = (
        <>
            <Btn onClick={()=>setVisible(false)} title={'取消'} isMar={true}/>
            <Btn onClick={onOk} title={'确定'} type={'primary'}/>
        </>
    )

    return(
        <Modals
            visible={visible}
            onCancel={()=>setVisible(false)}
            closable={false}
            footer={modalFooter}
            destroyOnClose={true}
            title={"选择fork仓库组"}
        >
            <div className='fork-choice'>
                {
                    spin?<SpinLoading type="table"/>:
                        groupList?groupList.map(item=>{
                                return(
                                    <div key={item.groupId} className={`nav-tabs ${item.groupId===group?.groupId&&" choice-nav-tabs"} ${item.desc?" not-nav-tabs":" can-nav-tabs"}`} onClick={()=>choiceGroup(item)}>
                                        <div className='nav-tabs-name-style'>
                                            <Listicon text={item.name}
                                                      colors={item?.color}
                                                      type={"common"}
                                            />
                                            <div className='nav-tabs-name'>{item.name}</div>
                                            <div className={'nav-tabs-name-desc'}>{item.dataType==='个人'?`(${item.dataType})`:'(仓库组)'}</div>
                                        </div>
                                        <div className='nav-tabs-desc'>{item.desc}</div>
                                    </div>
                                )
                            })

                            :<div className='for-choice-not'>
                                {"不存在仓库组"}
                            </div>

                }
            </div>
        </Modals>
    )
}
export default observer(ForkChoicePop)
