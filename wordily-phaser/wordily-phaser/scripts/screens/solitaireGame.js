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
            _this.numStacks = 7;
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
            this.playingArea = this.add.sprite(this.world.centerX, 120, 'playingArea');
            this.playingArea.anchor.setTo(0.5, 0.5);
            this.playingArea.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.curWord = new Wordily.Stack(this, "currentWord", Wordily.StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            var marginForStacks = (this.world.width - ((Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * this.numStacks) + SolitaireGame.stackOffsetHorizontal) / 2;
            console.debug("margin: " + marginForStacks + " default width:" + Wordily.Game.DefaultCardWidth);
            for (var iStack = 0; iStack < this.numStacks; iStack++) {
                var s = new Wordily.Stack(this, "stack " + iStack, Wordily.StackOrientation.VerticalStack, (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.world.bottom - Wordily.Game.DefaultCardHeight - (SolitaireGame.stackOffsetVertical));
                this.stacks.push(s);
            }
            this.stacks[3].addCard(new Wordily.Card("A"));
            this.curWord.addCard(new Wordily.Card("W"));
            this.curWord.addCard(new Wordily.Card("O"));
            this.curWord.addCard(new Wordily.Card("JOKER"));
            this.curWord.addCard(new Wordily.Card("D"));
        };
        SolitaireGame.prototype.startGame = function () {
        };
        SolitaireGame.stackOffsetHorizontal = 25;
        SolitaireGame.stackOffsetVertical = 20;
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=solitaireGame.js.map