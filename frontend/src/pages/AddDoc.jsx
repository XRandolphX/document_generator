// Librerías principales
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Contexto global
import { useGlobalContext } from "../hooks/useGlobalContext";

// Iconos
import { FaBars } from "react-icons/fa";
import logoRicardoPalma from "../assets/logo_ricardo_palma.png";

// Bootstrap
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Add = () => {
  // Estado para los datos del documento
  const [document, setDocument] = useState({
    doc_name: "",
    doc_autor: "",
    doc_description: "",
  });

  // Referencia para el archivo a subir
  const fileInputRef = useRef(null);

  // Navegación entre páginas
  const navigate = useNavigate();

  // Contexto global
  const { openSidebar, openModal } = useGlobalContext();

  /**
   * Maneja los cambios de los inputs de texto
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocument((prevDocument) => ({
      ...prevDocument,
      [name]: value,
    }));
  };

  /**
   * Maneja el archivo seleccionado
   */
  const handleFileChange = (e) => {
    fileInputRef.current = e.target.files[0];
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear formData para enviar texto + archivo
    const formData = new FormData();
    formData.append("doc_name", document.doc_name);
    formData.append("doc_autor", document.doc_autor);
    formData.append("doc_description", document.doc_description);

    if (fileInputRef.current) {
      formData.append("doc_file", fileInputRef.current);
    }

    try {
      await axios.post("http://localhost:8800/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/docs"); // Redirige al listado de documentos
    } catch (error) {
      console.error("Error al subir el documento:", error);
    }
  };

  return (
    <Container className="my-5">
      {/* Barra superior */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="secondary" onClick={openSidebar}>
          <FaBars />
        </Button>
        <Button variant="primary" onClick={openModal}>
          Mostrar Modal
        </Button>
      </div>

      {/* Formulario */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <img
              src={logoRicardoPalma}
              alt="Logo Ricardo Palma"
              style={{ width: "80px" }}
            />
            <h2 className="mt-3">Agregar Nuevo Documento</h2>
          </div>
          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded-4 shadow-sm bg-light"
          >
            <Form.Group className="mb-3" controlId="docName">
              <Form.Label>Nombre del Documento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del documento"
                name="doc_name"
                value={document.doc_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="docAutor">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el autor"
                name="doc_autor"
                value={document.doc_autor}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="docDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese una descripción breve"
                name="doc_description"
                value={document.doc_description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="docFile">
              <Form.Label>Archivo</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" type="submit">
                Agregar Documento
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
