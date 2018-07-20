namespace Wordily {
    export enum StackOrientation {
        Deck,
        HorizontalFull,
        HorizontalStack,
        VerticalStack,
        HorizontalDisplay
    }

    export class Stack extends Phaser.Group {

        
        private cards: Card[];
        private dropSlot: Phaser.Sprite;
        private orientation: StackOrientation;
        state: Phaser.State

        static offsetHorizonatal: number = 10;
        static offsetHorizonatalDisplay: number = Game.DefaultCardWidth * 0.4;
        static offsetVertical: number = 15;
        static offsetVerticalFaceUp: number = 32;


        constructor(state: Phaser.State, name: string, orientation: StackOrientation, x?: number, y?: number, initialCards: Card[] = [], enableStackClick:boolean =false) {
            super(state.game, null, name, true, false, null);
            this.state = state;
            this.orientation = orientation;

            if (x) {
                this.x = x;
            }
            if (y) {
                this.y = y;
            }

            //this.groupStack = state.add.group(null, name, true, false);                        
            this.dropSlot = this.state.add.sprite(0, 0, "cards", "cardSlot", this);
            this.dropSlot.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);
            
            this.cards = initialCards;
            for (let c of this.cards) {                
                c.prevStack = c.curStack;
                c.curStack = this;
            }

            this.updateCardLocations(0);

            if (Game.isDebug) {
                this.state.add.text(0, 0, name, null, this);
                this.state.add.text(0, 100, "(" + this.x.toFixed(0) + "," + this.y.toFixed(0) + ")", null, this);
            }

            if (enableStackClick) {
                this.dropSlot.inputEnabled = true;
                let stackInputPriority: number = -1000;
                if (this.orientation == StackOrientation.Deck) {
                    stackInputPriority = 1000;
                }
                this.dropSlot.events.onInputDown.add(this.stackTapped, this, stackInputPriority);
            }

        }

        update() {
            
            
            this.dropSlot.renderable = (this.length == 0);
            
            super.update();
        }

        get length(): number {
            return this.cards.length;
        }

        get topCard(): Card {
            if (this.cards.length == 0)
                return null;
            else
                return this.cards[length - 1];
        }

        removeTopCard(): Card {
            if (this.cards.length == 0)
                return null;
            else
                return this.cards.pop();
        }

        removeCard(card: Card): Card {
            let index = this.cards.indexOf(card);
            if (index != -1) {
                this.cards.splice(index, 1);
                return card;
            }
            else {
                return null;
            }
        }

        addCard(card: Card, index?: number, fAnimateIn = false, animateDuration: number = 300, animateDelay: number = 0) {         
            if (fAnimateIn) {
                card.isAnimating = true;
            }
            if (index) {
                this.cards.push(card);  
                //this.addAt(card, index);
                this.updateCardLocations(index, fAnimateIn);
            }
            else {
                this.cards.push(card);
                this.updateCardLocations(this.cards.length - 1, fAnimateIn);
                //this.add(card);
            }

            if (fAnimateIn) {
                
                console.debug("animating to stack " + this.name + " card " + card.name + "(" + card.animateFinalX + ", " + card.animateFinalY + ") from  stack " + card.curStack + "(" + card.x + ", " + card.y +")" );
                this.state.add.tween(card).to({ x: card.animateFinalX, y: card.animateFinalY }, animateDuration, Phaser.Easing.Linear.None , true, animateDelay);
            }

            card.prevStack = card.curStack;
            card.curStack = this;
        }

        getWord(): string {
            let word: string = "";
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].name != "JOKER") {
                    word += this.cards[i].name
                }
                else {
                    word += ".";
                }
            }
            return word;
        }

        getScore(): number {
            let score: number = 0;
            for (let i = 0; i < this.cards.length; i++) {
                console.debug(this.cards[i].value);
                score += this.cards[i].value;
            }

            
            return score;
        }

        private cardFinalLocation(index: number) {
            let x: number;
            let y: number;
            

            let prevCard: Card;

            if (index > 0) {
                prevCard = this.cards[index - 1];

            }
            let card: Card = this.cards[index];

            switch (this.orientation) {
                case StackOrientation.Deck: {
                    x = this.x;
                    y = this.y;
                    break;
                }
                case StackOrientation.HorizontalFull: {
                    x = this.x + (index * (this.dropSlot.worldPosition.y + Stack.offsetHorizonatal));
                    y = this.y;
                    break;
                }

                case StackOrientation.HorizontalDisplay: {
                    x = this.x + (index * (Stack.offsetHorizonatalDisplay));
                    y = this.y;
                    break;
                }

                case StackOrientation.HorizontalStack: {
                    x = this.x + (index * (Stack.offsetHorizonatal));
                    y = this.y;
                    break;
                }
                case StackOrientation.VerticalStack: {

                    x = this.worldPosition.x;
                    if (prevCard) {
                        if (prevCard.isFaceUp) {
                            if (prevCard.isAnimating) {
                                y = prevCard.animateFinalY + (Stack.offsetVerticalFaceUp);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVerticalFaceUp);
                            }
                        }
                        else {
                            if (prevCard.isAnimating) {
                                y = prevCard.animateFinalY + (Stack.offsetVertical);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVertical);
                            }
                        }

                    }
                    else {
                        y = this.y;
                    }
                    break;
                }
            }

            return { x: x, y: y };
        }

        private updateCardLocations(startIndex:number =0, fAnimate:boolean = false) {
            console.debug("Updating Card locations for: " + this.name + " starting at location: " + startIndex + " total Cards: " + this.cards.length);
            
            
            for (let index: number = startIndex; index < this.length; index++)
            {
                let x: number;
                let y: number;
                let card: Card = this.cards[index];
                let location = this.cardFinalLocation(index);
                x = location.x;
                y = location.y;
                this.game.world.bringToTop(card);

                if (card.isAnimating) {
                    if (card.animateFinalX != x || card.animateFinalY != y) {
                        card.animateFinalX = x;
                        card.animateFinalY = y;
                        console.debug("Stack: " + this.name + " updated animated card location " + index + " " + card.name + " (" + x + ", " + y + ")");
                    }
                }
                else {
                    if (card.x != x || card.y != y) {
                        card.x = x;
                        card.y = y;
                        console.debug("Stack: " + this.name + " updated card location " + index + " " + card.name + " (" + x + ", " + y + ")");
                    }
                }
                
                
            }

            
        }       

        disableTopCard(makeFaceDown): void {
            if (this.length > 0) {
                let c: Card = this.cards[this.length - 1];
                if (makeFaceDown) {
                    c.isFaceUp = false;
                }
                c.isSelectable = false;
            }
        }

        enableTopCard(): void {
            if (this.length > 0) {
                let c: Card = this.cards[this.length - 1];
                c.isFaceUp = true;
                c.isSelectable = true;
            }
        }

        onCardTapped: Phaser.Signal = new Phaser.Signal();

        cardTapped(card: Card, doubleTapped: boolean) {
            console.debug("Card Tapped on stack: " + this.name + " card: " + card.name + " doubleTap: " + doubleTapped);
            this.onCardTapped.dispatch(this, card, doubleTapped);
            
        }

        onStackTapped: Phaser.Signal = new Phaser.Signal();

        stackTapped() {
            this.onStackTapped.dispatch(this);
        }


    }
}
