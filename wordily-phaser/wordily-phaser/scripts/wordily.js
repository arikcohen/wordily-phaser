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
    var Card = /** @class */ (function (_super) {
        __extends(Card, _super);
        function Card(cardName, overrideValue, x, y, parent) {
            var _this = _super.call(this, Wordily.Game.getInstance(), parent, cardName, true, false, null) || this;
            _this._isSelected = false;
            _this._isFaceUp = true;
            _this._game = Wordily.Game.getInstance();
            _this._scaleFactor = Wordily.Game.ScaleFactor;
            _this.curStack = null;
            _this.prevStack = null;
            _this.name = cardName;
            _this.scale.setTo(_this.scaleFactor, _this.scaleFactor);
            if (overrideValue) {
                _this.value = overrideValue;
            }
            else {
                _this.value = 2;
            }
            if (x) {
                _this.x = x;
            }
            if (y) {
                _this.y = y;
            }
            //this.isSelected = false;
            _this.cardFront = _this.game.state.getCurrentState().add.sprite(0, 0, "cards", _this.name, _this);
            _this.cardBack = _this.game.state.getCurrentState().add.sprite(0, 0, "cards", "cardBackground", _this);
            _this.isFaceUp = true;
            return _this;
        }
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
                this.scale.setTo(this.scaleFactor, this.scaleFactor);
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.toString = function () {
            return this.name + "[" + this.value + "]";
        };
        return Card;
    }(Phaser.Group));
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
    var StackOrientation;
    (function (StackOrientation) {
        StackOrientation[StackOrientation["Deck"] = 0] = "Deck";
        StackOrientation[StackOrientation["Horizontal"] = 1] = "Horizontal";
        StackOrientation[StackOrientation["Vertical"] = 2] = "Vertical";
    })(StackOrientation = Wordily.StackOrientation || (Wordily.StackOrientation = {}));
    var Stack = /** @class */ (function (_super) {
        __extends(Stack, _super);
        function Stack(state, name, orientation, x, y) {
            var _this = _super.call(this, state.game, null, name, true, false, null) || this;
            _this.state = state;
            _this.orientation = orientation;
            _this.cards = [];
            if (x) {
                _this.x = x;
            }
            if (y) {
                _this.y = y;
            }
            //this.groupStack = state.add.group(null, name, true, false);            
            _this.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            _this.dropSlot = _this.state.add.sprite(0, 0, "cards", "card_Slot", _this);
            _this.state.add.text(0, 0, name, null, _this);
            _this.state.add.text(0, 100, "(" + _this.x + "," + _this.y + ")", null, _this);
            return _this;
        }
        Stack.prototype.update = function () {
            if (this.cards.length > 0) {
                this.dropSlot.renderable = false;
            }
            _super.prototype.update.call(this);
        };
        return Stack;
    }(Phaser.Group));
    Wordily.Stack = Stack;
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
            this.solitaire.events.onInputDown.addOnce(this.startSolitaireGame, this);
            this.multiplayer = this.add.sprite(this.world.width / 3 * 2, this.world.centerY, "start_multiplayer");
            this.multiplayer.anchor.setTo(0.5, 0.5);
            this.multiplayer.inputEnabled = true;
            this.multiplayer.events.onInputDown.addOnce(this.startMultiplayerGame, this);
        };
        MainMenu.prototype.startSolitaireGame = function () {
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
            this.curWord = new Wordily.Stack(this, "currentWord", Wordily.StackOrientation.Vertical, this.playingArea.left + 20, this.playingArea.top + 10);
            for (var iStack = 0; iStack < this.numStacks; iStack++) {
                var s = new Wordily.Stack(this, "stack " + iStack, Wordily.StackOrientation.Vertical, (Wordily.Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + SolitaireGame.stackOffsetHorizontal, this.world.bottom - Wordily.Game.DefaultCardHeight - (SolitaireGame.stackOffsetVertical));
                this.stacks.push(s);
            }
            this.stacks[3].cards.push(new Wordily.Card("A"));
        };
        SolitaireGame.prototype.startGame = function () {
        };
        SolitaireGame.stackOffsetHorizontal = 25;
        SolitaireGame.stackOffsetVertical = 20;
        return SolitaireGame;
    }(Phaser.State));
    Wordily.SolitaireGame = SolitaireGame;
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
            var skipSplash = false;
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
        SplashScreen.prototype.destroy = function () {
            this.cardTitleGroup.destroy(true);
        };
        SplashScreen.prototype.startMainMenu = function () {
            console.debug(this.cardW.x.toString() + "," + this.cardW.y.toString());
            this.cardTitleGroup.destroy(true, true);
            this.game.state.start('MainMenu', true, false);
        };
        return SplashScreen;
    }(Phaser.State));
    Wordily.SplashScreen = SplashScreen;
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
        Game.ScaleFactor = 0.8;
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