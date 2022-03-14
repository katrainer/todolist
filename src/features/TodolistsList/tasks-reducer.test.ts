import {v1} from "uuid";
import {clearTodolists, removeTodolistAC, setTodolistsAC, TodolistDomainType} from "./todolists-reducer";
import {
    addTaskAC,
    removeTaskAC,
    setTaskEntityStatusAC,
    setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

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
test('Remove-task', () => {
    let endState = tasksReducer(tasks, removeTaskAC('1', todolistId1))
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId1][0].id).toBe('2');
    expect(endState[todolistId1][1].title).toBe('REACT');
})
test('ADD-task', () => {
    const task = {
        id: '4', entityStatus: 'idle', addedDate: '', order: 0, title: 'REDUX'
        , status: TaskStatuses.New, deadline: '', description: '', priority: TaskPriorities.Low
        , startDate: '', todoListId: todolistId1
    }
    let endState = tasksReducer(tasks, addTaskAC(task))
    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][3].id).toBe('3');
    expect(endState[todolistId1][2].title).toBe('TS');
})
test('UPDATE-TASK', () => {
    let model = {
        title: 'bugaga'
    }
    let endState = tasksReducer(tasks, updateTaskAC('3', model, todolistId2))
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][2].id).toBe('3');
    expect(endState[todolistId2][2].title).toBe('bugaga');
})
test('SET-TASKS', () => {
    let endState = tasksReducer(tasks, setTasksAC(tasks[todolistId2], todolistId2))
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][2].id).toBe('3');
    expect(endState[todolistId2][2].title).toBe('FLEX');
})
test('SET-TASK-ENTITY-STATUS', () => {
    let endState = tasksReducer(tasks, setTaskEntityStatusAC('1', todolistId1, 'succeeded'))
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].id).toBe('1');
    expect(endState[todolistId1][0].entityStatus).toBe('succeeded');
})
test('SET-TODOLISTS', () => {
    let endState = tasksReducer(tasks, setTodolistsAC(todolists))
    expect(endState[todolistId2].length).toBe(0);
    expect(endState[todolistId1].length).toBe(0);
})
test('REMOVE-TODOLIST', () => {
    let endState = tasksReducer(tasks, removeTodolistAC(todolistId1))
    expect(endState[todolistId1]).toBeUndefined();
    expect(endState[todolistId2].length).toBe(3)
})

test('CLEAR-TODOLISTS', () => {
    let endState = tasksReducer(tasks, clearTodolists())
    expect(endState[todolistId1]).toBeUndefined();
    expect(endState[todolistId2]).toBeUndefined();
})
