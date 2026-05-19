"use client";

import Link from "next/link";
import { business } from "@/lib/demo-data";
import { Icon } from "./Icon";

const links = [
  ["Начало", "#home"],
  ["Каталог", "#catalog"],
  ["Поръчкова торта", "#custom"],
  ["Как се поръчва", "#steps"],
  ["Контакти", "#contact"],
];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/70 bg-white/82 shadow-sm shadow-rose-950/5 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-900 text-white shadow-lg shadow-rose-900/20">
            <Icon name="cake" className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-base font-black tracking-tight text-stone-950 sm:text-lg">{business.name}</span>
            <span className="hidden text-xs font-medium text-stone-500 sm:block">бутикови торти в Сандански</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-semibold text-stone-700 lg:flex">
          <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-rose-800">
            Демо концепция — неофициален сайт
          </span>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-rose-800">
              {label}
            </a>
          ))}
          <Link href="/admin" className="transition hover:text-rose-800">
            Админ демо
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#inquiry"
            className="rounded-full bg-rose-900 px-3 py-2.5 text-xs font-black text-white shadow-lg shadow-rose-900/20 transition hover:bg-stone-950 sm:hidden"
          >
            Поръчка
          </a>
          <a
            href="#inquiry"
            className="hidden rounded-full bg-rose-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-rose-900/20 transition hover:-translate-y-0.5 hover:bg-stone-950 sm:inline-flex"
          >
            Поръчай торта
          </a>
          <Link
            href="/admin"
            className="rounded-full border border-stone-200 px-3 py-2.5 text-xs font-black text-stone-800 transition hover:border-rose-200 hover:bg-rose-50 sm:px-4 sm:py-3 sm:text-sm lg:hidden"
          >
            Админ
          </Link>
        </div>
      </nav>
    </header>
  );
}
