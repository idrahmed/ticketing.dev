import Router from "next/router";
import { Button } from "react-bootstrap";
import ingressInstance from "../../api/ingressInstance";
import Layout from "../../components/Layout";
import useRequest from "../../hooks/useRequest";

const Ticket = ({ currentUser, ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push(`/orders/[orderId]`, `/orders/${order.id}`),
  });
  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">{ticket.title}</h1>
      <h4 className="mb-4">Price: ${ticket.price}</h4>
      {errors}
      {ticket.orderId ? (
        <Button variant="danger" disabled>
          This ticket is currently reserved or has been purchased
        </Button>
      ) : ticket.userId === currentUser?.id ? (
        <Button>Edit your ticket</Button>
      ) : (
        <Button onClick={() => doRequest()}>Purchase ticket</Button>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { ticketId } = context.query;
  const { data } = await ingressInstance(context).get("/api/users/currentuser");
  const { data: ticket } = await ingressInstance(context).get(
    `/api/tickets/${ticketId}`
  );
  return {
    props: {
      currentUser: data.currentUser,
      ticket,
    },
  };
}

export default Ticket;
