import {configureStore} from "@reduxjs/toolkit";

import manageReducer from "./manage";

const store = configureStore({
  reducer: {
    manage: manageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
