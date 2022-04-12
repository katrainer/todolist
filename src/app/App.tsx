import React, {useEffect} from 'react'
import './App.module.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {useDispatch} from 'react-redux';
import {useAppSelector} from './store';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {CircularProgress} from '@mui/material';
import {logOutTC} from '../features/Login/auth-reducer';
import Grid from '@mui/material/Grid';


function App() {
    const linerProgress = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    const logOutHandler = () => dispatch(logOutTC())
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div>
            <ErrorSnackBar/>
            <AppBar position="static">
                <Grid container
                      justifyContent="space-between">
                    <div style={{width: 50}}></div>
                    <Toolbar>
                        <Typography variant="h5">
                            To do list
                        </Typography>
                    </Toolbar>
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
                </Grid>
            </AppBar>
            {linerProgress === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
