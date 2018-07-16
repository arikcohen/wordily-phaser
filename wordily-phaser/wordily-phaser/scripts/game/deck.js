var Wordily;
(function (Wordily) {
    var Deck = /** @class */ (function () {
        function Deck() {
        }
        Deck.CreateDeck = function (fShuffled, isFaceUp, numJokers, gameDeckData) {
            if (fShuffled === void 0) { fShuffled = true; }
            if (isFaceUp === void 0) { isFaceUp = false; }
            if (numJokers === void 0) { numJokers = 0; }
            var cards = [];
            var basicDeck = JSON.stringify(Wordily.Game.getInstance().cache.getJSON('baseDeckData'));
            console.log("deck data: " + basicDeck);
            var deckData = JSON.parse(basicDeck);
            for (var num = 0; num < deckData.length; num++) {
                var c = deckData[num];
                for (var i = 0; i < c["count"]; i++) {
                    var newCard = new Wordily.Card(c["name"], isFaceUp, c["value"]);
                    cards.push(newCard);
                }
            }
            for (var j = 0; j < numJokers; j++) {
                var newJoker = new Wordily.Card("JOKER", isFaceUp, 0);
                cards.push(newJoker);
            }
            if (fShuffled) {
                // shuffle the deck;
                var c = void 0;
                for (var i = 0; i < cards.length; i++) {
                    var rnd = Math.floor(Math.random() * cards.length);
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