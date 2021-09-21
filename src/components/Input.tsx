import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from './Input.module.css'

type propsType = {
    title: string
    callBack: (title: string) => void
}

export const Input = (props: propsType) => {
    let [title, setTitle] = useState("")

    let [error, setError] = useState(false)

    const addTaskHandler = () => {
        props.callBack(title);
        setTitle("");
        setError(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.callBack(title)
            setTitle("")
            setError(true)
        }
    }
    return (
        <div>
            <input className={error ? styles.error: ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>{props.title}</button>
            {error&&<div className={styles.errorMessage}>blabla</div>}
        </div>
    )
}