// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos principales de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Íconos de Bootstrap
import "./App.css";

// Components
import Modal from "./components/Modal/Modal";
import Sidebar from "./components/Sidebar/Sidebar";

// Pages
import Home from "./components/Home/Home";
// import Documents from "./pages/Documents";
// import Add from "./pages/Add";
// import Update from "./pages/Update";
// import AI from "./pages/AI";
// import NotFound from "./pages/NotFound";
// import Register from "./pages/User_Register";
// import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
