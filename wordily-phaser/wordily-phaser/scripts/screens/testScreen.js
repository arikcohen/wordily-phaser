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
    var TestScreen = /** @class */ (function (_super) {
        __extends(TestScreen, _super);
        function TestScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestScreen.prototype.init = function (gameId) {
        };
        TestScreen.prototype.preload = function () {
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');
        };
        TestScreen.prototype.create = function () {
            console.log("foo");
            this.stage.backgroundColor = "blue";
            this.spriteGroup = this.add.group();
            //this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');            
            this.group1 = this.add.group();
            this.group2 = this.add.group();
            this.playingArea = new Wordily.ExtendedCardSprite(this.game, 100, 20, 'cards', 'cardBackground', this.group1);
            this.c1 = new Wordily.Card(-1, "A", true, 2, 400, 200, this.group2, this);
            this.playingArea.scale.setTo(Wordily.Game.ScaleFactor, Wordily.Game.ScaleFactor);
            this.spriteGroup.add(this.playingArea);
            this.add.tween(this.group2).to({ x: 400, y: 150 }, 1000, null, true);
            this.solitaire = this.add.sprite(this.world.width / 3, this.world.centerY, "start_solitaire");
        };
        return TestScreen;
    }(Wordily.ExtendedState));
    Wordily.TestScreen = TestScreen;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=testScreen.js.map