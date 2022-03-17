import axios from "axios";

const ingressInstance = ({ req }) => {
  return axios.create({
    baseURL: "http://ticketing-prod.me/",
    headers: req.headers,
  });
};

export default ingressInstance;
