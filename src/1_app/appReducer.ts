import { combineReducers } from "@reduxjs/toolkit";
import { exampleReducer } from "@widgets/example";
import { emptySplitApi } from "@widgets/splitting";

export const rootReducer = combineReducers({
  example: exampleReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});
