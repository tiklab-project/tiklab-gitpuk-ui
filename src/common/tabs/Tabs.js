import React from 'react';
import './Tabs.scss';

/**
 * 标签
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Tabs = props =>{

    const {tabLis,type,onClick} = props

    return (
        <div className='xcode-tabs'>
            {
                tabLis.map(item=>(
                    <div key={item.id}
                         className={`xcode-tab ${type===item.id?'xcode-active-tab':null}`}
                         onClick={()=>onClick(item)}
                    >{item.title}</div>
                ))
            }
        </div>
    )
}

export default Tabs
