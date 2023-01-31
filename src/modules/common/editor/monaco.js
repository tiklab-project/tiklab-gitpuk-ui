import React,{useEffect,useRef,useState} from 'react'
// import * as monaco from 'monaco-editor'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

export const MonacoBlob = props =>{

    const {blobFile} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    useEffect(() => {
        newMonaco()
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current])

    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: blobFile && blobFile.fileMessage,
                language: blobFile && blobFile.fileType, // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                roundedSelection:false,
                contextmenu: false,
                quickSuggestions:false,
                readOnly: true, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
            })
        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 20px)'}}/>
    )
}

export const MonacoEdit = props =>{

    const {setEditPosition,blobFile,previewValue,setPreviewValue} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    const [value,setValue] = useState('')

    useEffect(() => {
        newMonaco()
        setValue(previewValue && previewValue)
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current])

    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: value && value,
                language: blobFile && blobFile.fileType, // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                quickSuggestions:false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
            })
            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            monacoEditorRef.current.onDidChangeModelContent(e => {
                try {
                    let newValue = monacoEditorRef.current.getValue()
                    let position = monacoEditorRef.current.getPosition()
                    setPreviewValue(newValue)
                    setEditPosition(position)
                } catch {}
            })

        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:400}}/>
    )
}

export const MonacoPreview = props => {

    const {oldValue,newValue,language,renderOverviewRuler,editPosition} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    useEffect(() => {
        newMonaco()
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [])

    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.createDiffEditor(monacoEditorDomRef.current, {
                minimap: { enabled: false }, // 小地图
                readOnly: true, //是否只读
                linkedEditing:false,
                formatOnPaste: true,
                quickSuggestions:false, // 默认的提示关掉
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                theme: 'vs', // 主题
                renderSideBySide:false,
                renderOverviewRuler:renderOverviewRuler,
                hover:{
                    sticky:false,
                    enabled:false
                }
            })
            monacoEditorRef.current.setModel({
                original: monaco.editor.createModel(oldValue && oldValue, language && language),
                modified: monaco.editor.createModel(newValue && newValue, language && language),
            })
            monacoEditorRef.current.revealLineInCenter(editPosition && editPosition.lineNumber)
        } catch {}
    }


    return (
        <div ref={monacoEditorDomRef} style={{height:400}}/>
    )
}


