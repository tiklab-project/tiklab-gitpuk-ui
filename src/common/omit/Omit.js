/**
 * @name: Omit
 * @author: limingliang
 * @date: 2023-09-04 10:30
 * @description：省略
 * @update: 2023-09-04 10:30
 */
import React from 'react';
const Omit = (props) => {
    const {value,maxWidth}=props

    return(
        <div style={{
          /*  display:"flex",*/
            overflow: "hidden",
            maxWidth:maxWidth,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        }} >{value}</div>
    )
}
export default Omit
