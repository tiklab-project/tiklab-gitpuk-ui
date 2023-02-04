import React,{useEffect,useState} from 'react'
import {Space} from 'antd'
import {AimOutlined,HistoryOutlined} from '@ant-design/icons'
import {inject,observer} from 'mobx-react'
import Guide from '../../common/guide/guide'
import EmptyText from '../../common/emptyText/emptyText'
import './homePage.scss';

const HomePage = props =>{

    const {houseStore,houseGroupStore} = props

    const {findUserCode} = houseStore
    const {findUserGroup} = houseGroupStore

    const [codeNum,setCodeNum] = useState(0)
    const [groupNum,setGroupNum] = useState(0)

    useEffect(()=>{
        // 仓库
        findUserCode().then(res=>{
            res.code===0 && setCodeNum(res.data && res.data.length)
        })
        // 仓库组
        findUserGroup().then(res=>{
            res.code===0 && setGroupNum(res.data && res.data.length)
        })
    },[])

    // 最近访问的仓库
    const renderList = item => {
        return  <div className='houseRecent-item' key={item.openId}
                     onClick={()=> props.history.push(`/index/task/${item.house && item.house.id}/survey`)}
                >
            <div className='houseRecent-item-title'>
                {
                    item && item.house &&
                    <Space>
                        <span className={`mf-icon-${item.house.color?item.house.color:0} houseRecent-icon`}>
                            {item.house.name && item.house.name.substring(0,1).toUpperCase()}
                        </span>
                        <span className='houseRecent-name'>
                            {item.house.name && item.house.name}
                        </span>
                    </Space>
                }
            </div>
            <div className='houseRecent-item-details'>
                <div className='houseRecent-item-detail'>
                    <span className='details-desc'>成功</span>
                    <span>{item.houseExecState.successNumber}</span>
                </div>
                <div className='houseRecent-item-detail'>
                    <span className='details-desc'>失败</span>
                    <span>{item.houseExecState.errorNumber}</span>
                </div>
            </div>
        </div>
    }

    const stableList = [
        {
            id:1,
            title: '我的仓库',
            icon:'#icon-renwu',
            listLength:codeNum,
            to:'/index/house'
        },
        {
            id:2,
            title:'我的仓库组',
            icon:'#icon-icon-test',
            listLength: groupNum,
            to:'/index/group'
        }
    ]

    const renderStableList = item => {
        return(
            <div key={item.id} className='quickIn-group' onClick={()=>props.history.push(item.to)}>
                <div className='quickIn-group-wrap'>
                    <div className='quickIn-group-title'>
                        <span className='quickIn-group-icon'>
                            <svg className='icon' aria-hidden='true'>
                                <use xlinkHref={`${item.icon}`}/>
                            </svg>
                        </span>
                        <span>{item.title}</span>
                    </div>
                    <div className='quickIn-group-number'>
                        {item.listLength}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className='homePage'>
            <div className='homePage-content xcode-home-limited'>
                <div className='quickIn'>
                    {
                        stableList && stableList.map(item=>{
                            return renderStableList(item)
                        })
                    }
                </div>
                <div className='houseRecent'>
                    <Guide title={'最近访问的仓库'} icon={<HistoryOutlined />}/>
                </div>
                <div className='home-dyna'>
                    <Guide
                        title={'近期动态'}
                        icon={<AimOutlined/>}
                        type={'dynamic'}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore','houseGroupStore')(observer(HomePage))
