export type Role = "admin" | "merchant" | "member";

export interface AuthState {
  token: string | null;
  role: Role | null;
}

export interface UserRow {
  id: number;
  name: string;
  email: string;
  role: Role;
}
export interface MerchantRow {
  id: number;
  storeName: string;
  owner: string;
  status: "active" | "pending";
}
export interface NotificationItem {
  id: number;
  text: string;
  createdAt: string;
}

export interface DataState {
  users: UserRow[];
  merchants: MerchantRow[];
  notifications: NotificationItem[];
  approvals: {
    id: number;
    customer: string;
    amount: number;
    status: "pending" | "approved";
  }[];
  memberPoints: {
    total: number;
    monthly: number;
    tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  };
}
