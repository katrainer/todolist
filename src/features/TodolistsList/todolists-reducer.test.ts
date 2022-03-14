import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, clearTodolists,
    removeTodolistAC,
    setTodolistEntityStatusAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {TasksStateType} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../api/todolists-api";

let todolistId1: string = v1()
let todolistId2: string = v1()
let todolists: Array<TodolistDomainType>
let tasks: TasksStateType


beforeEach(() => {
    todolists = [
        {id: todolistId1, entityStatus: "idle", filter: "all", title: 'JS', addedDate: '', order: 0},
        {id: todolistId2, entityStatus: "idle", filter: "all", title: 'HTML', addedDate: '', order: 0}
    ]
    tasks = {
        [todolistId1]: [
            {
                id: '1', entityStatus: 'idle', addedDate: '', order: 0, title: 'JS'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId1
            },
            {
                id: '2', entityStatus: 'idle', addedDate: '', order: 0, title: 'TS'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId1
            },
            {
                id: '3', entityStatus: 'idle', addedDate: '', order: 0, title: 'REACT'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId1
            }],
        [todolistId2]: [
            {
                id: '1', entityStatus: 'idle', addedDate: '', order: 0, title: 'HTML'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId2
            },
            {
                id: '2', entityStatus: 'idle', addedDate: '', order: 0, title: 'CSS'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId2
            },
            {
                id: '3', entityStatus: 'idle', addedDate: '', order: 0, title: 'FLEX'
                , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
                , startDate: '', todoListId: todolistId2
            }],
    }
})
test('REMOVE-TODOLIST', () => {
    let endState = todolistsReducer(
        todolists, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('ADD-TODOLIST', () => {
    const newId = v1()
    const newTodolist: TodolistType = {
        id: newId, title: 'newTodolist', order: 0, addedDate: ''
    }
    let endState = todolistsReducer(
        todolists, addTodolistAC(newTodolist))
    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(newId);
})
test('CHANGE-TODOLIST-TITLE', () => {
    let endState = todolistsReducer(
        todolists, changeTodolistTitleAC(todolistId1, 'new title'))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('new title');
})
test('CHANGE-TODOLIST-FILTER', () => {
    let endState = todolistsReducer(
        todolists, changeTodolistFilterAC(todolistId2, "active"))
    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('active');
})
test('SET-TODOLISTS', () => {
    let endState = todolistsReducer(
        todolists, setTodolistsAC(todolists))
    expect(endState.length).toBe(2);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[0].id).toBe(todolistId1);
})
test('SET-TODOLIST-ENTITY-STATUS', () => {
    let endState = todolistsReducer(
        todolists, setTodolistEntityStatusAC(todolistId2, "succeeded"))
    expect(endState.length).toBe(2);
    expect(endState[1].entityStatus).toBe('succeeded');
})
test('CLEAR-TODOLISTS', () => {
    let endState = todolistsReducer(
        todolists, clearTodolists())
    expect(endState.length).toBe(0);
})