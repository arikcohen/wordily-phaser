namespace Wordily {
    export enum StackOrientation {
        Deck,
        Horizontal,
        Vertical
    }

    export class Stack extends Phaser.Group {
        cards: Card[];
        dropSlot: Phaser.Sprite;
        orientation: StackOrientation;       
        state: Phaser.State
                                       
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
            this.scale.setTo(Game.ScaleFactor, Game.ScaleFactor);            
            this.dropSlot = this.state.add.sprite(0, 0, "cards", "card_Slot", this);
            this.state.add.text(0, 0, name, null, this);
            this.state.add.text(0, 100, "(" + this.x + "," + this.y + ")", null, this);                       
        }

        update() {
            if (this.cards.length > 0) {
                this.dropSlot.renderable = false;                
            }

            super.update();
        }
    }
}
