module Wordily {
 
    export class SplashScreen extends Phaser.State {

        
        background: Phaser.TileSprite;
        playingArea: Phaser.Sprite;
        cardTitleGroup: Phaser.Group;
        
        cardW: Card;
        cardO: Card;
        cardR: Card;
        cardD: Card;
        cardI: Card;
        cardLY: Card;
        cardY: Card;
        cardJoker: Card;
        cardJoker2: Card;

        preload() {


            // load what's needed for the loading screen
            this.background = this.add.tileSprite(0, 0, 1280, 720, 'background');
                                             
            this.cardTitleGroup = this.add.group();

            this.cardW = new Card(-1, "W", true,0 , this.world.width, this.world.centerY -90, this.cardTitleGroup);
            this.cardO = new Card(-1, "O", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardR = new Card(-1, "R", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);            
            this.cardD = new Card(-1, "D", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardI = new Card(-1, "I", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);
            this.cardJoker = new Card(-1, "JOKER", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);            
            this.cardJoker2 = new Card(-1, "JOKER", true, 0, this.world.width, this.world.centerY - 90, this.cardTitleGroup);            
            
            this.cardLY = new Card(-1, "LY", true, 0, this.world.width, this.world.height, this.cardTitleGroup);            


            // load assets for main menu
            this.load.image('start_solitaire', 'assets/mainmenu/solitaire.png');
            this.load.image('start_multiplayer', 'assets/mainmenu/multiplayer.png');
        }


        create() {                                   

            var showSplash: boolean = false;

            if (showSplash) {
                var constSeperation: number = Game.DefaultCardWidth + 10;
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
                                               
        }

        shutdown() {
            
            this.cardTitleGroup.destroy(true);
        }

        startMainMenu() {
            
            this.cardTitleGroup.destroy(true, true);
            //this.game.state.start('MainMenu', true, false);
            this.game.state.start('Solitaire', true, false);
        }

    }

}