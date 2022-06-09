import Head from "next/head";

import { useWhiteLabel } from "../contexts/whiteLabel";

import Header from "../components/Header";
import Layout from "../components/Layout";
import PreHeader from "../components/PreHeader";
import RoomItem from "../components/RoomItem";
import Title from "../components/Title";

export default function Home({ rooms, ...props }) {
  const whiteLabel = useWhiteLabel();

  console.log({ whiteLabel });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <PreHeader />
      <Layout>
        <Header />
        <Title>
          <div className="flex gap-2">
            <span>Chicas</span>
            <span className="hidden lg:block">
              ▸ ENCUENTRA EL MEJOR CHAT ERÓTICO Y WEBCAM DE SEXO EN VIVO
            </span>
          </div>
        </Title>
        <div className="grid p-[3px] gap-[3px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {rooms.map((room) => {
            return <RoomItem key={room.id} room={room} />;
          })}
        </div>
      </Layout>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const request = await fetch(
//     `${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=10`
//   );
//   const { message } = await request.json();
//   const { results: rooms } = message;
//   return {
//     props: {
//       rooms,
//     },
//   };
// }

export async function getStaticProps(context) {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=20&pruebas=1`
  );
  const { message } = await request.json();
  const { results: rooms } = message;
  return {
    props: { rooms },
    revalidate: 60 * 5,
  };
}
