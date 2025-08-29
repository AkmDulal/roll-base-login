import { createSlice } from "@reduxjs/toolkit";
import type { DataState } from "../../types";

const initialState: DataState = {
  users: [
    { id: 1, name: "Alice Admin", email: "alice@site.com", role: "admin" },
    { id: 2, name: "Mark Merchant", email: "mark@shop.com", role: "merchant" },
    { id: 3, name: "Mia Member", email: "mia@mail.com", role: "member" },
  ],
  merchants: [
    { id: 1, storeName: "GadgetHub", owner: "Mark Merchant", status: "active" },
    { id: 2, storeName: "FashionFi", owner: "Fiona Fox", status: "pending" },
  ],
  notifications: [
    {
      id: 101,
      text: "New approval request from Order #5003",
      createdAt: new Date().toISOString(),
    },
    {
      id: 102,
      text: "Contribution rate updated to 3.5%",
      createdAt: new Date().toISOString(),
    },
  ],
  approvals: [
    { id: 5001, customer: "Rahim", amount: 1200, status: "pending" },
    { id: 5002, customer: "Karim", amount: 980, status: "pending" },
    { id: 5003, customer: "Sadia", amount: 1750, status: "pending" },
  ],
  memberPoints: { total: 12450, monthly: 850, tier: "Gold" },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    approve: (state, { payload }: { payload: number }) => {
      const row = state.approvals.find((a) => a.id === payload);
      if (row) row.status = "approved";
    },
    setContribution: (state, { payload }: { payload: number }) => {
      state.notifications.unshift({
        id: Date.now(),
        text: `Contribution rate updated to ${payload}%`,
        createdAt: new Date().toISOString(),
      });
    },
  },
});

export const { approve, setContribution } = dataSlice.actions;
export default dataSlice.reducer;
