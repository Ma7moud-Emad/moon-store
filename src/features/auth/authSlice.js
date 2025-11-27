import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const request = axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        userData
      );

      // toast.promise
      const res = await toast.promise(request, {
        loading: "Checking your credentials...",
        success: "Welcome back",
        error: (err) =>
          err?.response?.data?.message || "Login failed. Try again!",
      });

      // Save token
      localStorage.setItem("userToken", res.data.token);
      return res.data.token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const request = axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        userData
      );

      const res = await toast.promise(request, {
        loading: "Creating your account...",
        success: "Account created successfully",
        error: (err) => err?.response?.data?.message || "Registration failed!",
      });

      localStorage.setItem("userToken", res.data.token);

      return res.data.token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("userToken") || null,
    isPending: false,
    errorMsg: null,
  },
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("userToken");

      state.token = null;
      state.isPending = false;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isPending = false;
        state.errorMsg = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.token = null;
        state.isPending = false;
        state.errorMsg = action.payload;
      })

      .addCase(userSignUp.pending, (state) => {
        state.isPending = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isPending = false;
        state.errorMsg = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.token = null;
        state.isPending = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
