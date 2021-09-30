import React, {useState} from 'react';

export const sum = (a: number, b: number) => a + b
export const mul = (a: number, b: number) => a * b
export const div = (a: number, b: number) => a / b
export const sub = (a: number, b: number) => a - b

export type ActionType = {
    type: 'sum' | 'mul' | 'div' | 'sub' // обязательное поле
    number: number
}

export type multiTaskerType = (state: number, action: ActionType)=>void

export const multiTasker = (state: number, action: ActionType) => {
    switch (action.type) {
        case "sum": return state+action.number
        case "mul": return state*action.number
        case "div": return state/action.number
        case "sub": return state-action.number
        default: state
    }
}