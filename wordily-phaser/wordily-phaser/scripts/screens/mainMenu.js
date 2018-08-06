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
        MainMenu.prototype.preload = function () {
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_daily', 'assets/mainmenu/daily.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
            if (Wordily.Game.isFacebookInstantGame) {
                this.load.image('user_avatar', Wordily.Game.FacebookPhoto);
            }
        };
        MainMenu.prototype.create = function () {
            Wordily.Online.login();
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.cardTitleGroup = this.add.group();
            var constSeperation = Wordily.Game.DefaultCardWidth + 20;
            this.cardW = new Wordily.Card(-1, "W", true, 0, 0, 0, this.cardTitleGroup, this);
            this.cardO = new Wordily.Card(-1, "O", true, 0, constSeperation * 1, 0, this.cardTitleGroup, this);
            this.cardR = new Wordily.Card(-1, "R", true, 0, constSeperation * 2, 0, this.cardTitleGroup, this);
            this.cardD = new Wordily.Card(-1, "D", true, 0, constSeperation * 3, 0, this.cardTitleGroup, this);
            this.cardI = new Wordily.Card(-1, "I", true, 0, constSeperation * 4, 0, this.cardTitleGroup, this);
            this.cardLY = new Wordily.Card(-1, "LY", true, 0, constSeperation * 5, 0, this.cardTitleGroup, this);
            this.cardTitleGroup.x = this.world.centerX - this.cardTitleGroup.width / 2;
            this.cardTitleGroup.y = 20;
            var buttonGroup = this.add.group();
            this.solitaire = this.add.sprite(0, 0, "start_solitaire", null, buttonGroup);
            this.solitaire.inputEnabled = true;
            this.solitaire.events.onInputDown.add(this.startSolitaireGame, this);
            this.dailySolitaire = this.add.sprite(this.solitaire.right + 35, 0, "start_daily", null, buttonGroup);
            this.dailySolitaire.inputEnabled = true;
            this.dailySolitaire.events.onInputDown.add(this.startDailySolitaire, this);
            this.multiplayer = this.add.sprite(this.dailySolitaire.right + 35, 0, "start_multiplayer", null, buttonGroup);
            this.multiplayer.inputEnabled = true;
            this.multiplayer.events.onInputDown.add(this.startMultiplayerGame, this);
            this.topSolitaireScore = this.add.text(this.solitaire.centerX, this.solitaire.bottom - 20, "", { font: "18px cutive", align: "center", fill: "white" });
            this.topSolitaireScore.setShadow(2, 2, "black");
            this.topSolitaireScore.smoothed = false;
            this.topSolitaireScore.anchor.setTo(0.5, 1);
            buttonGroup.add(this.topSolitaireScore);
            buttonGroup.x = this.world.centerX - buttonGroup.width / 2;
            buttonGroup.y = this.cardTitleGroup.bottom + 40;
            if (Wordily.Game.isFacebookInstantGame) {
                var profileName = this.add.text(this.world.centerX, buttonGroup.bottom + 10, "Welcome\n" + Wordily.Game.FacebookDisplayName, { font: "18px cutive", align: "center", fill: "white" });
                profileName.anchor.setTo(0.5, 0);
                this.profilePicture = this.add.image(this.world.centerX, profileName.bottom + 10, 'user_avatar');
                this.profilePicture.width = 100;
                this.profilePicture.height = 100;
                this.profilePicture.anchor.setTo(0.5, 0);
            }
        };
        MainMenu.prototype.flipCard = function (c, delay) {
            if (delay === void 0) { delay = 0; }
            c.cardFlip(delay);
        };
        MainMenu.prototype.startSolitaireGame = function () {
            this.game.state.start('Solitaire', true, false);
        };
        MainMenu.prototype.startDailySolitaire = function () {
            var d = new Date();
            var id = d.getUTCFullYear().toString() + "-" + (d.getUTCMonth() + 1).toString() + "-" + d.getUTCDate().toString();
            this.game.state.start('Solitaire', true, false, id, "Daily");
        };
        MainMenu.prototype.startMultiplayerGame = function () {
            this.game.state.start('Multiplayer');
            //FBInstant.context.chooseAsync({                
            //    minSize: 2,
            //    maxSize: 6
            //})
            //    .then(function () {
            //        Game.FacebookContextId = FBInstant.context.getID();
            //        Game.FacebookContextType = FBInstant.context.getType();
            //        console.log('starting fb multiplayer game:' + Game.FacebookContextType + ":" + Game.FacebookContextId);
            //        Game.getInstance().state.start('Multiplayer', true, false);
            //});
        };
        MainMenu.prototype.update = function () {
            var strSolitaireUpdate = "";
            if (Wordily.Online.bestSolitaireScore > 0)
                strSolitaireUpdate = "Top Game Score: " + Wordily.Online.bestSolitaireScore;
            if (Wordily.Online.bestSolitaireWordScore > 0)
                strSolitaireUpdate += "\n Top Word Score: " + Wordily.Online.bestSolitaireWordScore;
            if (this.topSolitaireScore.text != strSolitaireUpdate) {
                this.topSolitaireScore.text = strSolitaireUpdate;
            }
        };
        return MainMenu;
    }(Phaser.State));
    Wordily.MainMenu = MainMenu;
})(Wordily || (Wordily = {}));
//# sourceMappingURL=mainMenu.js.map