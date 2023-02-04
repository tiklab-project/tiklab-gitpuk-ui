import React from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

const DiffPanel = ({oldValue, newValue}) => {

    // 折叠块显示内容
    const codeFoldMessageRenderer = React.useCallback(num => (
        newValue === oldValue ? '修改前后没有区别，点击展开查看' : `展开隐藏的 ${num} 行...`
    ), [newValue, oldValue])

    return (
        <ReactDiffViewer
            oldValue={oldValue}
            newValue={newValue}
            codeFoldMessageRenderer={codeFoldMessageRenderer}
            splitView={false}
            compareMethod={DiffMethod.LINES}
        />
    )
}

export default DiffPanel
