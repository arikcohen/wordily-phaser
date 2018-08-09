
module Wordily {

    export class SettingsScreen extends Phaser.State {

        background: Phaser.TileSprite;

        avatar: Phaser.Sprite;
        displayName: Phaser.Text;
        labelPhoto: Phaser.Text;
        labelName: Phaser.Text;

        settingsTitle: Phaser.Text;
        playfabLogo: Phaser.Sprite;
        exit: Phaser.Sprite;

        cardW: Card;
        cardO: Card;
        cardR: Card;
        cardD: Card;
        cardI: Card;
        cardLY: Card;
        cardTitleGroup: Phaser.Group;

        init() {
            
        }

        preload() {
            this.load.image('playfab', 'assets/settings/playfab.png');
            this.load.image('user_avatar', Online.CurrentPlayer.AvatarURL);
            this.load.image('exit', 'assets/gameplay/exit.png');
        }


        create() {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');

            let settingsTitleTextStyle: Phaser.PhaserTextStyle = { font: "48px cutive", fill: "#ff6d21", align: "center", shadowColor: "black", shadowOffsetX: 4, shadowOffsetY: 4 };
            let labelTextStyle: Phaser.PhaserTextStyle = { font: "32px cutive", fill: "#ff6d21", align: "left", shadowColor: "black", shadowOffsetX: 2, shadowOffsetY: 2 };
            let basicTextStyle: Phaser.PhaserTextStyle = { font: "32px cutive", fill: "white", align: "left"};

            this.cardTitleGroup = this.add.group();
            var constSeperation: number = Game.DefaultCardWidth + 20;
            this.cardW = new Card(-1, "W", true, 0, 0, 0, this.cardTitleGroup, this);
            this.cardO = new Card(-1, "O", true, 0, constSeperation * 1, 0, this.cardTitleGroup, this);
            this.cardR = new Card(-1, "R", true, 0, constSeperation * 2, 0, this.cardTitleGroup, this);
            this.cardD = new Card(-1, "D", true, 0, constSeperation * 3, 0, this.cardTitleGroup, this);
            this.cardI = new Card(-1, "I", true, 0, constSeperation * 4, 0, this.cardTitleGroup, this);
            this.cardLY = new Card(-1, "LY", true, 0, constSeperation * 5, 0, this.cardTitleGroup, this);            
            this.cardTitleGroup.scale.setTo(0.5, 0.5);
            this.cardTitleGroup.x = this.world.centerX - this.cardTitleGroup.width / 2;
            this.cardTitleGroup.y = 20;
            

            //this.settingsTitle = this.add.text(this.world.centerX, this.cardTitleGroup.bottom + 50, "Settings", settingsTitleTextStyle);
            //this.settingsTitle.anchor.setTo(0.5, 0);

            this.labelName = this.add.text(this.world.centerX - 10, this.cardTitleGroup.bottom + 50, "Name:", labelTextStyle);
            this.labelName.anchor.setTo(1, 0);

            this.displayName = this.add.text(this.labelName.right + 20, this.labelName.y, Online.CurrentPlayer.DisplayName, basicTextStyle);
            
            this.avatar = this.add.sprite(this.labelName.right + 20, this.labelName.bottom + 20, 'user_avatar');
            this.avatar.height = 100;
            this.avatar.width = 100;

            this.labelPhoto = this.add.text(this.world.centerX - 10, this.avatar.centerY, "Photo:", labelTextStyle);
            this.labelPhoto.anchor.setTo(1, 0.5);            

            let labelPlayerId = this.add.text(this.world.centerX - 10, this.avatar.bottom + 20, "PlayerId:", labelTextStyle);
            labelPlayerId.anchor.setTo(1, 0);

            let displayPlayerId = this.add.text(labelPlayerId.right + 20, labelPlayerId.y, Online.CurrentPlayer.PlayFabId, basicTextStyle);

            let labelFBPlayerId = this.add.text(this.world.centerX - 10, displayPlayerId.bottom + 20, "Facebook PlayerId:", labelTextStyle);
            labelFBPlayerId.anchor.setTo(1, 0);

            let displayFBPlayerId = this.add.text(labelFBPlayerId.right + 20, labelFBPlayerId.y, Game.FacebookId, basicTextStyle);



            this.exit = this.add.sprite(this.world.right-10, 10, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 50;
            this.exit.height = 50;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.switchToMainMenu, this);            

            this.playfabLogo = this.add.sprite(this.world.centerX, this.world.bottom - 50, 'playfab');
            this.playfabLogo.anchor.setTo(0.5, 1);

        }

        switchToMainMenu() {
            this.game.state.start('MainMenu', true, false);            
        }


    }
}