import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {setTodolistEntityStatusAC} from "../features/TodolistsList/todolists-reducer";
import {AppActionType} from "../app/store";
import {Dispatch} from "redux";
import {setTaskEntityStatusAC} from "../features/TodolistsList/tasks-reducer";
import {ResponseType, ResultCode} from "../api/todolists-api"

//common
export const handleServerAppError = <T>(res: ResponseType<T>, dispatch: Dispatch<AppActionType>) => {
    if (res.resultCode === ResultCode.error) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}


//todolist
export const startTodolistChange = (id: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setTodolistEntityStatusAC(id, 'loading'))
}

export const handleServerNetworkErrorTodolist = (id: string, error: { message: string }, dispatch: Dispatch<AppActionType>) => {
    dispatch(setTodolistEntityStatusAC(id, 'failed'))
    dispatch(setAppErrorAC(error.message))
}


//task
export const startTaskChange = (taskId: string, todolistId: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setTaskEntityStatusAC(taskId, todolistId, 'loading'))
}

export const handleServerNetworkErrorTask = (taskId: string, todolistId: string, error: { message: string }, dispatch: Dispatch<AppActionType>) => {
    dispatch(setTaskEntityStatusAC(taskId, todolistId, 'failed'))
    dispatch(setAppErrorAC(error.message))
}