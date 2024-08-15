/**
 * SearchInput 搜索input
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
import React from 'react';
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import "./SearchInput.scss"
const SearchInput = (props) => {
    const {placeholder,onChange,onPressEnter}=props

    return  <Input
        allowClear
        placeholder={placeholder}
        onChange={onChange}
        onPressEnter={onPressEnter}
        prefix={<SearchOutlined className='input-icon'/>}
        style={{ width: 180 ,height:32}}
        className={'input-custom'}
    />

}
export default SearchInput
