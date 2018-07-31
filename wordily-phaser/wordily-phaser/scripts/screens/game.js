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
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            if (Game._instance) {
                throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
            }
            var pixelW = window.innerWidth * window.devicePixelRatio;
            var pixelH = window.innerHeight * window.devicePixelRatio;
            _this = _super.call(this, 1280, 720, Phaser.CANVAS, 'content') || this;
            _this.state.add('Boot', Wordily.Boot, false);
            _this.state.add('SplashScreen', Wordily.SplashScreen, false);
            _this.state.add('MainMenu', Wordily.MainMenu, false);
            _this.state.add('Solitaire', Wordily.SolitaireGame, false);
            _this.state.add('MultiplayerLobby', Wordily.MultiplayerLobby, false);
            _this.state.add('MultiplayerGame', Wordily.MultiplayerGame, false);
            _this.state.start('Boot');
            PlayFab.settings.titleId = "9CB1";
            Game._instance = _this;
            return _this;
        }
        Object.defineProperty(Game, "AnonymousUser", {
            get: function () {
                var user = localStorage.anonymousUser;
                if (!user) {
                    localStorage.anonymousUser = Wordily.Guid.newGuid();
                }
                return localStorage.anonymousUser;
            },
            enumerable: true,
            configurable: true
        });
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
        Game.LoadWords = function () {
            if (Game._validWords.length == 0) {
                for (var c = 'A'.charCodeAt(0); c <= +'Z'.charCodeAt(0); c++) {
                    var words = Game.getInstance().cache.getJSON('validWords-' + String.fromCharCode(c));
                    this._validWords.push(words);
                }
            }
        };
        Game.checkWord = function (wordToCheck) {
            Game.LoadWords();
            if (wordToCheck.length < 2) {
                return false;
            }
            wordToCheck = wordToCheck.toLowerCase();
            var firstLetter = wordToCheck.charAt(0);
            if (wordToCheck.indexOf("?") != -1) {
                var l = wordToCheck.indexOf("?");
                wordToCheck = wordToCheck.replace("?", ".");
                var regEx = new RegExp("^" + wordToCheck + "$");
                for (; l < this._validWords.length; l++) {
                    for (var i = 0; i < this._validWords[l].length; i++) {
                        if (regEx.test(this._validWords[l][i])) {
                            console.log('found ' + this._validWords[l][i] + ' to match ' + wordToCheck);
                            return true;
                        }
                    }
                }
                return false;
            }
            else {
                var index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
                return (Game._validWords[index].indexOf(wordToCheck) != -1);
            }
        };
        Game.initializeFacebookInstantGame = function () {
            Game.isFacebookInstantGame = true;
            Game.FacebookId = FBInstant.player.getID();
            Game.FacebookDisplayName = FBInstant.player.getName();
            Game.FacebookPhoto = FBInstant.player.getPhoto();
            FBInstant.player.getSignedPlayerInfoAsync(Game.FacebookId).then(function (result) {
                Game.FacebookSignature = result.getSignature();
            });
        };
        Game.ScaleFactor = 0.72;
        Game.BaseCardWidth = 187;
        Game.BaseCardHeight = 225;
        Game.isFacebookInstantGame = false;
        Game.isDebug = false;
        Game._validWords = [];
        return Game;
    }(Phaser.Game));
    Wordily.Game = Game;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=game.js.map