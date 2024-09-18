import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slice/dashboard/productSlice";

const combinedReducer = combineReducers({
  product: productSlice,
});

export const rootReducer = (state, action) => {
  // if (action.type === "auth/logout") {
  //   state = undefined;
  // }
  return combinedReducer(state, action);
};
