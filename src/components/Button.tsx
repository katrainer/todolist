import React from "react";
import {filterType} from "../App"

type buttonType = {
    changeFilter: (value: filterType)=> void
}

export const Button = (props: buttonType) => {
    return(
        <button onClick={()=>props.changeFilter('ALL')}>All</button>
    )
}