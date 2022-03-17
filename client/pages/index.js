import { Table } from "react-bootstrap";
import ingressInstance from "../api/ingressInstance";
import Layout from "../components/Layout";
import Link from "next/link";

const index = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => (
    <Link
      href="/tickets/[ticketId]"
      as={`/tickets/${ticket.id}`}
      key={ticket.id}
    >
      <tr>
        <td>{ticket.title}</td>
        <td>${ticket.price}</td>
      </tr>
    </Link>
  ));
  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">Tickets</h1>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </Table>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { data } = await ingressInstance(context).get("/api/users/currentuser");
  const { data: tickets } = await ingressInstance(context).get("/api/tickets");
  return {
    props: {
      currentUser: data.currentUser,
      tickets,
    },
  };
}

export default index;
