import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    changeTitleTask: (title: string) => void
}


export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const offEditMode = () => {
        props.changeTitleTask(title)
        setEditMode(false)
    }
    const omEditMode = () => setEditMode(true)
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}/>
            : <span
                onDoubleClick={omEditMode}

            >{props.title}</span>
    )
}