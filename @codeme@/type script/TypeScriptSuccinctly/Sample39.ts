interface IMover {
    move(): void;
}

interface IShaker {
    shake(): void;
}

interface IMoverShaker extends IMover, IShaker {

}

class MoverShaker implements IMoverShaker {
    move() {
    }

    shake() {
    }
}
