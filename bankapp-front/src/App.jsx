import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from "./pages/Login/Login.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import { Users } from "./pages/Users/Users.jsx";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/users" element={<Users/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
