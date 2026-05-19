"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/demo-data";
import type { CakeProduct } from "@/types/cake";
import { SectionDecor } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";
import { ProductModal } from "./ProductModal";
import { SafeImage } from "./SafeImage";

const filters = ["Всички", "Рожден ден", "Детски", "Сватбени", "Шоколадови", "Плодови", "Custom"];
const sortOptions = ["Най-популярни", "Цена: ниска към висока", "Цена: висока към ниска"];

export function Catalog({ onSelectCake }: { onSelectCake: (cake: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("Всички");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0]);
  const [selectedProduct, setSelectedProduct] = useState<CakeProduct | null>(null);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products
      .filter((product) => activeFilter === "Всички" || product.category === activeFilter)
      .filter((product) => {
        if (!normalized) return true;
        return [product.name, product.category, product.description, ...product.tags].join(" ").toLowerCase().includes(normalized);
      })
      .sort((a, b) => {
        if (sort === "Цена: ниска към висока") return (a.priceFrom ?? 9999) - (b.priceFrom ?? 9999);
        if (sort === "Цена: висока към ниска") return (b.priceFrom ?? 0) - (a.priceFrom ?? 0);
        return Number(Boolean(b.popular)) - Number(Boolean(a.popular));
      });
  }, [activeFilter, query, sort]);

  const handleInquire = (cake: string) => {
    setSelectedProduct(null);
    onSelectCake(cake);
  };

  return (
    <section id="catalog" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#fff8f1_48%,#ffffff_100%)] py-20">
      <SectionDecor />
      <BackgroundConfetti density="medium" variant="celebration" />
      <div className="absolute left-0 top-0 -z-10 h-36 w-full bg-[radial-gradient(circle_at_15%_0%,rgba(217,79,112,.12),transparent_28rem)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-800">Онлайн каталог</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Изберете торта и изпратете запитване</h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">Филтрирайте по повод, потърсете вкус или отворете детайли за порции, вкусове и персонализация.</p>
          </div>
          <div className="rounded-3xl bg-white/75 px-5 py-4 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-amber-100/80 backdrop-blur">
            Минимално време за поръчка: <span className="font-black text-stone-950">24 часа</span>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-[1.5rem] border border-amber-200/70 bg-amber-50/80 p-4 text-sm font-semibold leading-6 text-stone-700 shadow-sm backdrop-blur">
          <Icon name="star" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p>
            Цените са ориентировъчни. Крайната цена зависи от размер, декорация, вкус и срок за изпълнение.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_240px]">
          <label className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Търси торта..."
              className="h-14 w-full rounded-full border border-stone-200 bg-white/85 pl-12 pr-5 font-semibold shadow-sm outline-none backdrop-blur transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
            />
          </label>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-14 rounded-full border border-stone-200 bg-white/85 px-5 font-semibold text-stone-700 shadow-sm outline-none backdrop-blur transition focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100"
          >
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`h-10 shrink-0 rounded-full px-4 text-sm font-black transition ${
                activeFilter === filter ? "bg-rose-900 text-white shadow-md shadow-rose-900/18" : "bg-white/80 text-stone-700 ring-1 ring-stone-200 hover:bg-rose-50 hover:text-rose-900"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {visibleProducts.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
            <p className="text-xl font-black text-stone-950">Няма намерени торти</p>
            <p className="mt-2 text-stone-600">Променете търсенето или филтъра, за да видите повече предложения.</p>
          </div>
        ) : (
          <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white/95 shadow-[0_18px_55px_rgba(90,53,42,0.08)] ring-1 ring-white/90 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <SafeImage src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-black text-rose-900 shadow">
                    {product.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-black tracking-tight text-stone-950">{product.name}</h3>
                    <p className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-sm font-black text-amber-800">
                      {product.priceFrom ? `от ${product.priceFrom} лв.` : "Цена след уточнение"}
                    </p>
                  </div>
                  <p className="mt-3 flex-1 leading-7 text-stone-600">{product.description}</p>
                  <p className="mt-4 text-sm font-bold text-stone-500">{product.portions}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
                    <button type="button" onClick={() => handleInquire(product.name)} className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-stone-950 px-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-900">
                      Запитай за тази торта
                    </button>
                    <button type="button" onClick={() => setSelectedProduct(product)} className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-stone-200 bg-white px-4 text-sm font-black text-stone-800 transition hover:border-rose-200 hover:bg-rose-50">
                      Детайли
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onInquire={handleInquire} />
    </section>
  );
}
