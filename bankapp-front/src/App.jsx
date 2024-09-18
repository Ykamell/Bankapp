import {
  BrowserRouter,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from "./pages/Login/Login.jsx";
import { Admin } from "./pages/Admin/Admin.jsx";
import { Users } from "./pages/Users/Users.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  const role = localStorage.getItem('role');

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={role ? <Navigate to={role === 'Admin' ? '/admin' : '/users'} /> : <Login />} />
          <Route path="/admin" element={ <ProtectedRoute roleRequired="Admin"> <Admin /> </ProtectedRoute> } />
          <Route path="/users" element={ <ProtectedRoute roleRequired="User">  <Users /> </ProtectedRoute> } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
