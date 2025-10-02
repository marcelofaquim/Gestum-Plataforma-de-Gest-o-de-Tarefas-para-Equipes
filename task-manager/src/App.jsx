import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return(
    <Router>
      <Routes>
        {/*Pagina de Login */}
        <Route path="/" element={<Login />} />

        {/* {Pagina de cadastro} */}
        <Route path="/register" element={<Register />} />


        {/*Dashboard protegidos */}
        <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

        </Routes>
      </Router>
  );
}

console.log("Register importado:", Register);


export default App;