export class Car {
  name: string;
  price: number;
  // quantity: number;
  isAvailable: boolean;

  constructor(name: string, price: number, isAvailable: boolean) {
    this.name = name;
    this.price = price;
    // this.quantity = quantity;
    this.isAvailable = isAvailable;
  }
}
