import React from 'react';
import './Tabs.scss';

/**
 * 标签
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Tabs = props =>{

    const {tabLis,type,onClick,findType,dataNum} = props


    const findProjectNum = (value) => {
        return(
            <>
                {value==='viewable'&&
                    <span className='xcode-tab-num'>{dataNum?.allNum}</span>||
                    value==='oneself'&&
                    <span className='xcode-tab-num'>{dataNum?.createNum}</span>||
                    value==='collect'&&
                    <span className='xcode-tab-num'>{dataNum?.colletNum}</span>
                }
            </>
        )
    }

    return (
        <div className='xcode-tabs'>
            {
                tabLis.map(item=>(
                    <div key={item.id}
                         className={`xcode-tab ${type===item.id?'xcode-active-tab':null}`}
                         onClick={()=>onClick(item)}
                    >
                        {item.title}
                        {

                            findType==="repository"&& findProjectNum(item.id)
                        }
                    </div>

                ))
            }
        </div>
    )
}

export default Tabs
