import { SectionDecor } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

const reviews = [
  ["Поръчката беше уточнена бързо, а тортата изглеждаше много красиво.", "Демо клиент"],
  ["Хубаво е, че има ясни категории и човек може да избере по повод.", "Демо клиент"],
  ["Админ панелът би спестил доста телефонни бележки и пропуснати детайли.", "Демо клиент"],
];

export function Reviews() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#ffffff_100%)] py-20">
      <SectionDecor />
      <BackgroundConfetti density="low" variant="soft" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-800">Отзиви</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950">Как би изглеждала секцията с мнения</h2>
          </div>
          <p className="max-w-md text-sm font-semibold text-stone-500">Примерна визуализация на секция с отзиви.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map(([text, author]) => (
            <article key={text} className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_16px_45px_rgba(90,53,42,0.06)] ring-1 ring-white/90 backdrop-blur">
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} name="star" className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-stone-700">“{text}”</p>
              <p className="mt-5 font-black text-stone-950">{author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
