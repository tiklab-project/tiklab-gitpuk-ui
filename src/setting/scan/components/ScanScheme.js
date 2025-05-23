
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
import {DeleteOutlined, EllipsisOutlined, ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Dropdown, Modal, Input, Menu} from "antd";
const { confirm } = Modal;
import ScanSchemeStore from "../store/scanSchemeStore";
import {observer} from "mobx-react";
import ScanSchemeEditPop from "./ScanSchemeEditPop";
import ScanSchemeDrawer from "./ScanSchemeDrawer";
import ScanSchemeRuleSet from "./ScanSchemeRuleSet";
import ScanSchemePlay from "./ScanSchemePlay";
import scanRuleSetStore from "../store/ScanRuleSetStore";
import ScanSchemeRule from "./ScanSchemeRule";
import ScanSchemeRuleStore from "../store/ScanSchemeRuleStore";
import Omit from "../../../common/omit/Omit";
import ScanPlayStore from "../../../repository/scan/store/ScanPlayStore";
import ScanSchemeSetting from "./ScanSchemeSetting";
const { TextArea } = Input;
import {PrivilegeButton} from 'tiklab-privilege-ui';
const ScanScheme = (props) => {

    const {findScanSchemeList,deleteScanScheme,createScanScheme,createScanSchemeRuleSet,
        updateScanScheme,createScanSchemeSonar, findScanSchemeSonarList,updateScanSchemeSonar,fresh}=ScanSchemeStore
    const {findScanRuleSetNotScheme}=scanRuleSetStore
    const {findScanSchemeRuleSetList,deleteScanSchemeRuleSet}=ScanSchemeRuleStore
    const {findScanPlayList}=ScanPlayStore

    const [scanSchemeList,setScanSchemeList]=useState([])   //扫描方案列表
    const [editVisible,setEditVisible] = useState(false)    //编辑扫描方案弹窗状态
    const [drawerVisible,setDrawerVisible]=useState(false)  //扫描方案右侧抽屉状态
    const [scanSonar,setScanSonar]=useState('')             //扫描方案和sonar关系数据

    const [tab,setTab]=useState('rule')
    const [scheme,setScheme]=useState('')   //选择的扫描方案
    const [scanSchemeRuleSetList,setScanSchemeRuleSetList]=useState([])
    const [notSchemeRuleSet,setNotSchemeRuleSet]=useState([])  //没有添加到扫描

    const [schemeRuleSet,setSchemeRuleSet]=useState()  //选择的方案的规则集
    const [pageType,setPageType]=useState("scheme")  //右侧页面的类型

    const [schemeDate,setSchemeDate]=useState('') //编辑选择的扫描方案


    useEffect(()=>{
        getScanSchemePage();
    },[fresh])

    //分页查询扫描方案
    const getScanSchemePage = () => {
        findScanSchemeList({}).then(res=>{
            if (res.code===0){
                setScanSchemeList(res.data)
                if (scheme){
                    getScanRuleSetBySchemeId(scheme)
                }else {
                    if (res.data.length>0){
                        setScheme(res.data[0])
                        getScanRuleSetBySchemeId(res.data[0])
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

        if (tab==='setting'&&value.scanWay==='rule'){
            setTableType("rule")
        }
    }

    //切换右侧内容 类型
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
    //打开编辑的弹窗
    const openEdit = (value) => {
        setSchemeDate(value)
        setEditVisible(true)
    }

    //删除扫描方案关联的规则包
    const deleteScanSchemeRule = (value) => {
        deleteScanSchemeRuleSet(value).then(res=>{
            res.code===0&&
            getScanRuleSetBySchemeId(scheme)
        })
    }


    //删除弹窗
    const openDelete=async (value)=>{
        findScanPlayList({scanSchemeId:value.id}).then(res=>{
            if (res.code===0&&res.data&&res.data.length>0){
               // deletePop("存在关联的扫描计划，移出扫描计划后可删除")
                Modal.warning({
                    title: '存在关联的扫描计划，移出扫描计划后可删除',
                });
            }else {
                deletePop(value)
            }
        })
    }

    const deletePop = (value) => {
        confirm({
            title: "确认删除",
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteScanScheme(value.id)
            },
            onCancel() {
            },
        });
    }

    /**
     * 目录悬浮的操作项
     */
    const moreMenu = (value)=>(
        <Menu>
            <Menu.Item  key={1}>
               <div onClick={()=>openEdit(value)}>{"编辑"}</div>
            </Menu.Item>
            <Menu.Item  key={2}>
                <div onClick={()=>openDelete(value)}>删除</div>
            </Menu.Item>
        </Menu>
    );


    /**
     * 目录悬浮项
     */
    const categoryAct = (value) => {
        return (
            <PrivilegeButton  code={"gittok_scan_scheme"} key={'gittok_scan_scheme'} >
                <div className={'category-action'}>
                    <div  className={"category-action-right"}>
                        <Dropdown overlay={()=>moreMenu(value)} className={'category-action-more'}>
                            <EllipsisOutlined />
                        </Dropdown>
                    </div>
                </div>
             </PrivilegeButton>
        )
    }
    return(
        <div className='scanScheme'>
            <div className='scheme-left-style'>
                <div className='scan-title-nav'>

                    <div className='scan-title'>扫描方案</div>
                    <PrivilegeButton  code={"gittok_scan_scheme"} key={'gittok_scan_scheme'} >
                        <div className='scan-icon'  onClick={()=> setEditVisible(true)}>
                            <PlusOutlined style={{fontSize:17,cursor:"pointer"}}/>
                        </div>
                    </PrivilegeButton>

                </div>
                {
                    scanSchemeList.length>0&&
                    scanSchemeList.map(item=>{
                        return(
                              <div key={item.id} className='cate-li'>
                                  <div   className={`categoryNav-li ${scheme.id===item.id&&"choices-scheme-nav"}` } onClick={()=>choiceScheme(item)}>
                                      <div className='scheme-nav'>
                                          <Omit value={item.schemeName} maxWidth={800}/>
                                      </div>
                                  </div>

                                          {item.category!==1&&categoryAct(item)}
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
                            </div>

                            <div className='tab-data-style'>
                                <div className='tab-style'>
                                    <div className={`${tab==='rule'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("rule")}>扫描规则</div>
                                    <div className={`${tab==='play'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("play")}>关联计划</div>
                                    {
                                        scheme.scanWay!=='rule'&&
                                        <div className={`${tab==='setting'&& ' choose-tab-nav '}  tab-nav`} onClick={()=>setTableType("setting")}>设置</div>
                                    }
                                </div>
                                <PrivilegeButton  code={"gittok_scan_scheme"} key={'gittok_scan_scheme'} >
                                    <div className='add-rule-style'>
                                        {
                                            scheme.scanWay==='rule'&&tab==='rule'&&
                                            <Btn
                                                type={'primary'}
                                                title={'添加规则'}
                                                onClick={()=> OpenDrawer(true)}
                                            />
                                        }
                                    </div>
                                </PrivilegeButton>
                            </div>

                            <div className='tab-data xcode'>
                                {
                                    tab==='rule'&&
                                    <ScanSchemeRuleSet {...props} scheme={scheme} scanSchemeRuleSetList={scanSchemeRuleSetList}
                                                       goSchemeRule={cuteSchemeRule} scanSonar={scanSonar}
                                                       deleteScanSchemeRuleSet={deleteScanSchemeRule}/>||
                                    tab==="play"&&
                                    <ScanSchemePlay {...props} scanSchemeId={scheme.id}/>
                                    ||tab==='setting' &&scheme.scanWay!=='rule'&&
                                    <ScanSchemeSetting {...props} updateScanSchemeSonar={updateScanSchemeSonar} scanSonar={scanSonar}
                                                       findScanSchemeSonarList={findScanSchemeSonarList}  setScanSonar={setScanSonar}
                                    />
                                }
                            </div>
                        </Fragment>:
                        <ScanSchemeRule goScheme={cuteScheme} schemeRuleSet={schemeRuleSet} />
                }

            </div>
            <ScanSchemeEditPop editVisible={editVisible} setEditVisible={setEditVisible}
                               createScanScheme={createScanScheme} createScanSchemeRuleSet={createScanSchemeRuleSet}
                               createScanSchemeSonar={createScanSchemeSonar} updateScanScheme={updateScanScheme}
                               schemeDate={schemeDate} setSchemeDate={setSchemeDate} scanSchemeList={scanSchemeList}
            />
            <ScanSchemeDrawer visible={drawerVisible} setVisible={setDrawerVisible} scanScheme={scheme} notSchemeRuleSet={notSchemeRuleSet}
                              createScanSchemeRuleSet={createScanSchemeRuleSet}
            />
        </div>
    )
}
export default observer(ScanScheme)
