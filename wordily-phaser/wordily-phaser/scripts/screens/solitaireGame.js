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
            _this.score = 0;
            _this.gameReported = false;
            _this.numStacks = 8;
            return _this;
        }
        SolitaireGame.prototype.init = function (gameId) {
            if (gameId === void 0) { gameId = Wordily.Guid.newGuid(); }
            this.gameId = gameId;
        };
        SolitaireGame.prototype.preload = function () {
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');
        };
        SolitaireGame.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            var marginForStacks = (this.world.width - ((Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * this.numStacks) + SolitaireGame.stackOffsetHorizontal) / 2;
            this.playingArea = this.add.sprite(Wordily.Game.DefaultCardWidth + marginForStacks, 20, 'playingArea');
            this.playingArea.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.submitWord = this.add.sprite(this.playingArea.right + 10, this.playingArea.centerY, 'submit');
            this.submitWord.anchor.setTo(0, 0.5);
            this.submitWord.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.submitWord.events.onInputDown.add(this.submitWordClicked, this);
            this.currentWord = new Wordily.Stack(this, "currentWord", Wordily.StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.currentWord.onCardTapped.add(this.currentWordCardTapped, this);
            this.stackDiscard = new Wordily.Stack(this, "discard", Wordily.StackOrientation.Deck, 0 - Wordily.Game.DefaultCardWidth, this.currentWord.top);
            for (var iStack = 0; iStack < this.numStacks; iStack++) {
                var s = new Wordily.Stack(this, "stack " + iStack, Wordily.StackOrientation.VerticalStack, (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.currentWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }
            this.deckRemaining = new Wordily.Stack(this, "deck", Wordily.StackOrientation.Deck, this.stacks[this.numStacks - 1].left, this.currentWord.top, Wordily.Deck.CreateDeck(true, false, 4, 'deck-solitaire'), true);
            this.deckRemaining.onStackTapped.add(this.dealMoreCardsClicked, this);
            for (var i = 0; i < 4; i++) {
                for (var s = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (var s = 0; s < this.numStacks; s++) {
                var c = this.deckRemaining.removeTopCard();
                c.isFaceUp = true;
                c.isSelectable = true;
                this.stacks[s].addCard(c, null, true, 300, 300 * s);
            }
            this.scoreTitleText = this.add.text(this.stacks[0].left + Wordily.Game.DefaultCardWidth / 2, this.playingArea.top + 40, "Score", { font: "32px cutive", fill: "yellow", align: "center" });
            this.scoreTitleText.anchor.setTo(0.5, 0);
            this.scoreText = this.add.text(this.stacks[0].left + Wordily.Game.DefaultCardWidth / 2, this.scoreTitleText.bottom + 20, "0", { font: "32px cutive", fill: "white", align: "center" });
            this.scoreText.anchor.setTo(0.5, 0);
            this.game.world.bringToTop(this.currentWord);
            Wordily.Online.login();
        };
        SolitaireGame.prototype.currentWordCardTapped = function (stack, card, doubleTapped) {
            var c = stack.removeCard(card);
            c.prevStack.addCard(c, null, true);
        };
        SolitaireGame.prototype.stackCardTapped = function (stack, card, doubleTapped) {
            console.debug(stack.name + " got a card click " + card.name);
            var c = stack.removeCard(card);
            this.currentWord.addCard(c, null, true);
        };
        SolitaireGame.prototype.dealMoreCardsClicked = function () {
            if (this.deckRemaining.length >= this.numStacks) {
                this.clearCurrentWord();
                for (var s = 0; s < this.numStacks; s++) {
                    this.stacks[s].disableTopCard(true);
                    var c = this.deckRemaining.removeTopCard();
                    this.stacks[s].addCard(c, null, true, null, 300);
                    this.stacks[s].enableTopCard();
                }
            }
            else {
                this.endGame();
            }
        };
        SolitaireGame.prototype.clearCurrentWord = function () {
            while (this.currentWord.length > 0) {
                var c = this.currentWord.removeTopCard();
                c.prevStack.addCard(c, null, true);
            }
        };
        SolitaireGame.prototype.submitWordClicked = function () {
            var checkWord = this.currentWord.getWord();
            if (Wordily.Game.checkWord(checkWord)) {
                this.score += this.currentWord.getScore();
                while (this.currentWord.length > 0) {
                    var c = this.currentWord.removeTopCard();
                    c.prevStack.enableTopCard();
                    this.stackDiscard.addCard(c, null, true);
                }
            }
            else {
                this.score -= this.currentWord.getScore();
                this.clearCurrentWord();
            }
        };
        SolitaireGame.prototype.update = function () {
            if (this.currentWord.length < 2) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }
            if (this.deckRemaining.length < this.numStacks) {
            }
            this.scoreText.text = this.score.toString();
        };
        SolitaireGame.prototype.endGame = function () {
            if (!this.gameReported) {
                Wordily.Online.submitSolitaireGameResult(this.gameId, this.score, null, 0);
                this.gameReported = true;
            }
        };
        SolitaireGame.stackOffsetHorizontal = 10;
        SolitaireGame.stackOffsetVertical = 20;
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=solitaireGame.js.map