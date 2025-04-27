import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Documents() {
  const { openSidebar } = useGlobalContext();
  const [documents, setDocuments] = useState([]);
  //Estados de búsqueda
  const [searchField, setSearchField] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:8800/docs");
      setDocuments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/docs/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFilteredDocuments = async () => {
    setIsLoading(true);
    const url = `http://localhost:8800/docs/search?field=${searchField}&value=${searchValue}`;
    try {
      const res = await axios.get(url);
      setDocuments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const options = [
    { value: "doc_autor", label: "Autor" },
    { value: "doc_name", label: "Titulo" },
  ];

  // Función para reiniciar el Select
  const resetSelect = () => {
    setSearchField("");
  };

  const assignValue = (valueSelectedOption) => {
    setSearchField(valueSelectedOption.value);
    console.log(valueSelectedOption.value);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  const handleClickSelect = () => {
    resetSelect();
    fetchAllDocuments();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  return (
    <div>
      <div>
        <Row className="justify-content-between align-items-center my-3">
          <Col xs="auto">
            <Button variant="primary" onClick={openSidebar}>
              <FaBars />
            </Button>
          </Col>
          <Col xs="auto">
            {/* <Button variant="secondary" onClick={openModal}>
              Modal
            </Button> */}
          </Col>
        </Row>
      </div>
      <Container>
        <Row>
          <Col>
            <h1 className="text-center mb-2">Documentos</h1>
            <div className="mt-2 mb-2">
              <Link to="http://127.0.0.1:5173/add" className="btn btn-success">
                Agregar nuevo documento
              </Link>
              <button onClick={reloadPage}> Recargar Página </button>
            </div>
            <div></div>
            <div>
              <h4>Buscar documentos</h4>
              <div style={{ width: "30%" }}>
                <Select
                  defaultValue={{ label: "Seleccionan una opción", value: "" }}
                  value={
                    options.find((option) => option.value === searchField) || ""
                  }
                  options={options}
                  onChange={assignValue}
                />
              </div>
              <button onClick={handleClickSelect}>Limpiar Selector</button>

              {searchField && ( // Conditionally render the text field based on searchField
                <div style={{ width: "100%", marginTop: "20px" }}>
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    placeholder="Enter search value"
                  />
                </div>
              )}
              <button onClick={fetchFilteredDocuments} disabled={isLoading}>
                {isLoading ? "Loading..." : "Search"}
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          {documents.map((document) => (
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
                  <Card.Text className="mt-3 mb-3 ">
                    {document.doc_autor}
                  </Card.Text>
                  <Card.Text className="mb-4">
                    {document.doc_description}
                  </Card.Text>
                  <Button
                    className=""
                    variant="danger"
                    onClick={() => handleDelete(document.document_id)}
                  >
                    Eliminar
                  </Button>
                  <Link
                    to={`/update/${document.document_id}`}
                    className="btn btn-primary ml-2"
                  >
                    Actualizar
                  </Link>
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:8800/download/${document.document_id}`
                      )
                    }
                  >
                    Descargar
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Documents;
