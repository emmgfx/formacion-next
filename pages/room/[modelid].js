import Head from "next/head";
import Link from "next/link";
import Button from "../../components/Button";
import Header from "../../components/Header";
import api from "../../shared/api";
import ProtectedPageRoute from "../../shared/protected-page-route";

const Room = ({ roomData }) => {
  return (
    <div>
      <Head>
        <title>{`${roomData.nick} en directo`}</title>
      </Head>
      <Header />
      <main className="p-4">
        <Link href="/">
          <Button>Volver</Button>
        </Link>
        <div className="h-2" />
        <pre className="text-xs bg-secondary-950 p-8">
          {JSON.stringify(roomData, null, 2)}
        </pre>
      </main>
    </div>
  );
};

export async function getServerSideProps({ req, res, params }) {
  if (!req.cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await api.get(`/performer/${params.modelid}`);
    return {
      props: {
        roomData: response.data.message,
      },
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }
  }
}

// export const getServerSideProps = (context) =>
//   ProtectedPageRoute(context, "/login", async () => {
//     try {
//       const response = await api.get(`/performer/${context.params.modelid}`);
//       return {
//         props: {
//           roomData: response.data.message,
//         },
//       };
//     } catch (error) {
//       console.log(error);
//       if (error.response.status === 404) {
//         return {
//           notFound: true,
//         };
//       }
//       return {
//         props: {},
//       };
//     }
//   });

export default Room;
