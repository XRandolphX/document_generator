// src/pages/Documents.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Documents() {
  const { openSidebar } = useGlobalContext();
  const [documents, setDocuments] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Opciones del selector de búsqueda
  const searchOptions = [
    { value: "doc_autor", label: "Autor" },
    { value: "doc_name", label: "Título" },
  ];

  // Obtener todos los documentos
  const fetchAllDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:8800/docs");
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  // Búsqueda filtrada de documentos
  const fetchFilteredDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8800/docs/search?field=${searchField}&value=${searchValue}`
      );
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching filtered documents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un documento
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/docs/${id}`);
      fetchAllDocuments(); // Mejor que recargar la página
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  // Handlers para búsqueda
  const handleSelectChange = (selectedOption) => {
    setSearchField(selectedOption?.value || "");
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const resetSearch = () => {
    setSearchField("");
    setSearchValue("");
    fetchAllDocuments();
  };

  // Cargar todos los documentos al inicio
  useEffect(() => {
    fetchAllDocuments();
  }, []);

  return (
    <Container className="mt-4">
      {/* Botón para abrir Sidebar */}
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs="auto">
          <Button variant="primary" onClick={openSidebar}>
            <FaBars />
          </Button>
        </Col>
      </Row>

      {/* Título y botones principales */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1>Documentos</h1>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Link to="/add" className="btn btn-success">
              Agregar nuevo documento
            </Link>
            <Button variant="secondary" onClick={fetchAllDocuments}>
              Recargar Documentos
            </Button>
          </div>
        </Col>
      </Row>

      {/* Sección de búsqueda */}
      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h4>Buscar documentos</h4>
          <Select
            options={searchOptions}
            value={
              searchOptions.find((option) => option.value === searchField) ||
              null
            }
            onChange={handleSelectChange}
            placeholder="Seleccione un campo de búsqueda"
          />
          {searchField && (
            <Form.Control
              className="mt-3"
              type="text"
              placeholder="Ingrese el valor a buscar"
              value={searchValue}
              onChange={handleInputChange}
            />
          )}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="primary"
              onClick={fetchFilteredDocuments}
              disabled={isLoading}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
            <Button variant="outline-secondary" onClick={resetSearch}>
              Limpiar Búsqueda
            </Button>
          </div>
        </Col>
      </Row>

      {/* Mostrar documentos */}
      <Row>
        {documents.length > 0 ? (
          documents.map((document) => (
            <Col
              md={4}
              sm={6}
              xs={12}
              className="mb-4"
              key={document.document_id}
            >
              <Card>
                <Card.Body>
                  <Card.Title>{document.doc_name}</Card.Title>
                  <Card.Text>
                    <strong>Autor:</strong> {document.doc_autor}
                  </Card.Text>
                  <Card.Text>{document.doc_description}</Card.Text>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(document.document_id)}
                    >
                      Eliminar
                    </Button>
                    <Link
                      to={`/update/${document.document_id}`}
                      className="btn btn-primary"
                    >
                      Actualizar
                    </Link>
                    <Button
                      variant="success"
                      onClick={() =>
                        window.open(
                          `http://localhost:8800/download/${document.document_id}`
                        )
                      }
                    >
                      Descargar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No se encontraron documentos.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Documents;
