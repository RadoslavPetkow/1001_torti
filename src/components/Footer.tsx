import Link from "next/link";
import { business } from "@/lib/demo-data";

export function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-stone-600 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-lg font-black text-stone-950">{business.name}</p>
            <p className="mt-2">Демо концепция за модерен сайт и система за поръчки.</p>
            <p className="mt-2 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-rose-800 ring-1 ring-rose-100">
              Демо концепция — неофициален сайт
            </p>
          </div>
          <div className="flex flex-wrap gap-4 font-bold">
            <a href="#catalog">Каталог</a>
            <a href="#inquiry">Поръчка</a>
            <a href="#contact">Контакти</a>
            <Link href="/admin">Админ демо</Link>
          </div>
        </div>
        <div className="border-t border-stone-100 pt-5">
          <p>{business.phone} · {business.shortAddress}</p>
        </div>
      </div>
    </footer>
  );
}
