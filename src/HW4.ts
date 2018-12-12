/*

고객의 클래스 Customer를 만들고 그것을 상속하여
일반 고객, 고려대학생, 청소년의 클래스인
NormalCustomer, KoreaCustomer, YouthCustomer를 만듬

*/

const enum drinkType {
  Americano,
  Caffelatte,
  Chocolatte,
  Cappuccino,
  Dabangcoffee
}

const enum customerType {
  Normal,
  Korea,
  Youth
}

const enum customerDiscount {
  Normal = 1,
  Korea = 0.8,
  Youth = 0.7
}

/*

  음료수 종류(Drink)와 수(number)로 이루어진
  Menu 클래스

*/
class Menu {
  constructor(private Drink: Drink, private number: number) {}
  getDrink(): Drink {
    return this.Drink;
  }
  setDrink(drink : Drink):void{
    this.Drink = drink;
  }
  getNumber(): number {
    return this.number;
  }
}


/*

  주문들, 고객유형

*/
class Customer {
  protected orders: Array<Menu>;
  protected type: number;
  protected name: string;
  protected discount: number;
  constructor(type: number, name: string, discount: number) {
    this.orders = [];
    this.type = type;
    this.name = name;
    this.discount = discount;
  }
  order(menu: Menu) {
    this.orders.push(menu);
  }
  getOrdersLength(): number {
    return this.orders.length;
  }
  getOrders(): Array<Menu> {
    return this.orders;
  }
  getType(): number {
    return this.type;
  }
  getDiscount(): number {
    return this.discount;
  }
}

class NormalCustomer extends Customer {
  constructor(name: string) {
    super(customerType.Normal, name, customerDiscount.Normal);
  }
}

class KoreaCustomer extends Customer {
  constructor(name: string) {
    super(customerType.Korea, name, customerDiscount.Korea);
  }
}

class YouthCustomer extends Customer {
  constructor(name: string) {
    super(customerType.Youth, name, customerDiscount.Youth);
  }
}

/*

  점원은 고객을 파라미터로 받아 가격과 시간을 계산한다.

*/

class Assistant {
  protected customer: Customer;

  constructor(customer: Customer) {
    this.customer = customer;
  }

  getTotalPrice(): number {
    let customer: Customer = this.customer,
      orders = customer.getOrders(),
      totalPrice: number = 0;

    for (let i = 0; i < customer.getOrders().length; i++) {
      let drink: Drink = orders[i].getDrink(),
        drinkPrice: number = drink.getPrice(),
        drinkNumber: number = orders[i].getNumber();

      totalPrice += drinkPrice * drinkNumber;
    }
    return totalPrice * customer.getDiscount();
  }

  getTotalTime(): number {
    let customer: Customer = this.customer,
      orders = customer.getOrders(),
      totalTime: number = 0;

    for (let i = 0; i < customer.getOrders().length; i++) {
      let drink: Drink = orders[i].getDrink(),
        drinkTime: number = drink.getTime(),
        drinkNumber: number = orders[i].getNumber();

      totalTime += drinkTime * drinkNumber;
    }
    return totalTime;
  }

  speak(): void {
    console.log(
      `총 가격은 ${this.getTotalPrice()}원이고 총 시간은 ${this.getTotalTime()}걸립니다.`
    );
  }
}

class Drink {
  constructor(
    protected type: drinkType,
    protected name: string,
    protected price: number,
    protected time: number
  ) {}
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getPrice(): number {
    return this.price;
  }
  getTime(): number {
    return this.time;
  }
}

class Americano extends Drink {
  constructor() {
    super(drinkType.Americano, "아메리카노", 3000, 3);
  }
}

class Caffelatte extends Drink {
  constructor() {
    super(drinkType.Caffelatte, "카페라떼", 4000, 4);
  }
}

class Chocolatte extends Drink {
  constructor() {
    super(drinkType.Chocolatte, "초코라떼", 4000, 5);
  }
}

class Cappuccino extends Drink {
  constructor() {
    super(drinkType.Cappuccino, "카푸치노", 4500, 6);
  }
}

class Dabangcoffee extends Drink {
  constructor() {
    super(drinkType.Dabangcoffee, "다방커피", 5000, 10);
  }
}

(function test(): void {
  let kyk = new KoreaCustomer("권영권");

  kyk.order(new Menu(new Americano(), 2));
  kyk.order(new Menu(new Caffelatte(), 1));
  kyk.order(new Menu(new Dabangcoffee(), 1));

  let assistant = new Assistant(kyk);

  assistant.speak();
})();
