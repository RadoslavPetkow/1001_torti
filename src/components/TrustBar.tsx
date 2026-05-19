import { business } from "@/lib/demo-data";
import { BackgroundConfetti } from "./BackgroundConfetti";
import { Icon } from "./Icon";

const items = [
  { label: "4.6 рейтинг", detail: "локално доверие", icon: "star" as const },
  { label: "40 отзива", detail: "демо визуализация", icon: "user" as const },
  { label: "Доставка и взимане", detail: "гъвкаво получаване", icon: "truck" as const },
  { label: "Център Сандански", detail: business.shortAddress, icon: "map" as const },
  { label: "Различни поводи", detail: "рожден ден, юбилей, сватба", icon: "cake" as const },
];

export function TrustBar() {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/70 bg-white/70 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/80 to-transparent" aria-hidden="true" />
      <BackgroundConfetti density="low" variant="soft" className="opacity-80" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3 rounded-3xl bg-white/78 p-4 shadow-sm ring-1 ring-white/80 backdrop-blur">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-rose-800 shadow-sm">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-black text-stone-950">{item.label}</span>
              <span className="block text-sm leading-5 text-stone-500">{item.detail}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
