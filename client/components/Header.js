import { Container, Nav, Navbar } from "react-bootstrap";

const Header = ({ currentUser }) => {
  return (
    <Navbar bg="light" className="px-3">
      <Container>
        <Navbar.Brand href="/">GitTix</Navbar.Brand>
        {/* <ul className="nav d-flex align-items-center">{links}</ul> */}

        <Nav className="d-flex justify-content-end align-items-center gap-3">
          {currentUser ? (
            <>
              <Nav.Item>
                <Nav.Link href="/tickets/new">Sell Tickets</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/orders">My Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/auth/signout">Sign out</Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/auth/signup">Sign up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/auth/signin">Sign in</Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
