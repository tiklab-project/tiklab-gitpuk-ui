import React,{useState} from "react";
import {renderRoutes} from "react-router-config";
import HouseDetailsAside from "./houseDetailsAside";
import Loading from "../../common/loading/loading";

const HouseDetails= (props)=>{

    const {route,match}=props

    const houseName = match.params.name

    const [isLoading,setIsLoading] = useState(false)

    return(
        <div className="houseDetails">
            <HouseDetailsAside
                {...props}
                setIsLoading={setIsLoading}
                houseName={houseName}
            />
            {
                isLoading ? <Loading/> :
                <div className="houseDetails-content">
                    {renderRoutes(route.routes)}
                </div>
            }

        </div>
    )
}

export default HouseDetails


