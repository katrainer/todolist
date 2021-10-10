import React, {useState} from 'react';
import {mul, sum, div, sub, ActionType, multiTasker, multiTaskerType} from './tasks';
import {type} from "os";

const a = 3
const b = 3
let obj: ActionType = {
    type: "sum",
    number: b
}
test('sum of numbers', () => {
    const result = sum(a, b)
    expect(result).toBe(6)
})
test('sum of numbers', () => {
    const result = mul(a, b)
    expect(result).toBe(9)
})
test('sum of numbers', () => {
    expect(div(a, b)).toBe(1)
})
test('sum of numbers', () => {
    expect(sub(a, b)).toBe(0)
})

test('reduce test', () => {
    expect(multiTasker(a, {type: "sum", number: b})).toBe(6)
    expect(multiTasker(a, {type: "mul", number: b})).toBe(9)
    expect(multiTasker(a, {type: "div", number: 0})).toBe(Infinity)
    expect(multiTasker(a, {type: "sub", number: b})).toBe(0)
})