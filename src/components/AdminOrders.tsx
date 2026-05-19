"use client";

import { useState } from "react";
import type { CakeOrder, OrderStatus } from "@/types/order";
import { Icon } from "./Icon";

const statuses: OrderStatus[] = ["Нова", "Обадено", "Потвърдена", "В процес", "Готова", "Завършена", "Отказана"];
const statusClass: Record<OrderStatus, string> = {
  Нова: "bg-rose-50 text-rose-800 ring-rose-100",
  Обадено: "bg-sky-50 text-sky-800 ring-sky-100",
  Потвърдена: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  "В процес": "bg-amber-50 text-amber-800 ring-amber-100",
  Готова: "bg-violet-50 text-violet-800 ring-violet-100",
  Завършена: "bg-stone-100 text-stone-700 ring-stone-200",
  Отказана: "bg-red-50 text-red-800 ring-red-100",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${statusClass[status]}`}>{status}</span>;
}

export function AdminOrders({
  orders,
  onStatusChange,
}: {
  orders: CakeOrder[];
  onStatusChange: (id: string, status: OrderStatus, note?: string) => void;
}) {
  const [selected, setSelected] = useState<CakeOrder | null>(null);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-stone-950">Заявки и поръчки</h2>
          <p className="text-sm font-semibold text-stone-500">Нови заявки от сайта плюс реалистични демо поръчки.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-[0.16em] text-stone-500">
              <tr>
                {["Клиент", "Телефон", "Торта", "Повод", "Дата", "Статус", "Цена", "Действие"].map((head) => (
                  <th key={head} className="px-5 py-4 font-black">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center font-semibold text-stone-500">
                    Няма заявки. Изпратете тестова заявка от публичния сайт.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-rose-50/35">
                    <td className="px-5 py-4 font-black text-stone-950">{order.customerName}</td>
                    <td className="px-5 py-4 text-stone-600">{order.phone}</td>
                    <td className="px-5 py-4 font-semibold text-stone-700">{order.cake}</td>
                    <td className="px-5 py-4 text-stone-600">{order.occasion || "Не е посочен"}</td>
                    <td className="px-5 py-4 text-stone-600">{order.date}</td>
                    <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-4 font-black text-stone-950">{order.price}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setSelected(order)} className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-rose-200 hover:bg-rose-50" aria-label="Детайли">
                          <Icon name="eye" className="h-4 w-4" />
                        </button>
                        <a href={`tel:${order.phone.replace(/\s/g, "")}`} className="grid h-9 w-9 place-items-center rounded-full bg-stone-950 text-white transition hover:bg-rose-900" aria-label="Обади се">
                          <Icon name="phone" className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <OrderDrawer
          order={selected}
          onClose={() => setSelected(null)}
          onSave={(status, note) => {
            onStatusChange(selected.id, status, note);
            setSelected((current) => (current ? { ...current, status, internalNote: note } : current));
          }}
        />
      )}
    </section>
  );
}

function OrderDrawer({
  order,
  onClose,
  onSave,
}: {
  order: CakeOrder;
  onClose: () => void;
  onSave: (status: OrderStatus, note: string) => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [note, setNote] = useState(order.internalNote ?? "");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/40 backdrop-blur-sm">
      <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-800">Детайли за заявка</p>
            <h3 className="mt-2 text-3xl font-black text-stone-950">{order.customerName}</h3>
            <p className="mt-1 font-semibold text-stone-500">{order.phone}</p>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-stone-200" aria-label="Затвори">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Detail label="Торта" value={order.cake} />
          <Detail label="Повод" value={order.occasion || "Не е посочен"} />
          <Detail label="Дата" value={order.date} />
          <Detail label="Порции" value={order.portions || "Не е посочено"} />
          <Detail label="Вкус" value={order.flavor || "Не е посочен"} />
          <Detail label="Получаване" value={order.receiveMethod} />
          <Detail label="Надпис" value={order.inscription || "Няма"} />
          <Detail label="Ориентировъчна цена" value={order.price} />
        </div>

        <div className="mt-5 rounded-2xl bg-stone-50 p-4">
          <p className="text-sm font-black text-stone-500">Съобщение от клиент</p>
          <p className="mt-2 leading-7 text-stone-700">{order.message || "Няма допълнително описание."}</p>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-black text-stone-800">Статус</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)} className="h-13 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 font-bold outline-none">
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-black text-stone-800">Вътрешна бележка</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-semibold outline-none" />
        </label>
        <button onClick={() => onSave(status, note)} className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-rose-900 px-6 text-sm font-black text-white transition hover:bg-stone-950">
          Запази промените
        </button>
      </aside>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-stone-500">{label}</p>
      <p className="mt-1 font-black text-stone-950">{value}</p>
    </div>
  );
}
