"use client";

import { FormEvent, useState } from "react";
import { readStoredOrders, writeStoredOrders } from "@/lib/storage";
import type { CakeOrder, ReceiveMethod } from "@/types/order";
import { SectionDecor } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

const initial = {
  customerName: "",
  phone: "",
  cake: "",
  occasion: "",
  date: "",
  portions: "",
  flavor: "",
  inscription: "",
  receiveMethod: "Взимане от място" as ReceiveMethod,
  message: "",
};

export function InquiryForm({ selectedCake }: { selectedCake: string }) {
  const [form, setForm] = useState({ ...initial, cake: selectedCake });
  const [success, setSuccess] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const order: CakeOrder = {
      id: `ord-${Date.now()}`,
      ...form,
      status: "Нова",
      price: "Цена след уточнение",
      createdAt: new Date().toISOString(),
    };
    writeStoredOrders([order, ...readStoredOrders()]);
    setSuccess(true);
    setForm({ ...initial, cake: selectedCake });
  };

  return (
    <section id="inquiry" className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#fff8f1_0%,#fff1f3_48%,#fffdf9_100%)] py-20">
      <SectionDecor variant="rose" />
      <BackgroundConfetti density="medium" variant="celebration" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-800">Заявка</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Изпратете запитване за торта</h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Формата събира най-важното за поръчката и я записва локално в демо админ панела за текущата сесия.
          </p>
          {success && (
            <div className="mt-6 rounded-[1.5rem] bg-emerald-50 p-5 font-bold leading-7 text-emerald-800 ring-1 ring-emerald-100">
              Заявката е изпратена успешно. В реална версия тя ще се появи в админ панела.
            </div>
          )}
        </div>

        <form onSubmit={submit} className="relative overflow-hidden rounded-[2rem] bg-white/88 p-5 shadow-[0_24px_70px_rgba(90,53,42,0.10)] ring-1 ring-white/90 backdrop-blur sm:p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-rose-100/65 blur-2xl" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Име" value={form.customerName} onChange={(value) => update("customerName", value)} />
            <Field label="Телефон" value={form.phone} onChange={(value) => update("phone", value)} />
            <Field label="Избрана торта" value={form.cake} onChange={(value) => update("cake", value)} placeholder="Например: Шоколадово злато" />
            <Field label="Повод" value={form.occasion} onChange={(value) => update("occasion", value)} placeholder="Рожден ден, юбилей..." />
            <Field label="Дата за поръчка" value={form.date} onChange={(value) => update("date", value)} type="date" />
            <Field label="Брой хора / порции" value={form.portions} onChange={(value) => update("portions", value)} />
            <Field label="Желан вкус" value={form.flavor} onChange={(value) => update("flavor", value)} placeholder="Шоколад, ванилия..." />
            <Field label="Надпис върху тортата" value={form.inscription} onChange={(value) => update("inscription", value)} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["Взимане от място", "Доставка"] as ReceiveMethod[]).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => update("receiveMethod", method)}
                className={`rounded-2xl border px-4 py-4 text-left font-black transition ${
                  form.receiveMethod === method ? "border-rose-300 bg-rose-50 text-rose-900" : "border-stone-200 bg-white/90 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-black text-stone-800">Допълнително описание</span>
            <textarea
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-stone-200 bg-white/75 px-4 py-3 font-semibold outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
              placeholder="Цветове, тема, доставка, особености..."
            />
          </label>
          <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-900 px-6 py-4 font-black text-white shadow-lg shadow-rose-900/20 transition hover:-translate-y-0.5 hover:bg-stone-950">
            <Icon name="bag" className="h-5 w-5" />
            Изпрати заявка
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-stone-800">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-13 w-full rounded-2xl border border-stone-200 bg-white/75 px-4 py-3 font-semibold outline-none transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
      />
    </label>
  );
}
