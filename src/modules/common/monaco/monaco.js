import React,{useEffect,useRef,useState} from 'react'
import * as monaco from 'monaco-editor'

export const MonacoBlob = props =>{

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
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: 'code',
                language: 'yaml', // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: true, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
            })
        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:200}}/>
    )
}

export const MonacoEdit = props =>{

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
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: 'code',
                language: 'yaml', // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
            });
            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            // monacoEditorRef.current.onDidChangeModelContent(e => {
            //     try {
            //         let newValue = monacoEditorRef.current.getValue()
            //         // setYamlValue(newValue)
            //     } catch {}
            // });
        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:200}}/>
    )
}

export const MonacoPreview = props => {

    const {newValue,oldValue,language} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    const [height,setHeight] = useState(0)

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
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: true, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                theme: 'vs', // 主题
                renderSideBySide:false,
                renderOverviewRuler:false,
            })
            monacoEditorRef.current.setModel({
                original: monaco.editor.createModel(newValue, language && language),
                modified: monaco.editor.createModel(oldValue, language && language),
            })

        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height: 200}}/>
    )
}


