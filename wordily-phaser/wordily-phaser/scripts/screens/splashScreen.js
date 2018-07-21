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
    var SplashScreen = /** @class */ (function (_super) {
        __extends(SplashScreen, _super);
        function SplashScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplashScreen.prototype.preload = function () {
            // load what's needed for the loading screen
            this.background = this.add.tileSprite(0, 0, 1280, 720, 'background');
            this.cardTitleGroup = this.add.group();
            this.cardW = new Wordily.Card(-1, "W", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardO = new Wordily.Card(-1, "O", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardR = new Wordily.Card(-1, "R", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardD = new Wordily.Card(-1, "D", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardI = new Wordily.Card(-1, "I", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker = new Wordily.Card(-1, "JOKER", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker2 = new Wordily.Card(-1, "JOKER", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardLY = new Wordily.Card(-1, "LY", true, 0, this.world.width, this.world.height, this.cardTitleGroup);
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
            // start loading all the words
            for (var c = 'A'.charCodeAt(0); c <= +'Z'.charCodeAt(0); c++) {
                this.game.load.json('validWords-' + String.fromCharCode(c), 'assets/validwords/' + String.fromCharCode(c) + '-words.json');
            }
        };
        SplashScreen.prototype.create = function () {
            var showSplash = !Wordily.Game.isDebug;
            var delay = 250;
            var duration = 500;
            if (showSplash) {
                var constSeperation = Wordily.Game.DefaultCardWidth + 10;
                var tweenW = this.add.tween(this.cardW).to({ x: this.world.centerX - (constSeperation * 3.5) }, duration, Phaser.Easing.Linear.None, true);
                var tweenO = this.add.tween(this.cardO).to({ x: this.world.centerX - (constSeperation * 2.5) }, duration, Phaser.Easing.Linear.None, true, delay);
                var tweenR = this.add.tween(this.cardR).to({ x: this.world.centerX - (constSeperation * 1.5) }, duration, Phaser.Easing.Linear.None, true, delay * 2);
                var tweenD = this.add.tween(this.cardD).to({ x: this.world.centerX - (constSeperation * .5) }, duration, Phaser.Easing.Linear.None, true, delay * 3);
                var tweenI = this.add.tween(this.cardI).to({ x: this.world.centerX + (constSeperation * .5) }, duration, Phaser.Easing.Linear.None, true, delay * 4);
                var tweenJoker = this.add.tween(this.cardJoker).to({ x: this.world.centerX + (constSeperation * 1.5) }, duration, Phaser.Easing.Linear.None, true, delay * 5);
                var tweenJoker2 = this.add.tween(this.cardJoker2).to({ x: this.world.centerX + (constSeperation * 2.5) }, duration, Phaser.Easing.Linear.None, true, delay * 6);
                var tweenJokerAway = this.add.tween(this.cardJoker).to({ y: this.world.height * 2 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 9);
                var tweenJoker2Away = this.add.tween(this.cardJoker2).to({ y: this.world.height * 2 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 9);
                var tweenLY = this.add.tween(this.cardLY).to({ x: this.world.centerX + (constSeperation * 1.5), y: this.world.centerY - 90 }, duration, Phaser.Easing.Linear.None, true, delay * 10);
                var tweenCardsTop = this.add.tween(this.cardTitleGroup).to({ x: "+80", y: -200 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 10);
                tweenCardsTop.onComplete.add(this.startMainMenu, this);
            }
            else {
                this.startMainMenu();
            }
        };
        SplashScreen.prototype.shutdown = function () {
            this.cardTitleGroup.destroy(true);
        };
        SplashScreen.prototype.startMainMenu = function () {
            this.cardTitleGroup.destroy(true, true);
            //this.game.state.start('MainMenu', true, false);
            this.game.state.start('Solitaire', true, false);
        };
        return SplashScreen;
    }(Phaser.State));
    Wordily.SplashScreen = SplashScreen;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=splashScreen.js.map