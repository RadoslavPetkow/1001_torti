import { business } from "@/lib/demo-data";
import { FloatingBakeryElements } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_10%_20%,rgba(214,168,90,.16),transparent_24rem),radial-gradient(circle_at_90%_10%,rgba(250,218,221,.16),transparent_28rem),linear-gradient(135deg,#1f1714_0%,#2a1c18_56%,#3b211b_100%)] py-20 text-white">
      <FloatingBakeryElements dark />
      <BackgroundConfetti density="low" variant="soft" className="opacity-70" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Контакти</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">1001 ТОРТИ-НЕЛИ в центъра на Сандански</h2>
          <div className="mt-8 space-y-4 text-lg text-stone-200">
            <p className="flex gap-3"><Icon name="map" className="mt-1 h-5 w-5 text-rose-200" /> {business.shortAddress}</p>
            <p className="flex gap-3"><Icon name="phone" className="mt-1 h-5 w-5 text-rose-200" /> {business.phone}</p>
            <p className="flex gap-3"><Icon name="calendar" className="mt-1 h-5 w-5 text-rose-200" /> Отворено до 19:00</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={business.maps} target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-4 text-center font-black text-stone-950 transition hover:bg-rose-100">
              Google Maps
            </a>
            <a href={`tel:${business.tel}`} className="rounded-full border border-white/20 px-6 py-4 text-center font-black text-white transition hover:bg-white/10">
              Обади се
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-white/10 p-3 shadow-2xl shadow-black/20 ring-1 ring-white/15 backdrop-blur">
          <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-rose-200/20 blur-3xl" aria-hidden="true" />
          <div className="grid min-h-[360px] place-items-center rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.82),transparent_18rem),linear-gradient(135deg,#fff8f1,#ffe4e6)] p-8 text-center text-stone-950 shadow-inner">
            <div>
              <Icon name="map" className="mx-auto h-14 w-14 text-rose-900" />
              <p className="mt-5 text-2xl font-black">{business.shortAddress}</p>
              <p className="mt-3 text-stone-600">В реална версия тук може да има вградена карта, работно време и зона за доставка.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
