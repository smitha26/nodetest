export class Product {
  public name:string;
  public price:string;
  constructor(name, price){
    this.name = name;
    this.price = price;
  }
}

export function doSomething() {
  console.log('did something')
}

 function doSomethingSecret() {
  console.log('Secret')
}

export const orange = '#FFA500'
