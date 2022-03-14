import { useState, useEffect } from "react";
import ingressInstance from "../../api/ingressInstance";
import Layout from "../../components/Layout";
import StripeCheckout from "react-stripe-checkout";
import { Button, Col, Container, Row } from "react-bootstrap";
import useRequest from "../../hooks/useRequest";
import Link from "next/link";
import Router from "next/router";

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Order = ({ currentUser, order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => {
      Router.push("/orders");
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      console.log("expiresAt: ", order.expiresAt);
      setTimeLeft(msLeft);

      // if time remaining is less than 0 we want to clear the interval i.e. ticket is expired
      // and we dont want to keep calculating
      if (msLeft < 0) {
        clearInterval(timerId);
      }
    };
    // initial call
    findTimeLeft();
    // every second, we'll call the fn
    const timerId = setInterval(findTimeLeft, 1000);
    // we need to clean up after we are done with the component. i.e. if the user navigates away
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <Layout currentUser={currentUser}>
      {timeLeft < 0 ? (
        <div>Order Expired</div>
      ) : (
        <Container>
          <Row className="mb-4">
            <h4>
              Time left to pay: {millisToMinutesAndSeconds(timeLeft)} minutes
            </h4>
          </Row>
          <Row>
            <Col>
              <StripeCheckout
                // calling the doRequest fn here to make payment to our backend.
                token={({ id }) => doRequest({ token: id })}
                stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
                amount={order.ticket.price * 100}
                name="Ticketing.dev"
                email={currentUser.email}
                currency="USD"
                // shippingAddress
              />
            </Col>
            <Col>
              <Link
                href={{
                  pathname: "/tickets/[ticketId]",
                  query: { ticketId: order.ticket.id },
                }}
              >
                <Button variant="secondary">View ticket</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  const { data } = await ingressInstance(context).get("/api/users/currentuser");
  const { data: order } = await ingressInstance(context).get(
    `/api/orders/${orderId}`
  );
  return {
    props: {
      currentUser: data.currentUser,
      order,
    },
  };
}

export default Order;
