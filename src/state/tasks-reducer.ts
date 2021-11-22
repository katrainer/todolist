import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ?
                        {...t, isDone: action.isDone} : {...t})
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id === action.taskId ?
                        {...t, title: action.title} : {...t})
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }

        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return {...state}
    }
}

type ActionsType = removeTaskACType |
    SecondActionType |
    changeTaskStatusType |
    changeTitleTaskAC |
    AddTodolistActionType |
    RemoveTodolistActionType
type removeTaskACType = ReturnType<typeof removeTaskAC>
export type SecondActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type changeTitleTaskAC = ReturnType<typeof changeTitleTaskAC>


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId
    } as const
}
export const changeTitleTaskAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId
    } as const
}