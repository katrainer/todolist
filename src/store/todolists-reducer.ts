import {FilterValuesType, TodolistType} from "../App";

export type ActionType = removeTodolistAT | addTodolist | changeTodolistTitle | changeTodoListFilter

export type removeTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type addTodolist = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type changeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistId: string
}
export type changeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistId: string
}

export const todolistsReducer =
    (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return todoLists.filter(t => t.id !== action.todolistId)
            case "ADD-TODOLIST":
                return [...todoLists, {
                    id: action.todolistId, title: action.title, filter: "all"
                }]
            case "CHANGE-TODOLIST-TITLE":
                return todoLists.map(t => t.id === action.todolistId ? {...t, title: action.title} : t)
            case "CHANGE-TODOLIST-FILTER":
                return todoLists.map(t => t.id === action.todolistId ? {...t, filter: action.filter} : t)
            default:
                return todoLists;
        }
    }

export const removTodolistAC = (todolistId: string):removeTodolistAT =>{
    // ...do something
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    }
}
export const addTodolistAC = (title: string, todolistId: string):addTodolist =>{
    // ...do something
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId
    }
}
export const changeTodolistTitleAC = (title: string, todolistId: string):changeTodolistTitle =>{
    // ...do something
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistId
    }
}
export const changeTodoListFilterAC = (filter:FilterValuesType, todolistId: string):changeTodoListFilter =>{
    // ...do something
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistId
    }
}