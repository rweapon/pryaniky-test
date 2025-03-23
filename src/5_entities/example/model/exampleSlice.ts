import type { IExample } from "@entities/example/model/types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: IExample = {
  name: "",
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setExample: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setExample } = exampleSlice.actions;
export default exampleSlice.reducer;
