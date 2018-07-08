module Wordily {

    export class SolitaireGame extends Phaser.State {

        background: Phaser.TileSprite;
        playingArea: Phaser.Sprite;
        howToPlay: Phaser.Sprite;
        submitWord: Phaser.Sprite;
        clear: Phaser.Sprite;

        curWord: Stack;
        stacks: Stack[] = [];
        deckRemaining: Deck;
        score: number = 0;

        private numStacks: number = 8;
        public static stackOffsetHorizontal:number = 50;
        public static stackOffsetVertical:number = 20;

        init(gameId?: number) {

        }

        preload() {            
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');

        }

        create() {
            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.playingArea = this.add.sprite(this.world.centerX, 120, 'playingArea');
            this.playingArea.anchor.setTo(0.5, 0.5);
            this.playingArea.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);            

            this.curWord = new Stack(this.playingArea.x + 20, this.playingArea.bottom - 10);
        }

        startGame() {         

        }

    }

}