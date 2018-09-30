import { Item} from './item';

export class Order2 {
  id: number;
  sequential_ref: string;
  order_status: string;
  order_date: Date;
  default_order: boolean;
  on_hold: boolean;
  total: number;
  items: Item[];
}
