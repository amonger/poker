var Rankings = function () {
    this.get = function (hand) {
        var highCard = new HighCard();
        var pair = new Pair(highCard);
        var twoPair = new TwoPair(pair);
        var threeOfAKind = new ThreeOfAKind(twoPair);
        var straight = new Straight(threeOfAKind);
        var flush = new Flush(straight);
        var fourOfAKind = new FourOfAKind(flush);
        var fullHouse = new FullHouse(fourOfAKind);
        var straightFlush = new StraightFlush(fullHouse);
        var stack = new RoyalFlush(straightFlush);

        return stack.validate(hand);
    }
};

var RoyalFlush = function (next) {
    this.next = next;

    var flush = new Flush();
    var straight = new Straight();

    this.validate = function (hand) {
        var hand = hand.sort(function (a, b) {
            return a.getRank() > b.getRank();
        });
        var highestCardIsKing = hand[hand.length - 1].getRank() == 12;
        if (!highestCardIsKing || !flush.isFlush(hand) || !straight.isStraight(hand)) {
            return this.next.validate(hand);
        }
        return "royal-flush";
    };

};

var StraightFlush = function (next) {
    this.next = next;

    var flush = new Flush();
    var straight = new Straight();

    this.validate = function (hand) {
        if (!flush.isFlush(hand) || !straight.isStraight(hand)) {
            return this.next.validate(hand);
        }
        return "straight-flush";
    };

};

var FourOfAKind = function (next) {
    var that = new AbstractCounter();
    that.next = next;

    that.validate = function (hand) {
        if (!that.isFourOfAKind(hand)) {
            return that.next.validate(hand);
        }
        return "four-of-a-kind";
    };

    that.isFourOfAKind = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        });
        var sumValues = that.getSumValues(ranks);
        var pairs = sumValues.filter(function (e) {
            return e == 4;
        });
        return pairs.length == 1;
    };
    return that;
};

var FullHouse = function (next) {
    var that = new AbstractCounter();
    that.next = next;

    that.validate = function (hand) {
        if (!that.isFullHouse(hand)) {
            return that.next.validate(hand);
        }
        return "full-house";
    };

    that.isFullHouse = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        });
        var sumValues = that.getSumValues(ranks);
        var pairs = sumValues.filter(function (e) {
            return e == 3 || e == 2;
        });
        return pairs.length == 2;
    };
    return that;
};

var Flush = function (next) {
    this.next = next;

    this.validate = function (hand) {
        if (!this.isFlush(hand)) {
            return this.next.validate(hand);
        }
        return "flush";
    };

    this.isFlush = function (hand) {
        var value = hand.reduce(function (count, cur) {
            return count + cur.getSuit();
        }, 0);
        return value == (hand[0].getSuit() * hand.length);
    };
};

var Straight = function (next) {
    this.next = next;

    this.validate = function (hand) {
        if (!this.isStraight(hand)) {
            return this.next.validate(hand);
        }
        return "straight";
    };

    this.isStraight = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        }).sort(function (a, b) {
            return a > b;
        });
        /**
         * If the highest rank is more than the current length
         * by taking the lowest away, we should end up with a result
         * of [0,1,2,3,4] if it is a straight
         */
        if (ranks[ranks.length - 1] > ranks.length) {
            var lowest = ranks[0];

            ranks = ranks.map(function (e) {
                return e - lowest;
            });
        }

        var rankSumTotal = ranks.reduce(function (count, cur) {
            return count + cur;
        }, 0);

        return rankSumTotal == this.sumRange(0, ranks.length - 1);
    };

    this.sumRange = function (start, end) {
        var total = 0;
        for (; start <= end; start++) {
            total += start;
        }
        return total;
    };
};

var ThreeOfAKind = function (next) {
    var that = new AbstractCounter();
    that.next = next;

    that.validate = function (hand) {
        if (!that.isThreeOfAKind(hand)) {
            return that.next.validate(hand);
        }
        return "three-of-a-kind";
    };

    that.isThreeOfAKind = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        });
        var sumValues = that.getSumValues(ranks);
        var pairs = sumValues.filter(function (e) {
            return e == 3;
        });
        return pairs.length == 1;
    };
    return that;
};

var TwoPair = function (next) {
    var that = new AbstractCounter();
    that.next = next;

    that.validate = function (hand) {
        if (!this.isTwoPair(hand)) {
            return this.next.validate(hand);
        }
        return "two-pair";
    };

    that.isTwoPair = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        });
        var sumValues = that.getSumValues(ranks);
        var pairs = sumValues.filter(function (e) {
            return e == 2;
        });
        return pairs.length == 2;
    };
    return that;
};

var Pair = function (next) {
    var that = new AbstractCounter();

    that.next = next;

    that.validate = function (hand) {
        if (!that.isPair(hand)) {
            return that.next.validate(hand);
        }
        return "pair";
    };

    that.isPair = function (hand) {
        var ranks = hand.map(function (e) {
            return e.getRank();
        });
        var sumValues = that.getSumValues(ranks);

        var pairs = sumValues.filter(function (e) {
            return e == 2;
        });

        return pairs.length == 1;
    };

    return that;
};

var HighCard = function () {
    this.validate = function (hand) {
        return "high-card";
    }
};

var AbstractCounter = function () {
    this.getSumValues = function (ranks) {
        var counts = [];
        for (var i = 0; i < ranks.length; i++) {
            var num = ranks[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        return counts;
    };
};
