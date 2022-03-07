import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    item: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsACType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.item, filter:'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (item: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', item}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists().then(data => {
            dispatch(setTodolistsAC(data.data))
        })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title).then(() => {
            dispatch(changeTodolistTitleAC(id, title))
        })
    }
}
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(id).then(() => {
            dispatch(removeTodolistAC(id))
        })
    }
}
export const addTodolistTC = (title:string) =>{
    return (dispatch: Dispatch) =>{
        todolistsAPI.createTodolist(title).then((data)=>{
            dispatch(addTodolistAC(data.data.data.item))
        })
    }
}
