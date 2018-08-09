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
            var constSeperation: number = Game.DefaultCardWidth + 10;

            // load what's needed for the loading screen
            this.background = this.add.tileSprite(0, 0, 1280, 720, 'background');
                                             
            this.cardTitleGroup = this.add.group();
            this.cardTitleGroup.x = this.world.centerX - constSeperation * 3.5;
            this.cardTitleGroup.y = this.world.centerY - Game.DefaultCardHeight;            

            this.cardW = new Card(-1, "W", true,0 , constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardO = new Card(-1, "O", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardR = new Card(-1, "R", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);            
            this.cardD = new Card(-1, "D", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardI = new Card(-1, "I", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);
            this.cardJoker = new Card(-1, "JOKER", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);            
            this.cardJoker2 = new Card(-1, "JOKER", true, 0, constSeperation * 3.5, -this.world.centerY, this.cardTitleGroup);            
            
            this.cardLY = new Card(-1, "LY", true, 0, this.world.centerX, this.world.height+400, this.cardTitleGroup);                        

            

            // start loading all the words
            for (let c: number = 'A'.charCodeAt(0); c <= + 'Z'.charCodeAt(0); c++) {
                this.game.load.json('validWords-' + String.fromCharCode(c), 'assets/validwords/' + String.fromCharCode(c) + '-words.json');
            }
        }


        create() {                                   

            var showSplash: boolean = false;

            let delay: number = (showSplash) ? 250: 0;
            let duration: number = (showSplash) ? 400: 0;

            console.log("duration: " + duration + " delay: " + delay);

            var constSeperation: number = Game.DefaultCardWidth + 10;
            var tweenW = this.add.tween(this.cardW).to({ x: 0, y:0 }, duration, Phaser.Easing.Linear.None, true);
            var tweenO = this.add.tween(this.cardO).to({ x: constSeperation, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
            var tweenR = this.add.tween(this.cardR).to({ x: constSeperation * 2, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 2);
            var tweenD = this.add.tween(this.cardD).to({ x: constSeperation * 3, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 3);
            var tweenI = this.add.tween(this.cardI).to({ x: constSeperation * 4, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 4);
            var tweenJoker = this.add.tween(this.cardJoker).to({ x: constSeperation * 5, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 5);
            var tweenJoker2 = this.add.tween(this.cardJoker2).to({ x: constSeperation * 6, y: 0 }, duration, Phaser.Easing.Linear.None, true, delay * 6);
            var tweenJokerAway = this.add.tween(this.cardJoker).to({ alpha:0 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 7);
            var tweenJoker2Away = this.add.tween(this.cardJoker2).to({ alpha: 0 }, duration * 2 , Phaser.Easing.Linear.None, true, delay * 7);

            
            var tweenLY = this.add.tween(this.cardLY).to({ x: constSeperation * 5, y: 0 }, duration * 2, Phaser.Easing.Linear.None, true, delay * 7);
                
            
            
            tweenLY.onComplete.add(function () {
                this.finalAnimation(duration);
            }, this);
                
            
            Online.login();       
        }

        finalAnimation(duration: number = 400) {
            console.log("foo " + duration);
            var constSeperation: number = Game.DefaultCardWidth + 10;                        
            var tweenCardsTop = this.add.tween(this.cardTitleGroup).to({ x: this.world.centerX - 1.5 * constSeperation, y: 20 }, duration * 2, Phaser.Easing.Linear.None, true);
            var tweenCardsScale = this.add.tween(this.cardTitleGroup.scale).to({ x: 0.5, y: 0.5 }, duration * 2, Phaser.Easing.Linear.None, true);
            tweenCardsTop.onComplete.add(this.startMainMenu, this);
        }

        shutdown() {
            
            this.cardTitleGroup.destroy(true);
        }

        startMainMenu() {
            
            while (!Online.CurrentPlayer.haveProfileData) {

            }
            this.game.state.start('MainMenu', true, false);
        }

    }

}