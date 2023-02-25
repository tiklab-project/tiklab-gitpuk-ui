import React, {useEffect, useRef, useState} from 'react';
import E from 'wangeditor';

/**
 * 这里用函数式组件
 */

const WangEditor = props => {

    let editor = null

    const [value,setValue] = useState('http://matflow-ce.test.tiklab.net/images/pip_run.svg')

    useEffect(() => {
        // 注：class写法需要在componentDidMount 创建编辑器
        editor = new E('#editorRef')

        editor.config.onchange = (newHtml) => {
            setValue(editor.txt.text())
        }

        // 配置全屏功能按钮是否展示
        editor.config.showFullScreen = false

        // 需要展示的菜单
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            //   'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]

        // 插入网络图片的回调
        editor.config.linkImgCallback = function (src,alt,href) {

        }

        /**一定要创建 */
        editor.create()

        return () => {
            // 组件销毁时销毁编辑器 注：class写法需要在componentWillUnmount中调用
            editor.destroy()
        }

        // 这里一定要加上下面的这个注释
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (editor) {
            editor.txt.html(value);
        }
    }, [value])

    return (
        <div id={'editorRef'}/>
    );
}

export default WangEditor

