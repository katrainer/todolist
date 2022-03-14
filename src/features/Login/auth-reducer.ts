import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";
import {authAPI, ResultCode} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/util-error";
import {clearTodolists} from "../TodolistsList/todolists-reducer";

const initialState = {
    isLoggedIn: false
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    payload: {isLoggedIn}
} as const)

// thunks
export const loginTC = (data: loginTCType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data.email, data.password, data.rememberMe)
        res.data.resultCode === ResultCode.success ?
            dispatch(setIsLoggedInAC(true))
            : handleServerAppError(res.data, dispatch)
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}

export const logOutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        res.data.resultCode === ResultCode.success ?
            dispatch(setIsLoggedInAC(false))
            : handleServerAppError(res.data, dispatch)
        dispatch(clearTodolists())
    } catch (error: any) {
        dispatch(setAppErrorAC(error.message))
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}


// types
type loginTCType = {
    email: string
    password: string
    rememberMe: boolean
}
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>