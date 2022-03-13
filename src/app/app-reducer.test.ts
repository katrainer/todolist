import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        status: 'idle',
        error: null
    }
})

test('APP/SET-STATUS', () => {
    let endState = appReducer(
        initialState, setAppStatusAC('succeeded'))
    expect(endState.status).toBe('succeeded');
    expect(endState.error).toBe(null);
})
test('APP/SET-ERROR', () => {
    let endState = appReducer(
        initialState, setAppErrorAC('succeeded'))
    expect(endState.error).toBe('succeeded');
    expect(endState.status).toBe('idle');
})