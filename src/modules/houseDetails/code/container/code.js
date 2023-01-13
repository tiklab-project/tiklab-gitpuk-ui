import React,{useEffect,useState,useRef} from 'react'
import {Select,Input,Table,Dropdown,Tooltip,Button,Divider} from 'antd'
import {SearchOutlined,PlusOutlined,CopyOutlined} from '@ant-design/icons'
import {inject,observer} from "mobx-react"
import BreadcrumbContent from '../../../common/breadcrumb/breadcrumb'
import Btn from "../../../common/btn/btn"
import EmptyText from "../../../common/emptyText/emptyText"
import '../components/code.scss'

const Code = props =>{

    const {houseStore,match,location} = props
    const {houseId} = houseStore

    const searValue = useRef(null)
    const [searInput,setSearInput] = useState(false)
    const [dataSource,setData] = useState([
        {
            commit: {id: "4a0a53f66e972bcf4c8d0f109503402436ea2cd2", message: "配置",committed_date:"202020"},
            commit_path:"/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2",
            file_name:"node",
            type: "tree",
            child:[
                {
                    commit: {id: "4a0a53f66e972bcf4c8d0f109503402436ea2cd2", message: "配置",committed_date:"202020"},
                    commit_path:"/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2",
                    file_name:"assets.js",
                    type: "blob"
                },
            ]
        },
        {
            commit: {id: "4a0a53f66e972bcf4c8d0f109503402436ea2cd2", message: "配置",committed_date:"202020"},
            commit_path:"/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2",
            file_name:"zzz.js",
            type: "blob"
        },
    ])

    useEffect(()=>{
        if(searInput){
            searValue.current.focus()
        }
    },[searInput])

    const changBranch = value => {
        props.history.push(`/index/house/${match.params.name}/tree/${value}`)
    }

    const fileName = record => {
        const name = location.pathname.split('/'+match.params.name+'/tree/')
        switch (record.type) {
            case 'tree':
                setData(record.child)
                props.history.push(`${location.pathname}/${record.file_name}`)
                break
            case 'blob':
                props.history.push(`/index/house/${match.params.name}/blob/${name[1]}/${record.file_name}`)
        }
    }

    const renderFileType = text => {
        const fileType = text.substring(text.lastIndexOf('.') + 1);
        switch (fileType) {
            case 'js':
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-nodejs"/>
                        </svg>
            case 'css':
                return 'css'
        }
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "file_name",
            key: "file_name",
            width:"60%",
            ellipsis:true,
            render:(text,record)=>{
                return <span className='code-table-name' onClick={()=>fileName(record)}>
                            <span style={{paddingRight:5}}>
                                {
                                    record.type==='tree' ?
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#icon-renwu"/>
                                        </svg>
                                        :
                                        renderFileType(text)
                                }
                            </span>
                            <span>{text}</span>
                        </span>

            }
        },
        {
            title: "提交信息",
            dataIndex: ["commit","message"],
            key: ['commit',"message"],
            width:"30%",
            ellipsis:true,
            render:(text,record)=> {
                return <span className='code-table-msg'>{text}</span>
            }
        },
        {
            title: "提交时间",
            dataIndex: ["commit","committed_date"],
            key:["commit","committed_date"],
            width:"10%",
            ellipsis:true,
        },
    ]

    const addFileMenu = (
        <div className='file-add-menu'>
            <div className='file-add-item'>新建文件</div>
            <div className='file-add-item'>新建文件夹</div>
            <div className='file-add-item'>上传文件</div>
        </div>
    )

    const cloneMenu = (
        <div className='clone-menu'>
            <div className='clone-item'>
                <div className='clone-item-title'>使用SSH克隆</div>
                <Input.Group compact>
                    <Input value="git@github.com:ant-design/ant-design.git" style={{width:"calc(100% - 50px)"}}/>
                    <Tooltip title="复制地址">
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-item'>
                <div className='clone-item-title'>使用HTTP克隆</div>
                <Input.Group compact>
                    <Input value="http://172.12.1.10/devops-itdd/tiklab-xcode-ui.git" style={{width:"calc(100% - 50px)"}}/>
                    <Tooltip title="复制地址">
                        <Button icon={<CopyOutlined />} />
                    </Tooltip>
                </Input.Group>
            </div>
            <div className='clone-download'>
                <div className='clone-item-download'>下载ZIP</div>
                <Divider type="vertical" />
                <div className='clone-item-download'>下载TAR</div>
            </div>
        </div>
    )

    return(
        <div className='code'>
            <div className='code-content xcode-home-limited xcode'>
                <BreadcrumbContent firstItem={'代码'} secondItem={'node'}/>
                <div className='code-content-head'>
                    <div className='code-head-left'>
                        <div className='code-branch'>
                            <Select defaultValue={'master'} onChange={value=>changBranch(value)}>
                                <Select.Option value={'master'}>master</Select.Option>
                                <Select.Option value={'xcode-v1.0'}>xcode-v1.0</Select.Option>
                            </Select>
                        </div>
                        <div className='code-bread'>
                            <div className='bread-item'>node </div>
                            <div className='bread-item'> / </div>
                            <div className='bread-item'>node</div>
                            <div className='bread-item'> / </div>
                        </div>
                    </div>
                    <div className='code-head-right'>
                        <div className='code-search'>
                            {
                                searInput ?
                                <Input
                                    allowClear
                                    ref={searValue}
                                    placeholder="文件名称"
                                    // onChange={onChangeSearch}
                                    prefix={<SearchOutlined />}
                                    onBlur={()=>setSearInput(false)}
                                    style={{width:200}}
                                />
                                :
                                <SearchOutlined onClick={()=>setSearInput(true)}/>
                            }
                        </div>
                        <div className='code-file-add'>
                            <Dropdown overlay={addFileMenu} trigger={['click']} placement={'bottomRight'}>
                                <PlusOutlined/>
                            </Dropdown>
                        </div>
                        <div className='code-desc'>
                            <Btn
                                title={'WEB IDE'}
                            />
                        </div>
                        <div className='code-clone'>
                            <Dropdown overlay={cloneMenu} trigger={['click']} placement={'bottomRight'}>
                                <Btn
                                    title={'克隆'}
                                    type={'primary'}
                                />
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <div className='code-content-commit'>
                    <div className='code-commit-icon'/>
                    <div className='code-commit-msg'>
                        <div className='msg-title'>解决无法登录问题</div>
                        <div className='msg-desc'>admin 1个小时前提交</div>
                    </div>
                    <div className='code-commit-ident'>
                        <div className='ident-title'> 33128853</div>
                        <div className='ident-btn'><CopyOutlined /></div>
                    </div>
                </div>
                <div className='code-content-tables'>
                    <Table
                        bordered={false}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={record=>record.file_name}
                        pagination={false}
                        locale={{emptyText: <EmptyText/>}}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject('houseStore')(observer(Code))
