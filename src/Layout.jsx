import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, Outlet } from 'react-router'
import { removeUser } from './redux/slices/auth-slice'

const Layout = () => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(store => store.auth)
    const logoutHandler = () => {
        fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        }).then(res => res.json()).then(() => {
            dispatch(removeUser())
        })
    }
    if (loading) return <div>Loading...</div>
    //route protection  --> loading is false and still no user.Go to login then
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            <div>
                <h1>Header</h1>
                <nav><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">login</Link></li>
                    <li><Link onClick={logoutHandler}>logout</Link></li>
                </ul></nav>
            </div>
            <div><Outlet /></div>
            <div>Footer</div>
        </div>
    )
}

export default Layout