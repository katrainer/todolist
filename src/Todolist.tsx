import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <ListItem
                style={{padding: '0px'}}
                key={t.id}>
                <Checkbox
                    checked={t.isDone}
                    onChange={changeStatus}/>

                <EditableSpan title={t.title} changeTitleTask={changeTaskTitle}/>
                <IconButton onClick={() => props.removeTask(t.id, props.id)}>
                    <Delete></Delete>
                </IconButton>
            </ListItem>
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
                <IconButton onClick={() => props.removeTodolist(props.id)}>
                    <Delete></Delete>
                </IconButton>
            </h3>

            <AddItemForm AddItemForm={addTask}/>
            <List>
                {tasksList}
            </List>
            <div>
                <Button
                    variant={"outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={"outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={"outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;