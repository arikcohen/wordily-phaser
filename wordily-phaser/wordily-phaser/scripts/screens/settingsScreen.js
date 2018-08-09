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
    var SettingsScreen = /** @class */ (function (_super) {
        __extends(SettingsScreen, _super);
        function SettingsScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SettingsScreen.prototype.init = function () {
        };
        SettingsScreen.prototype.preload = function () {
            this.load.image('playfab', 'assets/settings/playfab.png');
            this.load.image('user_avatar', Wordily.Online.CurrentPlayer.AvatarURL);
            this.load.image('exit', 'assets/gameplay/exit.png');
        };
        SettingsScreen.prototype.create = function () {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            var settingsTitleTextStyle = { font: "48px cutive", fill: "#ff6d21", align: "center", shadowColor: "black", shadowOffsetX: 4, shadowOffsetY: 4 };
            var labelTextStyle = { font: "32px cutive", fill: "#ff6d21", align: "left", shadowColor: "black", shadowOffsetX: 2, shadowOffsetY: 2 };
            var basicTextStyle = { font: "32px cutive", fill: "white", align: "left" };
            this.cardTitleGroup = this.add.group();
            var constSeperation = Wordily.Game.DefaultCardWidth + 20;
            this.cardW = new Wordily.Card(-1, "W", true, 0, 0, 0, this.cardTitleGroup, this);
            this.cardO = new Wordily.Card(-1, "O", true, 0, constSeperation * 1, 0, this.cardTitleGroup, this);
            this.cardR = new Wordily.Card(-1, "R", true, 0, constSeperation * 2, 0, this.cardTitleGroup, this);
            this.cardD = new Wordily.Card(-1, "D", true, 0, constSeperation * 3, 0, this.cardTitleGroup, this);
            this.cardI = new Wordily.Card(-1, "I", true, 0, constSeperation * 4, 0, this.cardTitleGroup, this);
            this.cardLY = new Wordily.Card(-1, "LY", true, 0, constSeperation * 5, 0, this.cardTitleGroup, this);
            this.cardTitleGroup.scale.setTo(0.5, 0.5);
            this.cardTitleGroup.x = this.world.centerX - this.cardTitleGroup.width / 2;
            this.cardTitleGroup.y = 20;
            //this.settingsTitle = this.add.text(this.world.centerX, this.cardTitleGroup.bottom + 50, "Settings", settingsTitleTextStyle);
            //this.settingsTitle.anchor.setTo(0.5, 0);
            this.labelName = this.add.text(this.world.centerX - 10, this.cardTitleGroup.bottom + 50, "Name:", labelTextStyle);
            this.labelName.anchor.setTo(1, 0);
            this.displayName = this.add.text(this.labelName.right + 20, this.labelName.y, Wordily.Online.CurrentPlayer.DisplayName, basicTextStyle);
            this.avatar = this.add.sprite(this.labelName.right + 20, this.labelName.bottom + 20, 'user_avatar');
            this.avatar.height = 100;
            this.avatar.width = 100;
            this.labelPhoto = this.add.text(this.world.centerX - 10, this.avatar.centerY, "Photo:", labelTextStyle);
            this.labelPhoto.anchor.setTo(1, 0.5);
            var labelPlayerId = this.add.text(this.world.centerX - 10, this.avatar.bottom + 20, "PlayerId:", labelTextStyle);
            labelPlayerId.anchor.setTo(1, 0);
            var displayPlayerId = this.add.text(labelPlayerId.right + 20, labelPlayerId.y, Wordily.Online.CurrentPlayer.PlayFabId, basicTextStyle);
            var labelFBPlayerId = this.add.text(this.world.centerX - 10, displayPlayerId.bottom + 20, "Facebook PlayerId:", labelTextStyle);
            labelFBPlayerId.anchor.setTo(1, 0);
            var displayFBPlayerId = this.add.text(labelFBPlayerId.right + 20, labelFBPlayerId.y, Wordily.Game.FacebookId, basicTextStyle);
            this.exit = this.add.sprite(this.world.right - 10, 10, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 50;
            this.exit.height = 50;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.switchToMainMenu, this);
            this.playfabLogo = this.add.sprite(this.world.centerX, this.world.bottom - 50, 'playfab');
            this.playfabLogo.anchor.setTo(0.5, 1);
        };
        SettingsScreen.prototype.switchToMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return SettingsScreen;
    }(Phaser.State));
    Wordily.SettingsScreen = SettingsScreen;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=settingsScreen.js.map