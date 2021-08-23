import React from "react";
import {filterType} from "../App"

type bootonType = {
    changeFilter: (value: filterType)=> void
}

export const Botton = (props: bootonType) => {
    return(
        <button onClick={()=>props.changeFilter('ALL')}>All</button>
    )
}