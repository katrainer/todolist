import React from 'react';
import {FilterValuesType} from "../App";

type PropsType = {
    changeFilter: (value: FilterValuesType)=>void
    title: FilterValuesType
}


export const Button=(props: PropsType)=>{
    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    return(
        <button onClick={() => {
            changeFilterHandler(props.title)
        }}>{props.title}</button>
    )
}

