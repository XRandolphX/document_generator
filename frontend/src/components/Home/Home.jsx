// Libs
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Spinner,
  Card,
} from "react-bootstrap";

import Select from "react-select";
import axios from "axios";
import { FaBars } from "react-icons/fa";

// Context
import { useGlobalContext } from "../../context/AppContext";

// Assets
import loadFileGif from "../../assets/load_file.gif";

const DocumentGenerator = () => {
  const { openSidebar } = useGlobalContext();

  // Estados
  const [inputValue, setInputValue] = useState("");
  const [pdfPath, setPdfPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputOptionValue, setInputOptionValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [customPromptValue, setCustomPromptValue] = useState("");

  const filterOptions = [
    { value: "", label: "Selecciona una opción" },
    { value: "competencias_capacidades", label: "Competencias" },
    { value: "desempeno", label: "Desempeño" },
    { value: "criterio", label: "Criterio" },
    { value: "instrumento_evaluacion", label: "Instrumento de Evaluación" },
    { value: "evidencia", label: "Evidencia" },
    { value: "purpose", label: "Propósito" },
    { value: "actitudes", label: "Actitudes" },
    { value: "antes_session", label: "Preparación de la Sesión" },
    { value: "recursos", label: "Materiales de la Sesión" },
    { value: "inicio", label: "Inicio" },
    { value: "situation_problem", label: "Planteamiento del problema" },
    {
      value: "preguntas_situation",
      label: "Preguntas de la situación problemática",
    },
    { value: "pregunta_investigation", label: "Pregunta de investigación" },
    { value: "hypothesis", label: "Hipótesis" },
    { value: "preguntas_tema", label: "Preguntas acerca del tema" },
  ];

  // Handlers
  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleCustomPromptChange = (e) => setCustomPromptValue(e.target.value);
  const handleOptionInputChange = (e) => setInputOptionValue(e.target.value);
  const toggleFilters = () => setShowFilters((prev) => !prev);
  const toggleCustomPrompt = () => setShowCustomPrompt((prev) => !prev);

  // Ref
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const generateDocument = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/generate-document",
        { user_input: inputValue }
      );
      data.success && setPdfPath(data.pdf_path);
    } catch (error) {
      console.error("Error al generar el documento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCustomDocument = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/generate-custom-document",
        {
          user_input: inputValue,
          selected_option: selectedOption?.value || "",
          custom_prompt: inputOptionValue,
          general_prompt: customPromptValue,
        },
        { onUploadProgress }
      );
      data.success && setPdfPath(data.pdf_path);
    } catch (error) {
      console.error("Error al generar documento personalizado:", error);
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setLoadingProgress(percentCompleted);
  };

  const downloadDocument = () => {
    window.open("http://localhost:8800/download");
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-start">
          <Button
            variant="outline-secondary"
            className="border-0 shadow-sm"
            onClick={openSidebar}
          >
            <FaBars />
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center text-center mb-5">
        <Col md={8} lg={6}>
          <h1 className="display-5 fw-bold text-primary mb-4">
            Generador de Documentos
          </h1>
          {isLoading && (
            <img
              src={loadFileGif}
              alt="Cargando"
              className="img-fluid my-4"
              style={{ maxHeight: "200px" }}
            />
          )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <Form.Control
                ref={textareaRef}
                as="textarea" // Cambiamos a textarea
                rows={3} // Número inicial de filas
                placeholder="Ingrese su petición"
                value={inputValue}
                onChange={handleInputChange}
                className="border-0 bg-light"
                style={{
                  resize: "none", // Deshabilitar redimensionamiento manual
                  overflowY: "hidden", // Ocultar scroll vertical inicial
                  minHeight: "80px", // Altura mínima inicial
                }}
                onInput={(e) => {
                  // Autoajuste de altura
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
            </Card.Body>
          </Card>

          <Button
            variant={showFilters ? "outline-danger" : "outline-primary"}
            onClick={toggleFilters}
            className="w-100 mb-4 py-2 fw-bold shadow-sm"
          >
            {showFilters ? "Descartar Filtros" : "Aplicar Filtros"}
          </Button>

          {showFilters && (
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3 text-secondary">Filtros</h5>
                <Select
                  options={filterOptions}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  className="mb-3"
                  placeholder="Selecciona una opción"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      border: "1px solid #e9ecef",
                      boxShadow: "none",
                      "&:hover": { border: "1px solid #ced4da" },
                      padding: "4px",
                    }),
                  }}
                />

                {selectedOption?.value && (
                  <Form.Control
                    type="text"
                    value={inputOptionValue}
                    onChange={handleOptionInputChange}
                    placeholder="Ingrese su prompt"
                    className="mb-3 bg-light border-0"
                  />
                )}

                <Button
                  variant="info"
                  onClick={toggleCustomPrompt}
                  className="w-100 mb-3 py-2 text-white fw-bold"
                >
                  {showCustomPrompt
                    ? "Ocultar Prompt General"
                    : "Mostrar Prompt General"}
                </Button>

                {showCustomPrompt && (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={customPromptValue}
                    onChange={handleCustomPromptChange}
                    placeholder="Ingrese un prompt general"
                    className="mb-3 bg-light border-0"
                  />
                )}

                <Button
                  variant="primary"
                  onClick={generateCustomDocument}
                  disabled={isLoading}
                  className="w-100 py-2 fw-bold shadow"
                >
                  {pdfPath ? "Actualizar Documento" : "Generar Documento"}
                </Button>
              </Card.Body>
            </Card>
          )}

          {!showFilters && (
            <Button
              variant="primary"
              onClick={generateDocument}
              disabled={isLoading}
              className="w-100 mb-3 py-3 fw-bold shadow"
            >
              {pdfPath ? "Actualizar Documento" : "Generar Documento"}
            </Button>
          )}

          {isLoading && (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <div className="progress mt-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-muted mt-2">{loadingProgress}% completado</p>
            </div>
          )}

          {pdfPath && (
            <Button
              variant="success"
              onClick={downloadDocument}
              className="w-100 py-3 fw-bold shadow"
            >
              Descargar Documento
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentGenerator;
