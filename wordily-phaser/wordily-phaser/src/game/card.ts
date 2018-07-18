namespace Wordily {
     export class ExtendedCardSprite extends Phaser.Sprite {

        private _parentTransform: Phaser.Group;

        // -------------------------------------------------------------------------
        constructor(aGame: Phaser.Game, aX: number, aY: number, aKey: string, aFrame: string, aParentTransform: Phaser.Group) {
            super(aGame, aX, aY, aKey, aFrame);
            this._parentTransform = aParentTransform;
        }

        // -------------------------------------------------------------------------
        public updateTransform(): void {
            if (!this.visible) {
                return;
            }

            this.displayObjectUpdateTransform(this._parentTransform);
        }
    }

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
        animateFinalX: number;
        animateFinalY: number;


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

        constructor(id: number = -1, name: string, isFaceUp = true, value: number, x?:number, y?:number, parent?:PIXI.DisplayObjectContainer, state?:ExtendedState) {
            super(Game.getInstance(),null, name);            
            this.name = name;
            this.value = value;

            this.scale.setTo(this.scaleFactor, this.scaleFactor);
            if (id != -1) {
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
                state = <ExtendedState> Game.getInstance().state.getCurrentState();
               
            }

            //this.isSelected = false;
            this.inputEnableChildren = true;
            this.onChildInputDown.add(this.onMouseDown, this);    

            this.cardFront = new ExtendedCardSprite(this.game, 0, 0, "cards", this.name, this);            
            this.cardBack = new ExtendedCardSprite(this.game, 0, 0, "cards", "cardBackground", this);            
            this.cardSelected = new ExtendedCardSprite(this.game, 0, 0, "cards", "cardSelected", this);            

            state.spriteGroup.add(this.cardFront);
            state.spriteGroup.add(this.cardBack);
            state.spriteGroup.add(this.cardSelected);

            this.isFaceUp = isFaceUp;
            this.isSelected = false;
            this.isSelectable = false;
            


        }

        
        onMouseDown(sprite: Phaser.Sprite) {
            if (this.isSelectable) {
                this.curStack.cardTapped(this, false);
            }
        } 

                    


        toString() {
            return this.name + "[" + this.value + "] " + this.id;
        }        
    }

}