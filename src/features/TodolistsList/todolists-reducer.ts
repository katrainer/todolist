import {ResultCode, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {AppThunk} from "../../app/store";
import {setAppErrorAC, setAppStatusAC, RequestStatusType} from "../../app/app-reducer";
import {handleServerNetworkErrorTodolist, handleServerAppError, startTodolistChange} from "../../utils/util-error";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case "SET-TODOLIST-ENTITY-STATUS":
            return state.map(t => t.id === action.id ? {...t, entityStatus: action.entityStatus} : {...t})
        case "CLEAR-TODOLISTS":
            return []
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const setTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET-TODOLIST-ENTITY-STATUS',
        entityStatus,
        id
    } as const
}
export const clearTodolists = () => {
    return {type: 'CLEAR-TODOLISTS'} as const
}


// thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const removeTodolistTC = (id: string): AppThunk => async dispatch => {
    startTodolistChange(id, dispatch)
    try {
        const res = await todolistsAPI.deleteTodolist(id)
        dispatch(removeTodolistAC(id))
        dispatch(setTodolistEntityStatusAC(id, 'succeeded'))
    } catch (error: any) {
        handleServerNetworkErrorTodolist(id, error.message, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistsAPI.createTodolist(title)
        res.data.resultCode === ResultCode.success ? dispatch(addTodolistAC(res.data.data.item))
            : handleServerAppError(res.data, dispatch)
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    startTodolistChange(id, dispatch)
    try {
        const res = await todolistsAPI.updateTodolist(id, title)
        dispatch(changeTodolistTitleAC(id, title))
        dispatch(setTodolistEntityStatusAC(id, 'succeeded'))
    } catch (error: any) {
        handleServerNetworkErrorTodolist(id, error.message, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}


// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type TodolistsActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof setTodolistEntityStatusAC>
    | ReturnType<typeof clearTodolists>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
