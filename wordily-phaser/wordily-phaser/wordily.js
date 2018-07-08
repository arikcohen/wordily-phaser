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
    var Card = /** @class */ (function () {
        function Card(cardName, overrideValue, x, y, group) {
            this._x = 0;
            this._y = 0;
            this._isSelected = false;
            this._isFaceUp = true;
            this._game = Wordily.Game.getInstance();
            this._scaleFactor = Wordily.Game.ScaleFactor;
            this.name = cardName;
            if (overrideValue) {
                this.value = overrideValue;
            }
            else {
                this.value = 2;
            }
            if (x) {
                this._x = x;
            }
            if (y) {
                this._y = y;
            }
            //this.isSelected = false;
            this.cardFront = this._game.add.sprite(this.x, this.y, "cards", this.name, group);
            this.cardFront.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.cardBack = this._game.add.sprite(this.x, this.y, "cards", "cardBackground", group);
            this.cardBack.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.isFaceUp = true;
        }
        Object.defineProperty(Card.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
                this.cardFront.x = x;
                this.cardBack.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
                this.cardFront.y = y;
                this.cardBack.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "isFaceUp", {
            get: function () {
                return this._isFaceUp;
            },
            set: function (value) {
                this._isFaceUp = value;
                this.cardFront.renderable = this.isFaceUp;
                this.cardBack.renderable = !this.isFaceUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "scaleFactor", {
            get: function () {
                return this._scaleFactor;
            },
            set: function (value) {
                this._scaleFactor = value;
                this.cardBack.scale.setTo(value, value);
                this.cardFront.scale.setTo(value, value);
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.toString = function () {
            return this.name + "[" + this.value + "]";
        };
        return Card;
    }());
    Wordily.Card = Card;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var Deck = /** @class */ (function () {
        function Deck() {
        }
        return Deck;
    }());
    Wordily.Deck = Deck;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var Stack = /** @class */ (function () {
        function Stack() {
        }
        return Stack;
    }());
    Wordily.Stack = Stack;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var SolitaireGame = /** @class */ (function (_super) {
        __extends(SolitaireGame, _super);
        function SolitaireGame() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SolitaireGame.prototype.preload = function () {
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');
        };
        SolitaireGame.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.playingArea = this.add.sprite(this.world.centerX, 100, 'playingArea');
            this.playingArea.anchor.setTo(0.5, 0.5);
        };
        SolitaireGame.prototype.startGame = function () {
        };
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.cardTitleGroup = this.add.group();
            var wordilyStartX = 97.5 + 80;
            var wordilyStarty = 70;
            var constSeperation = 155;
            this.cardW = new Wordily.Card("W", null, wordilyStartX, wordilyStarty, this.cardTitleGroup);
            this.cardO = new Wordily.Card("O", null, wordilyStartX + constSeperation * 1, wordilyStarty, this.cardTitleGroup);
            this.cardR = new Wordily.Card("R", null, wordilyStartX + constSeperation * 2, wordilyStarty, this.cardTitleGroup);
            this.cardD = new Wordily.Card("D", null, wordilyStartX + constSeperation * 3, wordilyStarty, this.cardTitleGroup);
            this.cardI = new Wordily.Card("I", null, wordilyStartX + constSeperation * 4, wordilyStarty, this.cardTitleGroup);
            this.cardLY = new Wordily.Card("LY", null, wordilyStartX + constSeperation * 5, wordilyStarty, this.cardTitleGroup);
            this.solitaire = this.add.sprite(this.world.width / 3, this.world.centerY, "start_solitaire");
            this.solitaire.anchor.setTo(0.5, 0.5);
            this.solitaire.inputEnabled = true;
            this.solitaire.events.onInputDown.addOnce(this.startSolitaireGame);
            this.multiplayer = this.add.sprite(this.world.width / 3 * 2, this.world.centerY, "start_multiplayer");
            this.multiplayer.anchor.setTo(0.5, 0.5);
            this.multiplayer.inputEnabled = true;
            this.multiplayer.events.onInputDown.addOnce(this.startMultiplayerGame);
        };
        MainMenu.prototype.startSolitaireGame = function () {
            alert('foo');
            this.game.state.start('Solitaire', true, false);
        };
        MainMenu.prototype.startMultiplayerGame = function () {
            alert('no muliplayer yet');
        };
        return MainMenu;
    }(Phaser.State));
    Wordily.MainMenu = MainMenu;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var SplashScreen = /** @class */ (function (_super) {
        __extends(SplashScreen, _super);
        function SplashScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplashScreen.prototype.preload = function () {
            // load what's needed for the loading screen
            this.background = this.add.tileSprite(0, 0, 1280, 720, 'background');
            this.cardTitleGroup = this.add.group();
            this.cardW = new Wordily.Card("W", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardO = new Wordily.Card("O", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardR = new Wordily.Card("R", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardD = new Wordily.Card("D", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardI = new Wordily.Card("I", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker = new Wordily.Card("JOKER", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker2 = new Wordily.Card("JOKER", null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardLY = new Wordily.Card("LY", null, this.world.width, this.world.height, this.cardTitleGroup);
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
        };
        SplashScreen.prototype.create = function () {
            var skipSplash = true;
            if (!skipSplash) {
                var constSeperation = 155;
                var tweenW = this.add.tween(this.cardW).to({ x: this.world.centerX - (constSeperation * 3.5) }, 750, Phaser.Easing.Linear.None, true);
                var tweenO = this.add.tween(this.cardO).to({ x: this.world.centerX - (constSeperation * 2.5) }, 750, Phaser.Easing.Linear.None, true, 250);
                var tweenR = this.add.tween(this.cardR).to({ x: this.world.centerX - (constSeperation * 1.5) }, 750, Phaser.Easing.Linear.None, true, 500);
                var tweenD = this.add.tween(this.cardD).to({ x: this.world.centerX - (constSeperation * .5) }, 750, Phaser.Easing.Linear.None, true, 750);
                var tweenI = this.add.tween(this.cardI).to({ x: this.world.centerX + (constSeperation * .5) }, 750, Phaser.Easing.Linear.None, true, 1250);
                var tweenJoker = this.add.tween(this.cardJoker).to({ x: this.world.centerX + (constSeperation * 1.5) }, 750, Phaser.Easing.Linear.None, true, 1500);
                var tweenJoker2 = this.add.tween(this.cardJoker2).to({ x: this.world.centerX + (constSeperation * 2.5) }, 750, Phaser.Easing.Linear.None, true, 1750);
                var tweenJokerAway = this.add.tween(this.cardJoker).to({ y: this.world.height * 2 }, 1500, Phaser.Easing.Linear.None, true, 2500);
                var tweenJoker2Away = this.add.tween(this.cardJoker2).to({ y: this.world.height * 2 }, 1500, Phaser.Easing.Linear.None, true, 2500);
                var tweenLY = this.add.tween(this.cardLY).to({ x: this.world.centerX + (constSeperation * 1.5), y: this.world.centerY - 90 }, 750, Phaser.Easing.Linear.None, true, 3250);
                var tweenCards = this.add.tween(this.cardTitleGroup).to({ x: "+80" }, 750, Phaser.Easing.Linear.None, true, 3250);
                var tweenCardsTop = this.add.tween(this.cardTitleGroup).to({ y: -200 }, 750, Phaser.Easing.Linear.None, true, 4000);
                tweenCardsTop.onComplete.add(this.startMainMenu, this);
            }
            else {
                this.startMainMenu();
            }
        };
        SplashScreen.prototype.startMainMenu = function () {
            console.debug(this.cardW.x.toString() + "," + this.cardW.y.toString());
            this.game.state.start('Solitaire', true, false);
        };
        return SplashScreen;
    }(Phaser.State));
    Wordily.SplashScreen = SplashScreen;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image('background', 'assets/tiledBackground.png');
            this.game.load.atlasJSONHash('cards', 'assets/deck/deck.png', 'assets/deck/deck.json');
            this.game.load.image('playingArea', 'assets/gameplay/playingArea.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
            }
            else {
                //  Same goes for mobile settings.
            }
            this.game.state.start('SplashScreen', true, false);
        };
        return Boot;
    }(Phaser.State));
    Wordily.Boot = Boot;
})(Wordily || (Wordily = {}));
var Wordily;
(function (Wordily) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            if (Game._instance) {
                throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
            }
            _this = _super.call(this, 1280, 720, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', Wordily.Boot, false);
            _this.state.add('SplashScreen', Wordily.SplashScreen, false);
            _this.state.add('MainMenu', Wordily.MainMenu, false);
            _this.state.add('Solitaire', Wordily.SolitaireGame, false);
            _this.state.start('Boot');
            Game._instance = _this;
            return _this;
        }
        Game.getInstance = function () {
            return Game._instance;
        };
        Game.ScaleFactor = 0.8;
        return Game;
    }(Phaser.Game));
    Wordily.Game = Game;
    window.onload = function () {
        var game = new Game();
    };
})(Wordily || (Wordily = {}));
//# sourceMappingURL=wordily.js.map