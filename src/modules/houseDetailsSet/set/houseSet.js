import React,{useState,useEffect} from 'react'
import {Modal, Form, Input} from 'antd'
import {
    ExclamationCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined
} from '@ant-design/icons'
import {PrivilegeProjectButton} from 'tiklab-privilege-ui'
import {inject,observer} from 'mobx-react'
import Btn from '../../common/btn/btn'
import BreadcrumbContent from '../../common/breadcrumb/breadcrumb'
import HousePower from '../../house/components/housePower'
import './houseSet.scss'

const HouseSet = props =>{

    const {houseStore} = props

    const {houseInfo} = houseStore

    const [form] = Form.useForm()
    const [expandedTree,setExpandedTree] = useState([])  // 树的展开与闭合
    const [powerType,setPowerType] = useState(1)  // 树的展开与闭合

    const onConfirm = () =>{
        Modal.confirm({
            title: '删除',
            icon: <ExclamationCircleOutlined />,
            content: '删除后数据无法恢复',
            onOk:()=>del(),
            okText: '确认',
            cancelText: '取消',
        });
    }

    const onOk = value => {

    }

    const del = () =>{

    }

    const lis = [
        {
            key:1,
            title:'仓库信息',
            desc: '更新仓库信息',
            icon: <EditOutlined />,
            enCode:'house_update',
            content: <div className='bottom-rename'>
                        <Form
                            form={form}
                            autoComplete='off'
                            layout='vertical'
                            initialValues={{name:houseInfo.name}}
                        >
                            <Form.Item label='仓库名称' name='name'
                                       rules={[{max:30,message:'请输入1~31位以内的名称'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <HousePower
                                powerType={powerType}
                                setPowerType={setPowerType}
                                set={true}
                            />
                            <Form.Item name='desc' label='仓库描述'>
                                <Input.TextArea/>
                            </Form.Item>
                        </Form>
                        <div className='bottom-rename-btn'>
                            <Btn
                                type={'common'}
                                title={'取消'}
                                isMar={true}
                                onClick={()=>setOpenOrClose(1)}
                            />
                            <Btn
                                type={'dangerous'}
                                title={'确定'}
                                onClick={() => {
                                    form
                                        .validateFields()
                                        .then((values) => {
                                            onOk(values)
                                            form.resetFields()
                                        })
                                }}
                            />
                        </div>
                     </div>
        },
        {
            key:2,
            title:'仓库删除',
            desc: '删除仓库',
            icon: <DeleteOutlined />,
            enCode:'house_delete',
            content: <div className='bottom-delete'>
                        <div style={{color:'#ff0000',paddingBottom:5,fontSize:13}}>
                            此操作无法恢复！请慎重操作！
                        </div>
                        <Btn
                            type={'common'}
                            title={'取消'}
                            isMar={true}
                            onClick={()=>setOpenOrClose(2)}
                        />
                        <Btn
                            onClick={onConfirm}
                            type={'dangerous'}
                            title={'删除'}
                        />
                    </div>
        }
    ]

    // 是否存在key -- ture || false
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    // 展开和闭合
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    const lisItem = item =>{
        return <div key={item.key} className='houseReDel-li'>
            <div
                className={`houseReDel-li-top ${isExpandedTree(item.key) ?'houseReDel-li-select':''}`}
                onClick={()=>setOpenOrClose(item.key)}
            >
                <div className='houseReDel-li-icon'>
                    {item.icon}
                </div>
                <div className='houseReDel-li-center'>
                    <div className='houseReDel-li-title'>{item.title}</div>
                    {
                        !isExpandedTree(item.key) &&
                        <div className='houseReDel-li-desc'>{item.desc}</div>
                    }
                </div>
                <div className='houseReDel-li-down'>
                    {
                        isExpandedTree(item.key)?
                            <DownOutlined />:<RightOutlined />
                    }
                </div>
            </div>
            <div className={`${isExpandedTree(item.key)? 'houseReDel-li-bottom':'houseReDel-li-none'}`}>
                {
                    isExpandedTree(item.key) &&
                        item.content
                }
            </div>
        </div>
    }

    const renderLisItem = item => {
        return  <PrivilegeProjectButton code={item.enCode} key={item.key} domainId={houseId}>
                    {lisItem(item)}
                </PrivilegeProjectButton>
    }

    return(
        <div className='houseReDel xcode-home-limited xcode'>
            <div className='houseReDel-up'>
                <BreadcrumbContent firstItem={'设置'}/>
            </div>
            <div className='houseReDel-content'>
                <div className='houseReDel-ul'>
                    {
                        lis.map(item=>{
                            return lisItem(item)
                        })
                    }
                </div>
            </div>
            {/*{*/}
            {/*    isLoading && <Loading/>*/}
            {/*}*/}
        </div>
    )
}

export default inject('houseStore')(observer(HouseSet))
