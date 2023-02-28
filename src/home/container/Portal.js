import React from 'react';
import {renderRoutes} from 'react-router-config';
import Heads from '../components/Header';
import '../components/Header.scss';

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
