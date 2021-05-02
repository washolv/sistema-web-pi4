export class Frete {
  public transportadora: string;
  public valorFrete: number;

  constructor(transportadora: string, valorFrete: number) {
    this.transportadora = transportadora;
    this.valorFrete = valorFrete;
  }
}
