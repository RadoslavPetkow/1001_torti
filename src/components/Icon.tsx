import {
  Cake,
  Calendar,
  Copy,
  Edit3,
  Eye,
  Layers,
  MapPin,
  Menu,
  PackageSearch,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

type IconName =
  | "star"
  | "phone"
  | "map"
  | "truck"
  | "bag"
  | "cake"
  | "search"
  | "calendar"
  | "user"
  | "settings"
  | "orders"
  | "products"
  | "menu"
  | "close"
  | "eye"
  | "copy"
  | "edit";

const icons: Record<IconName, LucideIcon> = {
  star: Star,
  phone: Phone,
  map: MapPin,
  truck: Truck,
  bag: ShoppingBag,
  cake: Cake,
  search: Search,
  calendar: Calendar,
  user: User,
  settings: Settings,
  orders: PackageSearch,
  products: Layers,
  menu: Menu,
  close: X,
  eye: Eye,
  copy: Copy,
  edit: Edit3,
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={1.9} />;
}
