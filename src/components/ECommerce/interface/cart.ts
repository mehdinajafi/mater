import IProduct from "./product";

export interface ICart {
  cart: {
    payablePrice: number;
    rrpPrice: number;
    itemsCount: number;
    totalDiscount: number;
  };
  cartItems: ICartItem[];
}

export interface ICartItem {
  id: string;
  product: IProduct;
  quantity: number;
  variant: {
    color: { id: number; code: string };
    size: number;
  };
}

export interface IAddress {
  id: string;
  address: string;
  fullName: string;
  label: string;
  mobile: number;
  isDefault: boolean;
}
