import { useEffect, useState } from "react";
import { NavigationItemTree } from "../../types/navigation";
import { Container, Nav, Navbar } from 'react-bootstrap';
import Link from "next/link";
import List from "./list";
import { fetchMainNavigation } from "../../api";

interface IProps {
  idOrSlug?: number | string;
}

const MainNavbar: React.FC<IProps> = ({ idOrSlug = 1 }) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItemTree[]>([]);
  useEffect(() => {
    fetchMainNavigation(idOrSlug)
      .then(setNavigationItems)
      .catch(e => console.error(e));
  }, [idOrSlug]);
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand className="cursor-pointer">
            Strapi Plugin Navigation Example
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <List items={navigationItems} level={0} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;