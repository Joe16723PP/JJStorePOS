export interface SellProductModel {
  prod_id: string;
  prod_name: string;
  sell_price: number;
  total_price?: number;
  amount?: number;
}
export interface ProductNoBarcodeModel {
  prod_id: string;
  prod_name: string;
  sell_price: number;
  total_price?: number;
  prod_amount: number;
}

export interface RouterModel {
  path: string;
  displayed: string;
  params?: object;
}

export interface SellLogModel {
  prod_id: string;
  prod_name: string;
  amount: number;
  sell_price: number;
  total_price: number;
  sell_datetime: string;
}

export interface ProductLogModel {
  prod_id: string;
  prod_name: string;
  amount: number;
  cost: number;
  total_price: number;
  store_date: string;
}

export interface ProductModel {
  prod_id: string;
  prod_name: string;
  prod_type_id: number;
  prod_type_name?: string;
  prod_amount: number;
  sell_price: number;
  cost: number;
  upd_date: string;
  img: any;
}

export interface ProductTypeModel {
  prod_type_id: number;
  type_name: string;
}

export interface SmallDetailProductModel {
  prod_id: string;
  prod_name: string;
}

export interface DialogProdManagmentModel {
  prod_detail: ProductModel;
  option_dialog: string;
}
