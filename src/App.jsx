import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'
import Loginpage from './pages/Loginpage'
import Homepage from './pages/Homepage'
import { finishLoading, setUser } from './redux/slices/auth-slice'
import Layout from './Layout'
import AboutPage from './pages/AboutPage'

const RouteProtection = ({ children }) => {
  const { user, loading } = useSelector(store => store.auth)
  if (loading) return <div>Loading...</div>
  return user ? children : <Navigate to="/login" />
}

const PublicRoute = () => {
  const user = useSelector(store => store.auth.user)
  return user ? <Navigate to="/" /> : <Outlet />
}
const AuthChecker = ({ children }) => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector(store => store.auth)
  useEffect(() => {
    if (!user) {
      fetch("http://localhost:3000/user/profile", {
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          if (data?.user) {
            dispatch(setUser(data.user))
          } else {
            dispatch(finishLoading())
          }
        })
        .catch(() => dispatch(finishLoading()))
    } else {
      dispatch(finishLoading())
    }
  }, [user, dispatch]);
  if (loading) {
    return <div>Loading...</div> // or spinner
  }
  return <>{children}</>
}
const App = () => {
  return (
    <Provider store={store}>
      <AuthChecker >
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Loginpage />} />
            </Route>
            <Route path="/" element={<RouteProtection><Layout /></RouteProtection>}>
              <Route index element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthChecker>
    </Provider>
  )
}

export default App