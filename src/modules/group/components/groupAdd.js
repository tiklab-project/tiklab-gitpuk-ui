import React,{useState} from 'react'
import {Modal,Form,Input,Select} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import Btn from '../../common/btn/btn'
import RepositoryUser from '../../repository/components/repositoryUser'
import RepositoryPower from '../../repository/components/repositoryPower'
import '../../repository/components/repositoryAdd.scss'

const GroupAdd = props =>{

    const {addHouseVisible,setAddHouseVisible,createGroup} = props

    const [form] = Form.useForm()

    const [powerType,setPowerType] = useState(1)
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])

    const onOk = value => {
        createGroup(value).then(res=>{
            res.code===0 && props.history.push(`/index/group/${value.name}/survey`)
        })
    }

    const newStoreHouse = (
        <Form
            form={form}
            autoComplete='off'
            layout='vertical'
        >
            <Form.Item label='仓库组名称' name='name'
                       rules={[
                           {required:true,message:'仓库组名称不能为空'},
                           {max:30,message:'请输入1~31位以内的名称'},
                           {
                               pattern: /^[a-zA-Z0-9_]([a-zA-Z0-9_\-.])*$/,
                               message: "只能包含字母和数字、 '_'、 '.'和'-'，且只能以字母、数字或'_'开头",
                           },
                       ]}
            >
                <Input bordered={false} style={{background:'#fff'}}/>
            </Form.Item>
            <RepositoryPower
                powerType={powerType}
                setPowerType={setPowerType}
                powerTitle={'仓库组'}
            />
            {
                powerType===2 &&
                <RepositoryUser
                    yUserList={[yUserList]}
                    setYUserList={setYUserList}
                    nUserList={nUserList}
                    setNUserList={setNUserList}
                    userId={'11111'}
                    member={member}
                    setMember={setMember}
                    userTitle={'仓库组'}
                />
            }
            <Form.Item name='remarks' label='仓库组描述'>
                <Input.TextArea bordered={false}  style={{background:'#fff'}} />
            </Form.Item>
        </Form>
    )

    return(
        <Modal
            visible={addHouseVisible}
            onCancel={()=>setAddHouseVisible(false)}
            closable={false}
            mask={false}
            footer={false}
            style={{top:0,padding:0,margin:0,width:'100vw',maxWidth:'100vw'}}
            className='xcode storehouse-add'
            width={'100vw'}
        >
            <div className='storehouseAddModal'>
                <div className='storehouseAddModal-top'>
                    <div className='storehouseAddModal-top-title'>
                        新建仓库组
                    </div>
                    <div className='storehouseAddModal-top-close'>
                        <CloseOutlined onClick={()=>setAddHouseVisible(false)}/>
                    </div>
                </div>
                <div className='storehouseAddModal-content'>
                    <div className='storehouseAddModal-new'>
                        {newStoreHouse}
                        <Btn
                            onClick={()=>setAddHouseVisible(false)}
                            title={'取消'}
                            isMar={true}
                        />
                        <Btn
                            type={'primary'}
                            onClick={() => {
                                form
                                    .validateFields()
                                    .then((values) => {
                                        onOk(values)
                                        form.resetFields()
                                    })
                            }}
                            title={'确认'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default GroupAdd
