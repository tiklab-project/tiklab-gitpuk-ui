import React,{useEffect,useState,useRef} from 'react'
import WebIdeTree from './WebIdeTree'
import WebIdeNav from './WebIdeNav'
import './WebIde.scss'

/**
 * WEBIDE
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WebIde = props =>{

    const tree = [
        {
            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
            commit_path:'/devops-itdd/thoughtware-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
            file_name:'node',
            type: 'tree',
            child:[
                {
                    commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
                    commit_path:'/devops-itdd/thoughtware-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
                    file_name:'nodezzzz',
                    type: 'tree',
                    child:[
                        {
                            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
                            commit_path:'/devops-itdd/thoughtware-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
                            file_name:'assetszzzzzzsfs.js',
                            type: 'blob'
                        },
                    ]
                },
            ]
        },
        {
            commit: {id: '4a0a53f66e972bcf4c8d0f109503402436ea2cd2', message: '配置',committed_date:'202020'},
            commit_path:'/devops-itdd/thoughtware-xcode-ui/-/commit/4a0a53f66e972bcf4c8d0f109503402436ea2cd2',
            file_name:'zzz.js',
            type: 'blob'
        },
    ]

    const boxRef = useRef()
    const [leftBoxWidth,setLeftBoxWidth] = useState()
    const [isMove,setIsMove] = useState(false)

    /**
     * 拖拽改变宽度
     */
    const changeBox = () =>{
        const middleBox = boxRef.current
        middleBox.onmousedown=(e)=>{
            setIsMove(true)
            let mouseDownX = e.offsetX
            let middleBoxLeft = middleBox.offsetLeft
            let middleBoxWidth = middleBox.offsetWidth
            if(middleBoxLeft < (mouseDownX+middleBoxLeft)&&mouseDownX<(middleBoxLeft+middleBoxWidth)){
                document.onmousemove=(e)=>{
                    e = e || event
                    let mouseMoveX = e.clientX
                    //鼠标移动的地方减去鼠标一开始点击的地方 再减去 最左侧导航 80
                    let width= mouseMoveX-mouseDownX-80
                    if(width>=500){
                        setLeftBoxWidth(500)
                    }else if(width<=240) {
                        setLeftBoxWidth(240)
                    }else {
                        setLeftBoxWidth(width)
                    }
                    return false
                }
            }
            document.onmouseup = function() {
                document.onmousemove = null
                document.onmouseup = null
                setIsMove(false)
            }
            if (e.preventDefault){
                e.preventDefault()
            }
        }
    }

    return (
        <div className='web-ide'>
            <div className='web-ide-sidebar'>
                <div style={{width:` ${leftBoxWidth?leftBoxWidth:240}px`}} className='web-ide-file'>
                    <WebIdeTree/>
                    <div
                        ref={boxRef}
                        onMouseMove={changeBox}
                        className='web-ide-move'
                        style={{ left:`${leftBoxWidth?leftBoxWidth-10:230}px`}}
                    >
                        <div className={`web-ide-move-${isMove?'show':'hidden'}`}/>
                    </div>
                </div>
            </div>
            <div className='web-ide-content'>
                <WebIdeNav/>
                {/*124*/}
            </div>
        </div>
    )
}

export default WebIde
