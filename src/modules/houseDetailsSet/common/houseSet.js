import React from 'react'
import HouseSetAside from './houseSetAside'
import {renderRoutes} from 'react-router-config'

const HouseSet = props =>{

    const {route} = props

    return(
        <div className='houseSet'>
            <HouseSetAside {...props}/>
            <div className='houseSet-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default HouseSet
