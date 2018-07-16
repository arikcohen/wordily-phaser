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
        orientation: StackOrientation;       
        state: Phaser.State

        static offsetHorizonatal: number = 10;
        static offsetHorizonatalDisplay: number = Game.DefaultCardWidth * 0.4;
        static offsetVertical: number = 15;
        static offsetVerticalFaceUp: number = 32;

        
        constructor(state: Phaser.State, name:string, orientation: StackOrientation, x?: number, y?: number, initialCards:Card[] = []) {
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
            this.state.add.text(0, 0, name, null, this);
            this.state.add.text(0, 100, "(" + this.x.toFixed(0) + "," + this.y.toFixed(0) + ")", null, this);                       

            this.cards = initialCards;
            for (let c of this.cards) {
                this.add(c);
                c.prevStack = c.curStack;
                c.curStack = this;
            }

            this.updateCardLocations(0);

        }

        update() {
            if (this.length > 0) {
                this.dropSlot.renderable = false;                
            }

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

        removeCard(card:Card): Card {
            let index = this.cards.indexOf(card);
            if (index != -1) {
                this.cards.splice(index, 1);
                return card;
            }
            else {
                return null;
            }
        }

        addCard(card: Card, index?: number, fAnimateIn = false) {            
            if (index) {
                this.cards.push(card);  
                this.addAt(card, index);
                this.updateCardLocations(index);
            }
            else {
                this.cards.push(card);
                this.updateCardLocations(this.cards.length-1);
                this.add(card);
            }
                                    
            card.prevStack = card.curStack;
            card.curStack = this;
        }

        private updateCardLocations(startIndex:number =0) {
            console.debug("Updating Card locations for: " + this.name + " starting at location: " + startIndex + " total Cards: " + this.cards.length);
            let prevCard: Card;

            if (startIndex > 0) {
                prevCard = this.cards[startIndex - 1];
                
            }

            for (let c: number = startIndex; c < this.length; c++)
            {
                let x: number;
                let y: number;

                
                let card: Card = this.cards[c];                

                switch (this.orientation) {
                    case StackOrientation.Deck: {
                        x = 0;
                        y = 0;
                        break;
                    }
                    case StackOrientation.HorizontalFull: {
                        x = c * (this.dropSlot.width + Stack.offsetHorizonatal);
                        y = 0;
                        break;
                    }

                    case StackOrientation.HorizontalDisplay: {
                        x = c * (Stack.offsetHorizonatalDisplay);
                        y = 0;
                        break;
                    }

                    case StackOrientation.HorizontalStack: {
                        x = c * (Stack.offsetHorizonatal);
                        y = 0;
                        break;
                    }
                    case StackOrientation.VerticalStack: {

                        x = 0;
                        if (prevCard) {
                            if (prevCard.isFaceUp) {
                                y = prevCard.y + (Stack.offsetVerticalFaceUp);
                            }
                            else {
                                y = prevCard.y + (Stack.offsetVertical);
                            } 

                        }
                        else {
                            y = 0;
                        }
                        break;
                    }
                }
                if (card.x != x || card.y != y) {
                    card.x = x;
                    card.y = y;
                    console.debug("Stack: " + this.name + " updated card location " + c + " " + card.name + " (" + x + ", " + y + ")");
                }
                
                
            }

            
        }       

        onCardTapped: Phaser.Signal = new Phaser.Signal();

        cardTapped(card: Card, doubleTapped: boolean) {
            console.debug("Card Tapped on stack: " + this.name + " card: " + card.name + " doubleTap: " + doubleTapped);
            this.onCardTapped.dispatch(this, card, doubleTapped);
            
        }
    }
}
