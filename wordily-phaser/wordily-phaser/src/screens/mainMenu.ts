module Wordily {
    declare var FBInstant: any;
    export class MainMenu extends Phaser.State {
        

        background: Phaser.TileSprite;
        cardW: Card;
        cardO: Card;
        cardR: Card;
        cardD: Card;
        cardI: Card;
        cardLY: Card;
        cardTitleGroup: Phaser.Group;

        solitaire: Phaser.Sprite;
        dailySolitaire: Phaser.Sprite;
        multiplayer: Phaser.Sprite;
        settings: Phaser.Sprite;

        profilePicture: Phaser.Image;

        topSolitaireScore: Phaser.Text;

        preload() {
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_daily', 'assets/mainmenu/daily.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
            this.load.image('settings', 'assets/mainmenu/settings.png');
            
            if (Online.CurrentPlayer.haveProfileData) {
                this.load.image('user_avatar', Online.CurrentPlayer.AvatarURL);                
            }
        }

        create() {
            Online.login();

            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.cardTitleGroup = this.add.group();
                                    
            var constSeperation: number = Game.DefaultCardWidth + 20;

            this.cardW = new Card(-1,"W", true, 0, 0, 0, this.cardTitleGroup, this);
            this.cardO = new Card(-1,"O", true, 0, constSeperation * 1, 0, this.cardTitleGroup, this);
            this.cardR = new Card(-1,"R", true, 0, constSeperation * 2, 0, this.cardTitleGroup, this);
            this.cardD = new Card(-1,"D", true, 0, constSeperation * 3, 0, this.cardTitleGroup, this);
            this.cardI = new Card(-1,"I", true, 0, constSeperation * 4, 0, this.cardTitleGroup, this);
            this.cardLY = new Card(-1, "LY", true, 0, constSeperation * 5, 0, this.cardTitleGroup, this);            
            this.cardTitleGroup.scale.setTo(0.5, 0.5);
            this.cardTitleGroup.x = this.world.centerX - this.cardTitleGroup.width / 2;
            this.cardTitleGroup.y = 20;

            let buttonGroup = this.add.group();

            this.solitaire = this.add.sprite(0,0, "start_solitaire", null, buttonGroup);            
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

            if (Game.isFacebookInstantGame) {
                let profileName = this.add.text(this.world.centerX, buttonGroup.bottom + 10, "Welcome\n" + Online.CurrentPlayer.DisplayName, { font: "18px cutive", align: "center", fill: "white" });
                profileName.anchor.setTo(0.5, 0);

                this.profilePicture = this.add.image(this.world.centerX, profileName.bottom + 10, 'user_avatar');
                this.profilePicture.width = 100;
                this.profilePicture.height = 100;
                this.profilePicture.anchor.setTo(0.5, 0);
                                
            }

            this.settings = this.add.sprite(this.world.right - 50, 0, 'settings');
            this.settings.height = 50;
            this.settings.width = 50;
            this.settings.inputEnabled = true;
            this.settings.events.onInputDown.add(this.launchSettings, this);



        }
        
        flipCard(c: Card, delay:number=0) {
            c.cardFlip(delay);
        }

        launchSettings() {
            this.game.state.start('Settings', true, false);
        }

        startSolitaireGame() {            
            this.game.state.start('Solitaire', true, false);            
        }

        startDailySolitaire() {
            let d = new Date();            
            let id: string = d.getUTCFullYear().toString() + "-" + (d.getUTCMonth() + 1).toString() + "-" + d.getUTCDate().toString();
            this.game.state.start('Solitaire', true, false, id, "Daily");
        }

        startMultiplayerGame() {
            this.game.state.start('Multiplayer');
            FBInstant.context.chooseAsync({                
                minSize: 2,
                maxSize: 6

            })
                .then(function () {
                    Game.FacebookContextId = FBInstant.context.getID();
                    Game.FacebookContextType = FBInstant.context.getType();
                    console.log('starting fb multiplayer game:' + Game.FacebookContextType + ":" + Game.FacebookContextId);
                    Game.getInstance().state.start('Multiplayer', true, false, Game.FacebookContextId);
            });
        }

        update() {

            let strSolitaireUpdate = "";
            if (Online.bestSolitaireScore > 0)
                strSolitaireUpdate = "Top Game Score: " + Online.bestSolitaireScore;

            if (Online.bestSolitaireWordScore > 0)
                strSolitaireUpdate += "\n Top Word Score: " + Online.bestSolitaireWordScore;

            if (this.topSolitaireScore.text != strSolitaireUpdate) {
                this.topSolitaireScore.text = strSolitaireUpdate;
            }
        }
    }

}