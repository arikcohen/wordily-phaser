namespace Wordily {
    export class Card extends Phaser.Group{
        
        name: string;
        value: number;

        private static nextId: number = 1000;
        id: number;

        private cardFront: Phaser.Sprite;
        private cardBack: Phaser.Sprite;        
        private cardSelected: Phaser.Sprite;        

        
        private flipTween: Phaser.Tween;
        private flipTweenPos: Phaser.Tween;
        private flipBackTween: Phaser.Tween;
        private flipBackTweenPos: Phaser.Tween;
        
        
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
                this.cardFront.input.draggable = true;
                this.cardSelected.input.draggable = true;
            }
            else {
                this.ignoreChildInput = true;                                
                this.cardFront.input.draggable = false;
                this.cardSelected.input.draggable = false;
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

        constructor(id: number = -1, name: string, isFaceUp = true, value: number, x?:number, y?:number, parent?:PIXI.DisplayObjectContainer, state?:Phaser.State) {
            super(Game.getInstance(),parent, name);            
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
            
            if (!state) {                            
                state = Game.getInstance().state.getCurrentState();               
            }

            //this.isSelected = false;
            this.inputEnableChildren = true;
            this.onChildInputUp.add(this.onMouseDown, this);    

            this.cardFront = state.add.sprite(0, 0, "cards", this.name, this);            
            
            this.cardBack = state.add.sprite(0, 0, "cards", "cardBackground", this);            
            
            this.cardSelected = state.add.sprite(0, 0, "cards", "cardSelected", this);                 
            
            this.isFaceUp = isFaceUp;
            this.isSelected = false;
            this.isSelectable = false;              

            
        }

        _secondClick: boolean = false;
        _cancelFirstClick: boolean = false;
        onMouseDown(sprite: Phaser.Sprite) {
            if (this.isSelectable) {
                if (!this._secondClick) {
                    this._secondClick = true;
                    this._cancelFirstClick = false;
                    this.game.time.events.add(200, function () {
                        this._secondClick = false;
                        if (!this._cancelFirstClick) {
                            this.curStack.cardTapped(this, false);
                        }
                        this._cancelFirstClick = false;
                    }, this);
                    return;
                }
                this.curStack.cardTapped(this, true);
                this._secondClick = false;
                this._cancelFirstClick = true;
            }
        } 

        

        private _isFlipping: boolean = false;

        cardFlip(delay:number=0) {
            if (!this._isFlipping) {

                let w = this.width;
                let h = this.height;
                let x = this.x;
                let y = this.y;

                this.flipTween = this.game.add.tween(this.scale).to({
                    x: 0,
                    y: this.scaleFactor * 1.2,
                }, 300 / 2, Phaser.Easing.Linear.None);



                this.flipTweenPos = this.game.add.tween(this).to({
                    x: "+" + w / 2,
                    y: "-" + h * 0.1

                }, 300 / 2, Phaser.Easing.Linear.None);



                this.flipBackTween = this.game.add.tween(this.scale).to({
                    x: this.scaleFactor,
                    y: this.scaleFactor,
                }, 300 / 2, Phaser.Easing.Linear.None);

                this.flipBackTweenPos = this.game.add.tween(this).to({
                    x: x,
                    y: y
                }, 300 / 2, Phaser.Easing.Linear.None);

                this.flipTween.onComplete.addOnce(this.onFlipHalfComplete, this);

                this.flipBackTween.onComplete.addOnce(this.onFlipComplete, this);




                this._isFlipping = true;
                this.flipTween.delay(delay/2);
                this.flipTweenPos.delay(delay / 2);
                this.flipBackTween.delay(0);
                this.flipBackTweenPos.delay(0);
                this.flipTween.start();
                this.flipTweenPos.start();
            }
            
        }

        onFlipComplete() {
            this._isFlipping = false;            

        }

        onFlipHalfComplete() {
            
            this.isFaceUp = !this.isFaceUp;
            this.flipBackTween.start();
            this.flipBackTweenPos.start();                            
        }

        


        toString() {
            return this.name + "[" + this.value + "] " + this.id;
        }        
    }

}