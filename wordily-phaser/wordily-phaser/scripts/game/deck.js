var Wordily;
(function (Wordily) {
    var Deck = /** @class */ (function () {
        function Deck() {
        }
        Deck.CreateDeck = function (fShuffled, fShuffleSeed, isFaceUp, numJokers, deckName) {
            if (fShuffled === void 0) { fShuffled = true; }
            if (fShuffleSeed === void 0) { fShuffleSeed = -1; }
            if (isFaceUp === void 0) { isFaceUp = false; }
            if (numJokers === void 0) { numJokers = 0; }
            var cards = [];
            var basicDeck = JSON.stringify(Wordily.Game.getInstance().cache.getJSON(deckName));
            console.log("deck data: " + basicDeck);
            var deckData = JSON.parse(basicDeck);
            for (var num = 0; num < deckData.length; num++) {
                var c = deckData[num];
                for (var i = 0; i < c["count"]; i++) {
                    var newCard = new Wordily.Card(-1, c["name"], isFaceUp, c["value"]);
                    cards.push(newCard);
                }
            }
            for (var j = 0; j < numJokers; j++) {
                var newJoker = new Wordily.Card(-1, "JOKER", isFaceUp, 0);
                cards.push(newJoker);
            }
            if (fShuffled) {
                var rng = new Wordily.Prando(fShuffleSeed);
                // shuffle the deck;
                var c = void 0;
                for (var i = 0; i < cards.length; i++) {
                    var rnd = rng.nextInt(0, cards.length - 1);
                    c = cards[i];
                    cards[i] = cards[rnd];
                    cards[rnd] = c;
                }
            }
            console.log("deck created with " + cards.length + " cards");
            return cards;
        };
        return Deck;
    }());
    Wordily.Deck = Deck;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=deck.js.map