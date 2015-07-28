var Deck = function () {
    this.cardArray = [];

    this.setUp = function () {
        for (var suit = 0; suit < 4; suit++) { //Add all cards
            for (var rank = 0; rank < 13; rank++) {
                var c = new Card(suit, rank);
                this.add(c);
            }
        }
    };

    this.add = function (Card) {
        this.cardArray.push(Card);
    };

    this.shuffle = function () {
        var i = this.cardArray.length,
            j, tempi, tempj;
        if (i == 0) return false;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = this.cardArray[i];
            tempj = this.cardArray[j];
            this.cardArray[i] = tempj;
            this.cardArray[j] = tempi;
        }
    };

    this.getTop = function (num) {
        return this.cardArray.slice(0, num - 1);
    };
};
