import React,{ useEffect } from 'react'
import * as hljs from 'highlight.js/lib'
import 'highlight.js/styles/github.css'

const languages = fileType => {
    switch (fileType) {
        case 'md':
            return 'markdown'
        case 'sh':
            return 'shell'
        case 'ts':
        case 'tsx':
            return 'typescript'
        case 'js':
            return 'javascript'
        case 'gitignore':
            return 'plainText'
        default:
            return fileType
    }
}

const Highlighter = props => {

    const {language,code} = props

    useEffect(() => {

        // 配置 highlight.js
        hljs.configure({
            // 忽略未经转义的 HTML 字符
            ignoreUnescapedHTML: true
        })
        // 获取到内容中所有的code标签
        const codes = document.querySelectorAll('.diff-hi-lite')

        codes.forEach((el) => {
            // 让code进行高亮
            hljs.highlightElement(el)
        })
    }, [])


    return (
        <td className={`diff-line-code diff-hi-lite language-${languages(language)} language-plainText`}>
            {code?code:' '}
        </td>
    )

}

export default Highlighter
