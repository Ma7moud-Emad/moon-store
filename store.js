import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./src/features/auth/authSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
export default store;
