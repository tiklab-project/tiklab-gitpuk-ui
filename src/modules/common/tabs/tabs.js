import React from 'react'
import './tabs.scss'

const Tabs = props =>{

    const {tabLis,type,onClick} = props

    const renderTabItem = item =>{
        return  <div
                    key={item.id}
                    className={`xcode-tab ${type===item.id?'xcode-active-tab':null}`}
                    onClick={()=>onClick(item)}
                >{item.title}</div>
    }

    return (
        <div className='xcode-tabs'>
            {
                tabLis.map(item=>renderTabItem(item))
            }
        </div>
    )
}

export default Tabs
