import { Item} from './item';

export class Order {
  id: number;
  sequential_ref: string;
  order_status: string;
  order_date: Date;
  default_order: boolean;
  on_hold: boolean;
  total: number;
  site_manager: {id: number};
  supplier: {id: number};
  items: Item[];
}
