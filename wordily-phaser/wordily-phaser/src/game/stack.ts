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
        static offsetVertical: number = 20;

        
        constructor(state: Phaser.State, name:string, orientation: StackOrientation, x?: number, y?: number) {
            super(state.game, null, name, true, false, null);
            this.state = state;
            this.orientation = orientation;  

            this.cards = [];

            if (x) {
                this.x = x;
            }
            if (y) {
                this.y = y;
            }

            //this.groupStack = state.add.group(null, name, true, false);                        
            this.dropSlot = this.state.add.sprite(0, 0, "cards", "card_Slot", this);
            this.dropSlot.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);
            this.state.add.text(0, 0, name, null, this);
            this.state.add.text(0, 100, "(" + this.x.toFixed(0) + "," + this.y.toFixed(0) + ")", null, this);                       
            
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

        addCard(card: Card, index?: number) {            
            if (index) {
                this.cards.push(card);  
                this.addAt(card, index);
            }
            else {
                this.cards.push(card);
                this.add(card);
            }
            
            this.updateCardLocations();

            
            card.prevStack = card.curStack;
            card.curStack = this;
        }

        private updateCardLocations() {
            for (let c: number = 0; c < this.length; c++)
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
                        y = c * (Stack.offsetVertical);
                        break;
                    }
                }
                if (card.x != x || card.y != y) {
                    card.x = x;
                    card.y = y;
                    console.debug("Updated Card Location " + card.name + " (" + x + ", " + y + ")");
                }
                
                
            }
        }

    }
}
