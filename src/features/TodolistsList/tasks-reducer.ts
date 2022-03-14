import {
    AddTodolistActionType,
    clearTodolists,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {AppThunk} from '../../app/store'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkErrorTask, startTaskChange} from "../../utils/util-error";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]:
                    [{...action.task, entityStatus: 'idle'},
                        ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case "SET-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.id ?
                    {...t, entityStatus: action.entityStatus} : {...t})]
            }
        case "CLEAR-TODOLISTS":
            return {}
        default:
            return {...state}
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({
        type: 'ADD-TASK', task
    } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const setTaskEntityStatusAC = (id: string, todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'SET-TASK-ENTITY-STATUS',
        entityStatus,
        id,
        todolistId
    } as const
}


// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        dispatch(setTasksAC(res.data.items, todolistId))
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => async dispatch => {
    startTaskChange(taskId, todolistId, dispatch)
    try {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setTaskEntityStatusAC(taskId, todolistId, 'succeeded'))
        dispatch(setAppStatusAC("succeeded"))
    } catch (error: any) {
        handleServerNetworkErrorTask(taskId, todolistId, error, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        res.data.resultCode === ResultCode.success ?
            dispatch(addTaskAC(res.data.data.item))
            : handleServerAppError(res.data, dispatch)

    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => {
    return async (dispatch, getState) => {
        startTaskChange(taskId, todolistId, dispatch)

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        try {
            const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
            res.data.resultCode === ResultCode.success ? dispatch(updateTaskAC(taskId, domainModel, todolistId))
                : handleServerAppError(res.data, dispatch)
            dispatch(setTaskEntityStatusAC(taskId, todolistId, 'succeeded'))
        } catch (error: any) {
            handleServerNetworkErrorTask(taskId, todolistId, error, dispatch)
        } finally {
            dispatch(setAppStatusAC("succeeded"))
        }
    }
}


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
export type TaskActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setTaskEntityStatusAC>
    | ReturnType<typeof clearTodolists>

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}