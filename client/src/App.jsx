import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../src/Components/Home/Home.jsx'
import Register from '../src/Components/Signup/Signup.jsx'
import Login from '../src/Components/Login/Login.jsx'
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },

  {
    path: '/register',
    element: <Register />
  },

  {
    path: '/login',
    element: <Login />
  },

])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App