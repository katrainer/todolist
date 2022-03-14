import {appReducer, setAppStatusAC} from "../../app/app-reducer";
import {authReducer, InitialStateType, setIsLoggedInAC} from "./auth-reducer";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
})

test('login/SET-IS-LOGGED-IN', () => {
    let endState = authReducer(
        initialState, setIsLoggedInAC(true))
    expect(endState.isLoggedIn).toBe(true);
})