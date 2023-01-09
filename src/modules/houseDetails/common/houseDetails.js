import React,{useState} from "react";
import {renderRoutes} from "react-router-config";
import HouseDetailsAside from "./houseDetailsAside";
import Loading from "../../common/loading/loading";

const HouseDetails= (props)=>{

    const {route,match}=props

    const houseId = match.params.id

    const [isLoading,setIsLoading] = useState(false)

    return(
        <div className="houseDetails">
            <HouseDetailsAside
                {...props}
                setIsLoading={setIsLoading}
                houseId={houseId}
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


