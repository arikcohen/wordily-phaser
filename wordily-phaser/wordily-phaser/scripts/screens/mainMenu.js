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
            this.cardW = new Wordily.Card("W", true, null, wordilyStartX, wordilyStarty, this.cardTitleGroup, this);
            this.cardO = new Wordily.Card("O", true, null, wordilyStartX + constSeperation * 1, wordilyStarty, this.cardTitleGroup, this);
            this.cardR = new Wordily.Card("R", true, null, wordilyStartX + constSeperation * 2, wordilyStarty, this.cardTitleGroup, this);
            this.cardD = new Wordily.Card("D", true, null, wordilyStartX + constSeperation * 3, wordilyStarty, this.cardTitleGroup, this);
            this.cardI = new Wordily.Card("I", true, null, wordilyStartX + constSeperation * 4, wordilyStarty, this.cardTitleGroup, this);
            this.cardLY = new Wordily.Card("LY", true, null, wordilyStartX + constSeperation * 5, wordilyStarty, this.cardTitleGroup, this);
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
//# sourceMappingURL=mainMenu.js.map