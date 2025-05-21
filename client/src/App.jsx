import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../src/Components/Home/Home.jsx'
import Register from '../src/Components/Signup/Signup.jsx'
import Login from '../src/Components/Login/Login.jsx'
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute.jsx';




const App = () => {
  return (
    <>

      <BrowserRouter>

        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Secure route for home page */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>

        </Routes>

      </BrowserRouter>

    </>


  )
}

export default App