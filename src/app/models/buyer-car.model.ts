export class BuyerCarModel {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public qty: number,
    public carId: string) {
  }
}
