import { business } from "@/lib/demo-data";
import { FloatingBakeryElements } from "./BackgroundDecor";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(250,218,221,.72)_0,transparent_34rem),radial-gradient(circle_at_82%_24%,rgba(214,168,90,.24)_0,transparent_25rem),linear-gradient(135deg,#fff8f1_0%,#fffdf9_48%,#fff1f3_100%)]" />
      <div className="absolute right-[5%] top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-rose-200/35 blur-3xl" aria-hidden="true" />
      <div className="absolute left-[40%] top-24 -z-10 h-56 w-56 rounded-full bg-amber-100/45 blur-3xl" aria-hidden="true" />
      <FloatingBakeryElements />
      <BackgroundConfetti density="low" variant="soft" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8 lg:pb-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-bold text-stone-700 shadow-sm">
            <Icon name="star" className="h-4 w-4 text-amber-500" />
            {business.rating} ★ / {business.reviews} отзива
          </div>
          <div className="inline-flex rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-rose-800 shadow-sm backdrop-blur">
            Демо концепция — неофициален сайт
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              Торти за всеки специален повод
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-650 sm:text-xl">
              Поръчкови торти, сладки изкушения и празнични десерти в Сандански.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#catalog" className="inline-flex h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-center text-sm font-black text-white shadow-lg shadow-stone-950/14 transition hover:-translate-y-0.5 hover:bg-rose-900">
              Разгледай каталога
            </a>
            <a href={`tel:${business.tel}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/85 px-6 text-sm font-black text-stone-900 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50">
              <Icon name="phone" className="h-5 w-5" />
              Обади се
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Takeaway", "Delivery", "Custom торти"].map((badge) => (
              <span key={badge} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-700 shadow-sm ring-1 ring-stone-100">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute inset-x-8 top-20 h-72 rounded-full bg-white/55 blur-3xl" aria-hidden="true" />
          <div className="absolute left-0 top-12 w-[58%] overflow-hidden rounded-[2.2rem] shadow-2xl shadow-rose-950/15">
            <SafeImage src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=86" alt="Шоколадова торта" className="h-80 w-full object-cover" />
          </div>
          <div className="absolute right-0 top-0 w-[62%] overflow-hidden rounded-[2.2rem] shadow-2xl shadow-amber-950/15">
            <SafeImage src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=86" alt="Плодова торта" className="h-[420px] w-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-[18%] w-[58%] overflow-hidden rounded-[2.2rem] border-8 border-white shadow-2xl shadow-stone-950/15">
            <SafeImage src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1000&q=86" alt="Празнична торта" className="h-64 w-full object-cover" />
          </div>
          <div className="absolute bottom-12 right-6 rounded-3xl bg-white/90 p-5 shadow-2xl backdrop-blur">
            <p className="text-sm font-bold text-stone-500">Днес</p>
            <p className="mt-1 text-2xl font-black text-stone-950">Отворено до 19:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
