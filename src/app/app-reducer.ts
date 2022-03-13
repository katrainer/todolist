export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppRedActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, ...action.payload}
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    }
}
export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    }
}

export type AppRedActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
