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
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex min-w-0 shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-rose-900 text-white shadow-md shadow-rose-900/18">
            <Icon name="cake" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block max-w-[180px] truncate whitespace-nowrap text-sm font-black tracking-tight text-stone-950 sm:max-w-none sm:text-base">
              {business.name}
            </span>
            <span className="hidden whitespace-nowrap text-[11px] font-semibold text-stone-500 xl:block">бутикови торти в Сандански</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 text-sm font-bold text-stone-700 xl:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="whitespace-nowrap transition hover:text-rose-800">
              {label}
            </a>
          ))}
          <Link href="/admin" className="whitespace-nowrap transition hover:text-rose-800">
            Админ демо
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full border border-rose-200 bg-rose-50/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-rose-800 2xl:inline-flex">
            Неофициално демо
          </span>
          <a
            href="#inquiry"
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-rose-900 px-4 text-xs font-black text-white shadow-md shadow-rose-900/18 transition hover:-translate-y-0.5 hover:bg-stone-950 sm:h-11 sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Поръчка</span>
            <span className="hidden sm:inline">Поръчай торта</span>
          </a>
          <details className="group xl:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-stone-200 bg-white/70 text-stone-800 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 [&::-webkit-details-marker]:hidden"
              aria-label="Меню"
            >
              <Icon name="menu" className="h-5 w-5 group-open:hidden" />
              <Icon name="close" className="hidden h-5 w-5 group-open:block" />
            </summary>
            <div className="fixed inset-x-0 top-[72px] border-t border-stone-100 bg-white/95 px-4 py-3 shadow-lg shadow-stone-950/5 backdrop-blur-xl">
              <div className="mx-auto grid max-w-7xl gap-2">
                <span className="mb-1 inline-flex w-fit rounded-full bg-rose-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-rose-800 ring-1 ring-rose-100">
                  Демо сайт
                </span>
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="rounded-2xl px-3 py-3 text-sm font-black text-stone-800 transition hover:bg-rose-50 hover:text-rose-900"
                  >
                    {label}
                  </a>
                ))}
                <Link
                  href="/admin"
                  className="rounded-2xl px-3 py-3 text-sm font-black text-stone-800 transition hover:bg-rose-50 hover:text-rose-900"
                >
                  Админ демо
                </Link>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
