import { motion } from "framer-motion";
import styles from "../styles/Card.module.scss";

import Link from "next/link";

const Card = ({ ticket }) => {
  return (
    <Link
      href="/tickets/[ticketId]"
      as={`/tickets/${ticket.id}`}
      key={ticket.id}
    >
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.4 }}
        className={styles.card}
      >
        <div className={styles.info}>
          <h4>{ticket.title}</h4>
          <p>{ticket.desc}</p>
          <h4 className={styles.price}>${ticket.price}</h4>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;
