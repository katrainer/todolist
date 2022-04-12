import {TaskActionType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {AppRedActionType, appReducer} from './app-reducer';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: authReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//type
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodolistsActionType | TaskActionType | AppRedActionType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

//customUseSelector
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;
