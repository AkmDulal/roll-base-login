/* eslint-disable @typescript-eslint/no-explicit-any */
export const TOKEN_KEYS = {
  admin: "admin-token",
  merchant: "merchant-token",
  member: "member-token",
} as const;

export function saveToken(
  role: "admin" | "merchant" | "member",
  token: string
) {
  localStorage.setItem(TOKEN_KEYS[role], token);
}
export function clearAllTokens() {
  Object.values(TOKEN_KEYS).forEach((k) => localStorage.removeItem(k));
}
export function getAnyToken(): {
  role: "admin" | "merchant" | "member";
  token: string;
} | null {
  for (const [role, key] of Object.entries(TOKEN_KEYS) as [any, string][]) {
    const token = localStorage.getItem(key);
    if (token) return { role, token };
  }
  return null;
}
