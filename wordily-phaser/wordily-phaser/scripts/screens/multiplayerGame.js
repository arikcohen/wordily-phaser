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
        MultiplayerScreen.prototype.init = function (contextId) {
            var _this = this;
            console.log("initiailizing board for context [" + contextId + "]");
            this.board = new MultiplayerBoard(contextId, this);
            FBInstant.context.getPlayersAsync()
                .then(function (players) {
                _this.updatePlayers(players);
            })
                .catch(function (error) {
                console.log("error getting players: " + error);
            });
        };
        MultiplayerScreen.prototype.preload = function () {
            this.load.image('exit', 'assets/gameplay/exit.png');
        };
        MultiplayerScreen.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.exit = this.add.sprite(this.world.right, 0, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 100;
            this.exit.height = 100;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.switchToMainMenu, this);
            this.board.create();
        };
        MultiplayerScreen.prototype.updatePlayers = function (players) {
            console.log("got " + players.length + " players for context " + this.board.gameId);
            for (var i = 0; i < players.length; i++) {
                var p = {
                    DisplayName: players[i].getName(),
                    FacebookId: players[i].getID(),
                    Photo: players[i].getPhoto()
                };
                this.board.players.push(p);
            }
        };
        MultiplayerScreen.prototype.switchToMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return MultiplayerScreen;
    }(Phaser.State));
    Wordily.MultiplayerScreen = MultiplayerScreen;
    var MultiplayerBoard = /** @class */ (function () {
        function MultiplayerBoard(gameId, state) {
            this.isGameStarted = false;
            this.gameId = gameId;
            this.state = state;
            this.gameDeck = Wordily.Deck.CreateDeck(true, gameId, false, 0, 'deck-full');
            this.updateFromPlayFabSharedData();
        }
        MultiplayerBoard.prototype.toString = function () {
            return JSON.stringify(this);
        };
        MultiplayerBoard.prototype.updateFromPlayFabSharedData = function () {
        };
        MultiplayerBoard.prototype.create = function () {
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