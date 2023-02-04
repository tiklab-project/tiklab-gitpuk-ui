import moment from 'moment';
import {message} from 'antd';

export default {
    moment:moment().format('YYYY-MM-DD HH:mm:ss'), //当前时间
    time:moment().format('HH:mm'),
    clientHeight:document.documentElement.clientHeight
}

// 监听浏览器高度
export const autoHeight = () =>{
    let winHeight=0
    if (window.innerHeight)
        winHeight = window.innerHeight
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight
    return winHeight-120
}

// 复制事件
export const copy = data => {
    let url = data;//拿到想要复制的值
    let copyInput = document.createElement('input');//创建input元素
    document.body.appendChild(copyInput);//向页面底部追加输入框
    copyInput.setAttribute('value', url);//添加属性，将url赋值给input元素的value属性
    copyInput.select();//选择input元素
    document.execCommand('Copy');//执行复制命令
    message.success('复制成功',0.5);//弹出提示信息，不同组件可能存在写法不同
    //复制之后再删除元素，否则无法成功赋值
    copyInput.remove();//删除动态创建的节点
}

// 文件路径截取
export const interceptUrl = (url,data) =>{
    if(data){
        return url.split('/index/house/'+data)
    }
    else {
        return url.split('/')
    }
}
