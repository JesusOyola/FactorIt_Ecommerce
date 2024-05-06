import { ProductAmount } from "./products";

export interface User {
    email: string,
    password: number,
    cartType: string,
    vipNextPurchase: boolean,
    myShoppings:ProductAmount[], 
  };