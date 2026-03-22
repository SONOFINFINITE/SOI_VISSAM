export type OrderStatusType = 'all' | 'active' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  status: string;
  type: OrderStatusType;
  total: string;
  items: number;
}

export const TEST_USER_INITIAL_ORDERS: Order[] = [];

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export const TEST_USER_PROFILE: UserProfile = {
  name: "Иванов Иван Иванович",
  email: "ivanov@mail.ru",
  phone: "+7 (999) 123-45-67"
};
