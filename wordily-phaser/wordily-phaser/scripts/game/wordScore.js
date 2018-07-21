var Wordily;
(function (Wordily) {
    var WordScore = /** @class */ (function () {
        function WordScore(word, baseScore) {
            this.word = word;
            this.baseScore = baseScore;
            this.validWord = baseScore >= 0;
        }
        Object.defineProperty(WordScore.prototype, "bonus", {
            get: function () {
                if (!this.validWord) {
                    return 0;
                }
                if (this.word.length <= 3) {
                    return 0;
                }
                else {
                    if (this.word.length <= 5) {
                        return 5 * (this.word.length - 3);
                    }
                    else {
                        return 10 * (this.word.length - 5) + 5;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WordScore.prototype, "totalScore", {
            get: function () {
                return this.baseScore + this.bonus;
            },
            enumerable: true,
            configurable: true
        });
        return WordScore;
    }());
    Wordily.WordScore = WordScore;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=wordScore.js.map