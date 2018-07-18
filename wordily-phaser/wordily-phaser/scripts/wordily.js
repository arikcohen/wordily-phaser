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
    var ExtendedState = /** @class */ (function (_super) {
        __extends(ExtendedState, _super);
        function ExtendedState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ExtendedState.prototype.init = function () {
            this.spriteGroup = this.add.group();
        };
        return ExtendedState;
    }(Phaser.State));
    Wordily.ExtendedState = ExtendedState;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            if (Game._instance) {
                throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
            }
            _this = _super.call(this, 1280, 720, Phaser.AUTO, 'content') || this;
            _this.state.add('Boot', Wordily.Boot, false);
            _this.state.add('TestScreen', Wordily.TestScreen, false);
            _this.state.add('SplashScreen', Wordily.SplashScreen, false);
            _this.state.add('MainMenu', Wordily.MainMenu, false);
            _this.state.add('Solitaire', Wordily.SolitaireGame, false);
            _this.state.start('Boot');
            Game._instance = _this;
            return _this;
        }
        Object.defineProperty(Game, "DefaultCardWidth", {
            get: function () {
                return Game.BaseCardWidth * Game.ScaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game, "DefaultCardHeight", {
            get: function () {
                return Game.BaseCardHeight * Game.ScaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Game.getInstance = function () {
            return Game._instance;
        };
        Game.ScaleFactor = 0.75;
        Game.BaseCardWidth = 188;
        Game.BaseCardHeight = 225;
        return Game;
    }(Phaser.Game));
    Wordily.Game = Game;
    window.onload = function () {
        var activeGame = new Game();
    };
})(Wordily || (Wordily = {}));
//# sourceMappingURL=wordily.js.map