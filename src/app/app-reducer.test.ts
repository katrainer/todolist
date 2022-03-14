import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('APP/SET-STATUS', () => {
    let endState = appReducer(
        initialState, setAppStatusAC('succeeded'))
    expect(endState.status).toBe('succeeded');
    expect(endState.error).toBe(null);
    expect(endState.isInitialized).toBe(false);
})
test('APP/SET-ERROR', () => {
    let endState = appReducer(
        initialState, setAppErrorAC('succeeded'))
    expect(endState.error).toBe('succeeded');
    expect(endState.status).toBe('idle');
    expect(endState.isInitialized).toBe(false);
})
test('APP/SET-IS-INITIALIZED', () => {
    let endState = appReducer(
        initialState, setIsInitializedAC(true))
    expect(endState.isInitialized).toBe(true);
    expect(endState.status).toBe('idle');
    expect(endState.error).toBe(null);
})