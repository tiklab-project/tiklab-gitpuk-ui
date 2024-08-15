import React, {useEffect, useState} from "react";
import "./NavigationImage.scss"

import repository_white from "../../assets/images/img/repository-white.png";
import repository_black from "../../assets/images/img/repository-black.png";

import group_white from "../../assets/images/img/group-white.png";
import group_black from "../../assets/images/img/group-black.png";

import code_white from "../../assets/images/img/code-white.png";
import code_black from "../../assets/images/img/code-black.png";

import more_black from "../../assets/images/img/more-black.png"
import more_white from "../../assets/images/img/more-white.png"

import {observer} from "mobx-react";
const NavigationImage = (props) => {
    const {theme,icon,type}=props

    const [imgPath,setImagPath]=useState()

    useEffect(()=> {
        if (theme==='default'){
            switch (icon){
                case "repository":
                    setImagPath(repository_black)
                    break
                case "group":
                    setImagPath(group_black)
                    break
                case "code":
                    setImagPath(code_black)
                    break
                case "more":
                    setImagPath(more_black)
                    break
            }

        }else {
            switch (icon){
                case "repository":
                    setImagPath(repository_white)
                    break
                case "group":
                    setImagPath(group_white)
                    break
                case "code":
                    setImagPath(code_white)
                    break
                case "more":
                    setImagPath(more_white)
                    break
            }
        }
    }, [theme])





    return(
        <img  src={imgPath}  className={`${type}-size`}/>
    )

}
export default observer(NavigationImage)
