import logo from "../../assets/logo_ricardo_palma.png";
import { useGlobalContext } from "../../context/AppContext";
import { FaTimes } from "react-icons/fa";
import { navLinks, socialLinks } from "./data";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside
      className={`position-fixed start-0 top-0 h-100 bg-white shadow-sm z-3 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-100"
      }`}
      style={{
        width: "250px",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Container fluid className="p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Logo IEP Ricardo Palma"
              className="rounded-circle"
              style={{ width: "60px", height: "60px" }}
            />
            <span className="fw-bold text-dark">IEP Ricardo Palma</span>
          </div>
          <button
            onClick={closeSidebar}
            className="btn btn-link text-dark p-0"
            aria-label="Cerrar menú"
          >
            <FaTimes className="fs-5" />
          </button>
        </div>

        {/* Enlaces principales */}
        <Nav as="ul" className="flex-column gap-2 mb-4">
          {navLinks.map((link) => (
            <Nav.Item key={link.id}>
              <Link
                to={link.path}
                aria-label="{link.ariaLabel}"
                className="text-decoration-none text-dark d-flex align-items-center gap-2 px-3 py-2 rounded hover-bg-light"
              >
                {link.icon}
                {link.label}
              </Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Iconos socialLinks */}
        <div className="border-top pt-4">
          <Nav as="ul" className="d-flex justify-content-center gap-3">
            {socialLinks.map((link) => (
              <Nav.Item key={link.id}>
                <a
                  href={link.url}
                  aria-label="{link.ariaLabel}"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover-primary"
                >
                  {link.icon}
                </a>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </Container>
    </aside>
  );
};

export default Sidebar;
