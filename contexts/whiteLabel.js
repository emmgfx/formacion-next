import { createContext, useContext, useState, useEffect } from "react";
import { hexToHSL } from "../shared/utils";

import { getWhiteLabel } from "../shared/whiteLabel";

const WhiteLabelContext = createContext({});

export const WhiteLabelProvider = ({ children }) => {
  const [whiteLabel, setWhiteLabel] = useState(null);

  // useEffect(() => {
  //   async function loadWhiteLabel() {
  //     // setWhiteLabel(await getWhiteLabel(window.location.hostname));
  //     setWhiteLabel(await getWhiteLabel("www.videochat3x.com"));
  //   }
  //   loadWhiteLabel();
  // }, [setWhiteLabel]);

  useEffect(() => {
    if (!whiteLabel) return;
    const { h, s, l } = hexToHSL(whiteLabel.config.colors.primary);
    const htmlStyle = document.querySelector("html").style;
    htmlStyle.setProperty("--color-primary", `hsl(${h}, ${s}%, ${l}%)`);
    htmlStyle.setProperty(
      "--color-primary-light",
      `hsl(${h}, ${s}%, ${l + 10}%)`
    );
    htmlStyle.setProperty(
      "--color-primary-dark",
      `hsl(${h}, ${s}%, ${l - 10}%)`
    );
    htmlStyle.setProperty(
      "--color-primary-darkest",
      `hsl(${h}, ${s}%, ${l - 30}%)`
    );
  }, [whiteLabel]);

  return (
    <WhiteLabelContext.Provider
      value={{
        whiteLabel,
        logo: whiteLabel?.config?.images?.logo || null,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  );
};

export const useWhiteLabel = () => useContext(WhiteLabelContext);
