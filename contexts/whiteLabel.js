import { createContext, useContext, useState, useEffect } from "react";

import { getWhiteLabel } from "../shared/whiteLabel";
import { hexToHSL } from "../shared/utils";

const WhiteLabelContext = createContext({});

export const WhiteLabelProvider = ({ children }) => {
  const [whiteLabel, setWhiteLabel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWhiteLabel() {
      // const wl = await getWhiteLabel("www.tomacams.com");
      const wl = await getWhiteLabel(window.location.hostname);
      console.log({ wl });
      setLoading(false);
      setWhiteLabel(wl);
    }
    loadWhiteLabel();
  }, []);

  useEffect(() => {
    if (!whiteLabel) return;
    const { h, s, l } = hexToHSL(whiteLabel.config.colors.primary);
    const htmlNode = document.querySelector("html");
    htmlNode.style.setProperty("--color-primary", `hsl(${h}, ${s}%, ${l}%)`);
    htmlNode.style.setProperty(
      "--color-primary-light",
      `hsl(${h}, ${s}%, ${l + 10}%)`
    );
    htmlNode.style.setProperty(
      "--color-primary-dark",
      `hsl(${h}, ${s}%, ${l - 10}%)`
    );
    htmlNode.style.setProperty(
      "--color-primary-darkest",
      `hsl(${h}, ${s}%, ${l - 30}%)`
    );
  }, [whiteLabel]);

  return (
    <WhiteLabelContext.Provider
      value={{
        loading,
        isWhiteLabel: whiteLabel?.isWhiteLabel,
        whiteLabel: whiteLabel?.config,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  );
};

export const useWhiteLabel = () => useContext(WhiteLabelContext);
