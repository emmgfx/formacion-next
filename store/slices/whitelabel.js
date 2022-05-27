import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const whiteLabelSlice = createSlice({
  name: "whiteLabel",
  initialState: {},
  reducers: {
    setWhiteLabel: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setWhiteLabel } = whiteLabelSlice.actions;

export default whiteLabelSlice.reducer;
