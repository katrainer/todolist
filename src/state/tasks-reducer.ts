import {FilterValuesType, TasksStateType} from '../App';
import { v1 } from 'uuid';

export type removeTaskACType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type SecondActionType = ReturnType<typeof addTaskAC>
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

type ActionsType = removeTaskACType | SecondActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK': {
                const newTask = {id:v1(), title:action.title, isDone:false}
            return {...state, [action.todolistId]:[newTask, ...state[action.todolistId]]}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}