"use client";

import { useState } from "react";
import { products } from "@/lib/demo-data";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";

export function AdminProducts() {
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black text-stone-950">Торти в каталога</h2>
          <p className="text-sm font-semibold text-stone-500">Демо управление на продукти, видимост и популярни предложения.</p>
        </div>
        <button onClick={() => setOpen(true)} className="inline-flex h-11 items-center justify-center rounded-full bg-stone-950 px-5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-900">
          Добави торта
        </button>
      </div>
      <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_45px_rgba(15,23,42,0.055)] ring-1 ring-stone-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-[0.16em] text-stone-500">
              <tr>
                {["Снимка", "Име", "Категория", "Цена от", "Порции", "Видимост", "Популярна", "Действия"].map((head) => (
                  <th key={head} className="px-5 py-4 font-black">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-rose-50/35">
                  <td className="px-5 py-4"><SafeImage src={product.image} alt={product.name} className="h-14 w-14 rounded-2xl object-cover" /></td>
                  <td className="px-5 py-4 font-black text-stone-950">{product.name}</td>
                  <td className="px-5 py-4 text-stone-600">{product.category}</td>
                  <td className="px-5 py-4 font-black text-stone-950">{product.priceFrom ? `${product.priceFrom} лв.` : "Уточнение"}</td>
                  <td className="px-5 py-4 text-stone-600">{product.portions}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-100">Активна</span></td>
                  <td className="px-5 py-4">{product.popular ? "Да" : "Не"}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {(["edit", "eye", "copy"] as const).map((icon) => (
                        <button key={icon} className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-rose-200 hover:bg-rose-50" aria-label="Действие">
                          <Icon name={icon} className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-rose-800">Демо форма</p>
                <h3 className="mt-2 text-3xl font-black text-stone-950">Добави торта</h3>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-stone-100 text-stone-700 transition hover:bg-stone-200" aria-label="Затвори">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Име на торта", "Категория", "Описание", "Цена от", "Порции", "Снимка URL"].map((label) => (
                <label key={label} className={label === "Описание" ? "sm:col-span-2" : ""}>
                  <span className="mb-2 block text-sm font-black text-stone-800">{label}</span>
                  <input className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
                </label>
              ))}
              {["Популярна", "Активна"].map((label) => (
                <label key={label} className="flex items-center gap-3 rounded-2xl bg-stone-50 p-4 font-black text-stone-800">
                  <input type="checkbox" className="h-5 w-5 accent-rose-900" defaultChecked={label === "Активна"} />
                  {label}
                </label>
              ))}
            </div>
            <button onClick={() => setOpen(false)} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-rose-900 px-6 text-sm font-black text-white transition hover:bg-stone-950">
              Запази демо продукт
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
