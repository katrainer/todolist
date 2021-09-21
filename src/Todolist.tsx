import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    addTodolist: (title: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

function TodoList(props: TodoListPropsType) {
    const tasksList = props.tasks.map(t => {
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitleTask={changeTaskTitle}/>
                {/*<span className={!t.isDone ? "notCompleted" : ""}>{t.title}</span>*/}
                <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
            </li>
        )
    })

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan
                title={props.title}
                changeTitleTask={changeTodolistTitle}/>
                <button onClick={() => props.removeTodolist(props.id)}>
                    X
                </button>
            </h3>

            <AddItemForm AddItemForm={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;