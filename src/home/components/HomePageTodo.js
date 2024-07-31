import React,{useEffect,useState,Fragment} from 'react';
import "./HomePageTodo.scss"
const HomePageTodo = (props) => {
    const {todoTask,index}=props
    const content = JSON.parse(todoTask.data)
    const { createUserIcon, createUser, data, receiveTime, repositoryAddress, mergeId } = content;

    const goTodoDetail = () => {
        props.history.push(`/repository/${repositoryAddress}/mergeAdd/${mergeId}`);
    }

    return(
        <div key={index} className='todo-list-item' onClick={() => goTodoDetail()}>
            <div className="todo-list-item-left">
                <div className="todo-user-icon">{createUserIcon}</div>
                <div className="todo-content">
                    <div>{createUser.nickname}{todoTask.todoType.name} </div>
                    <div className="todo-work-item">
                        <div className="todo-work-title">{data}</div>
                    </div>
                </div>
            </div>
            <div>{receiveTime} </div>
        </div>
    )
}
export default HomePageTodo
