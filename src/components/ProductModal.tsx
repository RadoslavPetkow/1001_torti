"use client";

import type { CakeProduct } from "@/types/cake";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";

type ProductModalProps = {
  product: CakeProduct | null;
  onClose: () => void;
  onInquire: (cakeName: string) => void;
};

const portions = ["8 порции", "12 порции", "16 порции", "Custom"];
const flavors = ["Шоколад", "Ванилия", "Ягода", "Сметана", "Плодова", "По избор"];
const suitable = ["Рожден ден", "Юбилей", "Подарък", "Детско парти", "Сватба", "Празник"];

export function ProductModal({ product, onClose, onInquire }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/55 p-3 backdrop-blur-sm sm:items-center">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-[0_34px_100px_rgba(35,25,21,0.28)]">
        <div className="grid max-h-[92vh] overflow-auto lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-80">
            <SafeImage src={product.image} alt={product.name} className="h-full min-h-80 w-full object-cover" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-stone-800 shadow-md transition hover:bg-white"
              aria-label="Затвори"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            <div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-700">
                {product.category}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-950">{product.name}</h2>
              <p className="mt-3 text-base leading-7 text-stone-600">{product.description}</p>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Подходяща за</p>
              <div className="flex flex-wrap gap-2">
                {suitable.map((item) => (
                  <span key={item} className="rounded-full border border-stone-200 px-3 py-1 text-sm text-stone-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold text-stone-800">Порции</p>
                <div className="grid grid-cols-2 gap-2">
                  {portions.map((item) => (
                    <button key={item} className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-700 transition hover:border-rose-300 hover:bg-rose-50">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-stone-800">Вкус</p>
                <div className="grid grid-cols-2 gap-2">
                  {flavors.map((item) => (
                    <button key={item} className="h-10 rounded-xl border border-stone-200 bg-white px-3 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:bg-amber-50">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onInquire(product.name)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-6 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-900"
            >
              <Icon name="bag" className="h-5 w-5" />
              Запитай за тази торта
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
