
/**
 * @name: ScanScheme
 * @author: limingliang
 * @date: 2023-11-08 14:30
 * @description：扫描方案
 * @update: 2023-11-08 14:30
 */
import React,{useState,useEffect,Fragment} from 'react';
import "./ScanScheme.scss"
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import Btn from "../../../common/btn/Btn";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {Form, Input, Popconfirm, Table, Tooltip} from "antd";
import EmptyText from "../../../common/emptyText/EmptyText";
import ScanSchemeStore from "../store/scanSchemeStore";
import {observer} from "mobx-react";
import ScanSchemeEditPop from "./ScanSchemeEditPop";
import Page from "../../../common/page/Page";
import ScanSchemeDrawer from "./ScanSchemeDrawer";
import add from "../../../assets/images/img/add.png";
import scanRuleStore from "../store/scanRuleStore";
import ScanSchemeSetting from "./ScanSchemeSetting";
import ScanSchemeRuleSet from "./ScanSchemeRuleSet";
import ScanSchemePlay from "./ScanSchemePlay";
import scanRuleSetStore from "../store/ScanRuleSetStore";
import ScanSchemeRule from "./ScanSchemeRule";
import ScanSchemeRuleStore from "../store/ScanSchemeRuleStore";
import Omit from "../../../common/omit/Omit";
const { TextArea } = Input;

const ScanScheme = (props) => {

    const {findScanSchemePage,deleteScanScheme,createScanScheme,createScanSchemeRuleSet,
        updateScanScheme,createScanSchemeSonar, findScanSchemeSonarList,fresh}=ScanSchemeStore
    const {findScanRuleSetNotScheme}=scanRuleSetStore
    const {findScanSchemeRuleSetList}=ScanSchemeRuleStore


    const [scanSchemeList,setScanSchemeList]=useState([])   //扫描方案列表
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPage,setTotalPage]=useState()
    const [pageSize]=useState(15)

    const [editVisible,setEditVisible] = useState(false)    //编辑扫描方案弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)  //扫描方案右侧抽屉状态
    const [scanSonar,setScanSonar]=useState('')             //扫描方案和sonar关系数据

    const [tab,setTab]=useState('rule')
    const [scheme,setScheme]=useState('')   //选择的扫描方案
    const [scanSchemeRuleSetList,setScanSchemeRuleSetList]=useState([])
    const [notSchemeRuleSet,setNotSchemeRuleSet]=useState([])  //没有添加到扫描

    const [schemeRuleSet,setSchemeRuleSet]=useState()  //选择的方案的规则集
    const [pageType,setPageType]=useState("scheme")  //右侧页面的类型

    useEffect(()=>{
        getScanSchemePage(currentPage);
    },[fresh])

    //分页查询扫描方案
    const getScanSchemePage = (currentPage) => {
        findScanSchemePage({pageParam:{currentPage:currentPage, pageSize:pageSize}}).then(res=>{
            if (res.code===0){
                setScanSchemeList(res.data.dataList)
                setTotalPage(res.data.totalPage)
                if (scheme){
                    getScanRuleSetBySchemeId(scheme)
                }else {
                    if (res.data.dataList.length>0){
                        setScheme(res.data.dataList[0])
                        getScanRuleSetBySchemeId(res.data.dataList[0])
                    }
                }

            }
        })
    }
    //通过扫描方案查询扫描
    const getScanRuleSetBySchemeId = (value) => {
        if (value.scanWay==='rule'){
            findScanSchemeRuleSetList({scanSchemeId:value.id}).then(res=>{
                if (res.code===0){
                    setScanSchemeRuleSetList(res.data)
                }
            })
        }

        if (value.scanWay==='sonar'){
            findScanSchemeSonarList({scanSchemeId:value.id}).then(res=>{
                if (res.code===0&&res.data){
                    setScanSonar(res.data[0])
                }
            })
        }
    }
    //选择扫描方案
    const choiceScheme = (value) => {
        setPageType("scheme")
        setScheme(value)
        getScanRuleSetBySchemeId(value)
    }

    const setTableType = (value) => {
        setTab(value)
    }

    //打开添加扫描方案集的抽屉
    const OpenDrawer = () => {
        setDrawerVisible(true)
        findScanRuleSetNotScheme(scheme.id).then(res=>{
            setNotSchemeRuleSet(res.data)
        })
    }

    //跳转方案规则集的规则列表
    const cuteSchemeRule = (value) => {
        setPageType("rule")
        setSchemeRuleSet(value)
    }
    //跳转方案
    const cuteScheme = () => {
        setPageType("scheme")
    }

    return(
        <div className='scanScheme'>
            <div className='scheme-left-style'>
                <div className='scan-title-nav'>
                    <div className='scan-title'>扫描方案</div>
                    <div className='scan-icon'    onClick={()=> setEditVisible(true)}>
                        <img src={add}  style={{width:25,height:25}}/>
                    </div>

                </div>
                {
                    scanSchemeList.length>0&&
                    scanSchemeList.map(item=>{
                        return(
                            <div key={item.id} className={`${scheme.id===item.id&&"choices-scheme-nav"}` } onClick={()=>choiceScheme(item)}>
                                <div className='scheme-nav'>
                                    <Omit value={item.schemeName} maxWidth={800}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='scheme-right-style'>
                {
                    pageType==='scheme'?
                        <Fragment>
                            <BreadcrumbContent firstItem={scheme.schemeName}/>
                            <div className='scanScheme-up'>
                                <div className='data-title-desc'>
                                    <div>扫描语言：{scheme.language}</div>
                                    <div>扫描类型：{scheme.scanWay==='rule'?'规则扫描':'sonar工具扫描'}</div>
                                </div>

                                {
                                    scheme.scanWay==='rule'&&
                                    <Btn
                                        type={'primary'}
                                        title={'添加规则'}
                                        onClick={()=> OpenDrawer(true)}
                                    />
                                }
                            </div>

                            <div className='tab-style'>
                                <div className={`${tab==='rule'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("rule")}>扫描规则</div>
                                <div className={`${tab==='play'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("play")}>关联计划</div>
                                <div className={`${tab==='setting'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("setting")}>设置</div>
                            </div>
                            <div className='tab-data'>
                                {
                                    tab==='rule'&&
                                    <ScanSchemeRuleSet {...props} scheme={scheme} scanSchemeRuleSetList={scanSchemeRuleSetList}
                                                       goSchemeRule={cuteSchemeRule} scanSonar={scanSonar}/>||
                                    tab==="play"&&
                                    <ScanSchemePlay {...props} scanSchemeId={scheme.id}/>||
                                    tab==='setting' &&
                                    <ScanSchemeSetting {...props} scanScheme={scheme} updateScanScheme={updateScanScheme} deleteScanScheme={deleteScanScheme}/>
                                }
                            </div>
                        </Fragment>:
                        <ScanSchemeRule goScheme={cuteScheme} schemeRuleSet={schemeRuleSet} />
                }

            </div>
            <ScanSchemeEditPop editVisible={editVisible} setEditVisible={setEditVisible} createScanScheme={createScanScheme}
                               createScanSchemeRuleSet={createScanSchemeRuleSet}  createScanSchemeSonar={createScanSchemeSonar}
            />
            <ScanSchemeDrawer visible={drawerVisible} setVisible={setDrawerVisible} scanScheme={scheme} notSchemeRuleSet={notSchemeRuleSet}
                              createScanSchemeRuleSet={createScanSchemeRuleSet}
            />
        </div>
    )
}
export default observer(ScanScheme)
