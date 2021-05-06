export class Frete {
  public transportadora: string;
  public valorFrete: number;
  public cep?:string;
  public check:boolean;
  constructor(transportadora: string, valorFrete: number) {
    this.transportadora = transportadora;
    this.valorFrete = valorFrete;
    this.check=false;
  }
}
