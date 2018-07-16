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
            _this.numStacks = 8;
            return _this;
        }
        SolitaireGame.prototype.init = function (gameId) {
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
            this.curWord = new Wordily.Stack(this, "currentWord", Wordily.StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.curWord.onCardTapped.add(this.currentWordCardTapped, this);
            for (var iStack = 0; iStack < this.numStacks; iStack++) {
                var s = new Wordily.Stack(this, "stack " + iStack, Wordily.StackOrientation.VerticalStack, (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.curWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }
            this.deckRemaining = new Wordily.Stack(this, "deck", Wordily.StackOrientation.Deck, this.stacks[this.numStacks - 1].left, this.curWord.top, Wordily.Deck.CreateDeck(true, false, 4));
            for (var i = 0; i < 4; i++) {
                for (var s = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (var s = 0; s < this.numStacks; s++) {
                var c = this.deckRemaining.removeTopCard();
                c.isFaceUp = true;
                c.isSelectable = true;
                this.stacks[s].addCard(c);
            }
            this.scoreTitleText = this.add.text(this.stacks[0].left + Wordily.Game.DefaultCardWidth / 2, this.playingArea.top + 40, "Score", { font: "32px cutive", fill: "white", align: "center" });
            this.scoreTitleText.anchor.setTo(0.5, 0);
            this.scoreText = this.add.text(this.stacks[0].left + Wordily.Game.DefaultCardWidth / 2, this.scoreTitleText.bottom + 20, "0", { font: "32px cutive", fill: "white", align: "center" });
            this.scoreText.anchor.setTo(0.5, 0);
        };
        SolitaireGame.prototype.currentWordCardTapped = function (stack, card, doubleTapped) {
            var c = stack.removeCard(card);
            c.prevStack.addCard(c);
        };
        SolitaireGame.prototype.stackCardTapped = function (stack, card, doubleTapped) {
            console.debug(stack.name + " got a card click " + card.name);
            var c = stack.removeCard(card);
            this.curWord.addCard(c);
        };
        SolitaireGame.prototype.update = function () {
            if (this.curWord.length == 0) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }
        };
        SolitaireGame.prototype.startGame = function () {
        };
        SolitaireGame.stackOffsetHorizontal = 10;
        SolitaireGame.stackOffsetVertical = 20;
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=solitaireGame.js.map