import { type } from 'os';
import React, { useState } from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = "ALL"|"Active"|"Completed";

function App() {

        const [task1, setTask1] = useState ([
        {id:1, title: "Hello World", isDone: true},
        {id:2, title: "I'm Happy", isDone: false},
        {id:3, title: "Yoq", isDone: false},
        {id:4, title: "Yqo", isDone: false},
        {id:5, title: "qYo", isDone: false},
        {id:6, title: "wYo", isDone: true}
    ])

        const removeTask = (taskId: number) => {
            let removeTask1 = task1.filter(ft=>ft.id!==taskId);                  
            setTask1(removeTask1);
        }

        let [filter, setFilter] = useState <filterType> ("ALL");
        let durshlak = task1;
        if (filter === "Completed") {
            durshlak = task1.filter(f=>f.isDone);
        }
        if (filter === "Active") {
            durshlak = task1.filter(f=>!f.isDone);
        }

        const changeFilter = (value: filterType) =>{
            setFilter(value);
        }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                task={durshlak}
                removeTask={removeTask}
                changeFilter={changeFilter}
                />
        </div>
    );
}

export default App;
