import axios from "axios"

export type TodolistsType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: TaskType
    totalCount: number
    error: string
}
type UpdateTaskResponseType = {
    data: {} | { item: TaskType }
    resultCode: number
    messages: string[]
}
type ModelTask = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {'API-KEY': '9359a22e-adad-4c18-8f69-1475882f26c8'},
    withCredentials: true
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistsType>>('').then(data => data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>('', {title}).then(data => {
            return data.data.resultCode === 0 ?
                'create new Todolist' : data.data.messages
        })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(id).then(data => {
            return data.data.resultCode === 0 ?
                'all good' : data.data.messages
        })
    },
    renameTodolist(id: string, title: string) {
        return instance.put<ResponseType>(id, {title}).then(data => {
            return data.data.resultCode === 0 ?
                'rename' : data.data.messages
        })
    },
    getTasks(todolistID: string) {
        return instance.get<GetTasksResponseType>(`${todolistID}/tasks/`).then(data => data)
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseType>(`${todolistID}/tasks/`, {title})
            .then(data => {
                return data.data.resultCode === 0 ?
                    'create new Task' : data.data.messages
            })
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`${todolistID}/tasks/${taskID}`).then(data => {
            return data.data.resultCode === 0 ?
                'all good' : data.data.messages
        })
    },
    updateTask(todolistID: string, taskID: string, model: ModelTask) {
        return instance.put<UpdateTaskResponseType>
        (`${todolistID}/tasks/${taskID}`, model).then(data => {
            return data.data.resultCode === 0 ?
                'all good' : data.data.messages
        })
    },
}