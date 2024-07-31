import React,{useEffect,useRef,useState} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
// highlight 语言
const languages = blobFile => {
    if(blobFile){
        switch (blobFile.fileType) {
            case 'md':
                return 'markdown'
            case 'sh':
                return 'shell'
            case 'ts':
            case 'tsx':
                return 'typescript'
            case 'js':
                return 'javascript'
            default:
                return blobFile.fileType
        }
    }
}

/**
 * file文件查看（blob）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MonacoBlob = props =>{
    const {blobFile,readOnly} = props

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
                language: languages(blobFile), // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                roundedSelection:false,
                contextmenu: false,
                quickSuggestions:false,
                readOnly: true, //是否只读
                formatOnPaste: false,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                theme: 'vs', // 主题
            })
        } catch {}
    }
    /*  const newMonaco=()=>{

      }
  */
    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 20px)'}}/>
    )
}

export default MonacoBlob
