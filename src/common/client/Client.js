import moment from 'moment';
import {message} from 'antd';

/**
 * 获取时间
 */
export default {
    moment:moment().format('YYYY-MM-DD HH:mm:ss'), //当前时间
    time:moment().format('HH:mm'),
}

/**
 * 监听浏览器高度
 * @returns {number}
 */
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

/**
 * 复制
 * @param data
 */
export const copy = data => {
    //拿到想要复制的值
    let url = data;
    //创建input元素
    let copyInput = document.createElement('input');
    //向页面底部追加输入框
    document.body.appendChild(copyInput);
    //添加属性，将url赋值给input元素的value属性
    copyInput.setAttribute('value', url);
    //选择input元素
    copyInput.select();
    //执行复制命令
    document.execCommand('Copy');
    //弹出提示信息，不同组件可能存在写法不同
    message.success('复制成功');
    //复制之后再删除元素，否则无法成功赋值
    copyInput.remove();//删除动态创建的节点
}

/**
 * 文件路径截取
 * @param url：路径
 * @param data：截取数据
 * @returns {*}
 */
export const interceptUrl = (url,data) =>{
    if(data){
        return url.split('/repository/'+data)
    }
    else {
        return url.split('/')
    }
}

/**
 * 表单效验
 * @param name：名称
 * @param type：类型
 * @returns {{pattern: RegExp, message: string}}
 * @constructor
 */
export const Validation = (name,type) =>{
    if(type==='blank'){
        return {
            pattern:/^[^\s]*$/,
            message:`${name}不能包含空格`
        }
    }
    if(type==='appoint'){
        return {
            pattern: /^[a-zA-Z0-9_]([a-zA-Z0-9_\-.])*$/,
            message: `只能包含字母和数字、 '_'、 '.'和'-'，且只能以字母、数字或'_'开头`,
        }
    }
    if(type==='webHook'){
        return {
            pattern: /^(http:\/\/|https:\/\/)/,
            message: `请输入正确地址`,
        }
    }
    return {
        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
        message: `${name}不能包含非法字符，如&,%，&，#……等`,
    }

}


