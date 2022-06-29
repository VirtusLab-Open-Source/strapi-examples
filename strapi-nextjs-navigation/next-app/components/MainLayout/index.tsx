import { Container } from "react-bootstrap";
import Footer from "../Footer";
import Navbar from "../Navbar";

const MainLayout: React.FC<any> = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <Navbar />
      <Container className="my-5">
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default MainLayout;