import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../../API/todolistsAPI";

export default {
    title: 'TodolistsAPI'
}

export const GetTodolists = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.getTodolists().then((data) => {
            setData(data.data)
        })
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const CreateTodolist = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.createTodolist('new Todolist').then(data => setData(data))
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const DeleteTodolist = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.deleteTodolist('1c2cfc92-4e23-46c1-8880-4f1d98e28caf').then(data => setData(data))
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const RenameTodolist = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.renameTodolist('5960d357-cd16-4d2a-9b4c-64f2af6b9a6c', 'cocamba').then(data => setData(data))
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}
export const GetTasks = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.getTasks('5960d357-cd16-4d2a-9b4c-64f2af6b9a6c').then((data) => {
            setData(data.data)
        })
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const CreateTask = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.createTask('5960d357-cd16-4d2a-9b4c-64f2af6b9a6c'
            , 'new Todolist').then(data => setData(data))
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const DeleteTask = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.deleteTask('5960d357-cd16-4d2a-9b4c-64f2af6b9a6c',
            'dfc2703d-3e1b-4609-ba8c-e58e8724098b').then(data => setData(data))
    }, [])
    return <>
        {JSON.stringify(data)}
    </>
}

export const Updatetask = () => {
    const [data, setData] = useState<any>(1)
    useEffect(() => {
        todolistsAPI.updateTask('5960d357-cd16-4d2a-9b4c-64f2af6b9a6c',
            'a5b340b0-c728-4326-b3bc-bdec0890d768', {
                title: 'blabla1',
                completed: true,
                description: 'null',
                status:3,
                deadline:'',
                priority: 3,
                startDate: ''
            }).then(data=> setData(data))
    })
    return <>
        {JSON.stringify(data)}
    </>
}

