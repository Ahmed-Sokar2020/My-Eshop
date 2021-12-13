import { User } from '@sokar/users';
import { OrderItem } from './order-item';
export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAdress1?: string;
  shippingAdress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user?: User | any;
  dateOrdered?: string ;
}
