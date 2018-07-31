module Wordily {

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

        profilePicture: Phaser.Image;

        topSolitaireScore: Phaser.Text;

        preload() {
            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_daily', 'assets/mainmenu/daily.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
            if (Game.isFacebookInstantGame)
                this.load.image('facebook_user_photo', Game.FacebookPhoto);
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
            this.cardLY = new Card(-1,"LY", true, 0, constSeperation * 5, 0, this.cardTitleGroup, this);            
            this.cardTitleGroup.x = this.world.centerX - this.cardTitleGroup.width / 2;
            this.cardTitleGroup.y = 80;

            let buttonGroup = this.add.group();

            this.solitaire = this.add.sprite(0,0, "start_solitaire", null, buttonGroup);            
            this.solitaire.inputEnabled = true;
            this.solitaire.events.onInputDown.add(this.startSolitaireGame, this);


            

            this.dailySolitaire = this.add.sprite(this.solitaire.right + 35, 0, "start_daily", null, buttonGroup);                        
            this.dailySolitaire.inputEnabled = true;
            this.dailySolitaire.events.onInputDown.add(this.startDailySolitaire, this);        

            this.multiplayer = this.add.sprite(this.dailySolitaire.right + 35, 0, "start_multiplayer", null, buttonGroup);            
            this.multiplayer.alpha = 0.25;
            this.multiplayer.inputEnabled = false;
            this.multiplayer.events.onInputDown.add(this.startMultiplayerGame, this);


            this.topSolitaireScore = this.add.text(this.solitaire.centerX, this.solitaire.bottom - 20, "", { font: "18px cutive", align: "center", fill: "white" });
            this.topSolitaireScore.setShadow(2, 2, "black");
            this.topSolitaireScore.smoothed = false;
            this.topSolitaireScore.anchor.setTo(0.5, 1);
            buttonGroup.add(this.topSolitaireScore);

            buttonGroup.x = this.world.centerX - buttonGroup.width / 2;
            buttonGroup.y = this.world.centerY;

            if (Game.isFacebookInstantGame) {
                this.profilePicture = this.add.image(10, 10, 'facebook_user_photo');
                this.profilePicture.width = 100;
                this.profilePicture.height = 100;
                
                let profileName = this.add.text(this.profilePicture.centerX, this.profilePicture.bottom + 5, Game.FacebookDisplayName + "\n"+ Game.FacebookId, { font: "12px cutive", align: "center", fill: "white" });
                profileName.anchor.setTo(0.5, 0);

            }

        }
        
        flipCard(c: Card, delay:number=0) {
            c.cardFlip(delay);
        }

        startSolitaireGame() {            
            this.game.state.start('Solitaire', true, false);            
        }

        startDailySolitaire() {
            let d = new Date();            

            this.game.state.start('Solitaire', true, false,d.getUTCFullYear + "-" + d.getUTCDay , "Daily");
        }

        startMultiplayerGame() {
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