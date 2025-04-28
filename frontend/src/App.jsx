// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos principales de Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"; // Íconos de Bootstrap
import "./App.css";

// Components
import Modal from "./components/Modal/Modal";
import Sidebar from "./components/Sidebar/Sidebar";

// Pages
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import Document from "./pages/Document";
import AddDoc from "./pages/AddDoc";
import UpdateDoc from "./pages/UpdateDoc";

function App() {
  return (
    <BrowserRouter>
      <Modal />
      <Sidebar />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doc" element={<Document />} />
        <Route path="/add-doc" element={<AddDoc />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/update-doc/:id" element={<UpdateDoc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
