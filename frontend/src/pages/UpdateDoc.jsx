import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { FaBars } from "react-icons/fa";

const Update = () => {
  // Estado local para los datos del documento
  const [document, setDocument] = useState({
    doc_name: "",
    doc_autor: "",
    doc_file: null, // Aseguramos que el archivo sea null inicialmente
    doc_description: "",
    update_date: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const documentId = location.pathname.split("/")[2];

  // Manejar cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en el input de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocument((prev) => ({ ...prev, doc_file: file }));
  };

  // Enviar la actualización al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Agregar todos los campos del documento al FormData
    Object.entries(document).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.put(`http://localhost:8800/update/${documentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/docs");
    } catch (error) {
      console.error("Error actualizando el documento:", error);
    }
  };

  // Global Context para acciones como abrir Sidebar o Modal
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <div className="container mt-4">
      {/* Barra de herramientas superior */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-primary" onClick={openSidebar}>
          <FaBars /> Menu
        </button>
        <button className="btn btn-outline-success" onClick={openModal}>
          Mostrar Modal
        </button>
      </div>

      {/* Formulario de actualización */}
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4 text-center">Actualizar Documento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Documento</label>
            <input
              type="text"
              className="form-control"
              name="doc_name"
              placeholder="Nombre del documento"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Autor</label>
            <input
              type="text"
              className="form-control"
              name="doc_autor"
              placeholder="Autor"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="doc_description"
              placeholder="Descripción"
              rows="3"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Archivo</label>
            <input
              type="file"
              className="form-control"
              name="doc_file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt" // Opcional, restringir tipos de archivos
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Actualizar Documento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
