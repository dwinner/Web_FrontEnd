interface IPerson {
    firstName: string;
    lastName: string;
}

class Person implements IPerson {
    constructor(public firstName: string, public lastName: string) {

    }
}

var personA: IPerson = new Person('Jane', 'Smith'); // explicit
var personB: IPerson = { firstName: 'Jo', lastName: 'Smith' }; // duck typing
