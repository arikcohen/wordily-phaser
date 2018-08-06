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
    var MultiplayerScreen = /** @class */ (function (_super) {
        __extends(MultiplayerScreen, _super);
        function MultiplayerScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiplayerScreen.prototype.init = function (id) {
            this.board = new MultiplayerBoard(id);
        };
        MultiplayerScreen.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
        };
        return MultiplayerScreen;
    }(Phaser.State));
    Wordily.MultiplayerScreen = MultiplayerScreen;
    var MultiplayerBoard = /** @class */ (function () {
        function MultiplayerBoard(gameId) {
            this.isGameStarted = false;
            this.gameId = gameId;
            this.gameDeck = Wordily.Deck.CreateDeck(true, gameId, false, 0, 'deck-full');
        }
        MultiplayerBoard.prototype.toString = function () {
            return JSON.stringify(this);
        };
        return MultiplayerBoard;
    }());
    var MultiplayerPlayer = /** @class */ (function () {
        function MultiplayerPlayer() {
            this.cardsInHand = [];
            this.localHand = [];
        }
        return MultiplayerPlayer;
    }());
})(Wordily || (Wordily = {}));
//# sourceMappingURL=multiplayerGame.js.map