import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  status: "idle" | "loading" | "authenticated" | "error";
  uid: string | null;
  email: string | null;
  error: string | null;
};

const initialState: AuthState = {
  status: "idle", // Set the initial state to idle
  uid: localStorage.getItem("uid") || null,
  email: localStorage.getItem("email") || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart(state) {
      state.status = "loading";
      state.error = null;
    },
    signInSuccess(
      state,
      action: PayloadAction<{ uid: string; email: string }>,
    ) {
      state.status = "authenticated";
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("email", action.payload.email);
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    signUpStart(state) {
      state.status = "loading";
      state.error = null;
    },
    signUpSuccess(
      state,
      action: PayloadAction<{ uid: string; email: string }>,
    ) {
      state.status = "authenticated";
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("email", action.payload.email);
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    logout(state) {
      state.status = "idle";
      state.uid = null;
      state.email = null;
      state.error = null;
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
