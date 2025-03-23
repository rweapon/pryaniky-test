import { exampleReducer } from "@entities/example";
import { emptySplitApi } from "@entities/splitting";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  example: exampleReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});
