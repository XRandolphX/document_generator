import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";

import logoRicardoPalma from "../assets/logo_ricardo_palma.png";

export default function Login() {
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Manejar cambios de inputs de forma dinámica
  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  // Enviar formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación rápida de campos vacíos
    if (!values.user_email || !values.user_password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, llena todos los campos antes de iniciar sesión.",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8800/login", values);

      if (res.data.status === "Success") {
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de autenticación",
          text: res.data.message || "Usuario o contraseña incorrectos.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar al servidor. Consulta la consola para más detalles.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="bg-white p-5 rounded-4 shadow border border-secondary"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src={logoRicardoPalma}
            alt="Logo Ricardo Palma"
            style={{ width: "80px" }}
          />
          <h2 className="mt-3">Iniciar Sesión</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="user_email" className="form-label fw-bold">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  alt="icon"
                  height="20"
                />
              </span>
              <input
                type="email"
                id="user_email"
                name="user_email"
                className="form-control"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="off"
                value={values.user_email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="user_password" className="form-label fw-bold">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/web-3/user-login-2-enter-password-copy.png"
                  alt="icon"
                  height="20"
                />
              </span>
              <input
                type="password"
                id="user_password"
                name="user_password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                value={values.user_password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Iniciar Sesión
          </button>

          <div className="text-center">
            <span>¿No tienes una cuenta? </span>
            <a
              href="/register"
              className="text-primary fw-semibold text-decoration-none"
            >
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
