namespace Wordily {
    export class Card extends Phaser.Group{
        
        name: string;
        value: number;

        private static nextId: number = 1000;
        id: number;

        private cardFront: Phaser.Sprite;
        private cardBack: Phaser.Sprite;        
        private cardSelected: Phaser.Sprite;        

        
        private _isFaceUp: boolean = true;

        get isFaceUp(): boolean {
            return this._isFaceUp;
        }
        set isFaceUp(value: boolean) {
            this._isFaceUp = value;
            this.cardFront.renderable = this.isFaceUp;
            this.cardBack.renderable = !this.isFaceUp;
        }

        private _isSelected: boolean = false;

        get isSelected(): boolean {
            return this._isSelected;
        }

        set isSelected(value: boolean) {
            if (value && !this.isSelectable) {
                // can't actual select
                return

            }
            this._isSelected = value;
            this.cardSelected.renderable = this.isSelected;
        }

        private _isSelectable: boolean = false;

        get isSelectable(): boolean {
            return this._isSelectable;
        }

        set isSelectable(value: boolean) {
            this._isSelectable = value;
            if (this.isSelectable) {
                this.ignoreChildInput = false;
            }
            else {
                this.inputEnableChildren = false;
                

            }
        }


        isAnimating: boolean = false;

        private _scaleFactor: number = Game.ScaleFactor;

        get scaleFactor(): number {
            return this._scaleFactor;
        }

        set scaleFactor(value: number) {
            this._scaleFactor = value;
            this.scale.setTo(this.scaleFactor, this.scaleFactor);
        }

        curStack: Stack = null;
        prevStack: Stack = null;

        constructor(cardName: string, isFaceUp = true, id?: number, x?:number, y?:number, parent?:PIXI.DisplayObjectContainer, state?:Phaser.State) {
            super(Game.getInstance(),parent, cardName);            
            this.name = cardName;
            this.scale.setTo(this.scaleFactor, this.scaleFactor);
            if (id) {
                this.id= id;
            }
            else {
                this.id = Card.nextId++;
            }
            
            if (x) {
                this.x = x;
            }
            if (y) {
                this.y = y;
            }

            
            if (state) {                            
               
            }
            else {
                state = Game.getInstance().state.getCurrentState();
               
            }

            //this.isSelected = false;
            this.inputEnableChildren = true;
            this.onChildInputDown.add(this.onMouseDown, this);    

            this.cardFront = state.add.sprite(0, 0, "cards", this.name, this);            
            this.cardBack = state.add.sprite(0, 0, "cards", "cardBackground", this);            
            this.cardSelected = state.add.sprite(0, 0, "cards", "cardSelected", this);            
            this.isFaceUp = isFaceUp;
            this.isSelected = false;
            this.isSelectable = false;
            

        }

        
        onMouseDown(sprite: Phaser.Sprite) {
            
            this.curStack.cardTapped(this, false);
        } 

                    


        toString() {
            return this.name + "[" + this.value + "] " + this.id;
        }        
    }

}