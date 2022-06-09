import { useWhiteLabel } from "../contexts/whiteLabel";

const Preloader = () => {
  const { loading } = useWhiteLabel();

  if (!loading) return null;

  return (
    <div className="bg-white text-black z-50 absolute w-full h-full flex items-center justify-center">
      <div>LOS CORAZONES</div>
    </div>
  );
};

export default Preloader;
