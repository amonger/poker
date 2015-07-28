var Card = function (suit, rank) {
    this.suit = suit;
    this.rank = rank;
};

Card.prototype.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

Card.prototype.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

Card.prototype.getNamedSuit = function () {
    return this.suits[this.suit];
};

Card.prototype.getSuit = function () {
    return this.suit;
};

Card.prototype.getNamedRank = function () {
    return this.ranks[this.rank];
};

Card.prototype.getRank = function () {
    return this.rank;
};
