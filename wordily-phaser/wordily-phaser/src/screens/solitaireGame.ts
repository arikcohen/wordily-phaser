
module Wordily {
    
    export class SolitaireGame extends Phaser.State {

        background: Phaser.TileSprite;
        playingArea: Phaser.Sprite;
        howToPlay: Phaser.Sprite;
        submitWord: Phaser.Sprite;
        clear: Phaser.Sprite;
        scoreTitleText: Phaser.Text;
        scoreText: Phaser.Text;        

        currentWord: Stack;        
        stacks: Stack[] = [];
        stackDiscard: Stack;
        deckRemaining: Stack;        
        numErrors: number;
        gameId: string;
        gameReported: boolean = false;

        wordsPlayed: WordScore[] = [];

        private numStacks: number = 8
        public static stackOffsetHorizontal:number = 10;
        public static stackOffsetVertical:number = 20;

        get score(): number {
            let s: number = 0;
            this.wordsPlayed.forEach(wp => s += wp.totalScore);
            return s;
        }

        init(gameId: string = Guid.newGuid()) {
            this.gameId = gameId;
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
            this.submitWord.events.onInputDown.add(this.submitWordClicked, this);

            this.currentWord = new Stack(this, "currentWord", StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.currentWord.onCardTapped.add(this.currentWordCardTapped, this);
            


            this.stackDiscard = new Stack(this, "discard", StackOrientation.Deck, 0 - Game.DefaultCardWidth, this.currentWord.top);
            
            for (let iStack: number = 0; iStack < this.numStacks; iStack++) {
                let s = new Stack(this, "stack " + iStack, StackOrientation.VerticalStack, (Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.currentWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }

            this.deckRemaining = new Stack(this, "deck", StackOrientation.Deck, this.stacks[this.numStacks-1].left, this.currentWord.top, Deck.CreateDeck(true, false, 4, 'deck-solitaire'), true);
            this.deckRemaining.onStackTapped.add(this.dealMoreCardsClicked, this);

            for (let i: number = 0; i < 4; i++) {
                for (let s: number = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (let s: number = 0; s < this.numStacks; s++) {
                let c: Card = this.deckRemaining.removeTopCard();
                c.isFaceUp = true;
                c.isSelectable = true;
                this.stacks[s].addCard(c, null, true, 300, 300*s);
            }

            this.scoreTitleText = this.add.text(this.stacks[0].left + Game.DefaultCardWidth/2, this.playingArea.top + 40, "Score", { font: "32px cutive", fill: "yellow", align: "center" });
            this.scoreTitleText.anchor.setTo(0.5, 0);            
            this.scoreText = this.add.text(this.stacks[0].left + Game.DefaultCardWidth / 2, this.scoreTitleText.bottom + 20, "0", { font: "32px cutive", fill: "white", align: "center" });                        
            this.scoreText.anchor.setTo(0.5, 0);

            this.game.world.bringToTop(this.currentWord);

            Online.login();
        }
        currentWordCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            let c: Card = stack.removeCard(card);
            c.prevStack.addCard(c, null, true);
        }

        stackCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            console.debug(stack.name + " got a card click " + card.name + " double: " + doubleTapped);
            if (doubleTapped) {
                for (let s: number = 0; s < this.numStacks; s++) {
                    if (this.stacks[s].length == 0) {
                        let c: Card = stack.removeCard(card);
                        this.stacks[s].addCard(c, null, true);
                        stack.enableTopCard();
                        return;
                    }
                }

                // only do something if we have an empty stack to move to
            }
            else {
                let c: Card = stack.removeCard(card);
                this.currentWord.addCard(c, null, true);
            }
        }

        dealMoreCardsClicked() {
            if (this.deckRemaining.length >= this.numStacks) {
                this.clearCurrentWord();

                for (let s: number = 0; s < this.numStacks; s++) {                    
                    this.stacks[s].disableTopCard(true);                    
                    let c: Card = this.deckRemaining.removeTopCard();
                    this.stacks[s].addCard(c, null, true, null, 300);
                    this.stacks[s].enableTopCard();

                }
            }
            else {
                this.endGame();
            }
        }

        clearCurrentWord() {
            while (this.currentWord.length > 0) {
                let c: Card = this.currentWord.removeTopCard();
                c.prevStack.addCard(c, null, true);
            }
        }

        wordPlayed(wp: WordScore) {
            let scoreString: string = wp.word;
            if (wp.validWord) {
                scoreString += "\n+" + wp.baseScore;
                if (wp.bonus > 0) {
                    scoreString += "\n+" + wp.bonus;
                }
            }
            else {
                scoreString += "\n" + wp.baseScore;
            }

            let wordScoreText = this.add.text(this.submitWord.centerX, this.submitWord.centerY, scoreString, { font: "32px cutive", fill: wp.validWord ? "limegreen" : "red", align: "center" });            
            wordScoreText.bringToTop();
            wordScoreText.anchor.setTo(0.5, 0.5);
            let tweenScoreAnimation = this.add.tween(wordScoreText).to({ x: this.scoreText.centerX }, 1000, Phaser.Easing.Linear.None, false);
            tweenScoreAnimation.chain(this.add.tween(wordScoreText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None));

            tweenScoreAnimation.onComplete.add(this.finishWordScoreAnimation, this, 0, wp);
            tweenScoreAnimation.start();
            
        }

        finishWordScoreAnimation(text:Phaser.Text, tween:Phaser.Tween, wp:WordScore) {
            this.wordsPlayed.push(wp);
            text.destroy();
        }

        submitWordClicked() {            
            var checkWord = this.currentWord.getWord();
            console.debug("checking word " + checkWord + " : " + Game.checkWord(checkWord));

            if (Game.checkWord(checkWord)) {
                let wordScore: WordScore = new WordScore(checkWord, this.currentWord.getScore());
                this.wordPlayed(wordScore);
                while (this.currentWord.length > 0) {
                    let c: Card = this.currentWord.removeTopCard();
                    c.prevStack.enableTopCard();
                    this.stackDiscard.addCard(c, null, true);
                }
            }
            else {
                let wordScore: WordScore = new WordScore(checkWord, this.currentWord.getScore() * -1);
                this.wordPlayed(wordScore);                
                this.clearCurrentWord();
            }

        }

        update() {
            if (this.currentWord.length < 2) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }

            if (this.deckRemaining.length < this.numStacks) {
                
            }

            this.scoreText.text = this.score.toString();
        }

        endGame() {
            if (!this.gameReported) {
                Online.submitSolitaireGameResult(this.gameId, this.score, null, 0);
                this.gameReported = true;
            }
        }

    }

}