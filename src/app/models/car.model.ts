export class Car {
  constructor(
    public name: string,
    public price: number,
    public qty: number,
    public isAvailable: boolean,
    public id?: string) {
  }
}
