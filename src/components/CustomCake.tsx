import { FloatingBakeryElements } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

const features = [
  ["Дизайн по снимка или идея", "Изпращате пример, цветове или тема."],
  ["Избор на вкус и размер", "Порции, крем и блатове според повода."],
  ["Надпис върху тортата", "Име, дата, пожелание или кратко послание."],
  ["Взимане от място или доставка", "Уточняване по телефон след заявката."],
];

export function CustomCake({ onCustom }: { onCustom: () => void }) {
  return (
    <section id="custom" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_88%_18%,rgba(250,218,221,.18),transparent_28rem),radial-gradient(circle_at_16%_100%,rgba(214,168,90,.14),transparent_26rem),linear-gradient(135deg,#211714_0%,#3b241f_52%,#5a2635_100%)] py-20 text-white">
      <FloatingBakeryElements dark />
      <BackgroundConfetti density="low" variant="soft" className="opacity-70" />
      <div className="absolute inset-x-4 top-8 -z-10 mx-auto h-[calc(100%-4rem)] max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.035]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Поръчкова торта</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Искате торта по ваша идея?</h2>
          <p className="mt-5 text-lg leading-8 text-stone-300">
            Клиентите могат да заявят custom дизайн, вкус, размер, надпис и дата. След изпращане на заявката собственикът вижда детайлите в админ панела.
          </p>
          <button
            type="button"
            onClick={onCustom}
            className="mt-8 rounded-full bg-white px-7 py-4 font-black text-stone-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-rose-100"
          >
            Изпрати custom запитване
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(([title, detail]) => (
            <div key={title} className="rounded-[1.75rem] bg-white/8 p-6 ring-1 ring-white/10 backdrop-blur">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-500/20 text-rose-100">
                <Icon name="cake" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-2 leading-7 text-stone-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
