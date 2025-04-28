import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import logoUser from "../assets/logo_ricardo_palma.png";

export default function UserRegistrationForm() {
  const [user, setUser] = useState({
    user_name: "",
    user_lastname: "",
    user_email: "",
    user_password: "",
  });

  // Manejar cambios de inputs
  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // Enviar formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos antes de enviar
    const { user_name, user_lastname, user_email, user_password } = user;
    if (!user_name || !user_lastname || !user_email || !user_password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8800/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "¡Registro exitoso!",
          "El usuario ha sido registrado.",
          "success"
        );
        setUser({
          user_name: "",
          user_lastname: "",
          user_email: "",
          user_password: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: data.message || "Ocurrió un error al registrar el usuario.",
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar al servidor.",
      });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <div className="text-center mb-4">
            <img src={logoUser} alt="Logo usuario" style={{ width: "80px" }} />
            <h2 className="mt-3">Registro de Usuario</h2>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="p-4 border border-secondary rounded-4 shadow bg-white"
          >
            {/* Nombre */}
            <Form.Group className="mb-3" controlId="user_name">
              <Form.Label className="fw-bold">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Ingresa tu nombre"
                value={user.user_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Apellido */}
            <Form.Group className="mb-3" controlId="user_lastname">
              <Form.Label className="fw-bold">Apellido</Form.Label>
              <Form.Control
                type="text"
                name="user_lastname"
                placeholder="Ingresa tu apellido"
                value={user.user_lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="user_email">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                name="user_email"
                placeholder="Ingresa tu correo"
                value={user.user_email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4" controlId="user_password">
              <Form.Label className="fw-bold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="user_password"
                placeholder="Ingresa tu contraseña"
                value={user.user_password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn btn-success">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
