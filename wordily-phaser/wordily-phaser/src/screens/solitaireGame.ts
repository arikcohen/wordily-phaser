
module Wordily {
    
    export class SolitaireGame extends Phaser.State {

        background: Phaser.TileSprite;
        playingArea: Phaser.Sprite;
        howToPlay: Phaser.Sprite;
        submitWord: Phaser.Sprite;
        clear: Phaser.Sprite;
        exit: Phaser.Sprite;
        scoreTitleText: Phaser.Text;
        scoreText: Phaser.Text;        
        wordErrorGroup: Phaser.Group;


        currentWord: Stack;        
        stacks: Stack[] = [];
        stackDiscard: Stack;
        deckRemaining: Stack;        
        
        gameId: string;
        gameType: string;
        gameReported: boolean = false;

        wordsPlayed: WordScore[] = [];

        private numStacks: number = 8
        public static stackOffsetHorizontal:number = 10;
        public static stackOffsetVertical: number = 20;

        isGameRunning: boolean = false;

        private _displayScore = 0;

        get score(): number {
            let s: number = 0;
            this.wordsPlayed.forEach(wp => s += wp.totalScore);
            return s;
        }

        get numErrors(): number {
            let e: number = 0;
            this.wordsPlayed.forEach(wp => {
                if (!wp.validWord) { e++; }
            });
            return e;
        }

        init(gameId: string = Guid.newGuid(), gameType: string = "Random") {
            this.gameId = gameId;
            this.gameType = gameType;

            this.stacks = [];
            this.wordsPlayed = [];
            this.gameReported = false;
            this.isGameRunning = false;
            this._displayScore = 0;

        }

        preload() {            
            this.game.load.image('howToPlay', 'assets/gameplay/howToPlay.png');
            this.game.load.image('submit', 'assets/gameplay/submitWord.png');
            this.game.load.image('clear', 'assets/gameplay/clear.png');
            this.game.load.image('error', 'assets/gameplay/wordError.png')
            this.game.load.image('exit', 'assets/gameplay/exit.png')
            this.game.load.image('playAgain', 'assets/gameplay/playAgain.png');
            this.game.load.image('mainMenu', 'assets/gameplay/mainMenu.png');
        }

        create() {
            Online.login();

            this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            let marginForStacks: number = (this.world.width - ((Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * this.numStacks) + SolitaireGame.stackOffsetHorizontal) / 2;

            this.scoreTitleText = this.add.text(this.world.centerX - 20, 60, "Score", { font: "32px cutive", fill: "yellow", align: "right" });
            this.scoreTitleText.anchor.setTo(1, 0.5);

            this.scoreText = this.add.text(this.world.centerX + 20, this.scoreTitleText.top, "0", { font: "32px cutive", fill: "white", align: "left" });            

            this.playingArea = this.add.sprite(this.world.centerX, this.scoreText.bottom + 20, 'playingArea');                        
            this.playingArea.anchor.setTo(0.5, 0);
            this.playingArea.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);     
            this.playingArea.width = (Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * 5.5;

            this.submitWord = this.add.sprite(this.playingArea.right + 10, this.playingArea.centerY, 'submit');
            this.submitWord.anchor.setTo(0, 0.5);            
            this.submitWord.events.onInputDown.add(this.submitWordClicked, this);

            this.currentWord = new Stack(this, "currentWord", StackOrientation.HorizontalDisplay, this.playingArea.left + 20, this.playingArea.top + 10);
            this.currentWord.onCardTapped.add(this.currentWordCardTapped, this);
            this.currentWord.renderBaseSlot = false;

            this.clear = this.add.sprite(this.playingArea.right, this.playingArea.top + 10, 'clear');
            this.clear.anchor.setTo(1, 0);
            this.clear.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);
            this.clear.events.onInputDown.add(this.clearCurrentWord, this);            

            this.exit = this.add.sprite(this.world.right, 0, 'exit');
            this.exit.anchor.setTo(1, 0);
            this.exit.width = 40;
            this.exit.height= 40;
            this.exit.inputEnabled = true;
            this.exit.events.onInputDown.add(this.endGame, this);            

            this.stackDiscard = new Stack(this, "discard", StackOrientation.Deck, 0 - Game.DefaultCardWidth, this.currentWord.top);
            
            for (let iStack: number = 0; iStack < this.numStacks; iStack++) {
                let s = new Stack(this, "stack " + iStack, StackOrientation.VerticalStack, (Game.DefaultCardWidth + SolitaireGame.stackOffsetHorizontal) * iStack + marginForStacks, this.currentWord.bottom + SolitaireGame.stackOffsetVertical);
                s.onCardTapped.add(this.stackCardTapped, this);
                this.stacks.push(s);
            }

            this.deckRemaining = new Stack(this, "deck", StackOrientation.Deck, this.stacks[0].left , this.currentWord.top, Deck.CreateDeck(true, this.gameId, false, 2, 'deck-solitaire'), true);
            this.deckRemaining.onStackTapped.add(this.dealMoreCardsClicked, this);
            this.deckRemaining.renderBaseSlot = false;
            
            for (let i: number = 0; i < 4; i++) {
                for (let s: number = 0; s < this.numStacks; s++) {
                    this.stacks[s].addCard(this.deckRemaining.removeTopCard());
                }
            }
            for (let s: number = 0; s < this.numStacks; s++) {
                let c: Card = this.deckRemaining.removeTopCard();                
                c.isSelectable = true;
                this.stacks[s].addCard(c, null, true, 300, 300*s, true);
            }

            

            this.wordErrorGroup = this.add.group(null, "errors");
            
            this.game.world.bringToTop(this.currentWord);            
            this.isGameRunning = true;
            
        }
        currentWordCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            let c: Card = stack.removeCard(card);
            if (c.prevStack)
                c.prevStack.addCard(c, null, true);
            else
                console.error("orphan card " + c.name + " id " + c.id);
        }

        stackCardTapped(stack: Stack, card: Card, doubleTapped: boolean) {
            if (!this.isGameRunning)
                return;

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
            if (!this.isGameRunning)
                return;

            if (this.deckRemaining.length >= this.numStacks) {
                this.clearCurrentWord();

                for (let s: number = 0; s < this.numStacks; s++) {      
                    if (this.stacks[s].length > 0) {
                        this.stacks[s].disableTopCard(false);
                        this.stacks[s].topCard.cardFlip();
                    }
                    let c: Card = this.deckRemaining.removeTopCard();
                    this.stacks[s].addCard(c, null, true, 300, 400, true);                    
                    
                    this.stacks[s].enableTopCard(false);
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
                    scoreString += " + " + wp.bonus +" length bonus";
                }
            }
            else {
                scoreString += "\n" + wp.baseScore;
            }

            let wordScoreText = this.add.text(this.submitWord.centerX, this.submitWord.centerY, scoreString, { font: "32px cutive", fill: wp.validWord ? "limegreen" : "red", align: "center" });            
            wordScoreText.bringToTop();
            wordScoreText.anchor.setTo(0.5, 0.5);
            let tweenScoreAnimation = this.add.tween(wordScoreText).to({ x: this.scoreText.centerX, y: this.scoreText.centerY }, 1000, Phaser.Easing.Linear.None, false);
            tweenScoreAnimation.chain(this.add.tween(wordScoreText).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None));

            tweenScoreAnimation.onComplete.add(this.finishWordScoreAnimation, this, 0, wp);
            tweenScoreAnimation.start();
            
        }

        finishWordScoreAnimation(text:Phaser.Text, tween:Phaser.Tween, wp:WordScore) {
            this.wordsPlayed.push(wp);
            text.destroy();
            if (this.numErrors == 3) {
                this.endGame();
            }
        }

        submitWordClicked() {            
            if (!this.isGameRunning)
                return;
            var checkWord = this.currentWord.word;
            console.debug("checking word " + checkWord + " : " + Game.checkWord(checkWord));

            if (Game.checkWord(checkWord)) {
                let wordScore: WordScore = new WordScore(checkWord, this.currentWord.score);
                this.wordPlayed(wordScore);
                while (this.currentWord.length > 0) {
                    let c: Card = this.currentWord.removeTopCard();
                    
                    if (c.prevStack.length > 0) {
                        c.prevStack.enableTopCard(false);
                        c.prevStack.topCard.cardFlip();
                    }
                    this.stackDiscard.addCard(c, null, true);
                }
            }
            else {
                let wordScore: WordScore = new WordScore(checkWord, this.currentWord.score * -1);
                let error = this.add.sprite(this.scoreTitleText.left - 20 - (this.numErrors + 1) * 55, this.scoreTitleText.centerY, 'error', null);
                error.anchor.setTo(0, 0.5);
                error.width = 50;
                error.height = 50;

                this.wordPlayed(wordScore);                
                this.clearCurrentWord();
            }

        }

        update() {
            if (this.currentWord.length < 2 || !this.isGameRunning) {
                this.submitWord.alpha = 0.25;
                this.submitWord.inputEnabled = false;
            }
            else {
                this.submitWord.alpha = 1;
                this.submitWord.inputEnabled = true;
            }



            if (this.currentWord.length == 0 || !this.isGameRunning) {
                this.clear.alpha = 0.25;
                this.clear.inputEnabled = false;
            }
            else {
                this.clear.alpha = 1;
                this.clear.inputEnabled = true;
            }

            if (this.score > this._displayScore) {
                this._displayScore++
            }

            if (this.score < this._displayScore) {
                this._displayScore--
            }
            
            this.scoreText.text = this._displayScore.toLocaleString();
                
        }

        

        endGame() {
            if (this.wordsPlayed.length > 0) {
                this.isGameRunning = false;

                let wordsPlayed: string = "";
                let wordsFailed: string = "";
                this.wordsPlayed.forEach(w => { if (w.validWord) { wordsPlayed += w.word + "  " } else { wordsFailed += w.word + "  " } } );


                this.wordsPlayed.sort((a:WordScore, b:WordScore):number => {
                    if (a.totalScore < b.totalScore) return 1;
                    if (a.totalScore > b.totalScore) return -1;                  
                    return 0;
                });

                if (!this.gameReported) {
                    Online.submitSolitaireGameResult(this.gameId, this.score, this.wordsPlayed[0].word, this.wordsPlayed[0].totalScore);
                    this.gameReported = true;
                }

                let gameOverBackground: Phaser.TileSprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
                gameOverBackground.alpha = .9;
                                

                let text = this.add.text(this.world.centerX, this.playingArea.top, "Game Over", { font: "48px cutive", fill: "white", align: "center" })                
                text.anchor.setTo(0.5, 0.5);

                let text1 = this.add.text(this.world.centerX-20, text.bottom + 25, "Score", { font: "40px cutive", fill: "yellow", align: "center" })                
                text1.anchor.setTo(1, 0);

                let text2 = this.add.text(this.world.centerX + 20, text1.top, this.score.toString() , { font: "40px cutive", fill: "white", align: "left" })
                text2.anchor.setTo(0, 0);

                let text3 = this.add.text(this.world.centerX - 20, text1.bottom + 5, "Best Word", { font: "32px cutive", fill: "yellow", align: "center" })
                text3.anchor.setTo(1, 0);
                        
                let text4 = this.add.text(this.world.centerX + 20, text1.bottom + 5, this.wordsPlayed[0].word +  " (" + this.wordsPlayed[0].totalScore + ")" , { font: "32px cutive", fill: "white", align: "center" })
                text4.anchor.setTo(0, 0);

                let text5 = this.add.text(this.world.centerX - 20, text3.bottom + 5, "Words Played", { font: "32px cutive", fill: "yellow", align: "center" })
                text5.anchor.setTo(1, 0);


                let text6 = this.add.text(this.world.centerX + 20, text3.bottom + 5, wordsPlayed, { font: "32px cutive", fill: "white", align: "left", wordWrap: true, maxLines:4 })                
                text6.wordWrapWidth = this.world.width / 2 - 40;
                text6.anchor.setTo(0, 0);

                if (this.numErrors > 0) {
                    let text7 = this.add.text(this.world.centerX - 20, text6.bottom + 5, "Words Missed", { font: "32px cutive", fill: "yellow", align: "center" })
                    text7.anchor.setTo(1, 0);

                    let text8 = this.add.text(this.world.centerX + 20, text6.bottom + 5, wordsFailed, { font: "32px cutive", fill: "red", align: "left" })
                    text8.wordWrap = true;
                    
                    text8.wordWrapWidth = this.world.width / 2 - 40;
                    text8.anchor.setTo(0, 0);
                }

                let playAgain = this.add.sprite(this.world.centerX - 290, this.world.height - 120, 'playAgain');                
                playAgain.inputEnabled = true;
                playAgain.events.onInputDown.add(this.playAgainClicked, this);


                let mainMenu = this.add.sprite(this.world.centerX + 40, this.world.height - 120, 'mainMenu');
                mainMenu.inputEnabled = true;
                mainMenu.events.onInputDown.add(this.exitToMainMenu, this);
            }            
        }


        shutdown() {
            this.stacks.forEach(s => s.destroy(true));
        }

        playAgainClicked() {
            this.game.state.start('Solitaire', true);
        }

        exitToMainMenu() {
            this.game.state.start('MainMenu', true);
        }

    }

}