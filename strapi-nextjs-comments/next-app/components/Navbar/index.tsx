import { Container, Navbar } from 'react-bootstrap';
import Link from "next/link";

const MainNavbar: React.FC<{}> = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand className="cursor-pointer">
            Strapi Plugin Comments Example
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;