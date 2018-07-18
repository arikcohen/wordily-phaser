module Wordily {

    export class TestScreen extends ExtendedState {

        background: Phaser.TileSprite;
        playingArea: ExtendedCardSprite;
        howToPlay: ExtendedCardSprite;
        submitWord: ExtendedCardSprite;
        solitaire: Phaser.Sprite;
        group1: Phaser.Group;
        group2: Phaser.Group;
        c1: Card;


        
        init(gameId?: number) {

        }

        preload() {            
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');

        }

        create() {
            console.log("foo");
            this.stage.backgroundColor = "blue";
            this.spriteGroup = this.add.group();
            //this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');            
            this.group1 = this.add.group();
            this.group2 = this.add.group();
            
            this.playingArea = new ExtendedCardSprite(this.game, 100, 20, 'cards', 'cardBackground', this.group1);       
            this.c1 = new Card(-1, "A", true, 2, 400, 200, this.group2, this);
            this.playingArea.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);            
            this.spriteGroup.add(this.playingArea);
            
        
            this.add.tween(this.group2).to({ x: 400, y: 150 }, 1000, null, true);
            this.solitaire = this.add.sprite(this.world.width / 3, this.world.centerY, "start_solitaire");
        }
        

    }

}