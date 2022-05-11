import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import cookieCutter from "cookie-cutter";

import Button from "../components/Button";
import Header from "../components/Header";
import InputFloatingLabel from "../components/InputFloatingLabel";
import Head from "next/head";

export default function Login() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_OC_AUTH_USER);
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_OC_AUTH_PASSWORD);
  const router = useRouter();

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_OC_APIURL}/login`, {
        user: email,
        pwd: password,
        recaptcha: "12345",
      })
      .then((response) => {
        cookieCutter.set("token", response.data.message.token);
        cookieCutter.set("credits", response.data.message.credits);
        router.push("/");
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
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
