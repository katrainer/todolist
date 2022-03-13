import {TaskActionType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {AppRedActionType, appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodolistsActionType | TaskActionType | AppRedActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
