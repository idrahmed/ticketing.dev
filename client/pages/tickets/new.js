import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Layout from "../../components/Layout";
import { requireAuthentication } from "../../HOC/requireAuth";
import ingressInstance from "../../api/ingressInstance";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const NewTicket = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">Create a Ticket</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter a title for your ticket"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter a price for your ticket"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        {errors}
        <Button className="mt-3" type="submit">
          Create ticket
        </Button>
      </Form>
    </Layout>
  );
};

export const getServerSideProps = requireAuthentication(async (ctx) => {
  const { data } = await ingressInstance(ctx).get("/api/users/currentuser");

  return {
    props: {
      currentUser: data.currentUser,
    },
  };
});

export default NewTicket;
