import React, {ChangeEvent} from "react"
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";

type TaskType1 = {
    taskId: string
    todolistId: string
}

export const Task1 = React.memo((
    {
        taskId,
        todolistId,
    }: TaskType1) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .filter(t => t.id === taskId)[0])
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(taskId, todolistId))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId));
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTitleTaskAC(taskId, newValue, todolistId))
    }

    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})