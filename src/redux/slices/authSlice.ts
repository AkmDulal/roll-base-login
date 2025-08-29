import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, Role } from "../../types";
import { clearAllTokens, getAnyToken, saveToken } from "../../utils/storage";

const initialFromLS = getAnyToken();

const initialState: AuthState = {
  token: initialFromLS?.token ?? null,
  role: (initialFromLS?.role as Role | null) ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: Role; token?: string }>) => {
      const token =
        action.payload.token ?? `${action.payload.role}-token-${Date.now()}`;
      state.role = action.payload.role;
      state.token = token;
      saveToken(action.payload.role, token);
    },
    logout: (state) => {
      state.role = null;
      state.token = null;
      clearAllTokens();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
