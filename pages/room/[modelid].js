import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import api from "../../shared/api";
import { useAuth } from "../../contexts/auth";

import Header from "../../components/Header";
import Button from "../../components/Button";
import FavoriteButton from "../../components/FavoriteButton";

const Room = ({ roomData }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    api.get("/favorites").then((res) => {
      const isFavorited = res.data.message.some(
        (favorite) => parseInt(favorite.id) === roomData.id
      );
      setIsFavorite(isFavorited);
    });
  }, [isAuthenticated]);

  //   curl --location --request GET 'https://stagingapiv2.olecams.com//favorites' \
  // --header 'userCountry: ES' \
  // --header 'userRegion: BCN' \
  // --header 'Authorization: Bearer '

  return (
    <>
      <Head>
        <title>{roomData.nick}</title>
      </Head>
      <Header />
      <div className="container mx-auto p-5">
        <p>
          <Link href="/">
            <Button>Volver al listado</Button>
          </Link>
        </p>
        <div className="h-10" />
        <div className="grid grid-cols-5 gap-8 bg-slate-100 p-8 rounded-md text-yellow-800">
          <img
            className="w-24 h-24 rounded-full"
            src={roomData.thumb}
            alt={roomData.nick + " avatar"}
          />
          <div>{roomData.nick}</div>
          <div>{roomData.id}</div>
          <div>isFavourite: {isFavorite ? "true" : "false"}</div>
          <div>
            <FavoriteButton />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await api.get(`/performer/${params.modelid}`);
    return {
      props: { roomData: response.data.message },
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
}

export default Room;
