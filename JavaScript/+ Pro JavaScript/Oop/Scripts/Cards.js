// Класс для представления игральной карты

function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

// Определяем перечисления
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 });
Card.Rank = enumeration({ Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14 });

// Текстовое представление
Card.prototype.toString = function () {
    return this.rank.toString() + " of " + this.suit.toString();
}

// Сравнение значений
Card.prototype.compareTo = function (that) {
    return this.rank < that.rank ? -1 : (this.rank > that.rank ? 1 : 0);
};

Card.orderByRank = function (a, b) {
    return a.compareTo(b);
};

Card.orderBySuit = function(a, b) {
    return a.suit < b.suit ? -1 : (a.suit > b.suit ? 1 : (a.rank < b.rank ? -1 : (a.rank > b.rank ? 1 : 0)));
};

// Класс для представления колоды карт
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(function(s) {
        Card.Rank.foreach(function(r) {
            cards.push(new Card(s, r));
        });
    });
}

// Методы перетасовки (и возвращения) колоды
Deck.prototype.shuffle = function() {
    var deck = this.cards,
        len = deck.length;
    for (var i = len-1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }

    return this;
};

Deck.prototype.deal = function(n) {
    if (this.cards.length<n) {
        throw "Out of cards";
    }

    return this.cards.splice(this.cards.length - n, n);
};

// NOTE: Простой пример использования
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);