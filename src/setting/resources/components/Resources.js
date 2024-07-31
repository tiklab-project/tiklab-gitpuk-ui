/**
 * @name: Resources
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：资源监控
 * @update: 2023-12-20 14:30
 */
import React,{useState,useEffect} from 'react';
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import "./Resources.scss"
import ResourcesStore from "../store/ResourcesStore";
import {Col} from "antd";
const Resources = (props) => {

    const {findResource}=ResourcesStore
    const [resources,setResources]=useState(null)

    useEffect(()=>{
        findResource().then(res=>{
            res.code===0&&setResources(res.data)
        });
    },[])


    return(
        <div className='xcode gittok-width resources  '>
            <Col
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                md={{ span: 24 }}
                lg={{ span: "16", offset: "4" }}
                xl={{ span: "14", offset: "5" }}
            >

                    <BreadcrumbContent firstItem={'资源监控'} />
                    <div className='resources-data'>
                        <div className='resources-data-item'>
                            <div className='data-item-title'>版本类型</div>
                            <div className='data-item-desc'>
                                {resources?.version===1&&"社区版"||resources?.version===2&&"企业版"}
                            </div>

                        </div>
                        <div className='resources-data-item'>
                            <div className='data-item-title'>磁盘空间</div>
                            <div className='data-item-desc'>
                                <span>{resources?.usedSpace}</span>
                                <span className='data-item-middle'>/</span>
                                <span>{resources?.allSpace==='un'?"不限":resources?.allSpace}</span>
                            </div>
                            <div className='data-item-but'>查看</div>
                        </div>
                    </div>

            </Col>
        </div>
    )
}
export default Resources
