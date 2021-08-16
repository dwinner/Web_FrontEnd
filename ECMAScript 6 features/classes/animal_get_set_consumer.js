import {Animal} from './animal_getters_setters.js';

export class AnimalClient {
    constructor() {
        this.animal = new Animal("dog");
        this.animal.toString();
    }
}

let ac = new AnimalClient();
