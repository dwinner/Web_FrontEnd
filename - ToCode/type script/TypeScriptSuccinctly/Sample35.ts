export interface IFirstInterface {
    firstFunction() : void;
}

export interface ISecondInterface {
    secondFunction(): void;
}

export class MyClass implements IFirstInterface, ISecondInterface {
    firstFunction() {
    }

    secondFunction() {
    }
}