"use strict";
/*

고객의 클래스 Customer를 만들고 그것을 상속하여
일반 고객, 고려대학생, 청소년의 클래스인
NormalCustomer, KoreaCustomer, YouthCustomer를 만듬

*/
class Menu {
    constructor(Drink, number) {
        this.Drink = Drink;
        this.number = number;
    }
    getDrink() {
        return this.Drink;
    }
    getNumber() {
        return this.number;
    }
}
class Customer {
    constructor(type, name, discount) {
        this.orders = [];
        this.type = type;
        this.name = name;
        this.discount = discount;
    }
    order(menu) {
        this.orders.push(menu);
    }
    getOrdersLength() {
        return this.orders.length;
    }
    getOrders() {
        return this.orders;
    }
    getType() {
        return this.type;
    }
    getDiscount() {
        return this.discount;
    }
}
class NormalCustomer extends Customer {
    constructor(name) {
        super(0 /* Normal */ , name, 1 /* Normal */ );
    }
}
class KoreaCustomer extends Customer {
    constructor(name) {
        super(1 /* Korea */ , name, 0.8 /* Korea */ );
    }
}
class YouthCustomer extends Customer {
    constructor(name) {
        super(2 /* Youth */ , name, 0.7 /* Youth */ );
    }
}
/*

  점원은 고객을 파라미터로 받아 가격과 시간을 계산한다.

*/
class Assistant {
    constructor(customer) {
        this.customer = customer;
    }
    getTotalPrice() {
        let customer = this.customer,
            orders = customer.getOrders(),
            totalPrice = 0;
        for (let i = 0; i < customer.getOrders().length; i++) {
            let drink = orders[i].getDrink(),
                drinkPrice = drink.getPrice(),
                drinkNumber = orders[i].getNumber();
            totalPrice += drinkPrice * drinkNumber;
        }
        return totalPrice * customer.getDiscount();
    }
    getTotalTime() {
        let customer = this.customer,
            orders = customer.getOrders(),
            totalTime = 0;
        for (let i = 0; i < customer.getOrders().length; i++) {
            let drink = orders[i].getDrink(),
                drinkTime = drink.getTime(),
                drinkNumber = orders[i].getNumber();
            totalTime += drinkTime * drinkNumber;
        }
        return totalTime;
    }
    speak() {
        console.log(`총 가격은 ${this.getTotalPrice()}원이고 총 시간은 ${this.getTotalTime()}걸립니다.`);
    }
}
class Drink {
    constructor(type, name, price, time) {
        this.type = type;
        this.name = name;
        this.price = price;
        this.time = time;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPrice() {
        return this.price;
    }
    getTime() {
        return this.time;
    }
}
class Americano extends Drink {
    constructor() {
        super(0 /* Americano */ , "아메리카노", 3000, 3);
    }
}
class Caffelatte extends Drink {
    constructor() {
        super(1 /* Caffelatte */ , "카페라떼", 4000, 4);
    }
}
class Chocolatte extends Drink {
    constructor() {
        super(2 /* Chocolatte */ , "초코라떼", 4000, 5);
    }
}
class Cappuccino extends Drink {
    constructor() {
        super(3 /* Cappuccino */ , "카푸치노", 4500, 6);
    }
}
class Dabangcoffee extends Drink {
    constructor() {
        super(4 /* Dabangcoffee */ , "다방커피", 5000, 10);
    }
}





(function test() {
    let kyk = new KoreaCustomer("권영권");
    kyk.order(new Menu(new Americano(), 2));
    kyk.order(new Menu(new Caffelatte(), 1));
    kyk.order(new Menu(new Dabangcoffee(), 1));
    let assistant = new Assistant(kyk);
    assistant.speak();
})();