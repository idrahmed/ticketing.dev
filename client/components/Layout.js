import { Container } from "react-bootstrap";
import Header from "./Header";

const Layout = ({ children, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Container className="mt-5">{children}</Container>
    </div>
  );
};

export default Layout;
