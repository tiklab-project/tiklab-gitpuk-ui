import React from 'react'
import MonacoEditor from 'react-monaco-editor'

export const MonacoBlob = props =>{
    return(
        <MonacoEditor
            width="100%"
            height='600'
            language='javascript'
            theme={'vs'}
            value={'code'}
            options={{
                selectOnLineNumbers: true,
                readOnly:true,
                renderSideBySide:true,
                minimap:{
                    enabled: false,
                },
            }}
        />
    )
}

export const MonacoEdit = props =>{

    const onChange = (newValue, e) => {

    }

    const editorDidMount = (editor, monaco) => {
        editor.focus();
    }

    return(
        <MonacoEditor
            width="100%"
            height='400'
            language='javascript'
            theme={'vs'}
            value={'code'}
            options={{
                selectOnLineNumbers: true,
                readOnly:false,
                renderSideBySide:true,
                minimap:{
                    enabled: false,
                },
            }}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    )
}

export const MonacoPreview = props =>{

    const onChange = (newValue, e) => {

    }

    const editorDidMount = (editor, monaco) => {
        editor.focus();
    }

    return(
        <MonacoEditor
            width="100%"
            height='400'
            language='javascript'
            theme={'vs'}
            value={'code'}
            original={'codeaaa'}
            options={{
                selectOnLineNumbers: true,
                readOnly:true,
                renderSideBySide:true,
                minimap:{
                    enabled: false,
                },
                inDiffEditor:true,
                renderIndicators:true,
            }}
            onChange={onChange}
            editorDidMount={editorDidMount}
        />
    )
}

