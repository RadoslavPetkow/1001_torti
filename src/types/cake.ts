export type CakeCategory =
  | "Рожден ден"
  | "Детски"
  | "Сватбени"
  | "Шоколадови"
  | "Плодови"
  | "Custom"
  | "Празнични"
  | "Десерти";

export type CakeProduct = {
  id: string;
  name: string;
  category: CakeCategory;
  description: string;
  portions: string;
  priceFrom: number | null;
  image: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  active?: boolean;
};

export type CakeCategoryCard = {
  title: string;
  description: string;
  image: string;
};
