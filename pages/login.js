import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookieCutter from "cookie-cutter";

import Button from "../components/Button";
import Header from "../components/Header";
import InputFloatingLabel from "../components/InputFloatingLabel";
import Head from "next/head";
import { useAuth } from "../contexts/auth";

export default function Login() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_OC_AUTH_USER);
  const [password, setPassword] = useState(
    process.env.NEXT_PUBLIC_OC_AUTH_PASSWORD
  );
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) router.push("/");
  }, [auth.isAuthenticated]);

  const login = (e) => {
    e.preventDefault();
    auth.login({ email, password, recaptcha: "12345" });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />
      <div className="p-4">
        <form onSubmit={login}>
          <InputFloatingLabel
            type="email"
            label="Correo"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="h-2" />
          <InputFloatingLabel
            type="password"
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="h-2" />

          <Button>Enviar</Button>
        </form>
      </div>
    </>
  );
  // return <pre className="container">{JSON.stringify(rooms, null, 2)}</pre>;
}

export async function getServerSideProps({ req, res }) {
  if (req.cookies.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
