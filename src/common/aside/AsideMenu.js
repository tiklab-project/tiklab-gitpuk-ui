import React,{useEffect} from 'react';

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
        props.history.push(`/index/repository`)
    }
    /**
     * 切换仓库或仓库组
     * @param item
     */
    const changeHouseDetails = item => {
        if(item.name!==info.name){
            setTriggerVisible(false)
            switch (asideType) {
                case 'group':
                    props.history.push(`/index/group/${item.name}/survey`)
                    break
                case 'repository':
                    props.history.push(`/index/repository/${item.address}/tree`)
                    break

            }
            setIsLoading(true)
            timeout = setTimeout(()=>setIsLoading(false),150)
        }
    }

    // 切换项目菜单列表
    const houseMenu = (item,index) =>{
        return  <div onClick={()=>{changeHouseDetails(item)}} key={index}
                     className={`menu-toggle-item ${info && info.name===item.name?'menu-toggle-active':''}`}
                >
                    <span className={`menu-toggle-icon xcode-icon-1`}>
                        {item.name.substring(0,1).toUpperCase()}
                    </span>
                    <span className='menu-toggle-name'>
                        { item.codeGroup && item.codeGroup.name + '/'}
                        { item.name }
                    </span>
                </div>
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
                list.length>2&&
                <div className='menu-toggle-tail' onClick={goRpyList}>查看更多...</div>
            }
        </div>
    )
}

export default AsideMenu
