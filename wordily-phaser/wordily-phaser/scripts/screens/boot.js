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
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image('background', 'assets/tiledBackground.png');
            this.game.load.atlasJSONHash('cards', 'assets/deck/deck.png', 'assets/deck/deck.json');
            this.game.load.image('playingArea', 'assets/gameplay/playingArea.png');
            this.game.load.json('deck-full', 'assets/deck/full-deck-data.json');
            this.game.load.json('deck-solitaire', 'assets/deck/solitaire-deck-data.json');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.add.text(0, 0, "hack", { font: "1px cutive", fill: "#FFFFFF" });
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
//# sourceMappingURL=boot.js.map