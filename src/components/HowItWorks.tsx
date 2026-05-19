import { SectionDecor } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";

const steps = [
  "Избирате торта или изпращате идея",
  "Попълвате кратка заявка",
  "Получавате обаждане за уточнение",
  "Взимате готовата торта или получавате доставка",
];

export function HowItWorks() {
  return (
    <section id="steps" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff8f1_100%)] py-20">
      <SectionDecor />
      <BackgroundConfetti density="medium" variant="soft" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-rose-800">Как се поръчва</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Ясен процес без излишни разговори</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[1.75rem] bg-white/82 p-6 shadow-[0_16px_45px_rgba(90,53,42,0.06)] ring-1 ring-white/90 backdrop-blur">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-900 text-lg font-black text-white">{index + 1}</span>
              <h3 className="mt-6 text-xl font-black leading-tight text-stone-950">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
