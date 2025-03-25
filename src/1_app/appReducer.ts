import { combineReducers } from "@reduxjs/toolkit";
import { emptySplitApi } from "@widgets/splitting";
import { tableReducer } from "@widgets/table";

export const rootReducer = combineReducers({
  table: tableReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});
