import React,{useEffect,useRef,useState} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import "./Minaco.scss"
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

// highlight 语言
export const languages = blobFile => {
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
                language: languages(blobFile), // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: false,
                colorDecorators: true,
                roundedSelection:false,
                contextmenu: false,
                quickSuggestions:false,
                cursorBlinking: 'Solid',
                readOnly: {isRedoing:true}, //是否只读
                readonly :{isUndoing: true},
                formatOnPaste: false,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                theme: 'vs', // 主题
                scrollbar: {
                    verticalScrollbarSize: 5, // 垂直滚动条宽度
                    horizontalScrollbarSize: 5, // 水平滚动条高度
                    arrowSize: 10, // 滚动条箭头大小
                    useShadows: false, // 是否使用阴影
                },
            })
        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 20px)'}}/>
    )
}

/**
 * file文件编辑（edit）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const MonacoEdit = props =>{

    const {setEditPosition,blobFile,previewValue,setEditPreviewValue} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()


    useEffect(() => {
        newMonaco(previewValue)
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
        }
    }, [previewValue])

    const newMonaco = (previewValue) => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: previewValue,
                language: languages(blobFile), // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                quickSuggestions:false,
                readOnly: false, //是否只读
                cursorBlinking: 'Solid',
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                theme: 'vs', // 主题
                scrollbar: {
                    verticalScrollbarSize: 5, // 垂直滚动条宽度
                    horizontalScrollbarSize: 5, // 水平滚动条高度
                    arrowSize: 10, // 滚动条箭头大小
                    useShadows: false, // 是否使用阴影
                },
            })
            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            monacoEditorRef.current.onDidChangeModelContent(e => {
                try {
                    let newValue = monacoEditorRef.current.getValue()
                    let position = monacoEditorRef.current.getPosition()
                    setEditPreviewValue(newValue)
                    setEditPosition(position)
                } catch {}
            })


        } catch {}
    }


    return (
        <div ref={monacoEditorDomRef}   style={{height:'calc(100% - 20px)'}}/>
    )
}



/**
 * file文件对比（edit--preview）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const MonacoPreview = props => {

    const {newValue,blobFile,renderOverviewRuler,editPosition} = props

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
                value:'',
                originalModel:'',
                modified:'',
                minimap: { enabled: false }, // 小地图
                readOnly: true, //是否只读
                automaticLayout:true,
                quickSuggestions:false, // 默认的提示关掉
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                theme: 'vs', // 主题
                lightbulb:{enabled:false},
                renderSideBySide:false,
                enableSplitViewResizing:false,
                renderOverviewRuler:renderOverviewRuler,
            })
            monacoEditorRef.current.setModel({
                original: monaco.editor.createModel(blobFile && blobFile.fileMessage, languages(blobFile)),
                modified: monaco.editor.createModel(newValue && newValue, languages(blobFile)),
            })
            monacoEditorRef.current.revealLineInCenter(editPosition && editPosition.lineNumber)
        } catch {}
    }


    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 20px)'}}/>
    )
}


/**
 * 分支合并文件冲突解决
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const MonacoEditMerge = props =>{

    const {blobFile,previewValue,setPreviewValue,hadUpdate} = props

    const monacoEditorDomRef = useRef()
    const editorInstance = useRef()
    const [conflicts, setConflicts] = useState([]); // 存储冲突区域
    const [selectedOptions, setSelectedOptions] = useState({}); // 记录每个冲突区域的选项选择
    const [editor, setEditor] = useState(null); // 存储 Monaco Editor 实例

    const [viewData,setViewData]= useState(null);


  /*  useEffect(() => {
        newMonaco(previewValue)
        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, [monacoEditorDomRef.current,previewValue]);*/

    useEffect(() => {
        newMonaco(previewValue)
        return () => {
            if (editorInstance.current) {
                editorInstance.current.dispose(); // 卸载编辑器
                editorInstance.current = undefined;
            }
        }
    }, [previewValue])

    useEffect(() => {
        if (editor && conflicts.length > 0) {
            applyDecorations(editor, conflicts);
        }
    }, [conflicts, editor]);



    const newMonaco = (previewValue) => {

        const conflictRegions = parseConflicts(previewValue);
        setConflicts(conflictRegions);
        if (monacoEditorDomRef.current&&!editorInstance.current) {
            const instance = monaco.editor.create(monacoEditorDomRef.current, {
                value: previewValue,
                //language: languages(blobFile), // 编辑器类型支持
                theme: 'vs',
                automaticLayout: true,
                minimap: { enabled: false }, // 小地图
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
                cursorBlinking: 'Solid',
            });

            editorInstance.current = instance;

            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            editorInstance.current.onDidChangeModelContent(e => {
                try {
                    let newValue = editorInstance.current.getValue()
                    hadUpdate(newValue)
                } catch {}
            })

            // 插入装饰内容
            addConflictWidgets(instance);

            setEditor(instance);
        }
    }

    //选择改动
    const SelectChange = (action,inputLine) => {
        let content=parseConflicts(previewValue)

        // 注意： lines是从0开始的 start和end的从1开始
        const lines = previewValue.split('\n');

        //保留当前改动
        let cuComingEnd=null
        if (action==='current'){
            content.map(({ type, start, end })=>{
                if (start===inputLine-1){
                    cuComingEnd=end
                    lines.splice(start, 1);
                }
                if (type==='incoming'&&start===cuComingEnd){
                    lines.splice(start-1, end-start+1);
                }
            })
             content=lines.join('\n');
        }

        //保留传入改动
        let inComingEnd=null
        let currentNum=null
        if (action==='incoming'){
            content.map(({ type, start, end })=>{
                if (type==='current'&&start===inputLine-1){
                    inComingEnd=end
                    lines.splice(start, end-start+1);
                    currentNum=end-start
                }
                if (type==='incoming'&&start===inComingEnd){
                    const a=end-currentNum-1
                    lines.splice(a, 1);
                }
            })
            content=lines.join('\n');
        }

        //保留双方改动
        let boComingEnd=null
        if (action==='both'){
            content.map(({ type, start, end })=>{
                if (type==='current'&&start===inputLine-1){
                    boComingEnd=end
                    lines.splice(start, 1);
                    lines.splice(end-1, 1);
                }
                if (type==='incoming'&&start===boComingEnd){
                    const a=end-2
                    lines.splice(a, 1);
                }
            })
            content=lines.join('\n');
        }
        setPreviewValue(content);
    }
    // 解析冲突区域，返回每个冲突的起始和结束行
    const parseConflicts = (content) => {

        const lines = content.split('\n');
        const conflictRegions = [];
        let start = null;
        let middle=null
        lines.forEach((line, index) => {
            if (line.startsWith('<<<<<<<')) {
                start = index;
            } else if (line.startsWith('=======')) {
                if (start !== null) {
                    middle=index
                    conflictRegions.push({type:"current",start:start , end: index });
                }
            } else if (line.startsWith('>>>>>>>')) {
                conflictRegions.push({type:"incoming",start:middle , end: index });
            }
        });

        return conflictRegions;
    };

    // 为冲突区域应用背景颜色
    const applyDecorations = (editorInstance, conflictRegions) => {
        const decorations =   conflictRegions.map(({ type, start, end })=>{
               return  {
                    range: new monaco.Range(start + 1, 1, end, 1), // `<<<<<<<` 和 `=======` 之间
                        options: {
                            isWholeLine: true,  // 整行应用样式
                            inlineClassName: `${type==='current'?"current-conflict":"incoming-conflict"}`, // 使用特定的 CSS 类
                }}
        })
        // 应用装饰
        editorInstance.deltaDecorations([], decorations);
    };


    // 插入 Conflict 相关的 Widget
    const addConflictWidgets = (editor) => {
        const model = editor.getModel();
        // 查找包含 '<<<<<<<' 的行
        const conflictLines = [];
        model?.findMatches('<<<<<<<', false, true, false, null, true).forEach(match => {
            conflictLines.push(match.range.startLineNumber);
        });

        //添加viewZone
        conflictLines.forEach(lineNumber => {

            // 创建 view-zone 的 domNode
            const viewZoneDomNode = document.createElement('div');
            viewZoneDomNode.style.padding = '1px';

            // 添加 view-zone 到编辑器
            editor.changeViewZones((accessor) => {
                accessor.addZone({
                    domNode: viewZoneDomNode,
                    afterLineNumber: lineNumber-1, // 在lineNumber-1第行之后插入
                    heightInPx: 20, // 设置 view-zone 的高度
                    marginClassName: 'my-view-zone' // 自定义样式类名（可选）
                });
            });
        })


        // 为每个 '<<<<<<<' 行上方插入 widget
        conflictLines.forEach(lineNumber => {
            const widget = {
                domNode: null,
                getId: function() {
                    return 'conflict.widget.' + lineNumber;
                },
                getDomNode: function() {
                    if (!this.domNode) {
                        this.domNode = document.createElement('div');
                        this.domNode.innerHTML = '<div class="monaco-merge-text">' +
                            '<span class="monaco-merge-text-nav" data-action="current">使用当前的改动</span>|' +
                            '<span class="monaco-merge-text-nav" data-action="incoming">使用传入的改动</span>|' +
                            '<span class="monaco-merge-text-nav" data-action="both">保留双方的改动</span></div>';

                        // 添加事件监听器
                        this.domNode.querySelectorAll('.monaco-merge-text-nav').forEach(span => {
                            span.addEventListener('click', (event) => {
                                const action = event.target.getAttribute('data-action');
                                SelectChange(action,lineNumber);
                            });
                        });
                    }
                    return this.domNode;
                },
                getPosition: function() {
                    return {
                        position: {
                            lineNumber: lineNumber,
                            column: 1,
                        },
                        preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
                    };
                },
            };

            // 将 widget 添加到 Monaco Editor 中
            editor.addContentWidget(widget);
        });
    };


    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 10px)'}}/>
    );
}

/**
 * 分支合并文件冲突解决
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const MonacoEditMerge01 = props =>{

    const {setEditPosition,blobFile,previewValue,setPreviewValue} = props

    const monacoEditorDomRef = useRef()
    const editorInstance = useRef()

    const monacoEditorRef = useRef()


    const [conflicts, setConflicts] = useState([]); // 存储冲突区域
    const [selectedOptions, setSelectedOptions] = useState({}); // 记录每个冲突区域的选项选择
    const [editor, setEditor] = useState(null); // 存储 Monaco Editor 实例

    const [viewData,setViewData]= useState(null);

    /*
        useEffect(() => {
            newMonaco(previewValue)
            return () => {
                if (editor) {
                    editor.dispose();
                }
            };
        }, [monacoEditorDomRef.current,previewValue]);*/

    useEffect(() => {
        if (editor && conflicts.length > 0) {
            applyDecorations(editor, conflicts);
        }

    }, [conflicts, editor]);

    useEffect(() => {
        newMonaco(previewValue)
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current,previewValue])

    const newMonaco = (previewValue) => {

        const conflictRegions = parseConflicts(previewValue);
        setConflicts(conflictRegions);
        if (monacoEditorDomRef.current) {
            const instance  = monaco.editor.create(monacoEditorDomRef.current, {
                value: previewValue,
                //language: languages(blobFile), // 编辑器类型支持
                theme: 'vs',
                automaticLayout: true,
                minimap: { enabled: false }, // 小地图
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
            });

            monacoEditorRef.current = instance;

            // 插入装饰内容
            addConflictWidgets(instance);

            setEditor(instance);
        }
    }

    //选择改动
    const SelectChange = (type,inputLine) => {
        const content=parseConflicts(previewValue)

        const lines = previewValue.split('\n');
        let incomingEnd=null
        if (type==='current'){
            const value=content.map(({ type, start, end })=>{
                if (start===inputLine-1){
                    incomingEnd=end
                    lines.splice(start, 1);
                }
                if (type==='incoming'&&start===incomingEnd){
                    lines.splice(start-1, end-start+1);
                }
            })
            const data=lines.join('\n');
            setPreviewValue(data);
            /*   // 直接更新 Monaco Editor 的内容
               if (editorInstance.current) {
                   editorInstance.current.setValue(data); // 直接更新编辑器内容
                   addConflictWidgets(editorInstance.current);
               } else {
                   setPreviewValue(data); // 更新 state 中的内容，生命周期更新
               }*/
        }

    }
    // 解析冲突区域，返回每个冲突的起始和结束行
    const parseConflicts = (content) => {

        const lines = content.split('\n');
        const conflictRegions = [];
        let start = null;
        let middle=null
        lines.forEach((line, index) => {
            if (line.startsWith('<<<<<<<')) {
                start = index;
            } else if (line.startsWith('=======')) {
                if (start !== null) {
                    middle=index
                    conflictRegions.push({type:"current",start:start , end: index });
                }
            } else if (line.startsWith('>>>>>>>')) {
                conflictRegions.push({type:"incoming",start:middle , end: index });
            }
        });

        return conflictRegions;
    };

    // 为冲突区域应用背景颜色
    const applyDecorations = (editorInstance, conflictRegions) => {
        const decorations =   conflictRegions.map(({ type, start, end })=>{
            return  {
                range: new monaco.Range(start + 1, 1, end, 1), // `<<<<<<<` 和 `=======` 之间
                options: {
                    isWholeLine: true,  // 整行应用样式
                    inlineClassName: `${type==='current'?"current-conflict":"incoming-conflict"}`, // 使用特定的 CSS 类
                }}
        })
        // 应用装饰
        editorInstance.deltaDecorations([], decorations);
    };


    // 插入 Conflict 相关的 Widget
    const addConflictWidgets = (editor) => {
        const model = editor.getModel();
        // 查找包含 '<<<<<<<' 的行
        const conflictLines = [];
        model?.findMatches('<<<<<<<', false, true, false, null, true).forEach(match => {
            conflictLines.push(match.range.startLineNumber);
        });

        //添加viewZone
        conflictLines.forEach(lineNumber => {

            // 创建 view-zone 的 domNode
            const viewZoneDomNode = document.createElement('div');
            viewZoneDomNode.style.padding = '1px';

            // 添加 view-zone 到编辑器
            editor.changeViewZones((accessor) => {
                accessor.addZone({
                    domNode: viewZoneDomNode,
                    afterLineNumber: lineNumber-1, // 在lineNumber-1第行之后插入
                    heightInPx: 20, // 设置 view-zone 的高度
                    marginClassName: 'my-view-zone' // 自定义样式类名（可选）
                });
            });
        })


        // 为每个 '<<<<<<<' 行上方插入 widget
        conflictLines.forEach(lineNumber => {
            const widget = {
                domNode: null,
                getId: function() {
                    return 'conflict.widget.' + lineNumber;
                },
                getDomNode: function() {
                    if (!this.domNode) {
                        this.domNode = document.createElement('div');
                        this.domNode.innerHTML = '<div class="monaco-merge-text">' +
                            '<span class="monaco-merge-text-nav" data-action="current">使用当前的改动</span>|' +
                            '<span class="monaco-merge-text-nav" data-action="incoming">使用传入的改动</span>|' +
                            '<span class="monaco-merge-text-nav" data-action="both">保留双方的改动</span></div>';

                        // 添加事件监听器
                        this.domNode.querySelectorAll('.monaco-merge-text-nav').forEach(span => {
                            span.addEventListener('click', (event) => {
                                const action = event.target.getAttribute('data-action');
                                SelectChange(action,lineNumber);
                            });
                        });
                    }
                    return this.domNode;
                },
                getPosition: function() {
                    return {
                        position: {
                            lineNumber: lineNumber,
                            column: 1,
                        },
                        preference: [monaco.editor.ContentWidgetPositionPreference.ABOVE],
                    };
                },
            };

            // 将 widget 添加到 Monaco Editor 中
            editor.addContentWidget(widget);
        });
    };


    return (
        <div ref={monacoEditorDomRef} style={{height:'calc(100% - 10px)'}}/>
    );
}



export const MonacoEditMerge0 = props =>{

    const {setEditPosition,blobFile,previewValue,setPreviewValue} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    const [value,setValue] = useState('')
    useEffect(() => {
        newMonaco(previewValue)
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current,previewValue])

    const newMonaco = (previewValue) => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: previewValue,
                language: languages(blobFile), // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                renderSideBySide: true,
                colorDecorators: true,
                contextmenu: false,
                quickSuggestions:false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: false,
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
        <div ref={monacoEditorDomRef} style={{height:630}}/>
    )
}

export const MonacoEditMerge1 = props =>{

    const {setEditPosition,blobFile,previewValue,setPreviewValue} = props

    const monacoEditorDomRef = useRef();
    const monacoEditorInstance = useRef();

    const [value,setValue] = useState('')
    /*   useEffect(() => {
           newMonaco(previewValue)
           return () => {
               monacoEditorRef.current.dispose() // 卸载编辑器
               monacoEditorRef.current = undefined
           }
       }, [monacoEditorRef.current,previewValue])*/

    useEffect(() => {
        // 初始化 Monaco 编辑器
        newMonaco(previewValue);

        // 在需要时，动态添加内容
        setTimeout(() => {
            addContentAndDecorate('// 这是通过箭头函数动态添加的内容');
        }, 2000);

        return () => {
            // 清理编辑器实例
            if (monacoEditorInstance.current) {
                monacoEditorInstance.current.dispose();
            }
        };
    }, [previewValue]);  // 当 `previewValue` 改变时重新初始化编辑器

    // 初始化 Monaco Editor
    const newMonaco = (previewValue) => {
        if (monacoEditorDomRef.current) {
            monacoEditorInstance.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: previewValue,  // 初始值
                language: 'javascript',  // 根据需要的语言选择
                theme: 'vs-dark',  // 选择主题
                automaticLayout: true,  // 自动布局
            });

            // 自定义主题/样式
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark', // 继承默认暗色主题
                inherit: true,  // 继承 vs-dark 的一些特性
                rules: [
                    { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },  // 定制注释样式
                    { token: 'keyword', foreground: '00ff00' },  // 定制关键字颜色
                    { token: 'string', foreground: 'ff0000' },  // 定制字符串颜色
                ],
                colors: {
                    'editor.foreground': '#F8F8F8',
                    'editor.background': '#002240',
                    'editorCursor.foreground': '#A7A7A7',
                    'editor.lineHighlightBackground': '#333300',
                    'editorLineNumber.foreground': '#BBBBBB',
                    'editor.selectionBackground': '#88000030',
                    'editor.inactiveSelectionBackground': '#88000015'
                }
            });

            // 应用自定义主题
            monaco.editor.setTheme('myCustomTheme');
        }
    };

    // 动态添加内容并设置光标位置
    const addContentAndDecorate = (newContent) => {
        const editor = monacoEditorInstance.current;
        if (editor) {
            const currentValue = editor.getValue();
            editor.setValue(`${currentValue}\n${newContent}`); // 动态添加内容

            // 获取最新行数并定位光标到最后
            const lineCount = editor.getModel().getLineCount();
            editor.setPosition({ lineNumber: lineCount, column: 1 });

            // 设置行背景装饰器
            editor.deltaDecorations([], [
                {
                    range: new monaco.Range(lineCount, 1, lineCount, 1),
                    options: { isWholeLine: true, className: 'myLineDecoration' }
                }
            ]);
        }
    };

    return (
        <div ref={monacoEditorDomRef} style={{ height: 630 }} />
    );
}
