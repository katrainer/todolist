import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolistId_1 = v1();
    const todolistId_2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'what to learn', filter: 'all'},
        {id: todolistId_2, title: 'what to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ]
    })

    const removeTask = (taskID: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, filter} : t))
    }
    const changeTaskTitle = (taskID: string, title: string, todolistId: string) => {
        tasks[todolistId] = tasks[todolistId].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks})
    }

    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (title: string) => {
        const todolistId = v1()
        setTodoLists([...todoLists, {
            id: todolistId,
            title, //title = title
            filter: "all"
        }])
        setTasks({...tasks, [todolistId]: []})
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        // todoLists = todoLists.map(t => t.id === todolistId ? {...t, title} : t)
        // setTodoLists([...todoLists])
        setTodoLists(todoLists.map(t => t.id === todolistId ? {...t, title} : t))
    }

    const todolistsComponents = todoLists.map(t => {
        let tasksForRender = tasks[t.id]
        if (t.filter === "active") {
            tasksForRender = tasks[t.id].filter(t => !t.isDone)
        }
        if (t.filter === "completed") {
            tasksForRender = tasks[t.id].filter(t => t.isDone)
        }
        return (

                <Grid item key={t.id} style={{maxWidth: '500px'}}>
                    <Paper  elevation={8} style={{padding: "40px"}}>
                        <TodoList
                            key={t.id}
                            id={t.id}
                            filter={t.filter}
                            title={t.title}
                            tasks={tasksForRender}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTodoListFilter={changeTodoListFilter}
                            removeTodolist={removeTodolist}
                            addTodolist={addTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}/>
                    </Paper>
                </Grid>

        )
    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color="inherit">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit"
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'xl'}>
                <Grid
                    container
                    style={{justifyContent: 'center', padding: "15px"}}
                >
                    <Grid
                        item
                    >
                        <AddItemForm AddItemForm={addTodolist}/>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={6}
                    style={{justifyContent: 'center'}}
                >
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
