import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ingressInstance from "../../../api/ingressInstance";
import Layout from "../../../components/Layout";
import useRequest from "../../../hooks/useRequest";
import Router from "next/router";

const EditTicket = ({ currentUser, ticket }) => {
  const [title, setTitle] = useState(ticket.title);
  const [price, setPrice] = useState(ticket.price);
  const [desc, setDesc] = useState(ticket.desc);

  const { doRequest, errors } = useRequest({
    url: `/api/tickets/${ticket.id}`,
    method: "put",
    body: {
      title,
      price,
      desc,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  if (currentUser.id !== ticket.userId) {
    return (
      <Layout>
        <div>Not authorized!</div>
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">Update Ticket</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        {errors}
        <Button className="mt-3" type="submit">
          Update ticket
        </Button>
      </Form>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // value of the ticketId param
  const { ticketId } = context.query;
  const { data } = await ingressInstance(context).get("/api/users/currentuser");
  // fetch the ticket
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
export default EditTicket;
