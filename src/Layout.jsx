import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router'
import { removeUser } from './redux/slices/auth-slice'

const Layout = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        }).then(res => res.json()).then(() => {
            dispatch(removeUser())
        })
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