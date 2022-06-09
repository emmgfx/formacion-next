import { useDebounce } from "use-debounce";

import { useWhiteLabel } from "../contexts/whiteLabel";

const Preloader = () => {
  const { loading } = useWhiteLabel();
  const [loadingDebounced] = useDebounce(loading, 1500);

  // console.log({ loading, loadingDebounced });

  if (!loading) return null;

  return (
    <div className="fixed bg-white text-black w-full h-full z-50 flex justify-center items-center">
      <span>LOS CORAZONES</span>
    </div>
  );
};

export default Preloader;
