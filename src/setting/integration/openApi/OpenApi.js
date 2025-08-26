import React from "react";
import {AccessToken} from 'tiklab-openapi-ui';


const OpenApi = (props) => {

    return (
        <AccessToken
            {...props}
            //tiklab-postin-client-ui组件OpenApiDocPage的路由
            postInOpenApiPath={'/openApi'} //必填
        />
    )

}

export default OpenApi
