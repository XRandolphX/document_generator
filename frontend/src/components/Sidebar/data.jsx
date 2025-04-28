// data.js
import {
  BsFillHouseFill,
  BsFillFileEarmarkMedicalFill,
  BsFillFileEarmarkPlusFill,
  BsFacebook,
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

// Objeto con todos los íconos para reutilización
export const icons = {
  home: <BsFillHouseFill />,
  documents: <BsFillFileEarmarkMedicalFill />,
  add: <BsFillFileEarmarkPlusFill />,
  register: <IoMdPersonAdd />,
  facebook: <BsFacebook />,
  email: <BsFillEnvelopeAtFill />,
  phone: <BsFillTelephoneFill />,
};

// Rutas principales
export const navLinks = [
  {
    id: 1,
    path: "/",
    label: "Inicio",
    icon: icons.home,
    ariaLabel: "Ir al inicio",
  },
  {
    id: 2,
    path: "/doc",
    label: "Documentos",
    icon: icons.documents,
    ariaLabel: "Ver documentos",
  },
  {
    id: 3,
    path: "/add-doc",
    label: "Crear documento",
    icon: icons.add,
    ariaLabel: "Añadir nuevo documento",
  },
  {
    id: 4,
    path: "/user-register",
    label: "Registrar usuario",
    icon: icons.register,
    ariaLabel: "Registrar nuevo usuario",
  },
];

// Redes sociales
export const socialLinks = [
  {
    id: 1,
    url: "https://www.facebook.com/profile.php?id=100063732420657",
    icon: icons.facebook,
    ariaLabel: "Visitar nuestro Facebook",
  },
  {
    id: 2,
    url: "mailto:contacto@ejemplo.com",
    icon: icons.email,
    ariaLabel: "Enviar correo electrónico",
  },
  {
    id: 3,
    url: "tel:+51987654321",
    icon: icons.phone,
    ariaLabel: "Llamar por teléfono",
  },
];
