/**
 * @name: RepositoryTable
 * @date: 2023-05-22 14:30
 * @description：页面找不到
 * @update: 2023-05-22 14:30
 */
import React from "react";
import {NotFound} from "tiklab-eam-ui";

const NotFoundContent = props =>{
    return <NotFound {...props}
                     homePath={'/home'}
    />

}

export default NotFoundContent
