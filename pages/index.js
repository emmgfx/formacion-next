import Head from "next/head";
import Header from "../components/Header";
import RoomItem from "../components/RoomItem";

export default function Home({ rooms, credits, ...props }) {
  return (
    <>
      <Head>
        <title>{rooms[0].nick}</title>
      </Head>
      <Header credits={credits} />
      <div className="p-4 grid gap-4 grid-cols-5">
        {rooms.map((room) => {
          return <RoomItem key={room.id} room={room} />;
        })}
      </div>
    </>
  );
  // return <pre className="container">{JSON.stringify(rooms, null, 2)}</pre>;
}

export async function getServerSideProps({ req, res }) {
  const request = await fetch(`${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=10`);
  const { message } = await request.json();
  const { results: rooms } = message;
  return {
    props: {
      rooms,
      token: req.cookies.token || null,
      credits: req.cookies.credits || null,
    },
  };
}

// export async function getStaticProps(context) {

//   const request = await fetch(`${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=10`);
//   const { message } = await request.json();
//   const { results: rooms } = message;
//   return {
//     props: { rooms },
//     revalidate: 10,
//   };
// }
