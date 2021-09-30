import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {IconButton, TextField, Button} from '@material-ui/core';

type PropsType = {
    AddItemForm: (title: string)=>void
}

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.AddItemForm(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <TextField
                helperText={error&&'Title is required!'}
                label={'title'}
                error={error}
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}/>
            <Button
                variant={"contained"}
                onClick={addItem}>+</Button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    )
}