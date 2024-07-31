import React ,{useEffect}from 'react';
import {inject, observer} from "mobx-react";
import RpyStatistics from "../../../common/aside/RpyStatistics";

const StatisticsNav = props =>{

    const {match,repositoryStore} = props
    const {repositoryInfo}=repositoryStore
    const webUrl = `${match.params.namespace}/${match.params.name}`


    // 设置
    const secondRouter = [
        {
            id:`/repository/${webUrl}/statistics/commit`,
            title:`提交统计`,
        },
        {
            id:`/repository/${webUrl}/statistics/code`,
            title:`代码频率`,
        },
    ]

    return  <RpyStatistics
        {...props}
        secondRouter={secondRouter}
        domainId={repositoryInfo?.rpyId}
    />
}

export default inject('repositoryStore')(observer(StatisticsNav))
