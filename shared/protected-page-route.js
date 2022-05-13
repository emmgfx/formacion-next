// https://shipsaas.com/blog/create-protected-route-nextjs

export default async function ProtectedPageRoute(
  context,
  redirectTo, // string route where user will be redirected if they are not authenticated
  getProps // function to fetch initial props
) {
  const userIsAuthenticated = context.req.cookies.token !== undefined;
  if (!userIsAuthenticated) {
    return {
      redirect: {
        destination: redirectTo ?? "/login",
        permanent: false,
      },
    };
  }

  if (getProps) {
    return getProps();
  }

  return {
    props: {},
  };
}
