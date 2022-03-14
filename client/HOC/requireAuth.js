import ingressInstance from "../api/ingressInstance";

export function requireAuthentication(gssp) {
  return async (ctx) => {
    const { req, res } = ctx;
    const session = req.cookies.session;
    if (!session) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/auth/signin",
          statusCode: 302,
        },
      };
    }

    return await gssp(ctx); // Continue on to call `getServerSideProps` logic
  };
}
