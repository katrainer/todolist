import {AppThunk} from "./store";
import {authAPI, ResultCode} from "../api/todolists-api";
import {handleServerAppError} from "../utils/util-error";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
}
export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppRedActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, ...action.payload}
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        case "APP/SET-IS-INITIALIZED":
            return {...state, ...action.payload}
        default:
            return state
    }
}

//action
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

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED', payload: {
            isInitialized
        }
    } as const
}


//thunk
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me()
    res.data.resultCode === ResultCode.success ?
        dispatch(setIsLoggedInAC(true))
        : handleServerAppError(res.data, dispatch)
    dispatch(setIsInitializedAC(true))
}

export type AppRedActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>
