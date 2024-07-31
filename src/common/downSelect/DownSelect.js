/**
 * @name: DownSelect
 * @author: limingliang
 * @date: 2024-03-06 10:30
 * @description：下拉查询
 * @update: 2024-03-06 10:30
 */
import React,{useState,useEffect} from 'react';
import {Dropdown, Checkbox, Radio, Space} from 'antd';
import "./DownSelect.scss"
import Btn from "../btn/Btn";

import { CloseCircleTwoTone, DownOutlined} from "@ant-design/icons";
const DownSelect = (props) => {
    const {visible,setVisible,dataList,setNav,nav,type,title,kind}=props

    const [multiValue,setMultiValue]=useState()


    useEffect(()=>{
        if (kind==='schemeHole'){
            setMultiValue(null)
        }

    },[visible])


    //选择
    const onChangeMultiple = (key) => {
        if (nav.length>0){
            const value=nav.some(a=>a===key)
            if (value){
                setNav(nav.filter(a=>a!==key))
            }else {
                setNav(nav.concat(key))
            }
        }else {
            setNav([key])
        }
    }

    //清空
    const cleanNav = () => {
        setNav([])
    }

    //单选切换
    const cuteMulti = (e) => {
        setNav(e.target.value)
        closePop(false)
    }

    //选择单选
    const choiceMulti = (value) => {
        setMultiValue(value)
    }

    //关闭弹窗
    const closePop = () => {
        setVisible(false)
    }

    //关闭单选
    const closeMulti=()=>{
        setNav(null)
        setMultiValue(null)
    }


    const cloneMenu = (
        <div className='down-select'>
            {/*<CheckboxGroup options={keyList} />*/}
            {
                dataList.map(item=>{
                    return(
                        <div key={item.key} className='down-select-nav' >
                            {
                                (type!=='multiple'&& nav&&nav.some(a=>a===item.key)) ?
                                    <Checkbox checked={true} onChange={()=>onChangeMultiple(item.key)} >{item.value}</Checkbox>:
                                    <Checkbox checked={false} onChange={()=>onChangeMultiple(item.key)} >{item.value}</Checkbox>
                            }
                        </div>
                    )
                })
            }
            <div className='select-exec'>
                <Btn onClick={cleanNav} title={'清空'} isMar={true}/>
                <Btn onClick={()=>setVisible(false)} title={'确定'} type={'primary'}/>
            </div>
        </div>
    )

    //单选
    const multipleChoice = () => {
      return(
          <div className='down-select'>
              <Radio.Group onChange={cuteMulti} value={nav}>
                  <Space direction="vertical">
                      {
                          dataList.map(item=>{
                              return(
                                  <div key={item.key} className='down-select-nav' onClick={()=>choiceMulti(item.value)}>
                                      <Radio value={item.key}>{item.value}</Radio>
                                  </div>
                              )
                          })
                      }
                  </Space>
              </Radio.Group>
          </div>
      )
    }

    return(
        <Dropdown
            overlay={type!=='multiple'?cloneMenu:multipleChoice}
            trigger={['click']}
            placement={'bottomLeft'}
            visible={visible}
            onVisibleChange={visible=>setVisible(visible)}
        >
            <div  onClick={()=>setVisible(!visible)}>
                <div className='select-view'>
                    {
                        title==='等级'?
                        <div className='select-content'>
                            <div>等级</div>
                            {
                                nav.length>0&&
                                <div className='select-number'>{nav.length}</div>
                            }
                        </div>:
                            <div className='select-content'>
                                {
                                    multiValue?
                                        <div>{multiValue}</div>:
                                        <div>{title}</div>
                                }
                                {
                                    nav?
                                        <CloseCircleTwoTone twoToneColor="#999" onClick={closeMulti}/>:

                                        <DownOutlined style={{fontSize:10}} twoToneColor="#52c41a"/>
                                }
                            </div>
                    }

                </div>
            </div>
        </Dropdown>
    )
}
export default DownSelect
