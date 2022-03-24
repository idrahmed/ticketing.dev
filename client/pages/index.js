import ingressInstance from "../api/ingressInstance";
import Layout from "../components/Layout";
import Card from "../components/Card";
import styles from "../styles/Home.module.scss";

const index = ({ currentUser, tickets }) => {
  return (
    <Layout currentUser={currentUser}>
      <h1 className="mb-4">Tickets</h1>
      <div className={styles.layout}>
        {tickets.map((ticket) => (
          <Card ticket={ticket} />
        ))}
      </div>
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
