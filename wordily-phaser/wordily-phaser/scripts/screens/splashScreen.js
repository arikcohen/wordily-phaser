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
            this.cardW = new Wordily.Card("W", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardO = new Wordily.Card("O", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardR = new Wordily.Card("R", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardD = new Wordily.Card("D", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardI = new Wordily.Card("I", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker = new Wordily.Card("JOKER", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker2 = new Wordily.Card("JOKER", true, null, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardLY = new Wordily.Card("LY", true, null, this.world.width, this.world.height, this.cardTitleGroup);
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
        };
        SplashScreen.prototype.create = function () {
            var showSplash = false;
            if (showSplash) {
                var constSeperation = Wordily.Game.DefaultCardWidth + 10;
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
        SplashScreen.prototype.shutdown = function () {
            this.cardTitleGroup.destroy(true);
        };
        SplashScreen.prototype.startMainMenu = function () {
            this.cardTitleGroup.destroy(true, true);
            this.game.state.start('MainMenu', true, false);
        };
        return SplashScreen;
    }(Phaser.State));
    Wordily.SplashScreen = SplashScreen;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=splashScreen.js.map