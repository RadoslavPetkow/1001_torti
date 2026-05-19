"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { business, customers, demoOrders, products } from "@/lib/demo-data";
import { readStoredOrders, writeStoredOrders } from "@/lib/storage";
import type { CakeOrder, OrderStatus } from "@/types/order";
import { AdminOrders, StatusBadge } from "./AdminOrders";
import { AdminProducts } from "./AdminProducts";
import { Icon } from "./Icon";

const nav = ["Табло", "Заявки", "Торти", "Категории", "Клиенти", "Настройки"];

export function AdminDashboard() {
  const [active, setActive] = useState("Табло");
  const [orders, setOrders] = useState<CakeOrder[]>(() =>
    typeof window === "undefined" ? demoOrders : [...readStoredOrders(), ...demoOrders],
  );

  const updateStatus = (id: string, status: OrderStatus, note?: string) => {
    setOrders((current) => {
      const demoIds = new Set(demoOrders.map((order) => order.id));
      const next = current.map((order) => (order.id === id ? { ...order, status, internalNote: note ?? order.internalNote } : order));
      writeStoredOrders(next.filter((order) => !demoIds.has(order.id)));
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#f5f5f4_54%,#f8f4ef_100%)] text-stone-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-stone-200/80 bg-white/92 p-5 shadow-[12px_0_45px_rgba(15,23,42,0.035)] backdrop-blur lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-900 text-white shadow-sm">
              <Icon name="cake" className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-black text-stone-950">{business.name}</span>
              <span className="text-xs font-bold text-stone-500">админ демо</span>
            </span>
          </Link>
          <nav className="mt-8 space-y-2">
            {nav.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-black transition ${
                  active === item ? "bg-rose-900 text-white shadow-md shadow-rose-900/16" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                }`}
              >
                <Icon name={item === "Торти" ? "products" : item === "Настройки" ? "settings" : item === "Клиенти" ? "user" : "orders"} className="h-5 w-5" />
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/86 px-4 py-4 shadow-sm shadow-slate-900/5 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-800">Система за поръчки</p>
                <h1 className="text-2xl font-black text-stone-950 sm:text-3xl">{active}</h1>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {nav.map((item) => (
                  <button key={item} onClick={() => setActive(item)} className={`h-10 shrink-0 rounded-full px-4 text-sm font-black lg:hidden ${active === item ? "bg-stone-950 text-white shadow-sm" : "bg-white text-stone-700 ring-1 ring-stone-200"}`}>
                    {item}
                  </button>
                ))}
                <Link href="/" className="inline-flex h-10 shrink-0 items-center rounded-full border border-stone-200 bg-white px-4 text-sm font-black text-stone-800 transition hover:bg-rose-50">Към сайта</Link>
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            {active === "Табло" && <Overview orders={orders} />}
            {active === "Заявки" && <AdminOrders orders={orders} onStatusChange={updateStatus} />}
            {active === "Торти" && <AdminProducts />}
            {active === "Категории" && <Categories onViewProducts={() => setActive("Торти")} />}
            {active === "Клиенти" && <Customers />}
            {active === "Настройки" && <Settings />}
          </div>
        </div>
      </div>
    </main>
  );
}

function Overview({ orders }: { orders: CakeOrder[] }) {
  const cards = useMemo(
    () => [
      ["Нови заявки", orders.filter((order) => order.status === "Нова").length.toString()],
      ["Потвърдени поръчки", orders.filter((order) => order.status === "Потвърдена").length.toString()],
      ["Поръчки за днес", "3"],
      ["Поръчки тази седмица", "14"],
      ["Активни торти в каталога", products.length.toString()],
      ["Най-търсена категория", "Рожден ден"],
    ],
    [orders],
  );

  return (
    <div className="space-y-7">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-stone-500">{label}</p>
            <p className="mt-4 text-4xl font-black text-stone-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[1.5rem] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
        <h2 className="text-2xl font-black text-stone-950">Последни заявки</h2>
        <div className="mt-5 space-y-3">
          {orders.slice(0, 4).map((order) => (
            <div key={order.id} className="flex flex-col justify-between gap-3 rounded-2xl bg-stone-50/80 p-4 ring-1 ring-stone-100 sm:flex-row sm:items-center">
              <div>
                <p className="font-black text-stone-950">{order.customerName} · {order.cake}</p>
                <p className="text-sm font-semibold text-stone-500">{order.date} · {order.phone}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Categories({ onViewProducts }: { onViewProducts: () => void }) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const categories = [
    { name: "Рожден ден", icon: "cake" as const, description: "Персонализирани предложения за празници." },
    { name: "Детски", icon: "star" as const, description: "Цветни торти за детски партита." },
    { name: "Сватбени", icon: "products" as const, description: "По-големи поръчки с уточняване." },
    { name: "Шоколадови", icon: "cake" as const, description: "Какаови кремове, мус и ганаш." },
    { name: "Плодови", icon: "star" as const, description: "Свежи и леки сезонни вкусове." },
    { name: "Custom", icon: "edit" as const, description: "Дизайн по снимка, идея и надпис." },
    { name: "Десерти", icon: "bag" as const, description: "Малки сладки, кутии и селекции." },
  ];
  const totalActive = products.filter((product) => product.active !== false).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black text-stone-950">Категории в каталога</h2>
          <p className="text-sm font-semibold text-stone-500">Структура за управление на витрината, поводите и продуктовите групи.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditingCategory("Нова категория")}
          className="inline-flex h-11 items-center justify-center rounded-full bg-stone-950 px-5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-900"
        >
          Добави категория
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Общо категории", categories.length.toString()],
          ["Активни предложения", totalActive.toString()],
          ["Най-популярна категория", "Рожден ден"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.5rem] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">{label}</p>
            <p className="mt-3 text-3xl font-black text-stone-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const count = products.filter((product) => product.category === category.name).length;
          return (
            <article
              key={category.name}
              className="group rounded-[1.5rem] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70 transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-900 ring-1 ring-rose-100">
                  <Icon name={category.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-100">
                  Активна
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black text-stone-950">{category.name}</h3>
              <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-stone-500">{category.description}</p>
              <div className="mt-5 rounded-2xl bg-stone-50/80 p-4 ring-1 ring-stone-100">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-stone-500">Активни продукти</p>
                <p className="mt-1 text-2xl font-black text-stone-950">{count}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(category.name)}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-black text-stone-800 transition hover:border-rose-200 hover:bg-rose-50"
                >
                  Редактирай
                </button>
                <button
                  type="button"
                  onClick={onViewProducts}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-stone-950 px-4 text-sm font-black text-white transition hover:bg-rose-900"
                >
                  Виж торти
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {editingCategory && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-800">Демо управление</p>
                <h3 className="mt-2 text-3xl font-black text-stone-950">{editingCategory}</h3>
              </div>
              <button onClick={() => setEditingCategory(null)} className="grid h-10 w-10 place-items-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-stone-200" aria-label="Затвори">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {["Име на категория", "Кратко описание", "Подредба в каталога"].map((label) => (
                <label key={label} className="block">
                  <span className="mb-2 block text-sm font-black text-stone-800">{label}</span>
                  <input
                    defaultValue={label === "Име на категория" && editingCategory !== "Нова категория" ? editingCategory : ""}
                    className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
                  />
                </label>
              ))}
              <label className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4 font-black text-stone-800">
                <input type="checkbox" className="h-5 w-5 accent-rose-900" defaultChecked />
                Активна категория
              </label>
            </div>
            <button onClick={() => setEditingCategory(null)} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-rose-900 px-6 text-sm font-black text-white transition hover:bg-stone-950">
              Запази демо категория
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Customers() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-stone-50 text-xs uppercase tracking-[0.16em] text-stone-500">
            <tr>{["Име", "Телефон", "Последна поръчка", "Брой поръчки", "Бележка"].map((head) => <th key={head} className="px-5 py-4 font-black">{head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {customers.map((customer) => (
              <tr key={customer.phone}>
                <td className="px-5 py-4 font-black text-stone-950">{customer.name}</td>
                <td className="px-5 py-4">{customer.phone}</td>
                <td className="px-5 py-4">{customer.lastOrder}</td>
                <td className="px-5 py-4">{customer.orders}</td>
                <td className="px-5 py-4 text-stone-600">{customer.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings() {
  const rows = [
    ["Име на бизнеса", business.name],
    ["Телефон", business.phone],
    ["Адрес", business.shortAddress],
    ["Работно време", "Отворено до 19:00"],
    ["Доставка", "Активна"],
    ["Минимално време за поръчка", "24 часа предварително"],
  ];
  return (
    <div className="max-w-3xl rounded-[1.5rem] bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
      <h2 className="text-2xl font-black text-stone-950">Бизнес настройки</h2>
      <div className="mt-6 divide-y divide-stone-100">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-2 py-4 sm:grid-cols-[220px_1fr]">
            <p className="font-black text-stone-500">{label}</p>
            <p className="font-black text-stone-950">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
