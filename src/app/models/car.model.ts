export class Car {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public qty: number,
    public isAvailable: boolean) {
  }

  public changeQty(delta: number) {
    this.qty += delta;
  }
}
