"use strict";
class Greeter {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return `Hellow world, ${this.name}!!`;
    }
    hugeGreet() {
        return `HELLO WORLD, ${this.name}!!!!!`;
    }
}
const greeter = new Greeter("HI");
console.log(greeter.hugeGreet());
