import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import whiteLabelReducer from "./slices/whitelabel";

// export default configureStore({
//   reducer: {
//     whiteLabel: whiteLabelReducer,
//   },
// });

const makeStore = () =>
  configureStore({
    reducer: {
      whiteLabel: whiteLabelReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
