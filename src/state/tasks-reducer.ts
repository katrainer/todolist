import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistsACType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    item: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    item: TaskType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    item: TaskType
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistsACType
    | setTaskACType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.item
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? action.item : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? action.item : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.item.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(t => {
                copyState[t.id] = []
            })
            return copyState
        }
        case "SET-TASK": {
            return {...state, [action.id]: action.task}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (item: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', item, todolistId}
}
export const changeTaskStatusAC = (taskId: string, item: TaskType, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', item, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, item: TaskType, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', item, todolistId, taskId}
}

type setTaskACType = ReturnType<typeof setTaskAC>
const setTaskAC = (id: string, task: TaskType[]) => {
    return {
        type: 'SET-TASK',
        id,
        task
    } as const
}

export const fetchTaskTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(id).then((data) => {
            dispatch(setTaskAC(id, data.data.items))
        })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title).then((data) => {
            dispatch(addTaskAC(data.data.data.item, todolistId))
        })
    }
}
export const removeTaskTC = (id: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, id).then(() => {
            dispatch(removeTaskAC(id, todolistId))
        })
    }
}
export const changeTaskTitleTC = (id: string, newTitle: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (!task) return
        const model = {
            title: newTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolistsAPI.updateTask(todolistId, id, model).then((data) => {
            dispatch(changeTaskTitleAC(id, data.data.data.item, todolistId))
        })
    }
}
export const changeTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (!task) return
        const model = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        todolistsAPI.updateTask(todolistId, id, model).then((data) => {
            dispatch(changeTaskStatusAC(id, data.data.data.item, todolistId))
        })
    }
}


