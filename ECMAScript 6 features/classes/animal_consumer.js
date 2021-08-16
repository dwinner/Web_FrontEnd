import {Animal} from "./animal_class.js"

export class AnimalClient {
    constructor() {
        this.animal = new Animal("Dog");
        console.log(this.animal.greeting("barks"));
    }
}

let animalClient = new AnimalClient();
Animal.echo("roof, roof");