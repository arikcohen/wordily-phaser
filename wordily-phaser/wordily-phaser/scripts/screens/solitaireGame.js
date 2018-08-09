var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Wordily;
(function (Wordily) {
    var SolitaireGame = /** @class */ (function (_super) {
        __extends(SolitaireGame, _super);
        function SolitaireGame() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.stacks = [];
            _this.gameReported = false;
            _this.wordsPlayed = [];
            _this.numStacks = 8;
            _this.isGameRunning = false;
            _this._displayScore = 0;
            return _this;
        }
        Object.defineProperty(SolitaireGame.prototype, "score", {
            get: function () {
                var s = 0;
                this.wordsPlayed.forEach(function (wp) { return s += wp.totalScore; });
                return s;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SolitaireGame.prototype, "numErrors", {
            get: function () {
                var e = 0;
                this.wordsPlayed.forEach(function (wp) {
                    if (!wp.validWord) {
                        e++;
                    }
                });
                return e;
            },
            enumerable: true,
            configurable: true
        });
        SolitaireGame.prototype.init = function (gameId, gameType) {
            if (gameId === void 0) { gameId = Wordily.Guid.newGuid(); }
            if (gameType === void 0) { gameType = "Random"; }
            this.gameId = gameId;
            this.gameType = gameType;
            this.stacks = [];
            this.wordsPlayed = [];
            this.gameReported = false;
            this.isGameRunning = false;
            this._displayScore = 0;
        };
        SolitaireGame.prototype.preload = function () {
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');
            this.game.load.image('error', 'assets/gameplay/wordError.png');
            this.game.load.image('exit', 'assets/gameplay/exit.png');
            this.game.load.image('playAgain', 'assets/gameplay/playAgain.png');
            this.game.load.image('mainMenu', 'assets/gameplay/mainMenu.png');
        };
        SolitaireGame.prototype.create = function () {
            Wordily.Online.login();
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            var marginForStacks = (this.world.width - ((Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * this.numStacks) + SolitaireGame.stackOffsetHorizontal) / 2;
            this.scoreTitleText = this.add.text(this.world.centerX - 20, 60, "Score", { font: "32px cutive", fill: "yellow", align: "right" });
            this.scoreTitleText.anchor.setTo(1, 0.5);
            this.scoreText = this.add.text(this.world.centerX + 20, this.scoreTitleText.top, "0", { font: "32px cutive", fill: "white", align: "left" });
            this.playingArea = this.add.sprite(this.world.centerX, this.scoreText.bottom + 20, 'playingArea');
            this.playingArea.anchor.setTo(0.5, 0);
            this.playingArea.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.playingArea.width = (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * 5.5;
            this.submitWord = this.add.sprite(this.playingArea.right + 10, this.playingArea.centerY, 'submit');
            this.submitWord.anchor.setTo(0, 0.5);
            this.submitWord.events.onInputDown.add(this.submitWordClicked, this);
            this.currentWord = new Wordily.Stack(this, "currentWord", Wordily.StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.currentWord.onCardTapped.add(this.currentWordCardTapped, this);
            this.currentWord.renderBaseSlot = false;
            this.clear = this.add.sprite(this.playingArea.right, this.playingArea.top + 10, 'clear');
            this.clear.anchor.setTo(1, 0);
            this.clear.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.clear.events.onInputDown.add(this.clearCurrentWord, this);
            this.exit = this.add.sprite(this.world.right, 0, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 40;
            this.exit.height = 40;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.endGame, this);
            this.stackDiscard = new Wordily.Stack(this, "discard", Wordily.StackOrientation.Deck, 0 - Wordily.Game.DefaultCardWidth, this.currentWord.top);
            for (var iStack = 0; iStack < this.numStacks; iStack++) {
                var s = new Wordily.Stack(this, "stack " + iStack, Wordily.StackOrientation.VerticalStack, (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.currentWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }
            this.deckRemaining = new Wordily.Stack(this, "deck", Wordily.StackOrientation.Deck, this.stacks[0].left, this.currentWord.top, Wordily.Deck.CreateDeck(true, this.gameId, false, 2, 'deck-solitaire'), true);
            this.deckRemaining.onStackTapped.add(this.dealMoreCardsClicked, this);
            this.deckRemaining.renderBaseSlot = false;
            for (var i = 0; i < 4; i++) {
                for (var s = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (var s = 0; s < this.numStacks; s++) {
                var c = this.deckRemaining.removeTopCard();
                c.isSelectable = true;
                this.stacks[s].addCard(c, null, true, 300, 300 * s + 200, true);
            }
            this.wordErrorGroup = this.add.group(null, "errors");
            this.game.world.bringToTop(this.currentWord);
            this.isGameRunning = true;
        };
        SolitaireGame.prototype.currentWordCardTapped = function (stack, card, doubleTapped) {
            var c = stack.removeCard(card);
            if (c.prevStack)
                c.prevStack.addCard(c, null, true);
            else
                console.error("orphan card " + c.name + " id " + c.id);
        };
        SolitaireGame.prototype.stackCardTapped = function (stack, card, doubleTapped) {
            if (!this.isGameRunning)
                return;
            console.debug(stack.name + " got a card click " + card.name + " double: " + doubleTapped);
            if (doubleTapped) {
                for (var s = 0; s < this.numStacks; s++) {
                    if (this.stacks[s].length == 0) {
                        var c = stack.removeCard(card);
                        this.stacks[s].addCard(c, null, true);
                        stack.enableTopCard();
                        return;
                    }
                }
                // only do something if we have an empty stack to move to
            }
            else {
                var c = stack.removeCard(card);
                this.currentWord.addCard(c, null, true);
            }
        };
        SolitaireGame.prototype.dealMoreCardsClicked = function () {
            if (!this.isGameRunning)
                return;
            if (this.deckRemaining.length >= this.numStacks) {
                var delay = 0;
                if (this.currentWord.length > 0) {
                    //delay = 600;
                    console.debug("got here ");
                    this.clearCurrentWord();
                }
                for (var s = 0; s < this.numStacks; s++) {
                    if (this.stacks[s].length > 0) {
                        this.stacks[s].disableTopCard(false);
                        this.stacks[s].topCard.cardFlip();
                    }
                    var c = this.deckRemaining.removeTopCard();
                    this.stacks[s].addCard(c, null, true, 300, delay + 400, true);
                    this.stacks[s].enableTopCard(false);
                }
            }
        };
        SolitaireGame.prototype.clearCurrentWord = function () {
            while (this.currentWord.length > 0) {
                var c = this.currentWord.removeTopCard();
                c.prevStack.addCard(c, null, true);
            }
        };
        SolitaireGame.prototype.wordPlayed = function (wp) {
            var scoreString = wp.word;
            if (wp.validWord) {
                scoreString += "\n+" + wp.baseScore;
                if (wp.bonus > 0) {
                    scoreString += " + " + wp.bonus + " length bonus";
                }
            }
            else {
                scoreString += "\n" + wp.baseScore;
            }
            var wordScoreText = this.add.text(this.submitWord.centerX, this.submitWord.centerY, scoreString, { font: "32px cutive", fill: wp.validWord ? "limegreen" : "red", align: "center" });
            wordScoreText.bringToTop();
            wordScoreText.anchor.setTo(0.5, 0.5);
            var tweenScoreAnimation = this.add.tween(wordScoreText).to({ x: this.scoreText.centerX, y: this.scoreText.centerY }, 1000, Phaser.Easing.Linear.None, false);
            tweenScoreAnimation.chain(this.add.tween(wordScoreText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None));
            tweenScoreAnimation.onComplete.add(this.finishWordScoreAnimation, this, 0, wp);
            tweenScoreAnimation.start();
        };
        SolitaireGame.prototype.finishWordScoreAnimation = function (text, tween, wp) {
            this.wordsPlayed.push(wp);
            text.destroy();
            if (this.numErrors == 3) {
                this.endGame();
            }
        };
        SolitaireGame.prototype.submitWordClicked = function () {
            if (!this.isGameRunning)
                return;
            var checkWord = this.currentWord.word;
            console.debug("checking word " + checkWord + " : " + Wordily.Game.checkWord(checkWord));
            if (Wordily.Game.checkWord(checkWord)) {
                var wordScore = new Wordily.WordScore(checkWord, this.currentWord.score);
                this.wordPlayed(wordScore);
                while (this.currentWord.length > 0) {
                    var c = this.currentWord.removeTopCard();
                    if (c.prevStack.length > 0) {
                        c.prevStack.enableTopCard(false);
                        c.prevStack.topCard.cardFlip();
                    }
                    this.stackDiscard.addCard(c, null, true);
                }
            }
            else {
                var wordScore = new Wordily.WordScore(checkWord, this.currentWord.score * -1);
                var error = this.add.sprite(this.scoreTitleText.left - 20 - (this.numErrors + 1) * 55, this.scoreTitleText.centerY, 'error', null);
                error.anchor.setTo(0, 0.5);
                error.width = 50;
                error.height = 50;
                this.wordPlayed(wordScore);
                this.clearCurrentWord();
            }
        };
        SolitaireGame.prototype.update = function () {
            if (this.currentWord.length < 2 || !this.isGameRunning) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }
            if (this.currentWord.length == 0 || !this.isGameRunning) {
                this.clear.alpha = 0.25;
                this.clear.inputEnabled = false;
            }
            else {
                this.clear.alpha = 1;
                this.clear.inputEnabled = true;
            }
            if (this.score > this._displayScore) {
                this._displayScore++;
            }
            if (this.score < this._displayScore) {
                this._displayScore--;
            }
            this.scoreText.text = this._displayScore.toLocaleString();
        };
        SolitaireGame.prototype.endGame = function () {
            if (this.wordsPlayed.length > 0) {
                this.isGameRunning = false;
                var wordsPlayed_1 = "";
                var wordsFailed_1 = "";
                this.wordsPlayed.forEach(function (w) { if (w.validWord) {
                    wordsPlayed_1 += w.word + "  ";
                }
                else {
                    wordsFailed_1 += w.word + "  ";
                } });
                this.wordsPlayed.sort(function (a, b) {
                    if (a.totalScore < b.totalScore)
                        return 1;
                    if (a.totalScore > b.totalScore)
                        return -1;
                    return 0;
                });
                if (!this.gameReported) {
                    Wordily.Online.submitSolitaireGameResult(this.gameId, this.score, this.wordsPlayed[0].word, this.wordsPlayed[0].totalScore);
                    this.gameReported = true;
                }
                var gameOverBackground = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
                gameOverBackground.alpha = .9;
                var text = this.add.text(this.world.centerX, this.playingArea.top, "Game Over", { font: "48px cutive", fill: "white", align: "center" });
                text.anchor.setTo(0.5, 0.5);
                var text1 = this.add.text(this.world.centerX - 20, text.bottom + 25, "Score", { font: "40px cutive", fill: "yellow", align: "center" });
                text1.anchor.setTo(1, 0);
                var text2 = this.add.text(this.world.centerX + 20, text1.top, this.score.toString(), { font: "40px cutive", fill: "white", align: "left" });
                text2.anchor.setTo(0, 0);
                var text3 = this.add.text(this.world.centerX - 20, text1.bottom + 5, "Best Word", { font: "32px cutive", fill: "yellow", align: "center" });
                text3.anchor.setTo(1, 0);
                var text4 = this.add.text(this.world.centerX + 20, text1.bottom + 5, this.wordsPlayed[0].word + " (" + this.wordsPlayed[0].totalScore + ")", { font: "32px cutive", fill: "white", align: "center" });
                text4.anchor.setTo(0, 0);
                var text5 = this.add.text(this.world.centerX - 20, text3.bottom + 5, "Words Played", { font: "32px cutive", fill: "yellow", align: "center" });
                text5.anchor.setTo(1, 0);
                var text6 = this.add.text(this.world.centerX + 20, text3.bottom + 5, wordsPlayed_1, { font: "32px cutive", fill: "white", align: "left", wordWrap: true, maxLines: 4 });
                text6.wordWrapWidth = this.world.width / 2 - 40;
                text6.anchor.setTo(0, 0);
                if (this.numErrors > 0) {
                    var text7 = this.add.text(this.world.centerX - 20, text6.bottom + 5, "Words Missed", { font: "32px cutive", fill: "yellow", align: "center" });
                    text7.anchor.setTo(1, 0);
                    var text8 = this.add.text(this.world.centerX + 20, text6.bottom + 5, wordsFailed_1, { font: "32px cutive", fill: "red", align: "left" });
                    text8.wordWrap = true;
                    text8.wordWrapWidth = this.world.width / 2 - 40;
                    text8.anchor.setTo(0, 0);
                }
                var playAgain = this.add.sprite(this.world.centerX - 290, this.world.height - 120, 'playAgain');
                playAgain.inputEnabled = true;
                playAgain.events.onInputDown.add(this.playAgainClicked, this);
                var mainMenu = this.add.sprite(this.world.centerX + 40, this.world.height - 120, 'mainMenu');
                mainMenu.inputEnabled = true;
                mainMenu.events.onInputDown.add(this.exitToMainMenu, this);
            }
            else {
                this.exitToMainMenu();
            }
        };
        SolitaireGame.prototype.shutdown = function () {
            this.stacks.forEach(function (s) { return s.destroy(true); });
        };
        SolitaireGame.prototype.playAgainClicked = function () {
            this.game.state.start('Solitaire', true);
        };
        SolitaireGame.prototype.exitToMainMenu = function () {
            this.game.state.start('MainMenu', true);
        };
        SolitaireGame.stackOffsetHorizontal = 10;
        SolitaireGame.stackOffsetVertical = 20;
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=solitaireGame.js.map