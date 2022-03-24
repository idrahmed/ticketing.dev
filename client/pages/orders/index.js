import { Table } from "react-bootstrap";
import ingressInstance from "../../api/ingressInstance";
import Layout from "../../components/Layout";
import { requireAuthentication } from "../../HOC/requireAuth";
import Link from "next/link";

const OrderIndex = ({ currentUser, orders }) => {
  const awaitingPayment = orders.currentOrders?.map((order) => (
    <Link href="/orders/[orderId]" as={`/orders/${order.id}`} key={order.id}>
      <tr>
        <td>{order.id}</td>
        <td>{order.ticket.title}</td>
        <td>${order.ticket.price}</td>
        <td>{order.status}</td>
      </tr>
    </Link>
  ));

  const prevOrders = orders.prevOrders?.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.ticket.title}</td>
      <td>${order.ticket.price}</td>
      <td>{order.status}</td>
    </tr>
  ));

  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">Orders awaiting payment</h1>
      <Table striped bordered hover variant="light" className="mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{awaitingPayment}</tbody>
      </Table>

      <h1 className="mb-4">Previous orders</h1>
      <Table striped bordered variant="light">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{prevOrders}</tbody>
      </Table>
    </Layout>
  );
};

export const getServerSideProps = requireAuthentication(async (ctx) => {
  const { data } = await ingressInstance(ctx).get("/api/users/currentuser");
  const { data: orders } = await ingressInstance(ctx).get("/api/orders");
  console.log("data: ", data);
  console.log("orders: ", orders);
  return {
    props: {
      currentUser: data.currentUser,
      orders,
    },
  };
});

export default OrderIndex;
