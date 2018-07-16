module Wordily {

    export class SolitaireGame extends Phaser.State {

        background: Phaser.TileSprite;
        playingArea: Phaser.Sprite;
        howToPlay: Phaser.Sprite;
        submitWord: Phaser.Sprite;
        clear: Phaser.Sprite;
        scoreTitleText: Phaser.Text;
        scoreText: Phaser.Text;

        curWord: Stack;        
        stacks: Stack[] = [];
        deckRemaining: Stack;
        score: number = 0;

        private numStacks: number = 8
        public static stackOffsetHorizontal:number = 10;
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
            let marginForStacks: number = (this.world.width - ((Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * this.numStacks) + SolitaireGame.stackOffsetHorizontal) / 2;

            this.playingArea = this.add.sprite(Game.DefaultCardWidth + marginForStacks, 20, 'playingArea');                        
            this.playingArea.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);            
            this.submitWord = this.add.sprite(this.playingArea.right + 10, this.playingArea.centerY, 'submit');
            this.submitWord.anchor.setTo(0, 0.5);
            this.submitWord.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);                        
            

            this.curWord = new Stack(this, "currentWord", StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.curWord.onCardTapped.add(this.currentWordCardTapped, this);

            
            
            for (let iStack: number = 0; iStack < this.numStacks; iStack++) {
                let s = new Stack(this, "stack " + iStack, StackOrientation.VerticalStack, (Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.curWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }

            this.deckRemaining = new Stack(this, "deck", StackOrientation.Deck, this.stacks[this.numStacks-1].left, this.curWord.top, Deck.CreateDeck(true, false, 4));


            for (let i: number = 0; i < 4; i++) {
                for (let s: number = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (let s: number = 0; s < this.numStacks; s++) {
                let c: Card = this.deckRemaining.removeTopCard();
                c.isFaceUp = true;
                c.isSelectable = true;
                this.stacks[s].addCard(c);
            }

            this.scoreTitleText = this.add.text(this.stacks[0].left + Game.DefaultCardWidth/2, this.playingArea.top + 40, "Score", { font: "32px cutive", fill: "white", align: "center" });
            this.scoreTitleText.anchor.setTo(0.5, 0);
            this.scoreText = this.add.text(this.stacks[0].left + Game.DefaultCardWidth / 2, this.scoreTitleText.bottom + 20, "0", { font: "32px cutive", fill: "white", align: "center" });                        
            this.scoreText.anchor.setTo(0.5, 0);
        }
        currentWordCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            let c: Card = stack.removeCard(card);
            c.prevStack.addCard(c);
        }

        stackCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            console.debug(stack.name + " got a card click " + card.name);
            let c: Card = stack.removeCard(card);
            this.curWord.addCard(c);
        }

        update() {
            if (this.curWord.length == 0) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }

        }

        startGame() {         

        }

    }

}