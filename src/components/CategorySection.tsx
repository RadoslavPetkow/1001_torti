import { categoryCards } from "@/lib/demo-data";
import { SectionDecor } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { SafeImage } from "./SafeImage";

export function CategorySection() {
  return (
    <section className="relative isolate overflow-hidden bg-rose-50/45 py-20">
      <SectionDecor variant="rose" />
      <BackgroundConfetti density="medium" variant="soft" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-800">Избор по повод</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Категории торти и десерти</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((category) => (
            <article key={category.title} className="group overflow-hidden rounded-[1.75rem] bg-white/90 shadow-[0_18px_60px_rgba(90,53,42,0.07)] ring-1 ring-white/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <SafeImage src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-4 p-5">
                <h3 className="text-xl font-black text-stone-950">{category.title}</h3>
                <p className="min-h-12 text-sm leading-6 text-stone-600">{category.description}</p>
                <a href="#catalog" className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-900">
                  Виж предложения
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
