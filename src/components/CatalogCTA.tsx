import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

export function CatalogCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#fff8f1_0%,#fff1f3_52%,#fffdf9_100%)] py-14">
      <BackgroundConfetti density="low" variant="celebration" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_22px_70px_rgba(90,53,42,0.10)] backdrop-blur sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-rose-800">
                <Icon name="cake" className="h-4 w-4" />
                Онлайн заявка
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">Харесахте торта?</h2>
              <p className="mt-3 text-lg leading-8 text-stone-600">
                Изпратете кратка заявка и в реална версия собственикът ще я получи директно в админ панела.
              </p>
            </div>
            <a
              href="#inquiry"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-rose-900 px-6 text-center text-sm font-black text-white shadow-lg shadow-rose-900/18 transition hover:-translate-y-0.5 hover:bg-stone-950 sm:w-auto"
            >
              Изпрати заявка
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
