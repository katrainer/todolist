import React from "react";
import {filterType} from "./App"
import { Botton } from "./components/Botton";

type propsType = {
    title: string
    task: Array<TaskType>
    removeTask: (taskId: number)=>void
    changeFilter: (value: filterType)=> void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(t=>{
                return(
                <li key = {(t.id)}>
                    <button onClick={()=>props.removeTask(t.id)}>X</button>
                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    </li>
                )})}
                
            </ul>
            <div>
                <Botton changeFilter={props.changeFilter}/>
                <button onClick={()=>props.changeFilter('Active')}>Active</button>
                <button onClick={()=>props.changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    )
}