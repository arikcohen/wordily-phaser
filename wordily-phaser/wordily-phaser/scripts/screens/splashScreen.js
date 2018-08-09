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
            var constSeperation = Wordily.Game.DefaultCardWidth + 10;
            // load what's needed for the loading screen
            this.background = this.add.tileSprite(0, 0, 1280, 720, 'background');
            this.cardTitleGroup = this.add.group();
            this.cardTitleGroup.x = this.world.centerX - constSeperation * 3.5;
            this.cardTitleGroup.y = this.world.centerY - Wordily.Game.DefaultCardHeight;
            this.cardW = new Wordily.Card(-1, "W", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardO = new Wordily.Card(-1, "O", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardR = new Wordily.Card(-1, "R", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardD = new Wordily.Card(-1, "D", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardI = new Wordily.Card(-1, "I", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardJoker = new Wordily.Card(-1, "JOKER", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardJoker2 = new Wordily.Card(-1, "JOKER", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardLY = new Wordily.Card(-1, "LY", true, 0, this.world.centerX, this.world.height + 400, this.cardTitleGroup);
            // start loading all the words
            for (var c = 'A'.charCodeAt(0); c <= +'Z'.charCodeAt(0); c++) {
                this.game.load.json('validWords-' + String.fromCharCode(c), 'assets/validwords/' + String.fromCharCode(c) + '-words.json');
            }
        };
        SplashScreen.prototype.create = function () {
            var showSplash = false;
            var delay = (showSplash) ? 250 : 0;
            var duration = (showSplash) ? 400 : 0;
            console.log("duration: " + duration + " delay: " + delay);
            var constSeperation = Wordily.Game.DefaultCardWidth + 10;
            var tweenW = this.add.tween(this.cardW).to({ x: 0, y: 0 }, duration, Phaser.Easing.Linear.None, true);
            var tweenO = this.add.tween(this.cardO).to({ x: constSeperation, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
            var tweenR = this.add.tween(this.cardR).to({ x: constSeperation * 2, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 2);
            var tweenD = this.add.tween(this.cardD).to({ x: constSeperation * 3, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 3);
            var tweenI = this.add.tween(this.cardI).to({ x: constSeperation * 4, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 4);
            var tweenJoker = this.add.tween(this.cardJoker).to({ x: constSeperation * 5, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 5);
            var tweenJoker2 = this.add.tween(this.cardJoker2).to({ x: constSeperation * 6, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 6);
            var tweenJokerAway = this.add.tween(this.cardJoker).to({ alpha: 0 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 7);
            var tweenJoker2Away = this.add.tween(this.cardJoker2).to({ alpha: 0 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 7);
            var tweenLY = this.add.tween(this.cardLY).to({ x: constSeperation * 5, y: 0 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 7);
            tweenLY.onComplete.add(function () {
                this.finalAnimation(duration);
            }, this);
            Wordily.Online.login();
        };
        SplashScreen.prototype.finalAnimation = function (duration) {
            if (duration === void 0) { duration = 400; }
            console.log("foo " + duration);
            var constSeperation = Wordily.Game.DefaultCardWidth + 10;
            var tweenCardsTop = this.add.tween(this.cardTitleGroup).to({ x: this.world.centerX - 1.5 * constSeperation, y: 20 }, duration * 2, Phaser.Easing.Linear.None, true);
            var tweenCardsScale = this.add.tween(this.cardTitleGroup.scale).to({ x: 0.5, y: 0.5 }, duration * 2, Phaser.Easing.Linear.None, true);
            tweenCardsTop.onComplete.add(this.startMainMenu, this);
        };
        SplashScreen.prototype.shutdown = function () {
            this.cardTitleGroup.destroy(true);
        };
        SplashScreen.prototype.startMainMenu = function () {
            while (!Wordily.Online.CurrentPlayer.haveProfileData) {
            }
            this.game.state.start('MainMenu', true, false);
        };
        return SplashScreen;
    }(Phaser.State));
    Wordily.SplashScreen = SplashScreen;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=splashScreen.js.map