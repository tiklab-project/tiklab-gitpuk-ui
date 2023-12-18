import React,{useEffect} from 'react';
import {Tooltip} from "antd";

/**
 * 左侧菜单切换仓库或仓库组目录
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AsideMenu = props =>{

    const {list,setIsLoading,asideType,info,setTriggerVisible} = props
    let timeout = null
    useEffect(()=>{
        // 销毁定时器
        return ()=>{
            clearTimeout(timeout)
        }
    },[timeout])

    //跳转仓库列表
    const goRpyList = () => {
        switch (asideType) {
            case 'group':
                props.history.push(`/group`)
                break
            case 'repository':
                props.history.push(`/repository`)
                break
        }

    }


    /**
     * 切换仓库或仓库组
     * @param item
     */
    const changeHouseDetails = item => {
            setTriggerVisible(false)
            switch (asideType) {
                case 'group':
                    if(item.groupId!==info.groupId) {

                        props.history.push(`/group/${item.name}/repository`)
                    }
                    break
                case 'repository':
                    if(item.rpyId!==info.rpyId) { props.history.push(`/repository/${item.address}/tree`)}
                    break
            }
            setIsLoading(true)
            timeout = setTimeout(() => setIsLoading(false), 150)

    }

    /**
     * 字段过长省略
     * @param value  当前字段参数
     */
    const filedState = (value) => {
        return(
            value?.length>25?
                <Tooltip placement="top" title={value}>
                    <div style={{
                        width: 145,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {value}
                    </div>
                </Tooltip>
                :
                <div>{value}</div>
        )
    }
    // 切换项目菜单列表
    const houseMenu = (item,index) =>{
        return(
                asideType==='repository'?
                <div onClick={()=>{changeHouseDetails(item)}} key={index}
                     className={`menu-toggle-item ${info && info.rpyId===item.rpyId?'menu-toggle-active':''}`}
                >
                    <div className={`menu-toggle-icon ${item.color?`xcode-icon-${item.color}`:"xcode-icon-0"}`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </div>
                    <div>
                        {filedState(item?.name)}
                    </div>
                </div>:
                    <div onClick={()=>{changeHouseDetails(item)}} key={index}
                         className={`menu-toggle-item ${info && info.groupId===item.groupId?'menu-toggle-active':''}`}
                    >
                        <span className={`menu-toggle-icon ${item.color?`xcode-icon-${item.color}`:"xcode-icon-0"}`}>
                            {item.name.substring(0,1).toUpperCase()}
                        </span>
                         <span className='menu-toggle-name'>
                                { item.name }
                        </span>
                    </div>
        )
    }

    return (
        <div className='menu-toggle'>
            <div className='menu-toggle-title'>切换仓库</div>
            <div className='menu-toggle-group'>
                {
                    list&&list.length>5&&list.slice(0,5).map((item,index)=>houseMenu(item,index))||
                    list && list.length<6&&list.map((item,index)=>houseMenu(item,index))
                }
            </div>
            {
                list.length>5&&
                <div className='menu-toggle-tail cursor' onClick={goRpyList}>查看更多</div>
            }
        </div>
    )
}

export default AsideMenu
