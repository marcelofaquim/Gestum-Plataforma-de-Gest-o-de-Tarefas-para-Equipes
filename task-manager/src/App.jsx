import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return(
    <Router>
      <Routes>
        {/*Pagina de Login */}
        <Route path="/" element={<Login />} />

        {/* {Pagina de cadastro} */}
        <Route path="/register" element={<Register />} />


        </Routes>
      </Router>
  );
}

console.log("Register importado:", Register);


export default App;