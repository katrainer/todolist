import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');

    const addTasksHandler = () => {
        props.addTasks(title);
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTasksHandler();
    }
    // const changeFilterHandler = (value: FilterValuesType) => {
    //     props.changeFilter(value)
    // }
    const removeTaskHandler = (tId: string) =>{
        props.removeTask(tId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTasksHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    // const removeTaskHandler = () =>{
                    //     props.removeTask(t.id)
                    // }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {removeTaskHandler(t.id)}}>x
                            </button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <Button changeFilter={props.changeFilter} title='all'/>
            <Button changeFilter={props.changeFilter} title='active'/>
            <Button changeFilter={props.changeFilter} title='completed'/>
            {/*<button onClick={() => changeFilterHandler('all')}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler('active')}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler('completed')}>Completed</button>*/}
        </div>
    </div>
}
















