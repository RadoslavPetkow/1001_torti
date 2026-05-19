export type OrderStatus =
  | "Нова"
  | "Обадено"
  | "Потвърдена"
  | "В процес"
  | "Готова"
  | "Завършена"
  | "Отказана";

export type ReceiveMethod = "Взимане от място" | "Доставка";

export type CakeOrder = {
  id: string;
  customerName: string;
  phone: string;
  cake: string;
  occasion: string;
  date: string;
  portions: string;
  flavor: string;
  inscription: string;
  receiveMethod: ReceiveMethod;
  message: string;
  status: OrderStatus;
  price: string;
  internalNote?: string;
  createdAt: string;
};
