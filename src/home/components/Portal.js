import React from 'react';
import {renderRoutes} from 'react-router-config';
import Heads from './Header';
import './Header.scss';

const Portal= props=>{
    const {route}=props
    return(
        <div className='frame'>
            <Heads {...props}/>
            <div className='frame-content'>
                {renderRoutes(route.routes)}
            </div>
        </div>
    )
}

export default Portal
