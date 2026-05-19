import type { CakeOrder } from "@/types/order";

export const ORDERS_STORAGE_KEY = "torti-neli-demo-orders";

export function readStoredOrders(): CakeOrder[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return value ? (JSON.parse(value) as CakeOrder[]) : [];
  } catch {
    return [];
  }
}

export function writeStoredOrders(orders: CakeOrder[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}
