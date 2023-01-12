import React,{useState,useEffect} from 'react'
import {Input,Avatar,Select} from 'antd'
import {CopyOutlined,FolderOpenOutlined,SearchOutlined} from '@ant-design/icons'
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import CommitsDetails from '../components/commitsDetails'
import '../components/commits.scss'

const Commits = props =>{

    const {match} = props

    const [details,setDetails] = useState(false)

    const changBranch = value => {
        props.history.push(`/index/house/${match.params.name}/commits/${value}`)
    }

    const commitsData = [
        {
            id:'1',
            time:'200-11-11 12:20:01',
            num:'2',
            commit:[
                {
                    id:'1-1',
                    msg:'更改认证方式',
                    time:'1个小时前提交',
                    user:'admin',
                    code:'2212'
                },
                {
                    id:'1-2',
                    msg:'更改动态',
                    time:'2个小时前提交',
                    user:'admin',
                    code:'232454'
                }
            ]
        },
        {
            id:'2',
            time:'200-11-11 12:20:01',
            num:'1',
            commit:[
                {
                    id:'2-1',
                    msg:'更改配置',
                    time:'5天前',
                    user:'admin',
                    code:'23532523'
                },
            ]
        }
    ]

    const goDetails = item =>{
        setDetails(true)
    }

    const renderCommits = item => {
        return (
            <div className='msg-item' key={item.id}>
                <div className='msg-item-left'>
                    <div className='msg-item-icon'>
                        <Avatar
                            style={{
                                backgroundColor: "#f56a00",
                                verticalAlign: 'middle',
                            }}
                            size="large"
                        />
                    </div>
                    <div className='msg-item-msg' onClick={()=>goDetails(item)}>
                        <div className='msg-item-title'>{item.msg}</div>
                        <div className='msg-item-desc'>
                            <span className='desc-user'>{item.user}</span>
                            <span className='desc-time'>{item.time}</span>
                        </div>
                    </div>
                </div>
                <div className='msg-item-ident'>
                    <div className='ident-title'> 33128853</div>
                    <div className='ident-copy'><CopyOutlined /></div>
                    <div className='ident-folder'><FolderOpenOutlined /></div>
                </div>
            </div>
        )
    }

    const renderCommitsData = group => {
        return (
            <div className='commits-msg-item' key={group.id}>
                <div className='commits-msg-item-title'>
                    <span className='title-time'>{group.time}</span>
                    <span className='title-num'>({group.num})</span>
                </div>
                <div className='commits-msg-item-content'>
                    {
                        group.commit.map(item=>{
                            return renderCommits(item)
                        })
                    }
                </div>
            </div>
        )
    }

    if(details){
        return  <CommitsDetails
                    setDetails={setDetails}
                />
    }

    return (
        <div className='commits'>
            <div className='commits-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'提交'}/>
                <div className='commits-head'>
                    <div className='commits-head-left'>
                        <div className='commits-branch'>
                            <Select defaultValue={'master'} onChange={value=>changBranch(value)}>
                                <Select.Option value={'master'}>master</Select.Option>
                                <Select.Option value={'xcommits-v1.0'}>xcommits-v1.0</Select.Option>
                            </Select>
                        </div>
                        <div className='commits-bread'>
                            <div className='bread-item'>node </div>
                            <div className='bread-item'> / </div>
                            <div className='bread-item'>node</div>
                            <div className='bread-item'> / </div>
                        </div>
                    </div>
                    <div className='commits-head-right'>
                        <div className='commits-user'>
                            <Select defaultValue={'admin'} onChange={value=>changBranch(value)}>
                                <Select.Option value={'admin'}>admin</Select.Option>
                                <Select.Option value={'root'}>root</Select.Option>
                            </Select>
                        </div>
                        <div className='commits-input'>
                            <Input
                                allowClear
                                placeholder='提交信息'
                                // onChange={onChangeSearch}
                                prefix={<SearchOutlined />}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                </div>
                <div className='commits-msg'>
                    {
                        commitsData.map(group=>{
                            return renderCommitsData(group)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Commits
