import React from "react";
import {TodoType} from "thoughtware-todotask-ui";

/**
 * 待办类型
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TodoTypeContent = props =>{

    return <TodoType {...props} bgroup={"gittok"}/>

}

export default TodoTypeContent
