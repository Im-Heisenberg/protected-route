import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/auth-slice'
import { useNavigate } from 'react-router'

const Loginpage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const changeHandler = (e, field) => {
        if (field === 'email') {
            setEmail(e.target.value)
        }
        if (field === 'password') {
            setPassword(e.target.value)
        }

    }
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(email, password)
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json()
            dispatch(setUser(data?.user))
            navigate('/')
        } catch (error) {
            console.log('error occured in login: ', error)
        }

    }
    return (
        <div>
            <h1>Login</h1>
            <input type='email' value={email} onChange={(e) => changeHandler(e, 'email')} />
            <input type='password' value={password} onChange={(e) => changeHandler(e, 'password')} />
            <button onClick={submitHandler}>Submit</button>
        </div>

    )
}

export default Loginpage