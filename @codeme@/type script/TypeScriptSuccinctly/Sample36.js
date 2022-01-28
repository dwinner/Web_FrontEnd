var Person = (function () {
    function Person(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person;
})();
var personA = new Person('Jane', 'Smith');
var personB = {
    firstName: 'Jo',
    lastName: 'Smith'
};
