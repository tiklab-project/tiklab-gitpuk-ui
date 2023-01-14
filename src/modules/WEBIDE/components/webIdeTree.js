import React,{useState} from 'react'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    ExperimentOutlined
} from '@ant-design/icons'


const WebIdeTree = props =>{

    const tree = [
        {
            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2',message: '配置',committed_date:'202020'},
            commit_path:'/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
            file_name:'node',
            type: 'tree',
            child:[
                {
                    commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2',message: '配置',committed_date:'202020'},
                    commit_path:'/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
                    file_name:'nodezzzz',
                    type: 'tree',
                    child:[
                        {
                            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
                            commit_path:'/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
                            file_name:'assetszzzzzzsfs.js',
                            type: 'blob'
                        },
                    ]
                },
            ]
        },
        {
            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
            commit_path:'/devops-itdd/tiklab-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
            file_name:'zzz.js',
            type: 'blob'
        },
    ]

    const [expandedTree,setExpandedTree] = useState([])

    const isExpandedTree = key => expandedTree.some(item => item === key)

    //展开闭合 分类
    const setOpenOrClose = item => {
        if (isExpandedTree(item.file_name)) {
            setExpandedTree(expandedTree.filter(li => li!==item.file_name))
        } else {
            setExpandedTree(expandedTree.concat(item.file_name))
        }
    }

    const renderTree = (item,deep) => {
        return (
            <div className={`tree-item`} key={item.file_name}>
                <div className="tree-item-firsts" style={{cursor:"pointer",paddingLeft:`${ deep*20+5 }`}}>
                    <div className="tree-item-first">
                        <div className="tree-item-icon">
                            <ExperimentOutlined />
                        </div>
                        <div className="tree-item-name">{item.file_name}</div>
                    </div>
                </div>
            </div>
        )
    }

    const renderSubTree = (item,deep) =>{
        return(
            <div key={item.file_name} className='tree-item'>
                <div className={`tree-item-firsts `}
                     style={{paddingLeft: `${deep * 20+5}`}}
                     onClick={()=>setOpenOrClose(item)}
                >
                    <div className='tree-item-first'>
                        <div className='tree-item-icon'>
                            {
                                item.file_name?
                                    (isExpandedTree(item.file_name)?
                                            <CaretDownOutlined style={{fontSize: '10px'}}/> :
                                            <CaretRightOutlined style={{fontSize: '10px'}}/>
                                    ): ''
                            }
                        </div>
                        <div className='tree-item-name'>{item.file_name}</div>
                    </div>
                </div>
                <div className={`tree-ul ${isExpandedTree(item.file_name) ? null:'tree-item-hidden'}`}>
                    {
                        item.child.map(item=>{
                            const deepnew = deep + 1
                            return item.child ? renderSubTree(item,deepnew) : renderTree(item,deepnew)
                        })
                    }
                </div>
            </div>
        )
    }


    return (
        <div className='web-ide-tree'>
            {
                tree.map(item=>{
                    return item.child ? renderSubTree(item,0) : renderTree(item,0)
                })
            }
        </div>
    )
}

export default WebIdeTree
