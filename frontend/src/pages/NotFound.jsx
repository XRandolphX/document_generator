import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="lead mb-4">La página que buscas no existe.</p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Volver al inicio
        </Button>
      </Link>
    </Container>
  );
}

export default NotFound;
