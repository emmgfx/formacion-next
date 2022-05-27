import Head from "next/head";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PreHeader from "../components/PreHeader";
import RoomItem from "../components/RoomItem";
import Title from "../components/Title";
import { getWhiteLabel } from "../shared/whiteLabel";
import { setWhiteLabel } from "../store/slices/whitelabel";
import { wrapper } from "../store/store";
// import { getWhiteLabel } from "../shared/whiteLabel";

const Home = ({ rooms }) => {
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
};

export async function getServerSideProps({ req, res }) {
  // export const getServerSideProps = wrapper.getServerSideProps(
  // (store) =>
  // async ({ req, res }) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=10`
  );
  const { message } = await request.json();
  const { results: rooms } = message;

  // console.log(whiteLabel);

  // store.dispatch(setWhiteLabel(whiteLabel));
  return {
    props: {
      rooms,
      // whiteLabel,
    },
  };
}
// );

// export async function getStaticProps(context) {
//   const request = await fetch(
//     `${process.env.NEXT_PUBLIC_OC_APIURL}/rooms/oc/?limit=20&pruebas=1`
//   );
//   const { message } = await request.json();
//   const { results: rooms } = message;
//   return {
//     props: { rooms },
//     revalidate: 60 * 5,
//   };
// }

// Home.getInitialProps = wrapper.getInitialPageProps(
//   (store) =>
//     ({ pathname, req, res }) => {
//       console.log("2. Page.getInitialProps uses the store to dispatch things");
//       store.dispatch({
//         type: "TICK",
//         payload: "was set in error page " + pathname,
//       });
//     }
// );

export default Home;
